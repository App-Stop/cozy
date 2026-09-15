import { ChevronLeft, ChevronRight, Croissant, Info, Receipt, Star } from 'lucide-react'
import ModalImage from '../modals/ModalImage'
import { formatPrice } from '../../data/products'
import { profilePath } from '../../hooks/useHashRoute'

const RATINGS = [1, 2, 3, 4, 5]

// `size` matches the Figma chip: 20px in lists, 24px on tiles, 32px in a hero.
export const PointsIcon = ({ size = 20 }) => (
  <span
    className="points-icon points-icon--inverse"
    style={{ width: size, height: size, padding: size * 0.125 }}
    aria-hidden="true"
  >
    <Croissant strokeWidth={2} />
  </span>
)

export const ProfileCaret = () => <ChevronRight className="profile-caret" strokeWidth={1.5} />

// Full-bleed band at the top of every profile page. `tone` paints it primary
// (the wallet); `title` is the small centred label, `children` the band body.
// `backHref` is where the back arrow leads — the overview unless given.
export const ProfileHero = ({ tone, title, back = true, backHref = profilePath(), glow = false, children }) => (
  <header className={`profile-hero ${tone === 'primary' ? 'profile-hero--primary' : ''}`}>
    {glow && <span className="profile-hero-glow" aria-hidden="true" />}

    <div className="profile-container">
      <div className="profile-hero-inner">
        {(back || title) && (
          <div className="profile-hero-top">
            {back && (
              <a href={backHref} className="profile-back" aria-label="Back">
                <ChevronLeft strokeWidth={1.5} />
              </a>
            )}
            {title && (
              <p className="profile-hero-title">
                {title}
                <Info strokeWidth={1.5} />
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  </header>
)

// The figure centred in the wallet and points bands.
export const ProfileFigure = ({ amount, caption }) => (
  <div className="profile-hero-figure">
    <p className="profile-hero-amount">{amount}</p>
    <p className="profile-hero-caption">{caption}</p>
  </div>
)

export const ProfileTile = ({ href, icon: Icon, label, onClick }) => {
  const content = (
    <>
      <Icon className="profile-tile-icon" strokeWidth={1.5} />
      <span className="profile-tile-label">{label}</span>
    </>
  )

  return href ? (
    <a className="profile-tile" href={href}>
      {content}
    </a>
  ) : (
    <button type="button" className="profile-tile text-left" onClick={onClick}>
      {content}
    </button>
  )
}

export const ProfileRow = ({ icon: Icon, label, href, danger = false, onClick }) => {
  const className = `profile-row ${danger ? 'profile-row--danger' : ''}`
  const content = (
    <>
      <span className="profile-row-label">
        <Icon strokeWidth={1.5} />
        {label}
      </span>
      {!danger && <ProfileCaret />}
    </>
  )

  return href ? (
    <a className={className} href={href}>
      {content}
    </a>
  ) : (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  )
}

// One past order. On the Orders page the whole card selects the order, so it
// renders as a button and the rating stars are left to the detail panel.
export const ProfileOrderCard = ({ order, total, selected, onSelect, onRate, onReorder }) => {
  const Tag = onSelect ? 'button' : 'div'

  return (
    <Tag
      {...(onSelect ? { type: 'button', onClick: onSelect } : {})}
      className={`profile-order ${onSelect ? 'profile-order--button' : ''} ${
        selected ? 'profile-order--selected' : ''
      }`}
    >
      <span className="profile-order-head">
        <span className="profile-order-top">
          <span className="profile-order-id">Order #{order.id}</span>
          <span>{formatPrice(total)}</span>
        </span>
        <span className="profile-order-meta">
          {order.lines.length === 1 ? '1 item' : `${order.lines.length} items`} | {order.date}
        </span>
      </span>

      <span className="profile-order-foot">
        {order.rating ? (
          <span className="profile-rated">
            You rated {order.rating}
            <Star strokeWidth={1.5} />
          </span>
        ) : (
          <span className="profile-rate">
            Rate
            <span className="profile-rate-stars">
              {RATINGS.map((value) => (
                <span
                  key={value}
                  role="button"
                  tabIndex={0}
                  className="profile-rate-star"
                  aria-label={`Rate order ${order.id} ${value} star${value > 1 ? 's' : ''}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    onRate?.(value)
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== 'Enter' && event.key !== ' ') return
                    event.preventDefault()
                    event.stopPropagation()
                    onRate?.(value)
                  }}
                >
                  <Star strokeWidth={1.5} />
                </span>
              ))}
            </span>
          </span>
        )}

        <span
          role="button"
          tabIndex={0}
          className="profile-reorder"
          onClick={(event) => {
            event.stopPropagation()
            onReorder?.()
          }}
          onKeyDown={(event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return
            event.preventDefault()
            event.stopPropagation()
            onReorder?.()
          }}
        >
          Reorder
        </span>
      </span>
    </Tag>
  )
}

// Shared by the wallet transactions and the points rewards lists.
export const ProfileActivityList = ({ items, renderValue }) => (
  <div className="profile-list">
    {items.map((item) => (
      <div className="profile-list-item" key={item.id}>
        <div className="profile-list-left">
          <Receipt strokeWidth={1.5} />
          <div>
            <p className="profile-list-label">{item.label}</p>
            <p className="profile-list-date">{item.date}</p>
          </div>
        </div>
        {renderValue(item)}
      </div>
    ))}
  </div>
)

export const ProfileEarnList = ({ methods }) => (
  <div className="profile-earn">
    {methods.map((method) => (
      <div className="profile-earn-item" key={method.id}>
        <ModalImage name={method.image} className="profile-earn-art" />
        <div className="profile-earn-copy">
          <p className="profile-earn-title">{method.title}</p>
          <p className="profile-earn-text">{method.text}</p>
        </div>
      </div>
    ))}
  </div>
)
