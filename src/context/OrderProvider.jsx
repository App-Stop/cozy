import React, { useEffect, useState } from 'react'
import { OrderContext } from './order'
import { createOrderId } from '../data/orders'

// Placed orders are kept in localStorage so the tracking page survives a
// refresh. Swap for the orders API once the backend exists.
const STORAGE_KEY = 'cozy-orders'

const loadOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}
  } catch {
    return {}
  }
}

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(loadOrders)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
    } catch {
      // Storage can be unavailable (private mode, blocked site data).
    }
  }, [orders])

  const placeOrder = (details) => {
    const id = createOrderId()
    setOrders((list) => ({ ...list, [id]: { ...details, id, placedAt: Date.now() } }))
    return id
  }

  const updateOrder = (id, changes) =>
    setOrders((list) => (list[id] ? { ...list, [id]: { ...list[id], ...changes } } : list))

  const value = {
    getOrder: (id) => orders[id] ?? null,
    placeOrder,
    updateOrder,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export default OrderProvider
