import React, { useId } from 'react'
import { createPortal } from 'react-dom'
import ModalImage from './ModalImage'
import { useDialog } from '../../hooks/useDialog'
import closeIcon from '../../assets/modals/close.svg'

export const IconButton = ({ icon, label, onClick }) => (
  <button type="button" className="modal-icon-btn" aria-label={label} onClick={onClick}>
    <img src={icon} alt="" />
  </button>
)

// `bare` renders a compact card without the header (e.g. success toasts).
// `cardClassName` replaces the card's default class for custom layouts.
const Modal = ({ title, illustration, actions, bare = false, cardClassName, onClose, children }) => {
  const titleId = useId()
  const dialogRef = useDialog(onClose)

  const handleBackdropMouseDown = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return createPortal(
    <div className="modal-backdrop" onMouseDown={handleBackdropMouseDown}>
      <div
        ref={dialogRef}
        className={cardClassName ?? (bare ? 'modal-toast' : 'modal')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={bare ? undefined : titleId}
        aria-label={bare ? title : undefined}
        tabIndex={-1}
      >
        {!bare && (
          <div className={`modal-header ${illustration ? '' : 'modal-header--compact'}`}>
            <div className="modal-heading">
              {illustration && (
                <ModalImage name={illustration} className="modal-illustration" />
              )}
              <h2 id={titleId} className="modal-title">
                {title}
              </h2>
            </div>

            <div className="modal-header-actions">
              {actions}
              <IconButton icon={closeIcon} label="Close" onClick={onClose} />
            </div>
          </div>
        )}

        {children}
      </div>
    </div>,
    document.body,
  )
}

export default Modal
