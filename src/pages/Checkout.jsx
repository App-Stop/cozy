import React, { useId, useState } from 'react'
import { ChevronRight, Zap } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import PromoCode from '../components/cart/PromoCode'
import ModalImage from '../components/modals/ModalImage'
import { TextField } from '../components/modals/ModalParts'
import PaymentPicker from '../components/checkout/PaymentPicker'
import PlacingOrderModal from '../components/checkout/PlacingOrderModal'
import { AppPromoCard, OrderLines } from '../components/checkout/OrderParts'
import { useCart } from '../context/cart'
import { useFulfilment } from '../context/location'
import { useOrders } from '../context/order'
import { VAT_RATE, formatPrice } from '../data/products'
import { DELIVERY_SPEEDS, PICKUP_TIMING, describePayment } from '../data/orders'
import { trackingPath } from '../hooks/useHashRoute'
import discountIcon from '../assets/cart/discount.svg'
import './checkout.css'

const CRUMBS = [{ label: 'Home', href: '#' }, { label: 'Checkout' }]

const PhoneField = ({ value, onChange }) => (
  <label className="modal-field">
    <span className="modal-field-label">Phone</span>
    <span className="checkout-phone">
      <span aria-hidden="true">🇺🇸</span>
      <input
        type="tel"
        className="modal-field-input"
        autoComplete="tel"
        placeholder="+1 213 1231232"
        value={value}
        onChange={onChange}
      />
    </span>
  </label>
)

