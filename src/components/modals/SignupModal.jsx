import React, { useEffect, useRef, useState } from 'react'
import Modal from './Modal'
import ModalImage from './ModalImage'
import { TextField } from './ModalParts'
import { sendOtp, verifyOtp } from '../../services/auth'

const OTP_LENGTH = 4
const RESEND_COOLDOWN_S = 30
// Matches one 2s loop of the Figma checkmark animation.
const VERIFIED_DISPLAY_MS = 2000

const DetailsStep = ({ initialDetails, onSubmit, onClose }) => {
  const [details, setDetails] = useState(initialDetails)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const phoneDigits = details.phone.replace(/\D/g, '')
  const canSubmit = details.name.trim() && phoneDigits.length >= 10 && !submitting

  const updateField = (key) => (event) =>
    setDetails((current) => ({ ...current, [key]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await onSubmit({
        name: details.name.trim(),
        phone: details.phone.trim(),
        email: details.email.trim(),
      })
    } catch {
      setError('We couldn’t send the code. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <Modal title="Sign Up" onClose={onClose}>
      <form className="modal-body" onSubmit={handleSubmit}>
        <div className="modal-fields">
          <TextField
            label="Name"
            placeholder="John Doe"
            autoComplete="name"
            value={details.name}
            onChange={updateField('name')}
            autoFocus
            required
          />
          <TextField
            label="Phone Number"
            type="tel"
            inputMode="tel"
            placeholder="(555) 214 12312"
            autoComplete="tel"
            value={details.phone}
            onChange={updateField('phone')}
            required
          />
          <TextField
            label={
              <>
                Email
                <span className="modal-field-label-accent">
                  (Receive exclusive promos &amp; discounts)
                </span>
              </>
            }
            type="email"
            placeholder="john@gmail.com"
            autoComplete="email"
            value={details.email}
            onChange={updateField('email')}
          />
        </div>

        {error && <p className="modal-error">{error}</p>}

        <button type="submit" className="modal-btn modal-btn-primary" disabled={!canSubmit}>
          {submitting ? 'Sending code…' : 'Continue'}
        </button>
      </form>
    </Modal>
  )
}

const OtpStep = ({ phone, onVerified, onClose }) => {
  const [digits, setDigits] = useState(() => Array(OTP_LENGTH).fill(''))
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState('')
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_S)
  const inputsRef = useRef([])

  const code = digits.join('')

  useEffect(() => {
    if (cooldown === 0) return undefined
    const timer = setTimeout(() => setCooldown((seconds) => seconds - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  const focusBox = (index) => inputsRef.current[index]?.focus()

  // Writes `value`'s digits into consecutive boxes starting at `start`.
  const fillFrom = (start, value) => {
    const chars = value.replace(/\D/g, '').slice(0, OTP_LENGTH - start).split('')
    if (chars.length === 0) return

    setDigits((current) =>
      current.map((digit, index) =>
        index >= start && index < start + chars.length ? chars[index - start] : digit,
      ),
    )
    setError('')
    focusBox(Math.min(start + chars.length, OTP_LENGTH - 1))
  }

  const clearBox = (index) =>
    setDigits((current) => current.map((digit, i) => (i === index ? '' : digit)))

  const handleChange = (index) => (event) => {
    const { value } = event.target
    if (!value) {
      clearBox(index)
      return
    }
    // A single keystroke over an existing digit yields two chars; keep the new one.
    // Longer values come from one-time-code autofill.
    fillFrom(index, value.length > 2 ? value : value.slice(-1))
  }

  const handleKeyDown = (index) => (event) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      event.preventDefault()
      clearBox(index - 1)
      focusBox(index - 1)
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault()
      focusBox(index - 1)
    } else if (event.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      event.preventDefault()
      focusBox(index + 1)
    }
  }

  const handlePaste = (index) => (event) => {
    event.preventDefault()
    fillFrom(index, event.clipboardData.getData('text'))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setVerifying(true)
    setError('')
    try {
      await verifyOtp(phone, code)
      onVerified()
    } catch {
      setVerifying(false)
      setError('That code isn’t right. Please try again.')
      setDigits(Array(OTP_LENGTH).fill(''))
      focusBox(0)
    }
  }

  const resend = async () => {
    setError('')
    try {
      await sendOtp(phone)
      setCooldown(RESEND_COOLDOWN_S)
    } catch {
      setError('We couldn’t resend the code. Please try again.')
    }
  }

  return (
    <Modal title="OTP Verification" onClose={onClose}>
      <p className="otp-description">
        A {OTP_LENGTH} digit OTP is sent on your phone number{' '}
        <span className="otp-phone">{phone}</span>
      </p>

      <form className="otp-form" onSubmit={handleSubmit}>
        <div className="otp-group">
          <div>
            <div className="otp-boxes" role="group" aria-label="One-time code">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputsRef.current[index] = element
                  }}
                  className="otp-box"
                  value={digit}
                  inputMode="numeric"
                  autoComplete={index === 0 ? 'one-time-code' : 'off'}
                  aria-label={`Digit ${index + 1}`}
                  autoFocus={index === 0}
                  onChange={handleChange(index)}
                  onKeyDown={handleKeyDown(index)}
                  onPaste={handlePaste(index)}
                  onFocus={(event) => event.target.select()}
                />
              ))}
            </div>
            {error && <p className="modal-error">{error}</p>}
          </div>

          <button type="button" className="otp-resend" disabled={cooldown > 0} onClick={resend}>
            {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend Code'}
          </button>
        </div>

        <button
          type="submit"
          className="modal-btn modal-btn-primary"
          disabled={code.length < OTP_LENGTH || verifying}
        >
          {verifying ? 'Verifying…' : 'Verify'}
        </button>
      </form>
    </Modal>
  )
}

const VerifiedToast = ({ onDone }) => {
  useEffect(() => {
    const timer = setTimeout(onDone, VERIFIED_DISPLAY_MS)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <Modal bare title="OTP Verified" onClose={onDone}>
      <ModalImage name="checkmark" className="otp-verified-check" />
      <p className="otp-verified-title">OTP Verified</p>
    </Modal>
  )
}

const SignupModal = ({ onComplete, onClose }) => {
  // 'details' → 'otp' → 'verified'
  const [step, setStep] = useState('details')
  const [details, setDetails] = useState({ name: '', phone: '', email: '' })

  const submitDetails = async (nextDetails) => {
    await sendOtp(nextDetails.phone)
    setDetails(nextDetails)
    setStep('otp')
  }

  if (step === 'verified') {
    return <VerifiedToast onDone={() => onComplete(details)} />
  }

  if (step === 'otp') {
    return (
      <OtpStep phone={details.phone} onVerified={() => setStep('verified')} onClose={onClose} />
    )
  }

  return <DetailsStep initialDetails={details} onSubmit={submitDetails} onClose={onClose} />
}

export default SignupModal
