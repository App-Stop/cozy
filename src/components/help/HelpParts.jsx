import { useEffect, useId, useMemo, useRef, useState } from 'react'
import {
  BadgePercent,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleQuestionMark,
  CircleUserRound,
  CreditCard,
  ImagePlus,
  Receipt,
  Search,
  ShieldCheck,
  ThumbsDown,
  ThumbsUp,
  UserPen,
  X,
} from 'lucide-react'

// Figma names its glyphs after the Hugeicons set; these are the lucide matches.
const MENU_ICONS = {
  invoice: Receipt,
  payment: CreditCard,
  'user-edit': UserPen,
  'user-circle': CircleUserRound,
  security: ShieldCheck,
  discount: BadgePercent,
  help: CircleQuestionMark,
}

export const HelpIconButton = ({ icon: Icon, label, onClick }) => (
  <button type="button" className="help-icon-btn" aria-label={label} onClick={onClick}>
    <Icon strokeWidth={1.5} />
  </button>
)

// The home screen has no back button, so the title slot is left empty there.
export const HelpHeader = ({ title, onBack, onClose, closeIcon = X, closeLabel = 'Close help centre' }) => (
  <div className="help-header">
    {onBack ? (
      <HelpIconButton icon={ChevronLeft} label="Back" onClick={onBack} />
    ) : (
      <span className="size-[50px] shrink-0" aria-hidden="true" />
    )}
    {title && <h2 className="help-header-title">{title}</h2>}
    {!title && <span className="flex-1" aria-hidden="true" />}
    <HelpIconButton icon={closeIcon} label={closeLabel} onClick={onClose} />
  </div>
)

export const HelpSearch = ({ placeholder, value, onChange }) => (
  <label className="help-search">
    <Search strokeWidth={1.5} />
    <input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </label>
)

export const HelpListItem = ({ icon, label, onClick }) => {
  const Icon = MENU_ICONS[icon]

  return (
    <button type="button" className="help-item" onClick={onClick}>
      <span className="help-item-label">
        {Icon && <Icon strokeWidth={1.5} />}
        {label}
      </span>
      <ChevronRight className="help-item-caret" strokeWidth={1.5} />
    </button>
  )
}

export const HelpOrderCard = ({ order, onClick }) => (
  <button type="button" className="help-order-card" onClick={onClick}>
    <span className="help-order-top">
      <span className="help-order-id">Order #{order.id}</span>
      <span className="help-badge">{order.status}</span>
    </span>
    <span className="help-order-meta">
      <span>{order.placedAt}</span>
      <span>{order.items === 1 ? '1 item' : `${order.items} items`}</span>
    </span>
  </button>
)

// Repeated at the top of every order-scoped screen.
export const HelpOrderSummary = ({ order }) => (
  <div className="help-order-summary">
    <div className="help-order-top">
      <span className="help-order-id">Order #{order.id}</span>
      <span className="help-badge">{order.status}</span>
    </div>
    <div className="help-order-meta">
      <span>{order.placedAt}</span>
      <span>{order.items === 1 ? '1 item' : `${order.items} items`}</span>
    </div>
  </div>
)

// First entry starts open, matching the designs.
export const HelpAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0)
  const baseId = useId()

  return (
    <div className="help-faqs">
      {faqs.map((faq, index) => {
        const open = openIndex === index
        const panelId = `${baseId}-${index}`

        return (
          <div className="help-faq" key={faq.q}>
            <button
              type="button"
              className="help-faq-trigger"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              {faq.q}
              <ChevronDown className="help-faq-caret" strokeWidth={1.5} />
            </button>
            {open && (
              <p id={panelId} className="help-faq-answer">
                {faq.a}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export const HelpField = ({ label, value, placeholder, textarea = false, onChange }) => (
  <label className="help-field">
    <span className="help-field-label">{label}</span>
    {textarea ? (
      <textarea
        rows={1}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    ) : (
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    )}
  </label>
)

export const HelpImageUpload = ({ file, onChange }) => {
  const inputRef = useRef(null)

  // Built once per file rather than on every render, so the URL can be revoked.
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview])

  return (
    <div className="help-upload">
      <div className="help-upload-preview">
        {preview ? <img src={preview} alt={file.name} /> : <ImagePlus strokeWidth={1.5} />}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
      <button type="button" className="help-upload-btn" onClick={() => inputRef.current.click()}>
        {file ? 'Replace image' : 'Upload an image'}
      </button>
    </div>
  )
}

// Grey "Was this helpful?" block. Submitting is local-only until the support
// API exists; the block then confirms and stops collecting.
export const HelpFeedback = () => {
  const [vote, setVote] = useState(null)
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="help-feedback">
        <p className="help-feedback-sent">Thanks — your feedback helps us improve.</p>
      </div>
    )
  }

  return (
    <form
      className="help-feedback"
      onSubmit={(event) => {
        event.preventDefault()
        setSent(true)
      }}
    >
      <div className="help-feedback-row">
        <p className="help-feedback-title">Was this helpful?</p>
        <div className="help-feedback-votes">
          <button
            type="button"
            className="help-vote"
            aria-label="Not helpful"
            aria-pressed={vote === 'down'}
            onClick={() => setVote(vote === 'down' ? null : 'down')}
          >
            <ThumbsDown strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="help-vote"
            aria-label="Helpful"
            aria-pressed={vote === 'up'}
            onClick={() => setVote(vote === 'up' ? null : 'up')}
          >
            <ThumbsUp strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <HelpField
        label="Feedback"
        placeholder="Solved my problem"
        value={note}
        textarea
        onChange={setNote}
      />

      <button type="submit" className="help-btn help-btn-primary" disabled={!vote && !note.trim()}>
        Submit
      </button>
    </form>
  )
}

// Sticky bottom call to action on the article screens.
export const HelpChatFooter = ({ onStartChat }) => (
  <div className="help-footer">
    <p className="help-footer-note">Didn’t resolve your issue?</p>
    <button type="button" className="help-btn help-btn-primary" onClick={onStartChat}>
      Start chat with support team
    </button>
  </div>
)
