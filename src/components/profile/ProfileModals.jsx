import { useRef, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import Modal from '../modals/Modal'
import ModalImage from '../modals/ModalImage'
import { PointsIcon } from './ProfileParts'
import { formatPrice } from '../../data/products'
import { NOTIFICATION_GROUPS } from '../../data/profile'
import editIcon from '../../assets/modals/edit.svg'

// A modal field with a pencil that focuses the input.
const EditableField = ({ label, hint, ...inputProps }) => {
  const inputRef = useRef(null)

  return (
    <label className="modal-field profile-edit-field">
      <span className="modal-field-label">
        {label}
        {hint && <span className="modal-field-label-accent">{hint}</span>}
      </span>
      <input ref={inputRef} className="modal-field-input" {...inputProps} />
      <button
        type="button"
        className="profile-edit-field-btn"
        aria-label={`Edit ${label.toLowerCase()}`}
        onClick={() => inputRef.current.focus()}
      >
        <img src={editIcon} alt="" />
      </button>
    </label>
  )
}

/* ---------- Edit profile (Figma node 1:8705) ---------- */

export const EditProfileModal = ({ account, onSave, onClose }) => {
  const [form, setForm] = useState({
    name: account.name,
    phone: account.phone,
    email: account.email,
  })

  const updateField = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave({ name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim() })
  }

  return (
    <Modal title="My Profile" onClose={onClose}>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="modal-fields">
          <EditableField
            label="Name"
            autoComplete="name"
            value={form.name}
            onChange={updateField('name')}
            required
          />
          <EditableField
            label="Phone Number"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={updateField('phone')}
            required
          />
          <EditableField
            label="Email"
            hint="(Receive exclusive promos & discounts)"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={updateField('email')}
          />
        </div>

        <button type="submit" className="modal-btn modal-btn-primary" disabled={!form.name.trim()}>
          Save changes
        </button>
      </form>
    </Modal>
  )
}

/* ---------- Notifications (Figma node 1:8737) ---------- */

export const NotificationsModal = ({ settings, onSave, onClose }) => {
  const [draft, setDraft] = useState(settings)

  const toggle = (key) => setDraft((current) => ({ ...current, [key]: !current[key] }))

  return (
    <Modal title="Notifications" onClose={onClose}>
      <div className="notification-groups">
        {NOTIFICATION_GROUPS.map(({ title, options }) => (
          <section key={title} className="notification-group">
            <h3 className="notification-group-title">{title}</h3>
            {options.map(({ key, label }) => (
              <div key={key} className="notification-row">
                <span id={`notification-${key}`}>{label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={Boolean(draft[key])}
                  aria-labelledby={`notification-${key}`}
                  className="toggle"
                  onClick={() => toggle(key)}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
            ))}
          </section>
        ))}
      </div>

      <button type="button" className="modal-btn modal-btn-primary" onClick={() => onSave(draft)}>
        Save changes
      </button>
    </Modal>
  )
}

/* ---------- Withdraw points (Figma node 1:8985) ---------- */

export const WithdrawSuccessModal = ({ points, balance, onClose }) => (
  <Modal bare title="Withdraw Successful" cardClassName="modal-toast withdraw-toast" onClose={onClose}>
    <ModalImage name="checkmark" className="otp-verified-check" />
    <p className="otp-verified-title">Withdraw Successful</p>

    <div className="withdraw-flow">
      <div className="withdraw-card">
        <p className="withdraw-card-value">
          <PointsIcon size={24} />
          {points}
        </p>
        <p className="withdraw-card-label">Cozy Points</p>
      </div>
      <ArrowDown className="withdraw-arrow" strokeWidth={1.5} aria-hidden="true" />
      <div className="withdraw-card">
        <p className="withdraw-card-value">{formatPrice(balance)}</p>
        <p className="withdraw-card-label">Wallet balance</p>
      </div>
    </div>

    <button type="button" className="modal-btn modal-btn-soft" onClick={onClose}>
      Continue
    </button>
  </Modal>
)
