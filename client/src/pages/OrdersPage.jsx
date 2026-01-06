import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { useAuth } from '../contexts/AuthContext.jsx';

const fetcher = (url, token) => fetch(url, {
  headers: { Authorization: `Bearer ${token}` }
}).then(res => {
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
});

export default function OrdersPage() {
  const { user, token } = useAuth();
  
  const { data: orders, error, isLoading, mutate } = useSWR(
    user && token ? '/api/orders/me' : null,
    (url) => fetcher(url, token),
    { refreshInterval: 3000 }
  );

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'confirmed':
        return 'status-confirmed';
      case 'delivered':
        return 'status-delivered';
      default:
        return '';
    }
  };

  if (!user) {
    return (
      <div className="orders-page">
        <div className="auth-required">
          <h2>Sign In Required</h2>
          <p>Please sign in to view your orders.</p>
          <Link to="/login" className="button primary">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>View and track your orders</p>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error.message || 'Unable to load your orders. Please try again later.'}</p>
          <button onClick={() => mutate()} className="button primary">Try Again</button>
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="empty-orders">
          <div className="empty-orders-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <h2>No Orders Found</h2>
          <p>You haven't placed any orders yet.</p>
          <Link to="/products" className="button primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <div className="order-id">
                    <span className="label">Order ID:</span>
                    <span className="value">{order._id}</span>
                  </div>
                  <div className="order-date">
                    <span className="label">Placed on:</span>
                    <span className="value">{formatDate(order.createdAt)}</span>
                  </div>
                </div>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>
              
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-name">{item.name}</div>
                    <div className="item-details">
                      <span className="item-quantity">Qty: {item.quantity}</span>
                      <span className="item-price">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-footer">
                <div className="order-total">
                  <span className="label">Total:</span>
                  <span className="value">${order.total.toFixed(2)}</span>
                </div>
                <div className="order-payment">
                  <span className="label">Payment:</span>
                  <span className="value">{order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
