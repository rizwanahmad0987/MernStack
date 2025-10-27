import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('details')
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    loadProduct()
  }, [id])

  async function loadProduct() {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`/api/products/${id}`)
      if (!res.ok) {
        if (res.status === 404) {
          setError('Product not found')
        } else {
          setError('Failed to load product')
        }
        return
      }
      const productData = await res.json()
      setProduct(productData)
      
      // Load related products after we have the current product
      if (productData.category) {
        loadRelatedProducts(productData.category, productData._id)
      }
    } catch (err) {
      setError('Failed to load product')
    } finally {
      setLoading(false)
    }
  }
  
  async function loadRelatedProducts(category, currentProductId) {
    try {
      const res = await fetch(`/api/products?category=${encodeURIComponent(category)}&limit=4`)
      if (res.ok) {
        const data = await res.json()
        // Filter out the current product and limit to 4 items
        const filtered = data.products.filter(p => p._id !== currentProductId).slice(0, 4)
        setRelatedProducts(filtered)
      }
    } catch (err) {
      console.error('Failed to load related products', err)
    }
  }

  function handleAddToCart() {
    if (product && quantity > 0) {
      addToCart(product, quantity)
      // Optional: Show success message or navigate to cart
    }
  }

  function handleQuantityChange(newQuantity) {
    const qty = Math.max(1, Math.min(newQuantity, product?.inStock || 1))
    setQuantity(qty)
  }

  if (loading) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="loading">Loading product...</div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="error">
            <h2>Product Not Found</h2>
            <p>{error || 'The product you are looking for does not exist.'}</p>
            <Link to="/" className="btn">Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-detail-container">
          <div className="product-detail-left">
            <div className="product-gallery">
              <div className="product-main-image">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} />
                ) : (
                  <div className="product-image-placeholder">
                    <span>No Image Available</span>
                  </div>
                )}
                {product.onSale && <div className="product-badge sale">SALE</div>}
                {product.inStock === 0 && <div className="product-badge out-of-stock">OUT OF STOCK</div>}
              </div>
            </div>
          </div>

          <div className="product-detail-right">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              {product.category && (
                <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="product-category-tag">
                  {product.category}
                </Link>
              )}
            </div>

            <div className="product-price-section">
              <span className="product-price">${product.price.toFixed(2)}</span>
              {product.onSale && (
                <span className="product-sale-badge">On Sale!</span>
              )}
            </div>

            <div className="product-stock-info">
              <span className={`stock-status ${product.inStock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock > 0 ? (
                  <>
                    <span className="stock-icon in-stock">●</span> In Stock ({product.inStock} available)
                  </>
                ) : (
                  <>
                    <span className="stock-icon out-of-stock">●</span> Out of Stock
                  </>
                )}
              </span>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description || 'No description available for this product.'}</p>
            </div>

            {product.inStock > 0 && (
              <div className="product-purchase-options">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      max={product.inStock}
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="quantity-input"
                      aria-label="Product quantity"
                    />
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.inStock}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button 
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                  disabled={product.inStock === 0}
                >
                  Add to Cart
                </button>
              </div>
            )}

            <div className="product-actions-row">
              <button className="action-button wishlist-button">
                <span className="action-icon">♡</span> Add to Wishlist
              </button>
              <button className="action-button share-button">
                <span className="action-icon">↗</span> Share
              </button>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <strong>Product ID:</strong> {product._id}
              </div>
              <div className="meta-item">
                <strong>Added:</strong> {new Date(product.createdAt).toLocaleDateString()}
              </div>
              {product.sold > 0 && (
                <div className="meta-item">
                  <strong>Sold:</strong> {product.sold} units
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <div className="tabs-header">
            <button 
              className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
            <button 
              className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
            <button 
              className={`tab-button ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping
            </button>
          </div>
          <div className="tab-content">
            <div className={`tab-pane ${activeTab === 'details' ? 'active' : ''}`}>
              <h3>Product Details</h3>
              <p>{product.description || 'No detailed description available for this product.'}</p>
              
              <div className="product-features">
                <h4>Features</h4>
                <ul className="features-list">
                  <li>High-quality materials</li>
                  <li>Durable construction</li>
                  <li>Modern design</li>
                  <li>Easy to use</li>
                </ul>
              </div>
            </div>
            
            <div className={`tab-pane ${activeTab === 'reviews' ? 'active' : ''}`}>
              <h3>Customer Reviews</h3>
              <div className="reviews-summary">
                <div className="no-reviews">
                  <p>There are no reviews yet for this product.</p>
                  <button className="button secondary">Write a Review</button>
                </div>
              </div>
            </div>
            
            <div className={`tab-pane ${activeTab === 'shipping' ? 'active' : ''}`}>
              <h3>Shipping & Returns</h3>
              <div className="shipping-info">
                <h4>Shipping Information</h4>
                <p>We ship to all locations within the continental United States. Orders are typically processed within 1-2 business days.</p>
                <p>Standard shipping (5-7 business days): $5.99</p>
                <p>Express shipping (2-3 business days): $12.99</p>
                
                <h4>Return Policy</h4>
                <p>We accept returns within 30 days of delivery. Items must be unused and in their original packaging.</p>
                <p>To initiate a return, please contact our customer service team.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="related-products">
          <h2>You May Also Like</h2>
          <div className="related-products-grid">
            {relatedProducts.length > 0 ? (
              relatedProducts.map(relatedProduct => (
                <Link 
                  key={relatedProduct._id} 
                  to={`/product/${relatedProduct._id}`} 
                  className="related-product"
                >
                  <div className="related-product-image">
                    {relatedProduct.imageUrl ? (
                      <img src={relatedProduct.imageUrl} alt={relatedProduct.name} />
                    ) : (
                      <div className="placeholder-image"></div>
                    )}
                  </div>
                  <div className="related-product-info">
                    <h3 className="related-product-name">{relatedProduct.name}</h3>
                    <div className="related-product-price">${relatedProduct.price.toFixed(2)}</div>
                  </div>
                </Link>
              ))
            ) : (
              // Placeholders when no related products are available
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="related-product-placeholder">
                  <div className="placeholder-image"></div>
                  <div className="placeholder-text">Related Product</div>
                  <div className="placeholder-price">$XX.XX</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="product-actions-bottom">
          <Link to="/products" className="button secondary">Continue Shopping</Link>
          <Link to="/cart" className="button primary">View Cart</Link>
        </div>
      </div>
    </div>
  )
}

