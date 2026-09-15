import React, { useId } from 'react'
import { createPortal } from 'react-dom'
import { Minus } from 'lucide-react'
import { IconButton } from '../modals/Modal'
import ModalImage from '../modals/ModalImage'
import PromoCode from './PromoCode'
import { useDialog } from '../../hooks/useDialog'
import { checkoutPath } from '../../hooks/useHashRoute'
import { useCart } from '../../context/cart'
import { useFulfilment } from '../../context/location'
import { PRODUCTS, SUGGESTED_PRODUCT_IDS, VAT_RATE, formatPrice } from '../../data/products'
import panelCloseIcon from '../../assets/cart/panel-close.svg'
import deleteIcon from '../../assets/cart/delete.svg'
import plusSmallIcon from '../../assets/cart/plus-small.svg'
import plusIcon from '../../assets/cart/plus.svg'
import plusRoundIcon from '../../assets/cart/plus-round.svg'
import discountIcon from '../../assets/cart/discount.svg'
import arrowRightWhiteIcon from '../../assets/cart/arrow-right-white.svg'
import arrowRightPrimaryIcon from '../../assets/cart/arrow-right-primary.svg'

const scrollToMenu = () =>
  requestAnimationFrame(() =>
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }),
  )

const FulfilmentRow = () => {
  const { closeCart } = useCart()
  const { type, label, value, openLocationPicker } = useFulfilment()

  const change = () => {
    closeCart()
    openLocationPicker()
  }

  return (
    <div className="cart-fulfilment">
      <div className="cart-fulfilment-info">
        <ModalImage
          name={type === 'pickup' ? 'pickup-shop' : 'delivery-scooter'}
          className="cart-fulfilment-icon"
        />
        <div className="cart-fulfilment-text">
          <p className="cart-fulfilment-label">{label}</p>
          <p className="cart-fulfilment-value">{value}</p>
        </div>
      </div>

      <button type="button" className="cart-chip" onClick={change}>
        Change
      </button>
    </div>
  )
}

const CartItem = ({ line }) => {
  const { addItem, removeOne } = useCart()
  const { product, qty, unitPrice, qtyForOffer } = line

  return (
    <div className="cart-item">
      <div className="cart-item-main">
        <ModalImage name={product.image} className="cart-item-image" />

        <div className="cart-item-info">
          <p className="cart-item-name">{product.name}</p>

          <div className="cart-item-row">
            <div className="cart-item-prices">
              <span className="cart-item-price">{formatPrice(unitPrice)}</span>
              {product.originalPrice && (
                <s className="cart-item-original">{formatPrice(product.originalPrice)}</s>
              )}
              {product.discountLabel && <span className="cart-badge">{product.discountLabel}</span>}
            </div>

            <div className="cart-stepper">
              <button
                type="button"
                aria-label={qty === 1 ? `Remove ${product.name}` : `Decrease ${product.name}`}
                onClick={() => removeOne(product.id)}
              >
                {qty === 1 ? (
                  <img src={deleteIcon} alt="" />
                ) : (
                  <Minus size={18} strokeWidth={1.5} color="#111111" />
                )}
              </button>
              <span className="cart-stepper-count" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                aria-label={`Increase ${product.name}`}
                onClick={() => addItem(product.id)}
              >
                <img src={plusSmallIcon} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {qtyForOffer > 0 && (
        <p className="cart-item-offer">
          Add {qtyForOffer} more to <span>get {product.bulkOffer.percentOff}% off</span>
        </p>
      )}
    </div>
  )
}

const Suggestions = () => {
  const { items, addItem } = useCart()
  const suggestions = SUGGESTED_PRODUCT_IDS.filter(
    (id) => !items.some((item) => item.productId === id),
  ).map((id) => PRODUCTS[id])

  if (suggestions.length === 0) return null

  return (
    <div className="cart-suggestions">
      <h3 className="cart-subtitle">Frequently bought together</h3>
      {suggestions.map((product) => (
        <div key={product.id} className="cart-suggestion">
          <ModalImage name={product.image} className="cart-suggestion-image" />
          <span className="cart-suggestion-name">{product.name}</span>
          <span className="cart-suggestion-price">+{formatPrice(product.price)}</span>
          <button
            type="button"
            className="cart-round-btn"
            aria-label={`Add ${product.name}`}
            onClick={() => addItem(product.id)}
          >
            <img src={plusRoundIcon} alt="" />
          </button>
        </div>
      ))}
    </div>
  )
}

const CartContents = ({ onBrowse }) => {
  const { lines, subtotal, promo, promoDiscount, vat, total, savings, closeCart } = useCart()

  const handleCheckout = () => {
    closeCart()
    window.location.assign(checkoutPath)
  }

  return (
    <>
      <div className="cart-scroll">
        <div className="cart-section">
          <FulfilmentRow />

          <div className="cart-items">
            {lines.map((line) => (
              <CartItem key={line.product.id} line={line} />
            ))}
            <button type="button" className="cart-add-more" onClick={onBrowse}>
              <img src={plusIcon} alt="" />
              Add more items
            </button>
          </div>

          <Suggestions />
        </div>

        <hr className="cart-divider" />

        <div className="cart-summary">
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {promo && (
            <div className="cart-summary-row">
              <span>Promo ({promo.code})</span>
              <span>-{formatPrice(promoDiscount)}</span>
            </div>
          )}
          <div className="cart-summary-row">
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
        </div>
      </div>

      <div className="cart-footer">
        <div className="cart-total">
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <button type="button" className="modal-btn modal-btn-primary cart-checkout" onClick={handleCheckout}>
          Checkout
          <img src={arrowRightWhiteIcon} alt="" />
        </button>
      </div>
    </>
  )
}

const CartEmpty = ({ onBrowse }) => (
  <div className="cart-empty">
    <div className="cart-empty-copy">
      <ModalImage name="cart-empty" className="cart-empty-image" />
      <div className="cart-empty-heading">
        <h3 className="cart-empty-title">Looks empty here</h3>
        <p className="cart-empty-text">You haven’t added anything to your cart</p>
      </div>
    </div>

    <button type="button" className="cart-empty-btn" onClick={onBrowse}>
      Order Now
      <img src={arrowRightPrimaryIcon} alt="" />
    </button>
  </div>
)

const CartDrawer = () => {
  const { lines, count, closeCart } = useCart()
  const titleId = useId()
  const dialogRef = useDialog(closeCart)

  const browseMenu = () => {
    closeCart()
    scrollToMenu()
  }

  const handleBackdropMouseDown = (event) => {
    if (event.target === event.currentTarget) closeCart()
  }

  return createPortal(
    <div className="cart-backdrop" onMouseDown={handleBackdropMouseDown}>
      <aside
        ref={dialogRef}
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <div className="cart-header">
          <h2 id={titleId} className="cart-title">
            Cart ({count})
          </h2>
          <IconButton icon={panelCloseIcon} label="Close cart" onClick={closeCart} />
        </div>

        {lines.length === 0 ? (
          <CartEmpty onBrowse={browseMenu} />
        ) : (
          <CartContents onBrowse={browseMenu} />
        )}
      </aside>
    </div>,
    document.body,
  )
}

const CartSidebar = () => {
  const { isOpen } = useCart()
  return isOpen ? <CartDrawer /> : null
}

export default CartSidebar
