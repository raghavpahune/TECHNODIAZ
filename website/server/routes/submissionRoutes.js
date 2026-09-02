import express from 'express';
import {
  createSubmission,
  getMySubmissions,
  getSubmissionById,
  getAllSubmissions,
  evaluateSubmission,
} from '../controllers/submissionController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/', protect, createSubmission);
router.get('/my', protect, getMySubmissions);
router.get('/:id', protect, getSubmissionById);

// Admin submission endpoints
router.get('/admin/all', protect, authorizeAdmin, getAllSubmissions);
router.put('/admin/:id/evaluate', protect, authorizeAdmin, evaluateSubmission);

export default router;
