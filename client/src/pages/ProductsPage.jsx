import React, { useEffect, useState } from 'react'
import { useCart } from '../contexts/CartContext.jsx'
import { Link, useSearchParams } from 'react-router-dom'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [sortBy, setSortBy] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const { addToCart } = useCart()
  
  const productsPerPage = 12
  
  // Get query parameters
  const category = searchParams.get('category') || ''
  const q = searchParams.get('q') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const sort = searchParams.get('sort') || 'featured'
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''
  const inStock = searchParams.get('inStock') === 'true'
  const onSale = searchParams.get('onSale') === 'true'
  
  // Update state based on URL params
  useEffect(() => {
    setSortBy(sort)
    setCurrentPage(page)
  }, [sort, page])
  
  // Load products based on filters
  useEffect(() => {
    setIsLoading(true)
    loadProducts()
  }, [category, q, page, sort, minPrice, maxPrice, inStock, onSale])
  
  // Load categories once
  useEffect(() => {
    loadCategories()
  }, [])
  
  async function loadCategories() {
    try {
      const res = await fetch('/api/products/categories')
      const data = await res.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }
  
  async function loadProducts() {
    try {
      const params = new URLSearchParams()
      if (category) params.set('category', category)
      if (q) params.set('q', q)
      if (page) params.set('page', page)
      if (sort) params.set('sort', sort)
      if (minPrice) params.set('minPrice', minPrice)
      if (maxPrice) params.set('maxPrice', maxPrice)
      if (inStock) params.set('inStock', 'true')
      if (onSale) params.set('onSale', 'true')
      params.set('limit', productsPerPage)
      
      const res = await fetch(`/api/products?${params.toString()}`)
      const data = await res.json()
      
      // Server returns { products: [...] }
      if (data.products) {
        setProducts(data.products)
        // Calculate total pages based on products length if totalPages not provided
        setTotalPages(data.totalPages || Math.ceil(data.products.length / productsPerPage))
      } else {
        // Fallback for unexpected response format
        console.error('Unexpected API response format:', data)
        setProducts([])
        setTotalPages(1)
      }
      
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to load products:', error)
      setIsLoading(false)
    }
  }
  
  // Update URL with filters
  function updateFilters(newFilters) {
    const params = new URLSearchParams(searchParams)
    
    // Update each filter in the URL
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    
    // Reset to page 1 when filters change
    if (!newFilters.hasOwnProperty('page')) {
      params.set('page', '1')
    }
    
    setSearchParams(params)
  }
  
  function handleSortChange(e) {
    updateFilters({ sort: e.target.value })
  }
  
  function handleCategoryChange(e) {
    updateFilters({ category: e.target.value })
  }
  
  function handlePriceChange(min, max) {
    updateFilters({ 
      minPrice: min || '', 
      maxPrice: max || '' 
    })
  }
  
  function handleCheckboxChange(name, checked) {
    updateFilters({ [name]: checked ? 'true' : '' })
  }
  
  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) return
    updateFilters({ page: newPage.toString() })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  function clearAllFilters() {
    setSearchParams({})
  }
  
  function getActiveFiltersCount() {
    let count = 0
    if (category) count++
    if (minPrice || maxPrice) count++
    if (inStock) count++
    if (onSale) count++
    return count
  }

  // Quick view functionality
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  
  function openQuickView(product, e) {
    e.preventDefault()
    e.stopPropagation()
    setQuickViewProduct(product)
  }
  
  function closeQuickView() {
    setQuickViewProduct(null)
  }
  
  return (
    <div className="products-page">
      {/* Page Header */}
      <div className="page-header">
        <h1>All Products</h1>
      </div>
      
      <div className="products-layout">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h3>Filters</h3>
            {getActiveFiltersCount() > 0 && (
              <button className="clear-filters" onClick={clearAllFilters}>
                Clear All
              </button>
            )}
          </div>
          
          {/* Category Filter */}
          <div className="filter-group">
            <h4>Category</h4>
            <select 
              value={category} 
              onChange={handleCategoryChange}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          {/* Price Range Filter */}
          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input 
                type="number" 
                placeholder="Min" 
                value={minPrice} 
                onChange={(e) => handlePriceChange(e.target.value, maxPrice)}
                className="price-input"
              />
              <span>to</span>
              <input 
                type="number" 
                placeholder="Max" 
                value={maxPrice} 
                onChange={(e) => handlePriceChange(minPrice, e.target.value)}
                className="price-input"
              />
            </div>
          </div>
          
          {/* Availability Filters */}
          <div className="filter-group">
            <h4>Availability</h4>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={inStock} 
                onChange={(e) => handleCheckboxChange('inStock', e.target.checked)}
              />
              In Stock Only
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={onSale} 
                onChange={(e) => handleCheckboxChange('onSale', e.target.checked)}
              />
              On Sale
            </label>
          </div>
        </aside>
        
        {/* Products Content */}
        <div className="products-content">
          {/* Toolbar */}
          <div className="products-toolbar">
            <div className="results-count">
              {!isLoading && (
                <span>{products.length} products</span>
              )}
            </div>
            
            <div className="toolbar-actions">
              <div className="sort-by">
                <label>Sort by:</label>
                <select value={sortBy} onChange={handleSortChange}>
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
              
              <div className="view-options">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Products Display */}
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search term</p>
              <button className="button" onClick={clearAllFilters}>Clear All Filters</button>
            </div>
          ) : (
            <div className={`products-${viewMode}`}>
              {products.map(product => (
                <div className={`product-item ${viewMode}`} key={product._id}>
                  <Link to={`/product/${product._id}`} className="product-link">
                    <div className="product-image">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} loading="lazy" />
                      ) : (
                        <div className="product-placeholder"></div>
                      )}
                      {product.onSale && <span className="product-badge sale-badge">SALE</span>}
                      {product.inStock <= 5 && product.inStock > 0 && (
                        <span className="product-badge stock-badge">Low Stock</span>
                      )}
                    </div>
                    
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      {viewMode === 'list' && (
                        <p className="product-description">{product.description}</p>
                      )}
                      <div className="product-meta">
                        <span className="product-category">{product.category}</span>
                        {product.inStock > 0 ? (
                          <span className="product-stock in-stock">In Stock</span>
                        ) : (
                          <span className="product-stock out-of-stock">Out of Stock</span>
                        )}
                      </div>
                      <div className="product-price-row">
                        {product.onSale ? (
                          <>
                            <span className="product-price sale">${product.price.toFixed(2)}</span>
                            <span className="product-old-price">${(product.price * 1.2).toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="product-price">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      <button 
                        className="add-to-cart-button" 
                        disabled={product.inStock === 0}
                        onClick={(e) => { 
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          addToCart(product, 1);
                        }}
                      >
                        {product.inStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-btn prev" 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Prev
              </button>
              
              <div className="pagination-numbers">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNum === 1 || 
                    pageNum === totalPages || 
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button 
                        key={i} 
                        className={`pagination-number ${pageNum === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    (pageNum === currentPage - 2 && currentPage > 3) || 
                    (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                  ) {
                    return <span key={i} className="pagination-ellipsis">...</span>;
                  }
                  return null;
                })}
              </div>
              
              <button 
                className="pagination-btn next" 
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="quick-view-modal">
          <div className="modal-backdrop" onClick={closeQuickView}></div>
          <div className="modal-content">
            <button className="modal-close" onClick={closeQuickView}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="quick-view-product">
              <div className="quick-view-image">
                {quickViewProduct.imageUrl ? (
                  <img src={quickViewProduct.imageUrl} alt={quickViewProduct.name} />
                ) : (
                  <div className="product-placeholder large"></div>
                )}
                {quickViewProduct.onSale && <span className="product-badge sale-badge">SALE</span>}
              </div>
              
              <div className="quick-view-details">
                <h2>{quickViewProduct.name}</h2>
                <div className="product-price-row">
                  {quickViewProduct.onSale ? (
                    <>
                      <span className="product-price sale">${quickViewProduct.price.toFixed(2)}</span>
                      <span className="product-old-price">${(quickViewProduct.price * 1.2).toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="product-price">${quickViewProduct.price.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="product-meta">
                  <span className="meta-item">
                    <strong>Category:</strong> {quickViewProduct.category}
                  </span>
                  <span className="meta-item">
                    <strong>Availability:</strong> {quickViewProduct.inStock > 0 ? `In Stock (${quickViewProduct.inStock})` : 'Out of Stock'}
                  </span>
                </div>
                
                <p className="product-description">{quickViewProduct.description}</p>
                
                <div className="quick-view-actions">
                  <div className="quantity-selector">
                    <button 
                      className="qty-btn minus" 
                      onClick={() => setQuickViewProduct({...quickViewProduct, qty: Math.max(1, (quickViewProduct.qty || 1) - 1)})}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                    <input 
                      type="number" 
                      min="1" 
                      value={quickViewProduct.qty || 1}
                      onChange={(e) => setQuickViewProduct({...quickViewProduct, qty: Math.max(1, parseInt(e.target.value) || 1)})}
                      className="qty-input"
                    />
                    <button 
                      className="qty-btn plus"
                      onClick={() => setQuickViewProduct({...quickViewProduct, qty: (quickViewProduct.qty || 1) + 1})}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  </div>
                  
                  <button 
                    className="add-to-cart-button large" 
                    disabled={quickViewProduct.inStock === 0}
                    onClick={() => {
                      addToCart(quickViewProduct, quickViewProduct.qty || 1);
                      closeQuickView();
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
                
                <Link to={`/product/${quickViewProduct._id}`} className="view-details-link">
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

