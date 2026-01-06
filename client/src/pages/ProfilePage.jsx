import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function ProfilePage() {
  const { user, token, saveAuth } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setMessage({ text: '', type: '' });
    
    // Reset form data to current user data when toggling edit mode
    if (!isEditing) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    }
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.name.trim()) {
      setMessage({ text: 'Name is required', type: 'error' });
      return false;
    }
    
    if (!formData.email.trim()) {
      setMessage({ text: 'Email is required', type: 'error' });
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' });
      return false;
    }
    
    // Password validation only if attempting to change password
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        setMessage({ text: 'Current password is required to set a new password', type: 'error' });
        return false;
      }
      
      if (formData.newPassword.length < 6) {
        setMessage({ text: 'New password must be at least 6 characters', type: 'error' });
        return false;
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        setMessage({ text: 'New passwords do not match', type: 'error' });
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      // Create update payload
      const updateData = {
        name: formData.name,
        email: formData.email
      };
      
      // Only include password fields if attempting to change password
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }
      
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }
      
      // Update local user data
      if (data.user && data.token) {
        saveAuth(data.token, data.user);
      }
      
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      setIsEditing(false);
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ text: error.message || 'An error occurred while updating your profile', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button 
          onClick={toggleEditMode} 
          className={`button ${isEditing ? 'secondary' : 'primary'}`}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
          
          {isEditing ? (
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
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
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-divider">
                <span>Change Password (Optional)</span>
              </div>
              
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="button primary" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="detail-group">
                <span className="detail-label">Name</span>
                <span className="detail-value">{user.name}</span>
              </div>
              
              <div className="detail-group">
                <span className="detail-label">Email</span>
                <span className="detail-value">{user.email}</span>
              </div>
              
              <div className="detail-group">
                <span className="detail-label">Account Type</span>
                <span className="detail-value">{user.isAdmin ? 'Administrator' : 'Customer'}</span>
              </div>
              
              <div className="detail-group">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="profile-sections">
          <div className="profile-section">
            <h2>Recent Orders</h2>
            <p>View your order history and track current orders.</p>
            <Link to="/orders" className="button secondary">View Orders</Link>
          </div>
          
          <div className="profile-section">
            <h2>Saved Addresses</h2>
            <p>Manage your shipping and billing addresses.</p>
            <button className="button secondary" disabled>Coming Soon</button>
          </div>
          
          <div className="profile-section">
            <h2>Payment Methods</h2>
            <p>Manage your payment options and preferences.</p>
            <button className="button secondary" disabled>Coming Soon</button>
          </div>
        </div>
      </div>
    </div>
  );
}
