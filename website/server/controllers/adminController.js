import { User } from '../models/User.js';
import { Challenge } from '../models/Challenge.js';
import { Submission } from '../models/Submission.js';
import { Event } from '../models/Event.js';
import { Project } from '../models/Project.js';
import { Announcement } from '../models/Announcement.js';

// @desc    Get comprehensive admin overview statistics
// @route   GET /api/admin/statistics
// @access  Private/Admin
export const getAdminStatistics = async (req, res, next) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalChallenges = await Challenge.countDocuments();
    const publishedChallenges = await Challenge.countDocuments({ status: 'published' });
    const totalSubmissions = await Submission.countDocuments();
    const acceptedSubmissions = await Submission.countDocuments({ status: 'Accepted' });
    const pendingEvaluations = await Submission.countDocuments({ status: 'Pending' });
    const totalEvents = await Event.countDocuments();
    const totalProjects = await Project.countDocuments();

    const acceptanceRate = totalSubmissions > 0
      ? Math.round((acceptedSubmissions / totalSubmissions) * 100)
      : 0;

    // Challenge category distribution
    const challenges = await Challenge.find();
    const categoryMap = {};
    challenges.forEach((c) => {
      categoryMap[c.category] = (categoryMap[c.category] || 0) + 1;
    });

    const categoryDistribution = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

    // Submissions activity (grouped by last 7 days or mock timeslots)
    const recentSubmissions = await Submission.find()
      .populate('challenge', 'title challengeId')
      .populate('user', 'name rollNumber college')
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        totalChallenges,
        publishedChallenges,
        totalSubmissions,
        acceptedSubmissions,
        pendingEvaluations,
        totalEvents,
        totalProjects,
        acceptanceRate: `${acceptanceRate}%`,
        categoryDistribution,
        recentSubmissions,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all students with search & pagination
// @route   GET /api/admin/students
// @access  Private/Admin
export const getAllStudents = async (req, res, next) => {
  try {
    const { search, college, year } = req.query;
    const query = { role: 'student' };

    if (college && college !== 'All') query.college = college;
    if (year && year !== 'All') query.year = year;

    let students = await User.find(query).sort({ score: -1, createdAt: -1 });

    if (search) {
      const s = search.toLowerCase();
      students = students.filter(
        (u) =>
          u.name.toLowerCase().includes(s) ||
          u.email.toLowerCase().includes(s) ||
          u.rollNumber.toLowerCase().includes(s) ||
          u.college.toLowerCase().includes(s)
      );
    }

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a student (Admin only)
// @route   DELETE /api/admin/students/:id
// @access  Private/Admin
export const deleteStudent = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ success: false, message: 'Cannot delete admin account' });
    }

    // Delete associated submissions
    await Submission.deleteMany({ user: user._id });
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Student and related submissions removed successfully.',
    });
  } catch (error) {
    next(error);
  }
};
