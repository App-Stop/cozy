import React from 'react'
import { useCart } from '../../context/cart'
import basketIcon from '../../assets/cart/basket.svg'

const CartPill = () => {
  const { count, isOpen, openCart } = useCart()

  if (isOpen) return null

  return (
    <button type="button" className="cart-pill" onClick={openCart}>
      <img src={basketIcon} alt="" className="cart-pill-icon" />
      <span>Cart ({count})</span>
    </button>
  )
}

export default CartPill
