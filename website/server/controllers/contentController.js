import { Announcement } from '../models/Announcement.js';
import { Event } from '../models/Event.js';
import { Project } from '../models/Project.js';
import { News } from '../models/News.js';
import { Achievement } from '../models/Achievement.js';
import { Challenge } from '../models/Challenge.js';
import { User } from '../models/User.js';
import { Submission } from '../models/Submission.js';

// === ANNOUNCEMENTS ===
export const getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find({ active: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: announcements.length, announcements });
  } catch (error) { next(error); }
};

export const createAnnouncement = async (req, res, next) => {
  try {
    const item = await Announcement.create(req.body);
    res.status(201).json({ success: true, message: 'Announcement posted', announcement: item });
  } catch (error) { next(error); }
};

export const deleteAnnouncement = async (req, res, next) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Announcement deleted' });
  } catch (error) { next(error); }
};

// === EVENTS ===
export const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, count: events.length, events });
  } catch (error) { next(error); }
};

export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, message: 'Event created', event });
  } catch (error) { next(error); }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: 'Event updated', event });
  } catch (error) { next(error); }
};

export const deleteEvent = async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Event deleted' });
  } catch (error) { next(error); }
};

// === PROJECTS ===
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, projects });
  } catch (error) { next(error); }
};

export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, message: 'Project added to spotlight', project });
  } catch (error) { next(error); }
};

export const deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Project removed' });
  } catch (error) { next(error); }
};

// === NEWS ===
export const getNews = async (req, res, next) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 });
    res.status(200).json({ success: true, count: news.length, news });
  } catch (error) { next(error); }
};

export const createNews = async (req, res, next) => {
  try {
    const item = await News.create(req.body);
    res.status(201).json({ success: true, message: 'Tech news article published', news: item });
  } catch (error) { next(error); }
};

export const deleteNews = async (req, res, next) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'News item removed' });
  } catch (error) { next(error); }
};

// === ACHIEVEMENTS / STATS ===
export const getAchievements = async (req, res, next) => {
  try {
    let achievements = await Achievement.find().sort({ order: 1 });
    
    // If empty, generate dynamic defaults from current DB counts
    if (!achievements || achievements.length === 0) {
      const studentCount = await User.countDocuments({ role: 'student' });
      const solvedCount = await Submission.countDocuments({ status: 'Accepted' });
      const challengeCount = await Challenge.countDocuments();
      const eventCount = await Event.countDocuments();

      achievements = [
        { key: 'problems_solved', label: 'Problems Solved', value: `${solvedCount > 0 ? solvedCount : 500}+`, icon: 'Code', order: 1 },
        { key: 'participants', label: 'Registered Participants', value: `${studentCount > 0 ? studentCount : 100}+`, icon: 'Users', order: 2 },
        { key: 'projects', label: 'Innovation Projects', value: '25+', icon: 'Cpu', order: 3 },
        { key: 'events', label: 'Tech Fest Events', value: `${eventCount > 0 ? eventCount : 10}+`, icon: 'Calendar', order: 4 },
      ];
    }

    res.status(200).json({ success: true, achievements });
  } catch (error) { next(error); }
};

export const updateAchievement = async (req, res, next) => {
  try {
    const { key, label, value, icon } = req.body;
    const item = await Achievement.findOneAndUpdate(
      { key },
      { label, value, icon },
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, message: 'Achievement metric updated', achievement: item });
  } catch (error) { next(error); }
};
