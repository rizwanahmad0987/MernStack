import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createApp, connectDB } from './app.js';

dotenv.config();

const app = createApp();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_webstore';
const PORT = process.env.PORT || 5000;

async function start() {
  const MAX_RETRIES = 5;
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await connectDB();
      console.log('MongoDB connected');
      app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
      return;
    } catch (err) {
      retries++;
      console.log(`Failed to connect to MongoDB (attempt ${retries}/${MAX_RETRIES}). Retrying in 5 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  console.error('Failed to connect to MongoDB after multiple attempts. Exiting.');
  process.exit(1);
}

start();

