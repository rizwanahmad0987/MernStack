import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }
    });
  } catch (e) {
    res.status(500).json({ message: 'Registration failed' });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (e) {
    res.status(500).json({ message: 'Login failed' });
  }
}

export async function getMe(req, res) {
  res.json({ user: req.user });
}

export async function updateProfile(req, res) {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if email is already in use by another user
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already in use by another account' });
      }
    }
    
    // Update basic info
    user.name = name || user.name;
    user.email = email || user.email;
    
    // Handle password change if requested
    if (newPassword) {
      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
      
      // Hash and set new password
      user.passwordHash = await bcrypt.hash(newPassword, 10);
    }
    
    // Save updated user
    await user.save();
    
    // Generate new token with updated info
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
    
    // Return updated user info and new token
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
}


