import React from 'react'
import ModalImage from '../modals/ModalImage'
import { formatPrice } from '../../data/products'
import qrCode from '../../assets/app-promo/qr-code.png'
import appMockup from '../../assets/app-promo/app-mockup.png'

// Figma "BG Glow" — two soft primary blobs drifting behind a status illustration.
export const StatusGlow = () => (
  <div className="status-glow" aria-hidden="true">
    <span className="status-glow-blob status-glow-blob--a" />
    <span className="status-glow-blob status-glow-blob--b" />
  </div>
)

// Illustration + title used by the order status card and the order modals.
export const StatusHero = ({ art, title, text, titleAs: Title = 'h2', artClassName = '' }) => (
  <div className="status-hero">
    <ModalImage name={art} className={`status-art ${artClassName}`} />
    <div className="status-copy">
      <Title className="status-title">{title}</Title>
      <p className="status-text">{text}</p>
    </div>
  </div>
)

export const OrderLines = ({ lines }) =>
  lines.map((line) => (
    <div key={line.id} className="order-row">
      <span>
        {line.qty}x {line.name}
      </span>
      <span>{formatPrice(line.total)}</span>
    </div>
  ))

export const InfoCard = ({ title, children }) => (
  <div className="order-card">
    <p className="order-card-title">{title}</p>
    <p className="order-card-text">{children}</p>
  </div>
)

// `rows` are extra `{ label, value }` lines shown above the total (e.g. a tip).
export const OrderItemsCard = ({ lines, rows = [], total, note }) => (
  <div className="order-card">
    <p className="order-card-title">Your order</p>
    <OrderLines lines={lines} />
    {rows.map(({ label, value }) => (
      <div key={label} className="order-row">
        <span>{label}</span>
        <span>{value}</span>
      </div>
    ))}
    <hr className="order-divider" />
    <div className="order-row">
      <span>Total</span>
      <span>
        {formatPrice(total)}
        {note && ` (${note})`}
      </span>
    </div>
  </div>
)

// Figma node 1:3452 — compact app download card.
export const AppPromoCard = () => (
  <aside className="promo-card" aria-label="Get the Cozy app">
    <div className="promo-card-content">
      <div className="promo-card-copy">
        <h2 className="promo-card-title">Get 20% OFF on the app</h2>
        <p className="promo-card-text">
          Save more with every order — download now and enjoy free delivery on your first 3 orders.
        </p>
      </div>

      <div className="promo-card-qr-row">
        <img src={qrCode} alt="QR code to download the app" className="promo-card-qr" />
        <p className="promo-card-qr-label">Scan to download!</p>
      </div>
    </div>

    <img src={appMockup} alt="" className="promo-card-mockup" />
  </aside>
)
