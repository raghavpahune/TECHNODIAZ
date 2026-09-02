import { Challenge } from '../models/Challenge.js';
import { Submission } from '../models/Submission.js';
import { executeCode } from '../utils/codeRunner.js';

// @desc    Get all challenges
// @route   GET /api/challenges
// @access  Public (Optional User ID for solved status)
export const getChallenges = async (req, res, next) => {
  try {
    const { category, difficulty, search, status } = req.query;
    const query = {};

    // By default, only show published challenges for non-admin requests
    if (req.user && req.user.role === 'admin') {
      if (status) query.status = status;
    } else {
      query.status = 'published';
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (difficulty && difficulty !== 'All') {
      query.difficulty = difficulty;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { challengeId: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const challenges = await Challenge.find(query).sort({ order: 1, createdAt: 1 });

    // If user is authenticated, attach user's submission status for each challenge
    let userSubmissions = [];
    if (req.user) {
      userSubmissions = await Submission.find({ user: req.user._id });
    }

    const userSubMap = {};
    userSubmissions.forEach((sub) => {
      const cId = sub.challenge.toString();
      if (!userSubMap[cId] || sub.status === 'Accepted') {
        userSubMap[cId] = sub.status;
      }
    });

    const enrichedChallenges = challenges.map((ch) => {
      const obj = ch.toObject();
      obj.userStatus = userSubMap[ch._id.toString()] || 'Unsolved';
      return obj;
    });

    res.status(200).json({
      success: true,
      count: enrichedChallenges.length,
      challenges: enrichedChallenges,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get challenge by ID or challengeId
// @route   GET /api/challenges/:id
// @access  Public
export const getChallengeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let challenge;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      challenge = await Challenge.findById(id);
    } else {
      challenge = await Challenge.findOne({ challengeId: id.toUpperCase() });
    }

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: `Challenge not found with ID ${id}`,
      });
    }

    const obj = challenge.toObject();

    // Check user's past submission for this challenge if logged in
    if (req.user) {
      const pastSubmission = await Submission.findOne({
        user: req.user._id,
        challenge: challenge._id,
      }).sort({ createdAt: -1 });

      obj.userLatestSubmission = pastSubmission;
    }

    res.status(200).json({
      success: true,
      challenge: obj,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Test-run code against public test cases
// @route   POST /api/challenges/:id/run
// @access  Private
export const runChallengeCode = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { language, code } = req.body;

    let challenge = await Challenge.findById(id);
    if (!challenge) {
      challenge = await Challenge.findOne({ challengeId: id.toUpperCase() });
    }

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found',
      });
    }

    // Use non-hidden test cases for interactive run
    const testCasesToRun = challenge.testCases && challenge.testCases.length > 0
      ? challenge.testCases.filter((tc) => !tc.isHidden)
      : challenge.examples.map((ex) => ({ input: ex.input, expectedOutput: ex.output }));

    const executionResult = await executeCode(language || 'javascript', code, testCasesToRun);

    res.status(200).json({
      success: true,
      result: executionResult,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new challenge (Admin only)
// @route   POST /api/challenges
// @access  Private/Admin
export const createChallenge = async (req, res, next) => {
  try {
    const count = await Challenge.countDocuments();
    const challengeData = { ...req.body };

    if (!challengeData.challengeId) {
      challengeData.challengeId = `TDZ-CH-${String(count + 1).padStart(2, '0')}`;
    }

    const challenge = await Challenge.create(challengeData);

    res.status(201).json({
      success: true,
      message: 'Challenge created successfully',
      challenge,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update challenge (Admin only)
// @route   PUT /api/challenges/:id
// @access  Private/Admin
export const updateChallenge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const challenge = await Challenge.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Challenge updated successfully',
      challenge,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete challenge (Admin only)
// @route   DELETE /api/challenges/:id
// @access  Private/Admin
export const deleteChallenge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const challenge = await Challenge.findByIdAndDelete(id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Challenge deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Duplicate challenge (Admin only)
// @route   POST /api/challenges/:id/duplicate
// @access  Private/Admin
export const duplicateChallenge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await Challenge.findById(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found to duplicate',
      });
    }

    const count = await Challenge.countDocuments();
    const duplicateData = existing.toObject();
    delete duplicateData._id;
    delete duplicateData.createdAt;
    delete duplicateData.updatedAt;

    duplicateData.title = `${duplicateData.title} (Copy)`;
    duplicateData.challengeId = `TDZ-CH-${String(count + 1).padStart(2, '0')}`;
    duplicateData.status = 'draft';

    const newChallenge = await Challenge.create(duplicateData);

    res.status(201).json({
      success: true,
      message: 'Challenge duplicated as draft',
      challenge: newChallenge,
    });
  } catch (error) {
    next(error);
  }
};
