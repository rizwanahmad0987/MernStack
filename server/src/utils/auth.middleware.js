import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

export async function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id).select('-passwordHash');
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    req.user = { id: user._id.toString(), name: user.name, email: user.email, isAdmin: user.isAdmin };
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export function adminOnly(req, res, next) {
  if (!req.user?.isAdmin) return res.status(403).json({ message: 'Forbidden' });
  next();
}


