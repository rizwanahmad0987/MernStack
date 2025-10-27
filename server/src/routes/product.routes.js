import { Router } from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
  getProduct,
  getCategories
} from '../controllers/product.controller.js';
import { authMiddleware, adminOnly } from '../utils/auth.middleware.js';
import { uploadProductImages } from '../utils/upload.middleware.js';

const router = Router();

// Handle file upload errors
const handleUpload = (req, res, next) => {
  uploadProductImages(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'Image upload failed', error: err.message });
    }
    next();
  });
};

router.get('/', listProducts);
router.get('/categories', getCategories);
router.get('/:id', getProduct);
router.post('/', authMiddleware, adminOnly, handleUpload, createProduct);
router.put('/:id', authMiddleware, adminOnly, handleUpload, updateProduct);
router.delete('/:id', authMiddleware, adminOnly, deleteProduct);

export default router;


