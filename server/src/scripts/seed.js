import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Product from '../models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_webstore';

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  await Promise.all([User.deleteMany({}), Product.deleteMany({})]);

  const admin = await User.create({
    name: 'Admin',
    email: 'admin@example.com',
    passwordHash: await bcrypt.hash('admin123', 10),
    isAdmin: true
  });

  const products = [
    // Electronics Category
    { 
      name: 'Ultra HD Smart TV', 
      description: 'Experience stunning 4K resolution with this 55-inch smart TV featuring HDR technology and built-in streaming apps.',
      price: 699.99, 
      category: 'Electronics', 
      inStock: 15, 
      imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      onSale: true
    },
    { 
      name: 'Wireless Noise-Cancelling Headphones', 
      description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality.',
      price: 249.99, 
      category: 'Electronics', 
      inStock: 25, 
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Professional DSLR Camera', 
      description: '24.2MP full-frame sensor, 4K video recording, and advanced autofocus system for professional-quality photography.',
      price: 1299.99, 
      category: 'Electronics', 
      inStock: 8, 
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Smartwatch Pro', 
      description: 'Track your fitness, receive notifications, and monitor your health with this water-resistant smartwatch with a 3-day battery life.',
      price: 199.99, 
      category: 'Electronics', 
      inStock: 30, 
      imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Portable Bluetooth Speaker', 
      description: 'Waterproof speaker with 360° sound, 20-hour playtime, and built-in microphone for hands-free calling.',
      price: 89.99, 
      category: 'Electronics', 
      inStock: 40, 
      imageUrl: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      onSale: true
    },
    
    // Clothing Category
    { 
      name: 'Classic Denim Jacket', 
      description: 'Timeless denim jacket with a comfortable fit, perfect for layering in any season.',
      price: 59.99, 
      category: 'Clothing', 
      inStock: 50, 
      imageUrl: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Premium Cotton T-Shirt', 
      description: 'Soft, breathable 100% organic cotton t-shirt with a modern fit and reinforced stitching.',
      price: 24.99, 
      category: 'Clothing', 
      inStock: 100, 
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Slim Fit Chino Pants', 
      description: 'Versatile chino pants with a slim fit, made from stretch cotton for all-day comfort.',
      price: 49.99, 
      category: 'Clothing', 
      inStock: 45, 
      imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Wool Blend Overcoat', 
      description: 'Elegant winter coat with a wool blend outer shell, full lining, and classic lapel collar.',
      price: 149.99, 
      category: 'Clothing', 
      inStock: 20, 
      imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      onSale: true
    },
    { 
      name: 'Athletic Performance Hoodie', 
      description: 'Moisture-wicking hoodie with thermal regulation technology, perfect for workouts or casual wear.',
      price: 54.99, 
      category: 'Clothing', 
      inStock: 60, 
      imageUrl: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    
    // Shoes Category
    { 
      name: 'Classic Runner', 
      description: 'Comfortable running shoes with responsive cushioning and breathable mesh upper.',
      price: 79.99, 
      category: 'Shoes', 
      inStock: 35, 
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Trail Blazer', 
      description: 'Rugged trail shoes with aggressive tread pattern and waterproof membrane for all-terrain adventures.',
      price: 99.99, 
      category: 'Shoes', 
      inStock: 25, 
      imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'City Sneaker', 
      description: 'Casual everyday sneakers with memory foam insoles and durable construction.',
      price: 64.99, 
      category: 'Shoes', 
      inStock: 40, 
      imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Leather Oxford Dress Shoes', 
      description: 'Handcrafted genuine leather dress shoes with Goodyear welt construction for years of wear.',
      price: 129.99, 
      category: 'Shoes', 
      inStock: 15, 
      imageUrl: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Canvas Slip-Ons', 
      description: 'Lightweight slip-on shoes with canvas upper and flexible rubber sole, perfect for summer.',
      price: 39.99, 
      category: 'Shoes', 
      inStock: 50, 
      imageUrl: 'https://images.unsplash.com/photo-1465453869711-7e174808ace9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      onSale: true
    },
    
    // Home Category
    { 
      name: 'Ergonomic Office Chair', 
      description: 'Adjustable office chair with lumbar support, breathable mesh back, and padded armrests.',
      price: 199.99, 
      category: 'Home', 
      inStock: 12, 
      imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Ceramic Dinnerware Set', 
      description: '16-piece dinnerware set including plates, bowls, and mugs in a modern minimalist design.',
      price: 89.99, 
      category: 'Home', 
      inStock: 20, 
      imageUrl: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Smart Home Hub', 
      description: 'Control your smart home devices with voice commands through this compact smart hub with built-in speaker.',
      price: 129.99, 
      category: 'Home', 
      inStock: 30, 
      imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      onSale: true
    },
    { 
      name: 'Luxury Bedding Set', 
      description: '100% Egyptian cotton 400 thread count bedding set including duvet cover, fitted sheet, and pillowcases.',
      price: 149.99, 
      category: 'Home', 
      inStock: 25, 
      imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Stainless Steel Cookware Set', 
      description: '10-piece tri-ply stainless steel cookware set with tempered glass lids and stay-cool handles.',
      price: 249.99, 
      category: 'Home', 
      inStock: 10, 
      imageUrl: 'https://images.unsplash.com/photo-1584990347449-716dc5a82dd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    
    // Books Category
    { 
      name: 'The Art of Innovation', 
      description: 'Bestselling business book on creative thinking and product development by renowned author.',
      price: 24.99, 
      category: 'Books', 
      inStock: 45, 
      imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Modern Cooking Techniques', 
      description: 'Comprehensive cookbook featuring 200+ recipes and modern cooking methods with step-by-step instructions.',
      price: 34.99, 
      category: 'Books', 
      inStock: 30, 
      imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'World History Encyclopedia', 
      description: 'Richly illustrated hardcover encyclopedia covering human history from ancient civilizations to modern times.',
      price: 49.99, 
      category: 'Books', 
      inStock: 15, 
      imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'The Mindful Investor', 
      description: 'Guide to personal finance and investment strategies with a focus on long-term wealth building.',
      price: 19.99, 
      category: 'Books', 
      inStock: 50, 
      imageUrl: 'https://images.unsplash.com/photo-1554495439-e1743a275b07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      onSale: true
    },
    { 
      name: 'Science Fiction Anthology', 
      description: 'Collection of award-winning short stories from the best contemporary science fiction authors.',
      price: 22.99, 
      category: 'Books', 
      inStock: 35, 
      imageUrl: 'https://images.unsplash.com/photo-1531072901881-d644216d4bf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    
    // Sports Category
    { 
      name: 'Yoga Mat Premium', 
      description: 'Eco-friendly non-slip yoga mat with alignment markers and extra cushioning for joint protection.',
      price: 45.99, 
      category: 'Sports', 
      inStock: 40, 
      imageUrl: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Mountain Bike', 
      description: 'All-terrain mountain bike with 21-speed Shimano gears, front suspension, and disc brakes.',
      price: 599.99, 
      category: 'Sports', 
      inStock: 8, 
      imageUrl: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Tennis Racket Pro', 
      description: 'Professional-grade tennis racket with carbon fiber frame and optimal string tension for power and control.',
      price: 159.99, 
      category: 'Sports', 
      inStock: 20, 
      imageUrl: 'https://images.unsplash.com/photo-1617083934555-5a7e7877ad1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      onSale: true
    },
    { 
      name: 'Adjustable Dumbbell Set', 
      description: 'Space-saving adjustable dumbbells that replace 15 sets of weights, adjustable from 5 to 52.5 pounds.',
      price: 299.99, 
      category: 'Sports', 
      inStock: 15, 
      imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Insulated Water Bottle', 
      description: 'Double-wall vacuum insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
      price: 29.99, 
      category: 'Sports', 
      inStock: 60, 
      imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    }
  ];

  await Product.insertMany(products);

  console.log('Seed complete. Admin login: admin@example.com / admin123');
  await mongoose.disconnect();
}

run().catch(async (e) => {
  console.error(e);
  await mongoose.disconnect();
  process.exit(1);
});


