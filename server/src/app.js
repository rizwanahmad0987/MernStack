import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import devRoutes from './routes/dev.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();

  app.set('etag', false);
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });

  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/debug', async (_req, res) => {
    try {
      // Use mongoose.models to avoid recompiling models or missing schema errors
      // if models haven't been registered yet, this might fail, but since routes are imported above, it should be fine.
      const User = mongoose.models.User;
      const Product = mongoose.models.Product;
      
      const admin = User ? await User.findOne({ email: 'admin@example.com' }) : null;
      const productCount = Product ? await Product.countDocuments() : 0;
      
      res.json({
        status: 'ok',
        mongoState: mongoose.connection.readyState,
        env: {
          MONGO_URI: process.env.MONGO_URI ? 'Set' : 'Not Set',
          JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not Set'
        },
        data: {
          adminExists: !!admin,
          productCount,
          modelsLoaded: {
            User: !!User,
            Product: !!Product
          }
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error', 
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);

  if (process.env.ENABLE_DEV_SEED === 'true') {
    app.use('/api/dev', devRoutes);
  }

  return app;
}

export async function connectDB() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_webstore';
  const maskedURI = MONGO_URI.includes('@') 
    ? MONGO_URI.replace(/:([^:@]+)@/, ':****@') 
    : MONGO_URI;
  console.log('Attempting to connect to MongoDB at:', maskedURI);
  try {
    // Add connection options for better stability in serverless
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Fail fast if connection is bad
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Do NOT exit process in serverless/Vercel environment
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
    throw error; // Re-throw to be caught by handler
  }
}
