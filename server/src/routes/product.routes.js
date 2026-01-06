import { Router } from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
  getProduct,
  getCategories,
  deleteAllProducts
} from '../controllers/product.controller.js';
import { authMiddleware, adminOnly } from '../utils/auth.middleware.js';
import { handleUpload } from '../utils/upload.middleware.js';

const router = Router();

// Upload handler is provided by middleware

router.get('/', listProducts);
router.get('/categories', getCategories);
router.get('/:id', getProduct);
router.post('/', authMiddleware, adminOnly, handleUpload, createProduct);
router.put('/:id', authMiddleware, adminOnly, handleUpload, updateProduct);
router.delete('/:id', authMiddleware, adminOnly, deleteProduct);
router.delete('/', authMiddleware, adminOnly, deleteAllProducts);

export default router;
