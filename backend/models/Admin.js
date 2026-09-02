import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ['SuperAdmin', 'Admin', 'Verifier'],
    default: 'Admin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
