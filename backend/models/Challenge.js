import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy',
  },
  language: {
    type: String,
    default: 'Python',
  },
  codeSnippet: {
    type: String,
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      label: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    }
  ],
  explanation: {
    type: String,
    required: true,
  },
  rewardPoints: {
    type: Number,
    default: 100,
  }
});

export const Challenge = mongoose.models.Challenge || mongoose.model('Challenge', challengeSchema);
