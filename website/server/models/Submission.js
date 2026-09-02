import mongoose from 'mongoose';

const testResultSchema = new mongoose.Schema(
  {
    testCaseIndex: Number,
    passed: Boolean,
    input: String,
    expectedOutput: String,
    actualOutput: String,
    executionTimeMs: Number,
    memoryKb: Number,
    error: String,
  },
  { _id: false }
);

const submissionSchema = new mongoose.Schema(
  {
    submissionId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
      required: true,
    },
    submissionType: {
      type: String,
      enum: ['CODE', 'TEXT', 'MCQ'],
      default: 'CODE',
    },
    language: {
      type: String,
      default: 'cpp',
    },
    code: {
      type: String,
      default: '',
    },
    answer: {
      type: String,
      default: '',
    },
    selectedOption: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Accepted', 'Wrong Answer', 'Partially Correct', 'Pending', 'Rejected'],
      default: 'Pending',
    },
    score: {
      type: Number,
      default: 0,
    },
    maxScore: {
      type: Number,
      default: 10,
    },
    feedback: {
      type: String,
      default: '',
    },
    executionResults: [testResultSchema],
    compilationStatus: {
      type: String,
      default: 'Submitted',
    },
    executionTime: {
      type: String,
      default: '',
    },
    memoryUsed: {
      type: String,
      default: '',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    evaluatedAt: {
      type: Date,
    },
    evaluatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const Submission = mongoose.model('Submission', submissionSchema);
