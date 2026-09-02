import { User } from '../models/User.js';
import { Submission } from '../models/Submission.js';

// @desc    Get live leaderboard rankings
// @route   GET /api/leaderboard
// @access  Public
export const getLeaderboard = async (req, res, next) => {
  try {
    const { timeframe, college, limit = 50 } = req.query;

    const query = { role: 'student' };
    if (college && college !== 'All') {
      query.college = college;
    }

    // Get all students sorted by score descending, then solvedCount descending, then updatedAt ascending
    const students = await User.find(query)
      .select('name college branch year rollNumber score solvedCount attemptedCount avatar')
      .sort({ score: -1, solvedCount: -1, createdAt: 1 })
      .limit(Number(limit));

    // Calculate accuracy percentage and rank
    const leaderboard = students.map((st, index) => {
      const accuracy = st.attemptedCount > 0
        ? Math.round((st.solvedCount / st.attemptedCount) * 100)
        : 100;

      return {
        rank: index + 1,
        id: st._id,
        name: st.name,
        college: st.college,
        branch: st.branch,
        year: st.year,
        rollNumber: st.rollNumber,
        score: st.score,
        solved: st.solvedCount,
        attempted: st.attemptedCount,
        accuracy: `${accuracy}%`,
      };
    });

    // Top 3 Podium
    const podium = leaderboard.slice(0, 3);

    res.status(200).json({
      success: true,
      count: leaderboard.length,
      podium,
      leaderboard,
    });
  } catch (error) {
    next(error);
  }
};
