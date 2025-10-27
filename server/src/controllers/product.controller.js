import Product from '../models/Product.js';
import mongoose from 'mongoose';

export async function listProducts(req, res) {
  try {
    const { category, q } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (q) filter.name = { $regex: q, $options: 'i' };
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    console.error('Error listing products:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getCategories(req, res) {
  try {
    const categories = await Product.distinct('category');
    res.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getProduct(req, res) {
  try {
    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function createProduct(req, res) {
  try {
    // Handle image files if they exist
    const productData = { ...req.body };
    
    // Initialize images array
    let imageUrls = [];
    
    // Add uploaded image files to the images array
    if (req.files && req.files.length > 0) {
      // Create URLs for the uploaded images
      const uploadedImageUrls = req.files.map(file => `/uploads/products/${file.filename}`);
      imageUrls = [...imageUrls, ...uploadedImageUrls];
    }
    
    // Add image URLs from the request body if they exist
    if (req.body.imageUrls) {
      try {
        // Parse the JSON string of image URLs
        const parsedUrls = JSON.parse(req.body.imageUrls);
        if (Array.isArray(parsedUrls)) {
          imageUrls = [...imageUrls, ...parsedUrls];
        }
      } catch (error) {
        console.error('Error parsing imageUrls:', error);
      }
    }
    
    // Set the images array in the product data
    if (imageUrls.length > 0) {
      productData.images = imageUrls;
      
      // Set the first image as the main imageUrl for backward compatibility
      productData.imageUrl = imageUrls[0];
    }

    // Create the product with the updated data
    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (e) {
    console.error('Error creating product:', e);
    res.status(400).json({ message: 'Create failed', error: e.message });
  }
}

export async function updateProduct(req, res) {
  try {
    // Get the current product to preserve existing images if no new ones are uploaded
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) return res.status(404).json({ message: 'Not found' });
    
    // Prepare update data
    const updateData = { ...req.body };
    
    // Initialize new image URLs array
    let newImageUrls = [];
    
    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      // Create URLs for the uploaded images
      const uploadedImageUrls = req.files.map(file => `/uploads/products/${file.filename}`);
      newImageUrls = [...newImageUrls, ...uploadedImageUrls];
    }
    
    // Handle image URLs from the request body
    if (req.body.imageUrls) {
      try {
        // Parse the JSON string of image URLs
        const parsedUrls = JSON.parse(req.body.imageUrls);
        if (Array.isArray(parsedUrls)) {
          newImageUrls = [...newImageUrls, ...parsedUrls];
        }
      } catch (error) {
        console.error('Error parsing imageUrls:', error);
      }
    }
    
    // Only update images if we have new ones
    if (newImageUrls.length > 0) {
      // Decide how to handle images based on request
      if (req.body.replaceAllImages === 'true') {
        // Replace all images
        updateData.images = newImageUrls;
      } else {
        // Append to existing images
        updateData.images = [...(existingProduct.images || []), ...newImageUrls];
      }
      
      // Update main imageUrl if needed
      if (!existingProduct.imageUrl || req.body.updateMainImage === 'true') {
        updateData.imageUrl = newImageUrls[0];
      }
    }

    // Update the product
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(product);
  } catch (e) {
    console.error('Error updating product:', e);
    res.status(400).json({ message: 'Update failed', error: e.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(400).json({ message: 'Delete failed' });
  }
}


