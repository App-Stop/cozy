import { createContext, useContext } from 'react'
import { PRODUCTS, VAT_RATE } from '../data/products'

export const CartContext = createContext(null)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside <CartProvider>')
  return context
}

const sum = (values) => values.reduce((total, value) => total + value, 0)

// Derives line prices, discounts and totals from the raw cart items.
export const summarizeCart = (items, promo) => {
  const lines = items.map(({ productId, qty }) => {
    const product = PRODUCTS[productId]
    const offer = product.bulkOffer
    const offerApplies = Boolean(offer) && qty >= offer.minQty
    const unitPrice = offerApplies ? product.price * (1 - offer.percentOff / 100) : product.price

    return {
      product,
      qty,
      unitPrice,
      total: unitPrice * qty,
      savings: ((product.originalPrice ?? product.price) - unitPrice) * qty,
      qtyForOffer: offer && !offerApplies ? offer.minQty - qty : 0,
    }
  })

  const subtotal = sum(lines.map((line) => line.total))
  const promoDiscount = promo ? subtotal * (promo.percentOff / 100) : 0
  const vat = (subtotal - promoDiscount) * VAT_RATE

  return {
    lines,
    count: sum(lines.map((line) => line.qty)),
    subtotal,
    promoDiscount,
    vat,
    total: subtotal - promoDiscount + vat,
    savings: sum(lines.map((line) => line.savings)) + promoDiscount,
  }
}
