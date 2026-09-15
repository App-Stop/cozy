import React, { useState } from 'react'
import { useCart } from '../../context/cart'
import { applyPromoCode } from '../../services/promo'

// Shared by the cart drawer and the checkout order summary.
const PromoCode = () => {
  const { promo, setPromo } = useCart()
  const [code, setCode] = useState('')
  const [applying, setApplying] = useState(false)
  const [error, setError] = useState('')

  if (promo) {
    return (
      <div className="cart-promo">
        <span className="cart-promo-applied">
          Code <strong>{promo.code}</strong> applied
        </span>
        <button type="button" className="cart-promo-action" onClick={() => setPromo(null)}>
          Remove
        </button>
      </div>
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setApplying(true)
    setError('')
    try {
      setPromo(await applyPromoCode(code))
      setCode('')
    } catch {
      setError('That promo code isn’t valid.')
    } finally {
      setApplying(false)
    }
  }

  return (
    <div>
      <form className="cart-promo" onSubmit={handleSubmit}>
        <input
          className="cart-promo-input"
          placeholder="Enter promo code"
          aria-label="Promo code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
        <button type="submit" className="cart-promo-action" disabled={!code.trim() || applying}>
          {applying ? 'Applying…' : 'Apply'}
        </button>
      </form>
      {error && <p className="modal-error">{error}</p>}
    </div>
  )
}

export default PromoCode
