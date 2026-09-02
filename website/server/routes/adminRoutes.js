import express from 'express';
import {
  getAdminStatistics,
  getAllStudents,
  deleteStudent,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorizeAdmin);

router.get('/statistics', getAdminStatistics);
router.get('/students', getAllStudents);
router.delete('/students/:id', deleteStudent);

export default router;
