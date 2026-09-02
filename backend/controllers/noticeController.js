import { Notice } from '../models/Notice.js';
import { isMongoConnected, fallbackDB } from '../config/db.js';

export const getNotices = async (req, res) => {
  try {
    let list = [];
    if (isMongoConnected) {
      list = await Notice.find().sort({ createdAt: -1 });
    } else {
      list = [...fallbackDB.data.notices].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return res.json({ success: true, notices: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createNotice = async (req, res) => {
  try {
    const { title, content, category, isUrgent, author } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required.' });
    }

    const noticeData = {
      id: `notice_${Date.now()}`,
      title,
      content,
      category: category || 'General',
      isUrgent: Boolean(isUrgent),
      author: author || req.admin?.name || 'CSE Committee',
      createdAt: new Date()
    };

    if (isMongoConnected) {
      const newNotice = new Notice(noticeData);
      await newNotice.save();
    } else {
      fallbackDB.data.notices.unshift(noticeData);
      fallbackDB.saveToFile();
    }

    return res.status(201).json({ success: true, message: 'Notice posted to dynamic board!', notice: noticeData });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      await Notice.findByIdAndDelete(id);
    } else {
      fallbackDB.data.notices = fallbackDB.data.notices.filter(n => n.id !== id && n._id !== id);
      fallbackDB.saveToFile();
    }
    return res.json({ success: true, message: 'Notice removed.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
