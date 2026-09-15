import React, { useState } from 'react'
import { CartContext, summarizeCart } from './cart'
import { SAMPLE_CART } from '../data/products'

const CartProvider = ({ children }) => {
  const [items, setItems] = useState(SAMPLE_CART)
  const [promo, setPromo] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const changeQty = (productId, delta) =>
    setItems((list) => {
      const existing = list.find((item) => item.productId === productId)
      const qty = (existing?.qty ?? 0) + delta

      if (qty <= 0) return list.filter((item) => item.productId !== productId)
      if (existing) {
        return list.map((item) => (item.productId === productId ? { ...item, qty } : item))
      }
      return [...list, { productId, qty }]
    })

  const value = {
    items,
    ...summarizeCart(items, promo),
    promo,
    setPromo,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem: (productId, qty = 1) => changeQty(productId, qty),
    removeOne: (productId) => changeQty(productId, -1),
    clearCart: () => {
      setItems([])
      setPromo(null)
    },
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
