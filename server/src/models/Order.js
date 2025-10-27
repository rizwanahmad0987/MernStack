import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['COD'], default: 'COD' },
    status: { type: String, enum: ['pending', 'confirmed', 'delivered'], default: 'pending' }
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);


