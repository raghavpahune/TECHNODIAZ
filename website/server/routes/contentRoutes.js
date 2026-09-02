import express from 'express';
import {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getProjects,
  createProject,
  deleteProject,
  getNews,
  createNews,
  deleteNews,
  getAchievements,
  updateAchievement,
} from '../controllers/contentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Announcements
router.get('/announcements', getAnnouncements);
router.post('/announcements', protect, authorizeAdmin, createAnnouncement);
router.delete('/announcements/:id', protect, authorizeAdmin, deleteAnnouncement);

// Events
router.get('/events', getEvents);
router.post('/events', protect, authorizeAdmin, createEvent);
router.put('/events/:id', protect, authorizeAdmin, updateEvent);
router.delete('/events/:id', protect, authorizeAdmin, deleteEvent);

// Projects
router.get('/projects', getProjects);
router.post('/projects', protect, authorizeAdmin, createProject);
router.delete('/projects/:id', protect, authorizeAdmin, deleteProject);

// News
router.get('/news', getNews);
router.post('/news', protect, authorizeAdmin, createNews);
router.delete('/news/:id', protect, authorizeAdmin, deleteNews);

// Achievements
router.get('/achievements', getAchievements);
router.put('/achievements', protect, authorizeAdmin, updateAchievement);

export default router;
