import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total, itemCount } = useCart()
  
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity)
    }
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <span className="item-count">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="button primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-items-header">
              <div className="cart-header-product">Product</div>
              <div className="cart-header-price">Price</div>
              <div className="cart-header-quantity">Quantity</div>
              <div className="cart-header-total">Total</div>
              <div className="cart-header-actions"></div>
            </div>

            {items.map(({ product, quantity }) => (
              <div className="cart-item" key={product._id}>
                <div className="cart-item-product">
                  <div className="cart-item-image">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <div className="cart-item-placeholder"></div>
                    )}
                  </div>
                  <div className="cart-item-details">
                    <Link to={`/product/${product._id}`} className="cart-item-name">{product.name}</Link>
                    <div className="cart-item-category">{product.category}</div>
                  </div>
                </div>
                
                <div className="cart-item-price">${product.price.toFixed(2)}</div>
                
                <div className="cart-item-quantity">
                  <div className="quantity-control">
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(product._id, quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      min="1" 
                      value={quantity} 
                      onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value) || 1)}
                      className="quantity-input"
                    />
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(product._id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="cart-item-total">${(product.price * quantity).toFixed(2)}</div>
                
                <div className="cart-item-actions">
                  <button 
                    className="remove-item" 
                    onClick={() => removeFromCart(product._id)}
                    title="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <div className="summary-row">
              <span>Tax</span>
              <span>${(total * 0.08).toFixed(2)}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>${(total + total * 0.08).toFixed(2)}</span>
            </div>
            
            <Link to="/checkout" className="button checkout-button">
              Proceed to Checkout
            </Link>
            
            <Link to="/products" className="continue-shopping-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}


