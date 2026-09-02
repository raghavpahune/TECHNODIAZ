import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    mobile: {
      type: String,
      required: [true, 'Please provide a mobile number'],
      trim: true,
    },
    college: {
      type: String,
      required: [true, 'Please provide college name'],
      default: 'PBCOE',
      trim: true,
    },
    branch: {
      type: String,
      required: [true, 'Please provide branch/department'],
      default: 'Computer Science & Engineering',
      trim: true,
    },
    year: {
      type: String,
      required: [true, 'Please provide academic year'],
      enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Faculty', 'Other'],
      default: '3rd Year',
    },
    rollNumber: {
      type: String,
      required: [true, 'Please provide student roll number'],
      trim: true,
    },
    teamName: {
      type: String,
      trim: true,
      default: '',
    },
    teamMembers: {
      type: String,
      trim: true,
      default: '',
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    score: {
      type: Number,
      default: 0,
    },
    solvedCount: {
      type: Number,
      default: 0,
    },
    attemptedCount: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', userSchema);
