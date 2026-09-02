import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import { Team } from '../models/Team.js';
import { isMongoConnected, fallbackDB } from '../config/db.js';
import { generateToken } from '../middleware/auth.js';

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password.' });
    }

    let admin = null;
    if (isMongoConnected) {
      admin = await Admin.findOne({ username: username.toLowerCase() });
    } else {
      admin = fallbackDB.data.admins.find(a => a.username.toLowerCase() === username.toLowerCase());
    }

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }

    const isMatch = bcrypt.compareSync(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }

    const token = generateToken({
      id: admin._id || admin.id,
      username: admin.username,
      name: admin.name,
      designation: admin.designation,
      role: admin.role
    });

    return res.json({
      success: true,
      message: `Welcome back, ${admin.name}!`,
      token,
      admin: {
        id: admin._id || admin.id,
        username: admin.username,
        name: admin.name,
        designation: admin.designation,
        role: admin.role,
        avatar: admin.avatar
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Login error', error: err.message });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    let teams = [];
    if (isMongoConnected) {
      teams = await Team.find();
    } else {
      teams = fallbackDB.data.teams;
    }

    const totalRegistered = teams.length;
    const totalVerified = teams.filter(t => t.verified).length;
    const pendingVerification = totalRegistered - totalVerified;

    const technicalCount = teams.filter(t => t.eventType === 'Technical').length;
    const sportsCount = teams.filter(t => t.eventType === 'Sports').length;

    // Event category breakdown
    const categoryStats = {};
    teams.forEach(t => {
      categoryStats[t.eventCategory] = (categoryStats[t.eventCategory] || 0) + 1;
    });

    // Recent checkins
    const recentCheckins = teams
      .filter(t => t.verified && t.verifiedAt)
      .sort((a, b) => new Date(b.verifiedAt) - new Date(a.verifiedAt))
      .slice(0, 8);

    return res.json({
      success: true,
      stats: {
        totalRegistered,
        totalVerified,
        pendingVerification,
        technicalCount,
        sportsCount,
        categoryStats,
        recentCheckins,
        verificationRate: totalRegistered > 0 ? Math.round((totalVerified / totalRegistered) * 100) : 0
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getAdminList = async (req, res) => {
  try {
    let admins = [];
    if (isMongoConnected) {
      admins = await Admin.find().select('-passwordHash');
    } else {
      admins = fallbackDB.data.admins.map(({ passwordHash, ...rest }) => rest);
    }
    return res.json({ success: true, admins });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
