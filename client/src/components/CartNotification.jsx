import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CartNotification({ product, onClose }) {
  const navigate = useNavigate();
  
  const handleContinueShopping = () => {
    onClose();
    navigate('/');
  };
  
  return (
    <div className="cart-notification">
      <div className="cart-notification-content">
        <button className="notification-close" onClick={onClose}>×</button>
        <div className="notification-header">
          <div className="success-icon">✓</div>
          <h3>Added to Cart!</h3>
        </div>
        
        <div className="notification-product">
          <div className="notification-product-image">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} />
            ) : (
              <div className="product-placeholder" />
            )}
          </div>
          <div className="notification-product-info">
            <h4>{product.name}</h4>
            <p className="notification-price">${product.price.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="notification-actions">
          <button className="continue-shopping" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
          <Link to="/cart" className="view-cart">
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
