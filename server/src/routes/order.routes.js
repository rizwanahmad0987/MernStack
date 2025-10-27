import { Router } from 'express';
import { createOrder, getMyOrders, listAllOrders } from '../controllers/order.controller.js';
import { authMiddleware, adminOnly } from '../utils/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createOrder);
router.get('/me', authMiddleware, getMyOrders);
router.get('/', authMiddleware, adminOnly, listAllOrders);

export default router;


