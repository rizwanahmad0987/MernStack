import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    imageUrl: { type: String, default: '' }, // Keep for backward compatibility
    images: { type: [String], default: [] }, // Array of image URLs
    category: { type: String, index: true },
    inStock: { type: Number, default: 0 },
    onSale: { type: Boolean, default: false },
    sold: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);


