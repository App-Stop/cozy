import React, { useId, useState } from 'react'
import { Croissant, Star } from 'lucide-react'
import Modal from '../modals/Modal'
import { OrderItemsCard, StatusGlow, StatusHero } from './OrderParts'
import { APP_BONUS_POINTS, ORDER_POINTS } from '../../data/orders'
import qrCode from '../../assets/app-promo/qr-code.png'

const RATINGS = [1, 2, 3, 4, 5]

const PointsIcon = ({ inverse = false }) => (
  <span className={`points-icon ${inverse ? 'points-icon--inverse' : ''}`} aria-hidden="true">
    <Croissant strokeWidth={2} />
  </span>
)

// Figma node 1:8545 — shown once the order is delivered. Closing it, or going
// back home, hands the rating and comment to `onClose`.
const OrderDeliveredModal = ({ title, lines, total, note, onClose }) => {
  const ratingId = useId()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const finish = () => onClose({ rating, comment: comment.trim() })

  return (
    <Modal bare title={title} cardClassName="order-sheet" onClose={finish}>
      <div className="order-sheet-header">
        <StatusGlow />
        <StatusHero
          art="checkmark"
          title={title}
          text="Enjoy your freshly baked meal"
          artClassName="status-art--pop"
        />
      </div>

      <div className="order-sheet-body">
        <p className="points-banner">
          <span className="points-amount">
            <PointsIcon />+{ORDER_POINTS}
          </span>
          <span className="points-label">Cozy Points</span>
        </p>

        <div className="app-points">
          <div className="app-points-copy">
            <p className="app-points-title">
              Get
              <span className="app-points-bonus">
                <PointsIcon inverse />+{APP_BONUS_POINTS}
              </span>
              more on our app
            </p>
            <p className="app-points-text">Scan and download now!</p>
          </div>
          <img src={qrCode} alt="QR code to download the app" className="app-points-qr" />
        </div>

        <div className="rating-card">
          <p id={ratingId} className="order-card-title">
            How was your experience?
          </p>
          <div className="rating-stars" role="radiogroup" aria-labelledby={ratingId}>
            {RATINGS.map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                aria-label={`${value} star${value > 1 ? 's' : ''}`}
                className={`rating-star ${value <= rating ? 'rating-star--filled' : ''}`}
                onClick={() => setRating(value)}
              >
                <Star strokeWidth={1.5} />
              </button>
            ))}
          </div>
          <label className="rating-comment">
            <span className="checkout-label">Add a comment (Optional)</span>
            <textarea
              rows={2}
              placeholder="Really loved the croissant!"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>
        </div>

        <OrderItemsCard lines={lines} total={total} note={note} />

        <a href="#" className="modal-btn modal-btn-soft order-sheet-link" onClick={finish}>
          Back to home
        </a>
      </div>
    </Modal>
  )
}

export default OrderDeliveredModal
