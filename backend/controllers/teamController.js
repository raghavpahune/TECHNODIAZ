import { Team } from '../models/Team.js';
import { isMongoConnected, fallbackDB } from '../config/db.js';

// Helper to generate unique registration ID
const generateRegId = () => {
  const randNum = Math.floor(1000 + Math.random() * 9000);
  return `TECH-2026-${randNum}`;
};

export const registerTeam = async (req, res) => {
  try {
    const {
      teamName,
      eventCategory,
      eventType,
      leaderName,
      leaderEmail,
      leaderPhone,
      collegeName,
      department,
      yearOfStudy,
      members,
    } = req.body;

    if (!teamName || !eventCategory || !leaderName || !leaderEmail || !leaderPhone) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all mandatory registration fields.'
      });
    }

    const registrationId = generateRegId();

    const qrPayload = JSON.stringify({
      regId: registrationId,
      team: teamName,
      event: eventCategory,
      type: eventType || 'Technical',
      leader: leaderName,
      phone: leaderPhone,
      college: collegeName || 'PBCOE Nagpur',
      issuedAt: new Date().toISOString()
    });

    const teamData = {
      id: `team_${Date.now()}`,
      registrationId,
      teamName,
      eventCategory,
      eventType: eventType || (eventCategory.includes('Cricket') || eventCategory.includes('Futsal') || eventCategory.includes('Chess') || eventCategory.includes('Badminton') || eventCategory.includes('Tug of War') || eventCategory.includes('Battle') ? 'Sports' : 'Technical'),
      leaderName,
      leaderEmail,
      leaderPhone,
      collegeName: collegeName || 'PBCOE Nagpur',
      department: department || 'Computer Science & Engineering',
      yearOfStudy: yearOfStudy || '3rd Year',
      members: members && members.length > 0 ? members : [{ name: leaderName, role: 'Team Leader', email: leaderEmail, phone: leaderPhone }],
      verified: false,
      verifiedAt: null,
      verifiedBy: null,
      qrCodeData: qrPayload,
      registeredAt: new Date()
    };

    if (isMongoConnected) {
      const newTeam = new Team(teamData);
      await newTeam.save();
    } else {
      fallbackDB.data.teams.push(teamData);
      fallbackDB.saveToFile();
    }

    return res.status(201).json({
      success: true,
      message: 'Team registered successfully for TECHNODIAZ 2k26!',
      team: teamData
    });
  } catch (err) {
    console.error('[RegisterTeam Error]', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to register team. Please try again.',
      error: err.message
    });
  }
};

