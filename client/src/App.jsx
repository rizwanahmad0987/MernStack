import { Routes, Route, Link, Navigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx'
import { CartProvider, useCart } from './contexts/CartContext.jsx'
import { ToastProvider } from './contexts/ToastContext.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import FashionLogo from './images/Fashion.png'
import HomePage from './pages/HomePage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ContactPage from './pages/ContactPage.jsx'
import FAQPage from './pages/FAQPage.jsx'
import ShippingPolicyPage from './pages/ShippingPolicyPage.jsx'
import ReturnsExchangesPage from './pages/ReturnsExchangesPage.jsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx'
import Footer from './components/Footer.jsx'

function Header() {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const cartItemCount = items ? items.reduce((total, item) => total + item.quantity, 0) : 0;
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownOpen && !event.target.closest('.user-menu')) {
        setDropdownOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  // Toggle dropdown on click
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Close mobile menu when navigating
  const handleNavigation = () => {
    setMobileMenuOpen(false)
  }

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [mobileMenuOpen])
  
  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo" onClick={handleNavigation} style={{ display: 'flex', alignItems: 'center' }}>
            <img src={FashionLogo} alt="Logo" />
          </Link>
        
        {/* Hamburger menu button */}
        <button 
          className={`hamburger-menu ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${mobileMenuOpen ? 'nav-active' : ''}`}>
          <Link to="/" onClick={handleNavigation}>Home</Link>
          <Link to="/products" onClick={handleNavigation}>All Products</Link>
          <Link to="/products?category=Electronics" onClick={handleNavigation}>Electronics</Link>
          <Link to="/products?category=Clothing" onClick={handleNavigation}>Clothing</Link>
          <Link to="/products?category=Shoes" onClick={handleNavigation}>Shoes</Link>
          <Link to="/cart" onClick={handleNavigation}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', position: 'relative' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Cart
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </div>
          </Link>
          {user ? (
            <div className={`user-menu ${dropdownOpen ? 'dropdown-active' : ''}`}>
              <div className="user-avatar" onClick={toggleDropdown}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="dropdown-menu">
                <Link to="/profile" onClick={() => { setDropdownOpen(false); handleNavigation(); }}>My Profile</Link>
                <Link to="/orders" onClick={() => { setDropdownOpen(false); handleNavigation(); }}>My Orders</Link>
                {user.isAdmin && <Link to="/admin" onClick={() => { setDropdownOpen(false); handleNavigation(); }}>Admin Dashboard</Link>}
                <button className="linklike" onClick={() => { logout(); setDropdownOpen(false); handleNavigation(); }}>Sign Out</button>
              </div>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="auth-button signin" onClick={handleNavigation}>Sign In</Link>
              <Link to="/register" className="auth-button signup" onClick={handleNavigation}>Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

function CategoryRedirect() {
  const { category } = useParams();
  return <Navigate to={`/products?category=${encodeURIComponent(category)}`} replace />;
}

function AdminRoute({ children }) {
  const { user } = useAuth()
  if (!user?.isAdmin) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <div className="app-wrapper">
            <Header />
            <main className="container">
              <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={
                <ErrorBoundary>
                  <ProductsPage />
                </ErrorBoundary>
              } />
              <Route path="/category/:category" element={<CategoryRedirect />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              
              {/* Customer Service Pages */}
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
              <Route path="/returns-exchanges" element={<ReturnsExchangesPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  )
}
