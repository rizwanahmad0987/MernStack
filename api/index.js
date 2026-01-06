import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createApp, connectDB } from '../server/src/app.js';

dotenv.config();

const app = createApp();

export default async function handler(req, res) {
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
      console.log('MongoDB connected (serverless)');
    } catch (err) {
      console.error('MongoDB connection failed (serverless):', err);
    }
  }
  return app(req, res);
}