const DeliveryOptions = ({
  instructions,
  onInstructionsChange,
  leaveAtDoor,
  onLeaveAtDoorChange,
  speed,
  onSpeedChange,
}) => {
  const doorLabelId = useId()
  const { type, label, value, openLocationPicker } = useFulfilment()
  const isPickup = type === 'pickup'
  const standardFee = DELIVERY_SPEEDS[0].fee

  return (
    <section className="checkout-block">
      <div className="checkout-block-header">
        <h2 className="checkout-block-title">{isPickup ? 'Pickup options' : 'Delivery options'}</h2>
        <button
          type="button"
          className="checkout-link"
          onClick={() => openLocationPicker(isPickup ? 'delivery' : 'pickup')}
        >
          {isPickup ? 'Deliver instead' : 'Pickup instead'}
        </button>
      </div>

      <div className="checkout-stack">
        <div className="checkout-card checkout-card--address">
          <button type="button" className="checkout-address" onClick={() => openLocationPicker()}>
            <ModalImage name={isPickup ? 'pickup-shop' : 'delivery-scooter'} className="checkout-option-icon" />
            <span className="checkout-address-text">
              <span className="checkout-label">{label}</span>
              <span className="checkout-address-value">{value}</span>
            </span>
            <ChevronRight className="checkout-chevron" size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>

          <label className="checkout-instructions">
            <span className="checkout-label">Instructions (Optional)</span>
            <input
              className="modal-field-input"
              placeholder={isPickup ? 'Please give paper bag' : 'Please ring the bell twice'}
              value={instructions}
              onChange={(event) => onInstructionsChange(event.target.value)}
            />
          </label>
        </div>

        {isPickup && (
          <div className="checkout-card checkout-row">
            <ModalImage name="pickup-timings" className="checkout-option-icon" />
            <span className="checkout-row-label">Pickup timings: {PICKUP_TIMING}</span>
          </div>
        )}

        {!isPickup && (
          <>
            <div className="checkout-card checkout-row">
              <ModalImage name="leave-at-door" className="checkout-option-icon" />
              <span id={doorLabelId} className="checkout-row-label">
                Leave at the door
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={leaveAtDoor}
                aria-labelledby={doorLabelId}
                className="checkout-switch"
                onClick={() => onLeaveAtDoorChange(!leaveAtDoor)}
              >
                <span className="checkout-switch-thumb" />
              </button>
            </div>

            <div className="checkout-stack" role="radiogroup" aria-label="Delivery speed">
              {DELIVERY_SPEEDS.map((option) => {
                const extra = option.fee - standardFee
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={speed === option.id}
                    className="checkout-card checkout-row checkout-speed"
                    onClick={() => onSpeedChange(option.id)}
                  >
                    <span className="checkout-radio" aria-hidden="true" />
                    <span className="checkout-speed-info">
                      <span className="checkout-speed-name">
                        {option.label}
                        {extra > 0 && (
                          <Zap className="checkout-zap" size={16} strokeWidth={0} fill="currentColor" aria-hidden="true" />
                        )}
                      </span>
                      <span className="checkout-speed-eta">{option.eta}</span>
                    </span>
                    {extra > 0 && <span className="checkout-speed-extra">+{formatPrice(extra)}</span>}
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

const EmptyCheckout = () => (
  <div className="checkout-page">
    <Breadcrumb items={CRUMBS} />
    <div className="checkout-container checkout-empty">
      <h1 className="checkout-title">Your cart is empty</h1>
      <p className="checkout-empty-text">Add a few treats before checking out.</p>
      <a href="#menu" className="hero-btn">
        Back to menu
      </a>
    </div>
  </div>
)

// Figma node 1:3352 — contact details, delivery options, payment and summary.
const Checkout = () => {
  const { lines, subtotal, promo, promoDiscount, vat, total, savings, clearCart } = useCart()
  const {
    fulfilment,
    type,
    label,
    value,
    instructions: savedInstructions,
    openLocationPicker,
  } = useFulfilment()
  const { placeOrder } = useOrders()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [instructions, setInstructions] = useState(savedInstructions ?? '')
  const [instructionsFor, setInstructionsFor] = useState(value)
  const [leaveAtDoor, setLeaveAtDoor] = useState(false)
  const [speed, setSpeed] = useState(DELIVERY_SPEEDS[0].id)
  const [payment, setPayment] = useState({ type: 'cash' })
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [placing, setPlacing] = useState(false)
  const [placed, setPlaced] = useState(false)
  const [error, setError] = useState('')

  // Pre-fill the instructions saved with an address whenever the address changes.
  if (instructionsFor !== value) {
    setInstructionsFor(value)
    setInstructions(savedInstructions ?? '')
  }

  // Once the order is placed the cart empties just before we leave the page.
  if (lines.length === 0) return placed ? null : <EmptyCheckout />

  const isPickup = type === 'pickup'
  const speedOption = DELIVERY_SPEEDS.find((option) => option.id === speed)
  const deliveryFee = isPickup ? 0 : speedOption.fee
  const grandTotal = total + deliveryFee
  const paymentInfo = describePayment(payment, grandTotal, { pickup: isPickup })
  const orderLines = lines.map(({ product, qty, total: lineTotal }) => ({
    id: product.id,
    name: product.name,
    qty,
    total: lineTotal,
  }))

  const handlePlaceOrder = () => {
    if (!fulfilment) {
      openLocationPicker()
      return
    }
    if (!name.trim() || phone.replace(/\D/g, '').length < 7) {
      setError('Please add your name and phone number.')
      return
    }
    setError('')
    setPlacing(true)
  }

  const confirmOrder = () => {
    const id = placeOrder({
      customer: { name: name.trim(), phone: phone.trim() },
      fulfilment: { type, label, value },
      instructions: instructions.trim(),
      leaveAtDoor: !isPickup && leaveAtDoor,
      speed: isPickup ? null : speed,
      pickupTiming: isPickup ? PICKUP_TIMING : null,
      payment,
      lines: orderLines,
      subtotal,
      promoDiscount,
      deliveryFee,
      vat,
      total: grandTotal,
    })
    setPlaced(true)
    clearCart()
    window.location.assign(trackingPath(id))
  }

  return (
    <div className="checkout-page">
      <Breadcrumb items={CRUMBS} />

      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          <div className="checkout-main">
            <section className="checkout-block">
              <h2 className="checkout-block-title">Your information</h2>
              <div className="modal-fields">
                <TextField
                  label="Name"
                  autoComplete="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <PhoneField value={phone} onChange={(event) => setPhone(event.target.value)} />
              </div>
            </section>

            <DeliveryOptions
              instructions={instructions}
              onInstructionsChange={setInstructions}
              leaveAtDoor={leaveAtDoor}
              onLeaveAtDoorChange={setLeaveAtDoor}
              speed={speed}
              onSpeedChange={setSpeed}
            />

            <section className="checkout-block">
              <h2 className="checkout-block-title">Payment method</h2>
              <button
                type="button"
                className="checkout-card checkout-payment"
                onClick={() => setPaymentOpen(true)}
              >
                <ModalImage name={paymentInfo.icon} className="checkout-option-icon" />
                <span className="payment-text">
                  <span className="payment-title">{paymentInfo.title}</span>
                  <span className="payment-detail">{paymentInfo.detail}</span>
                </span>
                <ChevronRight className="checkout-chevron" size={20} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </section>
          </div>

          <div className="checkout-side">
            <section className="checkout-summary">
              <h2 className="checkout-block-title">Order summary</h2>
              <OrderLines lines={orderLines} />
              <hr className="order-divider" />
              <div className="order-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {promo && (
                <div className="order-row">
                  <span>Promo ({promo.code})</span>
                  <span>-{formatPrice(promoDiscount)}</span>
                </div>
              )}
              {!isPickup && (
                <div className="order-row">
                  <span>Delivery Fee ({speedOption.label})</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
              )}
              <div className="order-row">
                <span>VAT</span>
                <span>
                  {formatPrice(vat)} ({VAT_RATE * 100}%)
                </span>
              </div>

              <PromoCode />

              {savings > 0 && (
                <p className="cart-savings">
                  <img src={discountIcon} alt="" />
                  You’ve saved {formatPrice(savings)} with discounts
                </p>
              )}

              <p className="checkout-terms">
                By placing the order, I agree to all <strong>terms &amp; conditions</strong>
              </p>
            </section>

            <div className="checkout-total-block">
              <div className="checkout-total">
                <span>Total</span>
                <strong>{formatPrice(grandTotal)}</strong>
              </div>
              {error && (
                <p className="modal-error" role="alert">
                  {error}
                </p>
              )}
              <button type="button" className="modal-btn modal-btn-primary" onClick={handlePlaceOrder}>
                Place order
              </button>
            </div>

            <AppPromoCard />
          </div>
        </div>
      </div>

      {paymentOpen && (
        <PaymentPicker value={payment} onChange={setPayment} onClose={() => setPaymentOpen(false)} />
      )}

      {placing && (
        <PlacingOrderModal
          addressTitle={isPickup ? 'Pickup from' : 'Delivery address'}
          address={value}
          paymentLabel={paymentInfo.short}
          lines={orderLines}
          total={grandTotal}
          onConfirm={confirmOrder}
          onCancel={() => setPlacing(false)}
        />
      )}
    </div>
  )
}

export default Checkout
