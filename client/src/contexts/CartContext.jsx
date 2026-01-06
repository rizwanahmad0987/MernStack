import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useToast } from './ToastContext.jsx'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // [{product, quantity}]
  const { showSuccess } = useToast()

  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  function addToCart(product, quantity = 1) {
    setItems(prev => {
      const idx = prev.findIndex(x => x.product._id === product._id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity }
        return next
      }
      return [...prev, { product, quantity }]
    })
    
    // Show notification
    showSuccess(`Added ${quantity} ${product.name} to cart`)
  }

  function updateQuantity(productId, quantity) {
    const q = Math.max(1, Number(quantity || 1))
    setItems(prev => prev.map(x => x.product._id === productId ? { ...x, quantity: q } : x))
  }

  function removeFromCart(productId) {
    const item = items.find(x => x.product._id === productId)
    setItems(prev => prev.filter(x => x.product._id !== productId))
    if (item) {
      showSuccess(`Removed ${item.product.name} from cart`)
    }
  }

  function clearCart() { setItems([]) }

  const total = useMemo(() => items.reduce((sum, x) => sum + x.product.price * x.quantity, 0), [items])
  const itemCount = useMemo(() => items.reduce((sum, x) => sum + x.quantity, 0), [items])

  const value = { items, addToCart, updateQuantity, removeFromCart, clearCart, total, itemCount }
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() { return useContext(CartContext) }


