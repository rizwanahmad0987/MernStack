import { Router } from 'express';
import { registerUser, loginUser, getMe, updateProfile } from '../controllers/auth.controller.js';
import { authMiddleware } from '../utils/auth.middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getMe);
router.put('/update-profile', authMiddleware, updateProfile);

export default router;


