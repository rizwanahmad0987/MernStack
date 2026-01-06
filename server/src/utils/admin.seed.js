import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export async function ensureAdminUser() {
  try {
    const adminExists = await User.findOne({ isAdmin: true });
    if (!adminExists) {
      console.log('No admin user found. Creating default admin...');
      const passwordHash = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin',
        email: 'admin@example.com',
        passwordHash,
        isAdmin: true
      });
      console.log('Default admin created: admin@example.com / admin123');
    }
  } catch (error) {
    console.error('Error checking/creating admin user:', error);
  }
}
