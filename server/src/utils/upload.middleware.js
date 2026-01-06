import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY || process.env.API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET || process.env.API_SECRET;
const hasCloudinaryURL = !!process.env.CLOUDINARY_URL;
const useCloudinary = !!cloudName || hasCloudinaryURL;

if (useCloudinary) {
  if (hasCloudinaryURL && !cloudName) {
    cloudinary.config({ secure: true });
  } else {
    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
  }
}

// Ensure upload directory exists for local storage
const uploadDir = path.join(__dirname, '../../public/uploads/products');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// File filter: allow any image/* mimetype (jpeg, png, gif, webp, svg, etc.)
const fileFilter = (_req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'), false)
  }
};

// Storage configuration
const storage = useCloudinary 
  ? multer.memoryStorage() 
  : multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'product-' + uniqueSuffix + ext);
      }
    });

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Increased to 10MB
  },
  fileFilter: fileFilter
}).array('images', 5);

export function handleUpload(req, res, next) {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Image upload failed', error: err.message });
    }

    if (useCloudinary && req.files && req.files.length > 0) {
      try {
        const folder = process.env.CLOUDINARY_FOLDER || 'mern-webstore/products';
        const uploadOne = (file) => new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          });
          stream.end(file.buffer);
        });

        const urls = await Promise.all(req.files.map(uploadOne));
        req.uploadedImageUrls = urls;
      } catch (e) {
        return res.status(400).json({ message: 'Cloud upload failed', error: e.message });
      }
    }

    next();
  });
}

// Helper to get the URL path for uploaded files
export function getImageUrl(filename) {
  return `/uploads/products/${filename}`;
}
