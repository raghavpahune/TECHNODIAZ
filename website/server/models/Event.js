import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'Technical',
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    registrationLink: {
      type: String,
      default: '',
    },
    coordinator: {
      type: String,
      default: 'Dept. of CSE',
    },
    prizePool: {
      type: String,
      default: 'Exciting Cash Prizes & Certificates',
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed'],
      default: 'upcoming',
    },
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model('Event', eventSchema);
