import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Latest Technology', 'AI News', 'Cyber Security', 'Web Development', 'Cloud Computing', 'Green Tech'],
      default: 'Latest Technology',
    },
    readTime: {
      type: String,
      default: '3 min read',
    },
    image: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      default: 'CSE Tech Bulletin',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const News = mongoose.model('News', newsSchema);
