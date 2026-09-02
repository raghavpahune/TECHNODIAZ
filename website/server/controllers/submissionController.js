import { Submission } from '../models/Submission.js';
import { Challenge } from '../models/Challenge.js';
import { User } from '../models/User.js';
import { executeCode } from '../utils/codeRunner.js';

// Helper to recalculate user overall stats
export const recalculateUserStats = async (userId) => {
  const submissions = await Submission.find({ user: userId });
  const attemptedMap = new Set();
  const solvedMap = new Set();
  let totalScore = 0;

  // Track max score per challenge
  const challengeBestScores = {};

  submissions.forEach((sub) => {
    const cId = sub.challenge.toString();
    attemptedMap.add(cId);

    if (sub.status === 'Accepted' || (sub.score > 0 && sub.status === 'Partially Correct')) {
      solvedMap.add(cId);
    }

    if (!challengeBestScores[cId] || sub.score > challengeBestScores[cId]) {
      challengeBestScores[cId] = sub.score;
    }
  });

  totalScore = Object.values(challengeBestScores).reduce((a, b) => a + b, 0);

  await User.findByIdAndUpdate(userId, {
    score: totalScore,
    solvedCount: solvedMap.size,
    attemptedCount: attemptedMap.size,
  });
};

// @desc    Submit challenge solution
// @route   POST /api/submissions
// @access  Private (Student/User)
export const createSubmission = async (req, res, next) => {
  try {
    const { challengeId, submissionType, language, code, answer, selectedOption } = req.body;
    const userId = req.user._id;

    let challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      challenge = await Challenge.findOne({ challengeId: challengeId.toUpperCase() });
    }

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found',
      });
    }

    // Generate unique Submission ID e.g. TDZ-48192
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const submissionId = `TDZ-${randomSuffix}`;

    let initialStatus = 'Pending';
    let initialScore = 0;
    let feedback = '';
    let executionResults = [];
    let compilationStatus = 'Submitted';
    let executionTime = 'N/A';
    let memoryUsed = 'N/A';

    // 1. MCQ Auto Evaluation
    if (challenge.submissionType === 'MCQ') {
      const challengeWithAnswer = await Challenge.findById(challenge._id).select('+mcqCorrectAnswer');
      const isCorrect = challengeWithAnswer.mcqCorrectAnswer && selectedOption && 
        selectedOption.trim().toUpperCase() === challengeWithAnswer.mcqCorrectAnswer.trim().toUpperCase();

      if (isCorrect) {
        initialStatus = 'Accepted';
        initialScore = challenge.points;
        feedback = 'Correct Answer! Full points awarded.';
      } else {
        initialStatus = 'Wrong Answer';
        initialScore = 0;
        feedback = 'Incorrect option chosen.';
      }
      compilationStatus = 'Evaluated';
    } 
    // 2. CODE Submission
    else if (challenge.submissionType === 'CODE') {
      if (!code || code.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Code cannot be empty for code submissions.',
        });
      }

      // If Javascript, run through testcases
      if (language === 'javascript' && challenge.testCases && challenge.testCases.length > 0) {
        const exec = await executeCode('javascript', code, challenge.testCases);
        executionResults = exec.results;
        compilationStatus = exec.compilationStatus;
        executionTime = exec.executionTime;
        memoryUsed = exec.memoryUsed;

        if (exec.allPassed) {
          initialStatus = 'Accepted';
          initialScore = challenge.points;
          feedback = `All ${exec.totalCount} test cases passed successfully!`;
        } else if (exec.passedCount > 0) {
          initialStatus = 'Partially Correct';
          initialScore = Math.floor((exec.passedCount / exec.totalCount) * challenge.points);
          feedback = `${exec.passedCount}/${exec.totalCount} test cases passed. Pending admin review.`;
        } else {
          initialStatus = 'Wrong Answer';
          initialScore = 0;
          feedback = 'Failed test cases. Admin will perform final evaluation.';
        }
      } else {
        // Other languages or standard submission: queued for evaluation
        initialStatus = 'Pending';
        initialScore = 0;
        feedback = 'Your code has been submitted successfully and is queued for evaluation.';
      }
    } 
    // 3. TEXT Submission
    else if (challenge.submissionType === 'TEXT') {
      if (!answer || answer.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Answer text cannot be empty.',
        });
      }
      initialStatus = 'Pending';
      feedback = 'Submitted. CSE Evaluation Committee will review and assign score.';
    }

    const submission = await Submission.create({
      submissionId,
      user: userId,
      challenge: challenge._id,
      submissionType: challenge.submissionType,
      language: language || 'cpp',
      code: code || '',
      answer: answer || '',
      selectedOption: selectedOption || '',
      status: initialStatus,
      score: initialScore,
      maxScore: challenge.points,
      feedback,
      executionResults,
      compilationStatus,
      executionTime,
      memoryUsed,
      submittedAt: new Date(),
    });

    // Update challenge counts
    await Challenge.findByIdAndUpdate(challenge._id, {
      $inc: {
        submissionCount: 1,
        solveCount: initialStatus === 'Accepted' ? 1 : 0,
      },
    });

    // Recalculate user points & stats
    await recalculateUserStats(userId);

    const populatedSubmission = await Submission.findById(submission._id)
      .populate('challenge', 'title challengeId difficulty points category')
      .populate('user', 'name email rollNumber college');

    res.status(201).json({
      success: true,
      message: 'Solution submitted successfully!',
      submission: populatedSubmission,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user's submissions
// @route   GET /api/submissions/my
// @access  Private
export const getMySubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find({ user: req.user._id })
      .populate('challenge', 'title challengeId difficulty points category submissionType')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: submissions.length,
      submissions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single submission detail
// @route   GET /api/submissions/:id
// @access  Private
export const getSubmissionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let submission;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      submission = await Submission.findById(id);
    } else {
      submission = await Submission.findOne({ submissionId: id });
    }

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    // Authorization: only student owner or admin can view
    if (req.user.role !== 'admin' && submission.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to view this submission',
      });
    }

    const populated = await Submission.findById(submission._id)
      .populate('challenge', 'title challengeId category difficulty points description problemStatement')
      .populate('user', 'name email rollNumber college branch year')
      .populate('evaluatedBy', 'name email');

    res.status(200).json({
      success: true,
      submission: populated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin: Get all submissions with search & filters
// @route   GET /api/admin/submissions
// @access  Private/Admin
export const getAllSubmissions = async (req, res, next) => {
  try {
    const { status, challengeId, language, search } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (challengeId && challengeId !== 'All') {
      query.challenge = challengeId;
    }

    if (language && language !== 'All') {
      query.language = language;
    }

    let submissions = await Submission.find(query)
      .populate('challenge', 'title challengeId difficulty points category')
      .populate('user', 'name email rollNumber college branch')
      .sort({ createdAt: -1 });

    if (search) {
      const s = search.toLowerCase();
      submissions = submissions.filter((sub) => {
        return (
          sub.submissionId?.toLowerCase().includes(s) ||
          sub.user?.name?.toLowerCase().includes(s) ||
          sub.user?.email?.toLowerCase().includes(s) ||
          sub.user?.rollNumber?.toLowerCase().includes(s) ||
          sub.challenge?.title?.toLowerCase().includes(s) ||
          sub.challenge?.challengeId?.toLowerCase().includes(s)
        );
      });
    }

    res.status(200).json({
      success: true,
      count: submissions.length,
      submissions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin: Evaluate / grade submission
// @route   PUT /api/admin/submissions/:id/evaluate
// @access  Private/Admin
export const evaluateSubmission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { score, status, feedback } = req.body;

    const submission = await Submission.findById(id).populate('challenge');
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    const prevStatus = submission.status;

    submission.score = Number(score !== undefined ? score : submission.score);
    submission.status = status || submission.status;
    submission.feedback = feedback !== undefined ? feedback : submission.feedback;
    submission.evaluatedAt = new Date();
    submission.evaluatedBy = req.user._id;
    submission.compilationStatus = 'Evaluated';

    await submission.save();

    // Update challenge solve count if status transitioned to Accepted
    if (prevStatus !== 'Accepted' && submission.status === 'Accepted') {
      await Challenge.findByIdAndUpdate(submission.challenge._id, {
        $inc: { solveCount: 1 },
      });
    } else if (prevStatus === 'Accepted' && submission.status !== 'Accepted') {
      await Challenge.findByIdAndUpdate(submission.challenge._id, {
        $inc: { solveCount: -1 },
      });
    }

    // Automatically recalculate student's leaderboard score
    await recalculateUserStats(submission.user);

    const updatedSubmission = await Submission.findById(id)
      .populate('challenge', 'title challengeId difficulty points')
      .populate('user', 'name email rollNumber college score solvedCount')
      .populate('evaluatedBy', 'name');

    res.status(200).json({
      success: true,
      message: 'Submission evaluation saved & student score updated.',
      submission: updatedSubmission,
    });
  } catch (error) {
    next(error);
  }
};
