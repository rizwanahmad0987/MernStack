import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function AdminDashboard() {
  const { token } = useAuth()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ 
    name: '', 
    price: '', 
    category: 'Shoes', 
    inStock: 0, 
    description: '' 
  })
  const [selectedImages, setSelectedImages] = useState([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageInputMethod, setImageInputMethod] = useState('upload') // 'upload' or 'url'
  const fileInputRef = useRef(null)

  async function load() {
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data.products || [])
  }

  useEffect(() => { load() }, [])

  // Handle image selection
  function handleImageSelect(e) {
    const files = Array.from(e.target.files)
    setSelectedImages(prevImages => [...prevImages, ...files].slice(0, 5)) // Limit to 5 images
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setImagePreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls].slice(0, 5))
  }
  
  // Handle image URL input
  function handleAddImageUrl() {
    if (!imageUrl) return
    
    // Basic URL validation
    if (!imageUrl.match(/^https?:\/\/.+\..+/i)) {
      alert('Please enter a valid image URL')
      return
    }
    
    if (imagePreviewUrls.length >= 5) {
      alert('Maximum of 5 images allowed')
      return
    }
    
    // Add the URL to the preview list
    setImagePreviewUrls(prevUrls => [...prevUrls, imageUrl].slice(0, 5))
    
    // We'll store URLs separately from file objects
    setSelectedImages(prevImages => [...prevImages, { isUrl: true, url: imageUrl }].slice(0, 5))
    
    // Clear the input
    setImageUrl('')
  }

  // Remove an image from the selection
  function removeImage(index) {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index))
    
    // Revoke the object URL to free memory
    URL.revokeObjectURL(imagePreviewUrls[index])
    setImagePreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index))
  }

  async function create(e) {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Create FormData for file upload
      const formData = new FormData()
      
      // Add product details
      Object.keys(form).forEach(key => {
        if (key === 'price' || key === 'inStock') {
          formData.append(key, Number(form[key]))
        } else {
          formData.append(key, form[key])
        }
      })
      
      // Add image URLs as a separate field
      const imageUrls = selectedImages
        .filter(image => image.isUrl)
        .map(image => image.url)
      
      if (imageUrls.length > 0) {
        formData.append('imageUrls', JSON.stringify(imageUrls))
      }
      
      // Add file images
      selectedImages
        .filter(image => !image.isUrl)
        .forEach(image => {
          formData.append('images', image)
        })
      
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })
      
      if (res.ok) {
        // Reset form and selected images
        setForm({ name: '', price: '', category: 'Shoes', inStock: 0, description: '' })
        setSelectedImages([])
        
        // Revoke all preview URLs to free memory
        imagePreviewUrls.forEach(url => URL.revokeObjectURL(url))
        setImagePreviewUrls([])
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        
        // Reload products
        load()
      } else {
        const errorData = await res.json()
        console.error('Error creating product:', errorData)
        alert(`Failed to create product: ${errorData.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred while creating the product')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function remove(id) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const res = await fetch(`/api/products/${id}`, { 
        method: 'DELETE', 
        headers: { Authorization: `Bearer ${token}` } 
      })
      if (res.ok) load()
    }
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form className="card" onSubmit={create}>
        <h3>Add Product</h3>
        <div className="grid two">
          <label>Name<input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} required /></label>
          <label>Price<input type="number" step="0.01" min="0" value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))} required /></label>
          <label>Category<input value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} required /></label>
          <label>Stock<input type="number" min="0" value={form.inStock} onChange={e => setForm(f => ({...f, inStock: e.target.value}))} required /></label>
          <label className="colspan2">Description<input value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} /></label>
        </div>
        
        {/* Image Upload Section */}
        <div className="image-upload-section" style={{ marginTop: '1rem' }}>
          <label>Product Images (up to 5)</label>
          
          {/* Image Input Method Selector */}
          <div className="image-input-selector" style={{ 
            display: 'flex', 
            marginBottom: '1rem',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '0.5rem'
          }}>
            <button 
              type="button" 
              onClick={() => setImageInputMethod('upload')}
              style={{
                padding: '0.5rem 1rem',
                background: imageInputMethod === 'upload' ? 'var(--primary)' : 'transparent',
                color: imageInputMethod === 'upload' ? 'white' : 'var(--text)',
                border: imageInputMethod === 'upload' ? 'none' : '1px solid var(--border)',
                borderRadius: 'var(--radius) 0 0 var(--radius)',
                cursor: 'pointer'
              }}
            >
              Upload Files
            </button>
            <button 
              type="button" 
              onClick={() => setImageInputMethod('url')}
              style={{
                padding: '0.5rem 1rem',
                background: imageInputMethod === 'url' ? 'var(--primary)' : 'transparent',
                color: imageInputMethod === 'url' ? 'white' : 'var(--text)',
                border: imageInputMethod === 'url' ? 'none' : '1px solid var(--border)',
                borderRadius: '0 var(--radius) var(--radius) 0',
                cursor: 'pointer'
              }}
            >
              Paste URL
            </button>
          </div>
          
          {/* File Upload Input */}
          {imageInputMethod === 'upload' && (
            <input 
              type="file" 
              id="product-images" 
              accept="image/*" 
              multiple 
              onChange={handleImageSelect} 
              ref={fileInputRef}
              style={{ marginBottom: '1rem' }}
              disabled={imagePreviewUrls.length >= 5}
            />
          )}
          
          {/* URL Input */}
          {imageInputMethod === 'url' && (
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input 
                type="url" 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                style={{ flex: 1 }}
                disabled={imagePreviewUrls.length >= 5}
              />
              <button 
                type="button" 
                onClick={handleAddImageUrl}
                disabled={!imageUrl || imagePreviewUrls.length >= 5}
              >
                Add
              </button>
            </div>
          )}
          
          {/* Image Previews */}
          {imagePreviewUrls.length > 0 && (
            <div className="image-previews" style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '10px',
              marginBottom: '1rem'
            }}>
              {imagePreviewUrls.map((url, index) => (
                <div key={index} style={{ 
                  position: 'relative',
                  width: '100px',
                  height: '100px'
                }}>
                  <img 
                    src={url} 
                    alt={`Preview ${index + 1}`} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius)'
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/100?text=Error';
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => removeImage(index)}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      background: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: '12px'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Product'}
        </button>
      </form>

      <h3 style={{marginTop: '2rem'}}>Products</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Sold</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>
                {(p.imageUrl || (p.images && p.images.length > 0)) ? (
                  <img 
                    src={p.imageUrl || p.images[0]} 
                    alt={p.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: '#eee',
                    borderRadius: 'var(--radius)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999'
                  }}>
                    No img
                  </div>
                )}
              </td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.inStock}</td>
              <td>{p.sold || 0}</td>
              <td>
                <button className="linklike" onClick={() => remove(p._id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


