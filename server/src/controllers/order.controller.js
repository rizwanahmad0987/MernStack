import Order from '../models/Order.js';
import Product from '../models/Product.js';

export async function createOrder(req, res) {
  try {
    const { items } = req.body; // [{ productId, quantity }]
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'No items' });

    const populated = [];
    let total = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(400).json({ message: 'Invalid product' });
      const qty = Math.max(1, Number(item.quantity || 1));
      if (product.inStock < qty) return res.status(400).json({ message: 'Insufficient stock' });
      populated.push({ product: product._id, name: product.name, price: product.price, quantity: qty });
      total += product.price * qty;
    }

    const order = await Order.create({ user: req.user.id, items: populated, total, paymentMethod: 'COD' });

    // decrement stock and increment sold counters
    for (const p of populated) {
      await Product.findByIdAndUpdate(p.product, { $inc: { inStock: -p.quantity, sold: p.quantity } });
    }

    res.status(201).json(order);
  } catch (e) {
    res.status(500).json({ message: 'Order failed' });
  }
}

export async function getMyOrders(req, res) {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
}

export async function listAllOrders(_req, res) {
  const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'name email');
  res.json(orders);
}


