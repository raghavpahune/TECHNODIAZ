import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB, isMongoConnected, fallbackDB } from './config/db.js';
import { getSeedData } from './data/seedData.js';
import { Admin } from './models/Admin.js';
import { Notice } from './models/Notice.js';
import { Challenge } from './models/Challenge.js';
import { Team } from './models/Team.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Seed Initial Data
const initializeSeedData = async () => {
  const seed = getSeedData();

  if (isMongoConnected) {
    try {
      const adminCount = await Admin.countDocuments();
      if (adminCount === 0) {
        console.log('[Seed] Seeding MongoDB with initial Technodiaz data...');
        await Admin.insertMany(seed.admins);
        await Notice.insertMany(seed.notices);
        await Challenge.insertMany(seed.challenges);
        await Team.insertMany(seed.teams);
        console.log('[Seed] MongoDB initialization complete.');
      }
    } catch (err) {
      console.error('[Seed Error]', err.message);
    }
  } else {
    // Populate fallback DB if empty
    if (!fallbackDB.data.admins || fallbackDB.data.admins.length === 0) {
      console.log('[Seed] Populating storage engine with initial Technodiaz data...');
      fallbackDB.data.admins = seed.admins;
      fallbackDB.data.notices = seed.notices;
      fallbackDB.data.challenges = seed.challenges;
      fallbackDB.data.teams = seed.teams;
      fallbackDB.saveToFile();
      console.log('[Seed] Local storage initialization complete.');
    }
  }
};

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    event: 'TECHNODIAZ 2k26',
    college: 'PBCOE Nagpur - Department of Computer Science & Engineering',
    theme: 'Where Nature Meets Innovation',
    dbConnected: isMongoConnected,
    timestamp: new Date().toISOString()
  });
});

// Start Server
const startServer = async () => {
  await connectDB();
  await initializeSeedData();

  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🌿 TECHNODIAZ 2k26 Backend API Server Running`);
    console.log(`📍 Port: http://localhost:${PORT}`);
    console.log(`🏛️ PBCOE CSE Department | Nature Meets Innovation`);
    console.log(`====================================================`);
  });
};

startServer();
