import React, { useEffect, useState } from 'react'
import { useCart } from '../contexts/CartContext.jsx'
import { Link, useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import ProductCard from '../components/ProductCard.jsx'

const fetcher = url => fetch(url, { cache: 'no-store' }).then(res => {
  if (res.status === 304) return { products: [] }
  if (!res.ok) throw new Error('Failed to load')
  return res.json()
})

function isAdminUpload(p) {
  const url = p.imageUrl || ''
  return (
    url.startsWith('/uploads/') ||
    url.includes('res.cloudinary.com') ||
    (Array.isArray(p.images) && p.images.some(u => u.startsWith('/uploads/') || u.includes('res.cloudinary.com')))
  )
}

export default function ProductsPage() {
  const [categories, setCategories] = useState([])
  const [viewMode, setViewMode] = useState('grid-5') // grid-3, grid-4, grid-5
  const [sortBy, setSortBy] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)
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

  
  
  // Construct API URL
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

  const { data, error, isLoading } = useSWR(`/api/products?${params.toString()}`, fetcher, {
    refreshInterval: 3000
  })

  const products = data ? (data.products || []) : []

  const visibleProducts = products.filter(isAdminUpload)

  const columnsClassMap = { 'grid-3': 'three', 'grid-4': 'four', 'grid-5': 'five' }
  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / productsPerPage))
  const startIndex = (currentPage - 1) * productsPerPage
  const pagedProducts = visibleProducts.slice(startIndex, startIndex + productsPerPage)

  useEffect(() => {
    const tp = Math.max(1, Math.ceil(visibleProducts.length / productsPerPage))
    if (currentPage > tp) {
      updateFilters({ page: '1' })
    }
  }, [currentPage, visibleProducts.length])

  // Load categories once (kept as effect since it changes rarely)
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
                <span>{visibleProducts.length} products</span>
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
                  className={`view-btn ${viewMode === 'grid-3' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid-3')}
                  title="3 Columns"
                >3</button>
                <button 
                  className={`view-btn ${viewMode === 'grid-4' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid-4')}
                  title="4 Columns"
                >4</button>
                <button 
                  className={`view-btn ${viewMode === 'grid-5' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid-5')}
                  title="5 Columns"
                >5</button>
              </div>
            </div>
          </div>
          
          {/* Products Display */}
          {error ? (
            <div className="no-products">
              <h3>Unable to load products</h3>
              <p>Please check your connection and try again.</p>
            </div>
          ) : isLoading ? (
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
            <div className={`grid ${columnsClassMap[viewMode]}`}>
              {pagedProducts.map(product => (
                <ProductCard key={product._id} product={product} />
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
                      <span className="product-price sale">PKR {quickViewProduct.price.toFixed(2)}</span>
                      <span className="product-old-price">PKR {(quickViewProduct.price * 1.2).toFixed(2)}</span>
                  </>
                ) : (
                  <span className="product-price">PKR {quickViewProduct.price.toFixed(2)}</span>
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
