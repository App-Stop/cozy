import React, { useEffect, useRef, useState } from 'react'
import Modal from '../modals/Modal'
import { InfoCard, OrderItemsCard, StatusGlow, StatusHero } from './OrderParts'
import { PLACE_ORDER_DELAY } from '../../data/orders'

// Figma node 1:8477 — counts down before the order is sent so it can still be
// changed; closing the modal (or the button) cancels.
const PlacingOrderModal = ({ addressTitle, address, paymentLabel, lines, total, onConfirm, onCancel }) => {
  const [secondsLeft, setSecondsLeft] = useState(PLACE_ORDER_DELAY)
  const onConfirmRef = useRef(onConfirm)

  useEffect(() => {
    onConfirmRef.current = onConfirm
  })

  useEffect(() => {
    if (secondsLeft === 0) {
      onConfirmRef.current()
      return undefined
    }
    const timer = setTimeout(() => setSecondsLeft((value) => value - 1), 1000)
    return () => clearTimeout(timer)
  }, [secondsLeft])

  return (
    <Modal bare title="Placing order" cardClassName="order-sheet" onClose={onCancel}>
      <div className="order-sheet-header">
        <StatusGlow />
        <StatusHero
          art="placing-order"
          title="Placing order..."
          text="Make sure everything looks right"
          artClassName="status-art--float"
        />
        <div
          className="order-progress"
          role="progressbar"
          aria-label="Placing order"
          aria-valuemin={0}
          aria-valuemax={PLACE_ORDER_DELAY}
          aria-valuenow={PLACE_ORDER_DELAY - secondsLeft}
        >
          <span className="order-progress-bar" />
        </div>
      </div>

      <div className="order-sheet-body">
        <InfoCard title={addressTitle}>{address}</InfoCard>
        <InfoCard title="Payment method">{paymentLabel}</InfoCard>
        <OrderItemsCard lines={lines} total={total} />
      </div>

      <div className="order-sheet-footer">
        <button type="button" className="modal-btn modal-btn-soft" onClick={onCancel}>
          I would like to change ({secondsLeft})
        </button>
      </div>
    </Modal>
  )
}

export default PlacingOrderModal
