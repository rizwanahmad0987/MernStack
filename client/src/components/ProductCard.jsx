import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [isHovering, setIsHovering] = useState(false)

  function add(e) { 
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, qty) 
  }

  return (
    <div className="product-card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="product-image">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <div className="product-placeholder" />
          )}
          {product.onSale && (
            <span className="product-badge sale-badge">SALE</span>
          )}
          {product.inStock <= 5 && product.inStock > 0 && (
            <span className="product-badge low-stock">Low Stock</span>
          )}
          {product.inStock === 0 && (
            <span className="product-badge out-of-stock">Out of Stock</span>
          )}
        </div>

        <div className="product-info">
          <div className="product-meta">
            <span className="product-category">{product.category || 'Uncategorized'}</span>
            {product.inStock > 0 ? (
              <span className="product-stock in-stock">In Stock</span>
            ) : (
              <span className="product-stock out-of-stock">Out of Stock</span>
            )}
          </div>
          
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          
          <div className="product-price-row">
            <span className="product-price">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="product-old-price">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>

      <div className="product-actions" style={{ opacity: isHovering ? 1 : 0 }}>
        <div className="quantity-control">
          <button 
            className="quantity-btn" 
            onClick={(e) => { e.preventDefault(); setQty(q => Math.max(1, q-1)) }}
            disabled={qty <= 1}
          >−</button>
          <input 
            type="number" 
            className="quantity-input" 
            value={qty} 
            onChange={e => setQty(Math.max(1, Number(e.target.value)||1))}
            min="1"
          />
          <button 
            className="quantity-btn" 
            onClick={(e) => { e.preventDefault(); setQty(q => q+1) }}
          >+</button>
        </div>
        <button 
          className="add-to-cart-button" 
          disabled={product.inStock === 0} 
          onClick={add}
        >
          {product.inStock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
}


