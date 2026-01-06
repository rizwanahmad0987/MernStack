import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import { useCart } from '../contexts/CartContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

const fetcher = url => fetch(url, { cache: 'no-store' }).then(res => {
  if (res.status === 304) return { products: [] }
  if (!res.ok) throw new Error('Failed to load')
  return res.json()
})

export default function HomePage() {
  const [category, setCategory] = useState('')
  const [q, setQ] = useState('')
  const { addToCart } = useCart()

  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (q) params.set('q', q)
  
  const { data, error, isLoading } = useSWR(`/api/products?${params.toString()}`, fetcher, {
    refreshInterval: 3000 // Poll every 3 seconds for real-time updates
  })

  const products = data ? (data.products || data) : []

  function isAdminUpload(p) {
    const url = p.imageUrl || ''
    return (
      url.startsWith('/uploads/') ||
      url.includes('res.cloudinary.com') ||
      (Array.isArray(p.images) && p.images.some(u => u.startsWith('/uploads/') || u.includes('res.cloudinary.com')))
    )
  }

  const visibleProducts = products.filter(isAdminUpload)

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)))

  // Sample category images
  const categoryImages = {
    "Electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "Clothing": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "Books": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "Home": "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "Sports": "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "Beauty": "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "Toys": "https://images.unsplash.com/photo-1516981879613-9f5da904015f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "Jewelry": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }

  // Default image for categories without specific images
  const defaultCategoryImage = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"

  // Sample brand logos
  const brands = [
    { name: "Nike", logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { name: "Apple", logo: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { name: "Samsung", logo: "https://images.unsplash.com/photo-1553545204-4f7d339aa06a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { name: "Adidas", logo: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { name: "Sony", logo: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
  ]

  // Sample testimonials with avatars
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      text: "I love the quality of products from this store. Fast shipping and excellent customer service!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      text: "Great selection and competitive prices. Will definitely shop here again.",
      rating: 4
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      text: "The checkout process was seamless and my order arrived earlier than expected!",
      rating: 5
    }
  ]

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-image">
            <img 
              src="https://res.cloudinary.com/dcd0zqorf/image/upload/v1730370946/cld-sample-3.jpg" 
              alt="Featured Product" 
            />
          </div>
          <div className="hero-text">
            <h1>Discover Premium Products</h1>
            <p>Shop our curated collection of high-quality items</p>
            <button className="cta-button">Shop Now</button>
          </div>
        </div>
      </section>


      {/* Search and Filter Section */}
      <section className="search-section">
        <div className="search-container">
          <div className="search-input">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="search-icon">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              placeholder="Search products..." 
              value={q} 
              onChange={e => setQ(e.target.value)} 
              className="search-field"
            />
          </div>
          <div className="category-select">
            <select value={category} onChange={e => setCategory(e.target.value)} className="category-dropdown">
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="category-showcase">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          {categories.slice(0, 4).map((cat, index) => (
            <Link to={`/products?category=${encodeURIComponent(cat)}`} className="category-card" key={index}>
              <div className="category-image">
                <img 
                  src={categoryImages[cat] || defaultCategoryImage} 
                  alt={cat} 
                  loading="lazy" 
                />
              </div>
              <div className="category-overlay">
                <h3>{cat}</h3>
                <span className="category-link">View Products</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2 className="section-title">Featured Products</h2>
        {error ? (
          <div className="loading-container">
            <p>Unable to load products. Please retry.</p>
          </div>
        ) : isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid five">
            {visibleProducts.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Brands */}
      <section className="brands-section">
        <h2 className="section-title">Featured Brands</h2>
        <div className="brands-container">
          {brands.map((brand, index) => (
            <div className="brand-item" key={index}>
              <img src={brand.logo} alt={brand.name} loading="lazy" />
              <span className="brand-name">{brand.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonials-container">
          {testimonials.map(testimonial => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="testimonial-avatar">
                <img src={testimonial.avatar} alt={testimonial.name} loading="lazy" />
              </div>
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < testimonial.rating ? "star filled" : "star"}>★</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-name">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
