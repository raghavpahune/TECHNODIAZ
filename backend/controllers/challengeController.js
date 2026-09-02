import { Challenge } from '../models/Challenge.js';
import { isMongoConnected, fallbackDB } from '../config/db.js';

export const getChallenges = async (req, res) => {
  try {
    let list = [];
    if (isMongoConnected) {
      list = await Challenge.find();
    } else {
      list = fallbackDB.data.challenges;
    }
    return res.json({ success: true, challenges: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const verifyChallenge = async (req, res) => {
  try {
    const { challengeId, selectedOption, customCode } = req.body;
    let list = isMongoConnected ? await Challenge.find() : fallbackDB.data.challenges;
    const challenge = list.find(c => c.id === challengeId || c._id?.toString() === challengeId);

    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found.' });
    }

    const correctOption = challenge.options.find(opt => opt.isCorrect);
    const isCorrect = correctOption && correctOption.label.trim() === selectedOption?.trim();

    if (isCorrect) {
      return res.json({
        success: true,
        isCorrect: true,
        message: '🎉 Outstanding! You cracked the Daily Coding Challenge!',
        pointsEarned: challenge.rewardPoints || 100,
        explanation: challenge.explanation,
        badge: '🌿 Eco-Coder 2k26 Certified',
        celebration: {
          confetti: true,
          sound: 'fanfare',
          bioluminescentBloom: true
        }
      });
    } else {
      return res.json({
        success: true,
        isCorrect: false,
        message: 'Not quite! Inspect the arithmetic formula and edge index conditions.',
        hint: 'Remember n = len(nums) + 1. Calculate sum of first n natural numbers.',
        explanation: null
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
