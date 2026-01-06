import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Product from '../models/Product.js';

const router = Router();

router.post('/init', async (req, res) => {
  const key = req.headers['x-seed-key'] || '';
  if (!key || key !== (process.env.JWT_SECRET || '')) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    let admin = await User.findOne({ email: 'admin@example.com' });
    if (!admin) {
      admin = await User.create({
        name: 'Admin',
        email: 'admin@example.com',
        passwordHash: await bcrypt.hash('admin123', 10),
        isAdmin: true
      });
    } else if (!admin.isAdmin) {
      admin.isAdmin = true;
      await admin.save();
    }

    const count = await Product.countDocuments();
    if (count === 0) {
      const base = [
        {
          name: 'Classic Runner',
          description: 'Comfortable running shoes with breathable mesh upper',
          price: 79.99,
          category: 'Shoes',
          inStock: 35,
          imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
        },
        {
          name: 'Wireless Headphones',
          description: 'Noise-cancelling over-ear headphones with 30h battery',
          price: 249.99,
          category: 'Electronics',
          inStock: 25,
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
        },
        {
          name: 'Denim Jacket',
          description: 'Timeless denim jacket with comfortable fit',
          price: 59.99,
          category: 'Clothing',
          inStock: 50,
          imageUrl: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=800&q=80'
        }
      ];
      await Product.insertMany(base);
    }

    res.json({ message: 'Initialized', admin: { email: 'admin@example.com' } });
  } catch (e) {
    console.error('Dev init failed:', e);
    res.status(500).json({ message: 'Init failed' });
  }
});

export default router;

