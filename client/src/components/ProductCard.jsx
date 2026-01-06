import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'

export default function ProductCard({ product, customAction }) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)

  function add(e) { 
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, qty) 
  }

  const safeNumber = (val, def = 0) => {
    const n = Number(val)
    return Number.isFinite(n) ? n : def
  }

  const formatPrice = (price) => {
    const v = safeNumber(price, 0)
    const fraction = v.toFixed(2).split('.')[1]
    const whole = Math.trunc(v).toLocaleString('en-PK')
    return (
      <span className="amz-price">
        <span className="amz-price-symbol">PKR</span>
        <span className="amz-price-whole">{whole}</span>
        <span className="amz-price-fraction">{fraction}</span>
      </span>
    )
  }

  // Mock random rating for visual effect
  const ratingCount = product.ratingCount || Math.floor(Math.random() * 2000) + 50

  return (
    <div className="product-card amazon-style">
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="product-image-container">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <div className="product-placeholder" />
          )}
        </div>

        <div className="product-info">
          <div className="product-meta">
            <span className="product-category">{product.category || 'General'}</span>
            <div className="product-rating">
              <span className="amz-stars">★★★★☆</span>
              <span className="amz-rating-count">{ratingCount.toLocaleString()}</span>
            </div>
          </div>

          <h4 className="product-title">{product.name}</h4>

          {product.description && (
            <p className="product-description">{product.description}</p>
          )}

          <div className="product-price-row">
            {formatPrice(product.price)}
            {Number.isFinite(Number(product.oldPrice)) && (
              <span className="amz-old-price">
                List: <span className="strikethrough">PKR {safeNumber(product.oldPrice, 0).toFixed(2)}</span>
              </span>
            )}
          </div>


          {product.inStock <= 5 && product.inStock > 0 && (
            <div className="product-stock-warning">Only {product.inStock} left in stock - order soon.</div>
          )}
          
          {product.inStock === 0 && (
            <div className="product-out-stock">Currently unavailable.</div>
          )}
        </div>
      </Link>

      <div className="product-actions">
        {customAction ? (
          customAction
        ) : (
          <button 
            className="amz-btn-primary" 
            disabled={product.inStock === 0} 
            onClick={add}
          >
            {product.inStock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        )}
      </div>
    </div>
  )
}
