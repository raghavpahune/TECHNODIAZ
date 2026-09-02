import mongoose from 'mongoose';

const exampleSchema = new mongoose.Schema(
  {
    input: { type: String, default: '' },
    output: { type: String, default: '' },
    explanation: { type: String, default: '' },
  },
  { _id: false }
);

const testCaseSchema = new mongoose.Schema(
  {
    input: { type: String, default: '' },
    expectedOutput: { type: String, default: '' },
    isHidden: { type: Boolean, default: false },
  },
  { _id: false }
);

const mcqOptionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true }, // 'A', 'B', 'C', 'D'
    text: { type: String, required: true },
  },
  { _id: false }
);

const challengeSchema = new mongoose.Schema(
  {
    challengeId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide challenge title'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Logic', 'Arrays', 'Algorithms', 'Data Structures', 'Green Tech', 'AI/ML', 'General'],
      default: 'Logic',
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Easy',
    },
    points: {
      type: Number,
      required: true,
      default: 10,
    },
    timeLimit: {
      type: String,
      default: '30 mins',
    },
    submissionType: {
      type: String,
      enum: ['CODE', 'TEXT', 'MCQ'],
      default: 'CODE',
    },
    description: {
      type: String,
      required: true,
    },
    problemStatement: {
      type: String,
      required: true,
    },
    inputFormat: {
      type: String,
      default: '',
    },
    outputFormat: {
      type: String,
      default: '',
    },
    constraints: {
      type: String,
      default: '',
    },
    examples: [exampleSchema],
    testCases: [testCaseSchema],
    // For MCQ challenges
    mcqQuestion: {
      type: String,
      default: '',
    },
    mcqOptions: [mcqOptionSchema],
    mcqCorrectAnswer: {
      type: String, // 'A', 'B', 'C', 'D'
      select: false, // Protected from student view
    },
    allowedLanguages: {
      type: [String],
      default: ['c', 'cpp', 'java', 'python', 'javascript'],
    },
    starterCode: {
      c: { type: String, default: '#include <stdio.h>\n\nint main() {\n    // Write solution\n    return 0;\n}' },
      cpp: { type: String, default: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write solution\n    return 0;\n}' },
      java: { type: String, default: 'import java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Write solution\n    }\n}' },
      python: { type: String, default: '# Write your solution below\nimport sys\n\ndef solve():\n    pass\n\nif __name__ == "__main__":\n    solve()\n' },
      javascript: { type: String, default: '// Write your solution below\nfunction solve(input) {\n    // TODO: implement\n}\n' },
    },
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
      default: 'published',
    },
    solveCount: {
      type: Number,
      default: 0,
    },
    submissionCount: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Challenge = mongoose.model('Challenge', challengeSchema);
