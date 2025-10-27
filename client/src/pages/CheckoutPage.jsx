import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useCart } from '../contexts/CartContext.jsx'

export default function CheckoutPage() {
  const { user, token } = useAuth()
  const { items, total, clearCart } = useCart()
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const nav = useNavigate()
  
  // Calculate totals
  const subtotal = total
  const shipping = 0 // Free shipping
  const tax = total * 0.08
  const orderTotal = subtotal + shipping + tax
  
  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      nav('/login?redirect=checkout')
    }
  }, [user, nav])
  
  // Redirect to cart if cart is empty
  useEffect(() => {
    if (items.length === 0 && !message) {
      nav('/cart')
    }
  }, [items, nav, message])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateShippingInfo = () => {
    const { fullName, email, address, city, state, zipCode, phone } = shippingInfo
    return fullName && email && address && city && state && zipCode && phone
  }

  const handleNextStep = () => {
    if (activeStep === 1 && validateShippingInfo()) {
      setActiveStep(2)
    }
  }

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
    }
  }

  async function placeOrder() {
    if (!user) { 
      nav('/login?redirect=checkout')
      return 
    }
    
    if (!validateShippingInfo()) {
      setActiveStep(1)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const payload = { 
        items: items.map(i => ({ productId: i.product._id, quantity: i.quantity })),
        shippingInfo,
        paymentMethod
      }
      
    const res = await fetch('/api/orders', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    })
      
      if (!res.ok) { 
        const errorData = await res.json()
        setMessage(errorData.message || 'Order failed')
        setIsSubmitting(false)
        return 
      }
      
      const orderData = await res.json()
    clearCart()
      setActiveStep(3)
      setMessage(`Order #${orderData._id || 'placed'} successfully! ${paymentMethod === 'cod' ? 'Cash on Delivery.' : 'Payment confirmed.'}`)
    } catch (error) {
      console.error('Error placing order:', error)
      setMessage('An error occurred while placing your order.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <div className={`checkout-step ${activeStep >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span>Shipping</span>
          </div>
          <div className="step-divider"></div>
          <div className={`checkout-step ${activeStep >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span>Payment</span>
          </div>
          <div className="step-divider"></div>
          <div className={`checkout-step ${activeStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>Confirmation</span>
          </div>
        </div>
      </div>
      
      <div className="checkout-content">
        <div className="checkout-main">
          {activeStep === 1 && (
            <div className="checkout-section shipping-info">
              <h2>Shipping Information</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="fullName">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    value={shippingInfo.fullName} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={shippingInfo.email} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={shippingInfo.phone} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="address">Address</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    value={shippingInfo.address} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input 
                    type="text" 
                    id="city" 
                    name="city" 
                    value={shippingInfo.city} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input 
                    type="text" 
                    id="state" 
                    name="state" 
                    value={shippingInfo.state} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input 
                    type="text" 
                    id="zipCode" 
                    name="zipCode" 
                    value={shippingInfo.zipCode} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <Link to="/cart" className="button secondary">Back to Cart</Link>
                <button 
                  className="button primary" 
                  onClick={handleNextStep}
                  disabled={!validateShippingInfo()}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}
          
          {activeStep === 2 && (
            <div className="checkout-section payment-info">
              <h2>Payment Method</h2>
              <div className="payment-methods">
                <div className="payment-method">
                  <input 
                    type="radio" 
                    id="cod" 
                    name="paymentMethod" 
                    value="cod" 
                    checked={paymentMethod === 'cod'} 
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <label htmlFor="cod">
                    <div className="payment-method-name">Cash on Delivery</div>
                    <div className="payment-method-description">Pay when your order arrives</div>
                  </label>
                </div>
                
                <div className="payment-method">
                  <input 
                    type="radio" 
                    id="card" 
                    name="paymentMethod" 
                    value="card" 
                    checked={paymentMethod === 'card'} 
                    onChange={() => setPaymentMethod('card')}
                  />
                  <label htmlFor="card">
                    <div className="payment-method-name">Credit/Debit Card</div>
                    <div className="payment-method-description">Pay securely with your card</div>
                  </label>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="card-details">
                    <div className="form-group full-width">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cardName">Name on Card</label>
                      <input type="text" id="cardName" />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="expiry">Expiry Date</label>
                      <input type="text" id="expiry" placeholder="MM/YY" />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input type="text" id="cvv" placeholder="123" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="form-actions">
                <button className="button secondary" onClick={handlePrevStep}>
                  Back to Shipping
                </button>
                <button 
                  className="button primary" 
                  onClick={placeOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
          
          {activeStep === 3 && (
            <div className="checkout-section order-confirmation">
              <div className="confirmation-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2>Order Confirmed!</h2>
              <p className="confirmation-message">{message}</p>
              <p className="confirmation-details">
                We've sent a confirmation email to <strong>{shippingInfo.email}</strong> with all the details.
              </p>
              <div className="form-actions centered">
                <Link to="/" className="button primary">Continue Shopping</Link>
              </div>
            </div>
          )}
        </div>
        
        <div className="checkout-sidebar">
          <div className="order-summary">
            <h3>Order Summary</h3>
            
            <div className="order-items">
              {items.map(({ product, quantity }) => (
                <div className="order-item" key={product._id}>
                  <div className="order-item-image">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <div className="order-item-placeholder"></div>
                    )}
                  </div>
                  <div className="order-item-details">
                    <div className="order-item-name">{product.name}</div>
                    <div className="order-item-quantity">Qty: {quantity}</div>
                  </div>
                  <div className="order-item-price">${(product.price * quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              
              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="checkout-help">
            <h4>Need Help?</h4>
            <p>Contact our customer support at <a href="mailto:support@mernstore.com">support@mernstore.com</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}


