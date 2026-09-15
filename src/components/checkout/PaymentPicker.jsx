import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import Modal from '../modals/Modal'
import ModalImage from '../modals/ModalImage'
import { TextField } from '../modals/ModalParts'

const CARD_BRANDS = ['card-mastercard', 'card-visa', 'card-amex']

const digits = (value) => value.replace(/\D/g, '')

const formatCardNumber = (value) =>
  digits(value)
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, '$1 ')

const formatExpiry = (value) => {
  const numbers = digits(value).slice(0, 4)
  return numbers.length > 2 ? `${numbers.slice(0, 2)}/${numbers.slice(2)}` : numbers
}

// Figma node 1:8424 — pick cash, a saved card, or add a new card.
const PaymentMethodModal = ({ value, onSelect, onAddCard, onClose }) => (
  <Modal title="Payment Method" onClose={onClose}>
    <div className="pay-options">
      <div className="pay-options" role="radiogroup" aria-label="Payment method">
        <button
          type="button"
          role="radio"
          aria-checked={value.type === 'cash'}
          className="pay-option"
          onClick={() => onSelect({ type: 'cash' })}
        >
          <ModalImage name="payment-cash" className="pay-option-icon" />
          <span className="payment-text">
            <span className="payment-title">Cash</span>
            <span className="payment-detail">Pay cash at the end of delivery</span>
          </span>
          <span className="checkout-radio" aria-hidden="true" />
        </button>

        {value.type === 'card' && (
          <button type="button" role="radio" aria-checked="true" className="pay-option" onClick={() => onSelect(value)}>
            <ModalImage name="payment-card" className="pay-option-icon" />
            <span className="payment-text">
              <span className="payment-title">Card ending in {value.last4}</span>
              <span className="payment-detail">
                {value.holder} · Expires {value.expiry}
              </span>
            </span>
            <span className="checkout-radio" aria-hidden="true" />
          </button>
        )}
      </div>

      <button type="button" className="pay-option" onClick={onAddCard}>
        <ModalImage name="payment-card" className="pay-option-icon" />
        <span className="payment-text">
          <span className="payment-title">
            {value.type === 'card' ? 'Use another card' : 'Credit or Debit card'}
          </span>
          <span className="pay-brands">
            {CARD_BRANDS.map((brand) => (
              <ModalImage key={brand} name={brand} className="pay-brand" />
            ))}
          </span>
        </span>
        <ChevronRight className="pay-option-arrow" size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  </Modal>
)

// Figma node 1:8653. Only the last four digits leave this form — the full
// number and CVV should go straight to the payment provider once integrated.
const AddCardModal = ({ onAdd, onBack }) => {
  const [number, setNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [holder, setHolder] = useState('')

  const cardDigits = digits(number)
  const isValid =
    cardDigits.length >= 13 &&
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) &&
    /^\d{3,4}$/.test(cvv) &&
    holder.trim().length > 0

  const handleSubmit = (event) => {
    event.preventDefault()
    onAdd({ last4: cardDigits.slice(-4), expiry, holder: holder.trim() })
  }

  return (
    <Modal title="Add Credit or Debit card" onClose={onBack}>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="modal-fields">
          <TextField
            label="Card Number"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 8021 2134 2311"
            value={number}
            onChange={(event) => setNumber(formatCardNumber(event.target.value))}
            autoFocus
          />
          <div className="card-fields-row">
            <TextField
              label="Expiry"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={expiry}
              onChange={(event) => setExpiry(formatExpiry(event.target.value))}
            />
            <TextField
              label="CVV"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="000"
              value={cvv}
              onChange={(event) => setCvv(digits(event.target.value).slice(0, 4))}
            />
          </div>
          <TextField
            label="Card Holder Name"
            autoComplete="cc-name"
            placeholder="John Doe"
            value={holder}
            onChange={(event) => setHolder(event.target.value)}
          />
        </div>

        <button type="submit" className="modal-btn modal-btn-primary" disabled={!isValid}>
          Add Card
        </button>
      </form>
    </Modal>
  )
}

// `value` is `{ type: 'cash' }` or `{ type: 'card', last4, expiry, holder }`.
const PaymentPicker = ({ value, onChange, onClose }) => {
  const [step, setStep] = useState('methods')

  const select = (payment) => {
    onChange(payment)
    onClose()
  }

  if (step === 'add-card') {
    return <AddCardModal onAdd={(card) => select({ type: 'card', ...card })} onBack={() => setStep('methods')} />
  }

  return (
    <PaymentMethodModal
      value={value}
      onSelect={select}
      onAddCard={() => setStep('add-card')}
      onClose={onClose}
    />
  )
}

export default PaymentPicker
