import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/technodiaz2k26';
  
  try {
    console.log(`[DB] Attempting connection to MongoDB at: ${uri}`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log('[DB] Successfully connected to External/Local MongoDB instance.');
  } catch (err) {
    console.warn(`[DB] Local MongoDB connection failed (${err.message}). Starting Embedded in-memory MongoDB Server...`);
    try {
      mongod = await MongoMemoryServer.create();
      const memUri = mongod.getUri();
      console.log(`[DB] Embedded MongoDB initialized at: ${memUri}`);
      await mongoose.connect(memUri);
      console.log('[DB] Connected to Embedded MongoDB Server successfully.');
    } catch (memErr) {
      console.error('[DB] Fatal error initializing MongoDB:', memErr);
      process.exit(1);
    }
  }
};

export const closeDB = async () => {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
};