export const getTeams = async (req, res) => {
  try {
    const { category, type, verified, search } = req.query;
    let teamsList = [];

    if (isMongoConnected) {
      const query = {};
      if (category) query.eventCategory = category;
      if (type) query.eventType = type;
      if (verified !== undefined) query.verified = verified === 'true';
      if (search) {
        query.$or = [
          { teamName: { $regex: search, $options: 'i' } },
          { registrationId: { $regex: search, $options: 'i' } },
          { leaderName: { $regex: search, $options: 'i' } },
          { collegeName: { $regex: search, $options: 'i' } }
        ];
      }
      teamsList = await Team.find(query).sort({ registeredAt: -1 });
    } else {
      teamsList = [...fallbackDB.data.teams];
      if (category) teamsList = teamsList.filter(t => t.eventCategory === category);
      if (type) teamsList = teamsList.filter(t => t.eventType === type);
      if (verified !== undefined) {
        const isVer = verified === 'true';
        teamsList = teamsList.filter(t => Boolean(t.verified) === isVer);
      }
      if (search) {
        const s = search.toLowerCase();
        teamsList = teamsList.filter(t =>
          (t.teamName && t.teamName.toLowerCase().includes(s)) ||
          (t.registrationId && t.registrationId.toLowerCase().includes(s)) ||
          (t.leaderName && t.leaderName.toLowerCase().includes(s)) ||
          (t.collegeName && t.collegeName.toLowerCase().includes(s))
        );
      }
      teamsList.sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));
    }

    return res.json({
      success: true,
      count: teamsList.length,
      teams: teamsList
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getTeamByRegId = async (req, res) => {
  try {
    const { regId } = req.params;
    let team = null;

    if (isMongoConnected) {
      team = await Team.findOne({ registrationId: regId.toUpperCase() });
    } else {
      team = fallbackDB.data.teams.find(t => t.registrationId?.toUpperCase() === regId?.toUpperCase());
    }

    if (!team) {
      return res.status(404).json({ success: false, message: `No team found with Registration ID: ${regId}` });
    }

    return res.json({ success: true, team });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const verifyTeamQR = async (req, res) => {
  try {
    const { rawQrData, registrationId, adminName } = req.body;
    let targetRegId = registrationId;

    if (rawQrData && !targetRegId) {
      try {
        const parsed = JSON.parse(rawQrData);
        targetRegId = parsed.regId || parsed.registrationId;
      } catch {
        targetRegId = rawQrData.trim();
      }
    }

    if (!targetRegId) {
      return res.status(400).json({ success: false, message: 'Invalid QR data or Registration ID provided.' });
    }

    targetRegId = targetRegId.toUpperCase().trim();
    let team = null;

    if (isMongoConnected) {
      team = await Team.findOne({ registrationId: targetRegId });
      if (!team) {
        return res.status(404).json({
          success: false,
          status: 'NOT_FOUND',
          message: `QR code invalid or team not registered (${targetRegId})`
        });
      }

      if (team.verified) {
        return res.json({
          success: true,
          status: 'ALREADY_VERIFIED',
          message: `Team "${team.teamName}" was already verified by ${team.verifiedBy || 'Admin'} at ${new Date(team.verifiedAt).toLocaleTimeString()}`,
          team
        });
      }

      team.verified = true;
      team.verifiedAt = new Date();
      team.verifiedBy = adminName || req.admin?.name || 'Gate Verifier';
      await team.save();
    } else {
      const idx = fallbackDB.data.teams.findIndex(t => t.registrationId?.toUpperCase() === targetRegId);
      if (idx === -1) {
        return res.status(404).json({
          success: false,
          status: 'NOT_FOUND',
          message: `QR code invalid or team not registered (${targetRegId})`
        });
      }

      team = fallbackDB.data.teams[idx];
      if (team.verified) {
        return res.json({
          success: true,
          status: 'ALREADY_VERIFIED',
          message: `Team "${team.teamName}" was already verified by ${team.verifiedBy || 'Admin'} at ${new Date(team.verifiedAt).toLocaleTimeString()}`,
          team
        });
      }

      team.verified = true;
      team.verifiedAt = new Date();
      team.verifiedBy = adminName || req.admin?.name || 'Gate Verifier';
      fallbackDB.data.teams[idx] = team;
      fallbackDB.saveToFile();
    }

    return res.json({
      success: true,
      status: 'VERIFIED_SUCCESS',
      message: `Team "${team.teamName}" successfully verified for ${team.eventCategory}!`,
      team
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Verification error', error: err.message });
  }
};

export const toggleVerificationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    let team = null;

    if (isMongoConnected) {
      team = await Team.findById(id);
      if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
      team.verified = !team.verified;
      team.verifiedAt = team.verified ? new Date() : null;
      team.verifiedBy = team.verified ? (req.admin?.name || 'Admin') : null;
      await team.save();
    } else {
      const idx = fallbackDB.data.teams.findIndex(t => t.id === id || t.registrationId === id || t._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Team not found' });
      team = fallbackDB.data.teams[idx];
      team.verified = !team.verified;
      team.verifiedAt = team.verified ? new Date() : null;
      team.verifiedBy = team.verified ? (req.admin?.name || 'Admin') : null;
      fallbackDB.data.teams[idx] = team;
      fallbackDB.saveToFile();
    }

    return res.json({ success: true, message: `Team status updated to ${team.verified ? 'Verified' : 'Pending'}`, team });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
