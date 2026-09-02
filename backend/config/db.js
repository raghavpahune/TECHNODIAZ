import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export let isMongoConnected = false;

// In-memory fallback database with file persistence
class FallbackDB {
  constructor() {
    this.data = {
      teams: [],
      notices: [],
      challenges: [],
      admins: [],
      techNewsCache: {
        timestamp: 0,
        articles: []
      }
    };
    this.loadFromFile();
  }

  loadFromFile() {
    try {
      if (fs.existsSync(STORE_FILE)) {
        const raw = fs.readFileSync(STORE_FILE, 'utf-8');
        this.data = { ...this.data, ...JSON.parse(raw) };
      }
    } catch (err) {
      console.warn('[FallbackDB] Could not read store.json, using defaults', err.message);
    }
  }

  saveToFile() {
    try {
      fs.writeFileSync(STORE_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[FallbackDB] Error saving store.json', err.message);
    }
  }
}

export const fallbackDB = new FallbackDB();

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/technodiaz';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected successfully to ${conn.connection.host}`);
  } catch (err) {
    isMongoConnected = false;
    console.log(`[Database] MongoDB offline or not found (${err.message}). Seamlessly activated Hybrid Persistent Storage Engine.`);
  }
};
