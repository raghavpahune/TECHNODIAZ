import express from 'express';
import {
  registerTeam,
  getTeams,
  getTeamByRegId,
  verifyTeamQR,
  toggleVerificationStatus
} from '../controllers/teamController.js';
import { getNotices, createNotice, deleteNotice } from '../controllers/noticeController.js';
import { getTechNews } from '../controllers/newsController.js';
import { getChallenges, verifyChallenge } from '../controllers/challengeController.js';
import { adminLogin, getAdminStats, getAdminList } from '../controllers/adminController.js';
import { verifyAdminAuth } from '../middleware/auth.js';

const router = express.Router();

// Public Team Registration & Verification
router.post('/register', registerTeam);
router.get('/teams', getTeams);
router.get('/teams/:regId', getTeamByRegId);

// QR Verification (Can be called with admin token or with verifier details)
router.post('/verify-qr', verifyTeamQR);
router.patch('/teams/:id/toggle-verify', verifyAdminAuth, toggleVerificationStatus);

// Notices & Live Ticker
router.get('/notices', getNotices);
router.post('/notices', verifyAdminAuth, createNotice);
router.delete('/notices/:id', verifyAdminAuth, deleteNotice);

// Tech News
router.get('/tech-news', getTechNews);

// Daily Coding Challenge
router.get('/coding-challenge', getChallenges);
router.post('/coding-challenge/verify', verifyChallenge);

// Admin Portal Endpoints
router.post('/admin/login', adminLogin);
router.get('/admin/stats', verifyAdminAuth, getAdminStats);
router.get('/admin/list', getAdminList);

export default router;
