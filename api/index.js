import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createApp, connectDB } from '../server/src/app.js';
import { ensureAdminUser } from '../server/src/utils/admin.seed.js';

dotenv.config();

const app = createApp();

export default async function handler(req, res) {
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
      console.log('MongoDB connected (serverless)');
      await ensureAdminUser();
    } catch (err) {
      console.error('MongoDB connection failed (serverless):', err);
      return res.status(500).json({ 
        message: 'Database connection failed', 
        error: err.message 
      });
    }
  }
  return app(req, res);
}

