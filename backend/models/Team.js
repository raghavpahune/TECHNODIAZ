import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  registrationId: {
    type: String,
    required: true,
    unique: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  eventCategory: {
    type: String,
    required: true,
    enum: [
      'IdeaStorm (Innovation Pitching)',
      'TechCanvas (Web & UI/UX Hackathon)',
      'Mega College Quiz Quest',
      'CodeRelay Hackathon',
      'AI & ML Project Showcase',
      'Cyber Battle (LAN Gaming)',
      'Box Cricket Championship',
      'Futsal Arena',
      'Chess Masters',
      'Badminton Clash',
      'Tug of War'
    ],
  },
  eventType: {
    type: String,
    enum: ['Technical', 'Sports'],
    required: true,
  },
  leaderName: {
    type: String,
    required: true,
  },
  leaderEmail: {
    type: String,
    required: true,
  },
  leaderPhone: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
    default: 'PBCOE Nagpur',
  },
  department: {
    type: String,
    required: true,
    default: 'Computer Science & Engineering',
  },
  yearOfStudy: {
    type: String,
    required: true,
  },
  members: [
    {
      name: { type: String, required: true },
      email: { type: String },
      phone: { type: String },
      role: { type: String, default: 'Member' },
    }
  ],
  verified: {
    type: Boolean,
    default: false,
  },
  verifiedAt: {
    type: Date,
  },
  verifiedBy: {
    type: String,
  },
  qrCodeData: {
    type: String,
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  }
});

export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
