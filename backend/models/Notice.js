import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['General', 'Technical', 'Sports', 'Urgent', 'Workshops', 'Results'],
    default: 'General',
  },
  isUrgent: {
    type: Boolean,
    default: false,
  },
  author: {
    type: String,
    default: 'CSE TechFest Committee',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const Notice = mongoose.models.Notice || mongoose.model('Notice', noticeSchema);
