import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">MERN Store</h3>
            <p className="footer-description">
              Your one-stop shop for quality products at affordable prices. We offer a wide range of 
              electronics, clothing, and footwear.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products?category=Electronics">Electronics</Link></li>
              <li><Link to="/products?category=Clothing">Clothing</Link></li>
              <li><Link to="/products?category=Shoes">Shoes</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Customer Service</h3>
            <ul className="footer-links">
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/returns-exchanges">Returns & Exchanges</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Newsletter</h3>
            <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} MERN Store. All rights reserved.</p>
          <div className="payment-methods">
            <span>We accept:</span>
            <div className="payment-icons">
              <span className="payment-icon">Visa</span>
              <span className="payment-icon">MC</span>
              <span className="payment-icon">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
