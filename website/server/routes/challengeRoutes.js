import express from 'express';
import {
  getChallenges,
  getChallengeById,
  runChallengeCode,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  duplicateChallenge,
} from '../controllers/challengeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/adminMiddleware.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const router = express.Router();

// Optional auth middleware helper for GET routes
const optionalAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'technodiaz_nature_meets_innovation_super_secret_jwt_key_2026!');
      req.user = await User.findById(decoded.id);
    } catch (e) {
      // ignore
    }
  }
  next();
};

router.get('/', optionalAuth, getChallenges);
router.get('/:id', optionalAuth, getChallengeById);
router.post('/:id/run', protect, runChallengeCode);

// Admin Challenge routes
router.post('/', protect, authorizeAdmin, createChallenge);
router.put('/:id', protect, authorizeAdmin, updateChallenge);
router.delete('/:id', protect, authorizeAdmin, deleteChallenge);
router.post('/:id/duplicate', protect, authorizeAdmin, duplicateChallenge);

export default router;
