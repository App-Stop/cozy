import React, { useState } from 'react'
import Modal from './Modal'
import { TextField } from './ModalParts'

const TrackOrderModal = ({ onTrack, onClose }) => {
  const [orderId, setOrderId] = useState('')
  const trimmedId = orderId.trim()

  const handleSubmit = (event) => {
    event.preventDefault()
    onTrack(trimmedId)
  }

  return (
    <Modal title="Track your order" illustration="track-order" onClose={onClose}>
      <form className="modal-body" onSubmit={handleSubmit}>
        <TextField
          label="Order ID"
          placeholder="ORDER-213213"
          value={orderId}
          onChange={(event) => setOrderId(event.target.value)}
          autoFocus
        />

        <p className="modal-hint">Check your SMS or Email for the Order ID</p>

        <button type="submit" className="modal-btn modal-btn-primary" disabled={!trimmedId}>
          Track
        </button>
      </form>
    </Modal>
  )
}

export default TrackOrderModal
