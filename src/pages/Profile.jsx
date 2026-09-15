import { useState } from 'react'
import {
  Bell,
  CirclePlus,
  CircleQuestionMark,
  Heart,
  LogOut,
  MapPin,
  Receipt,
  Star,
  Wallet,
} from 'lucide-react'
import ProductCard from '../components/ProductCard'
import ModalImage from '../components/modals/ModalImage'
import HelpCenter from '../components/help/HelpCenter'
import {
  PointsIcon,
  ProfileActivityList,
  ProfileCaret,
  ProfileEarnList,
  ProfileFigure,
  ProfileHero,
  ProfileOrderCard,
  ProfileRow,
  ProfileTile,
} from '../components/profile/ProfileParts'
import { useCart } from '../context/cart'
import { useFavourites } from '../context/favourites'
import { PRODUCTS, formatPrice } from '../data/products'
import {
  EARN_METHODS,
  POINT_REWARDS,
  PROFILE,
  PROFILE_ORDERS,
  WALLET_TRANSACTIONS,
  summarizeOrder,
} from '../data/profile'
import { profilePath } from '../hooks/useHashRoute'
import './profile.css'
import './checkout.css'

const RATINGS = [1, 2, 3, 4, 5]

// Reorder drops every line of a past order back into the basket.
const useReorder = () => {
  const { addItem } = useCart()
  return (order) => order.lines.forEach(({ productId, qty }) => addItem(productId, qty))
}

/* ---------- Overview (Figma node 1:3810) ---------- */

const Overview = ({ orders, onRate, onOpenHelp }) => {
  const reorder = useReorder()

  return (
    <>
      <ProfileHero back={false} glow>
        <div className="profile-hero-row">
          <div>
            <h1 className="profile-hero-name">{PROFILE.name}</h1>
            <p className="profile-hero-email">{PROFILE.email}</p>
          </div>
          {/* TODO: open the edit profile form once it exists. */}
          <button type="button" className="profile-ghost-btn">
            Edit profile
          </button>
        </div>
      </ProfileHero>

      <div className="profile-body profile-container">
        <div className="profile-columns">
          <div className="profile-rail">
            <div className="profile-tiles">
              <ProfileTile href={profilePath('orders')} icon={Receipt} label="My Orders" />
              <ProfileTile href={profilePath('favourites')} icon={Heart} label="Favourites" />
            </div>

            <section className="profile-section">
              <h2 className="profile-section-title">Loyalty Wallet</h2>
              <a className="profile-card" href={profilePath('wallet')}>
                <span className="profile-card-left">
                  <ModalImage name="wallet-coin" className="profile-card-art" />
                  <span>
                    <span className="profile-card-title">{formatPrice(PROFILE.balance)}</span>
                    <span className="profile-card-text block">Available balance</span>
                  </span>
                </span>
                <ProfileCaret />
              </a>
            </section>

            <hr className="profile-divider" />

            <section className="profile-section">
              <h2 className="profile-section-title">Manage</h2>
              {/* TODO: link these to the account settings pages once they exist. */}
              <ProfileRow icon={MapPin} label="Addresses" onClick={() => {}} />
              <ProfileRow icon={Wallet} label="Payment Method" onClick={() => {}} />
              <ProfileRow icon={Bell} label="Notifications" onClick={() => {}} />
            </section>

            <section className="profile-section">
              <h2 className="profile-section-title">More</h2>
              <ProfileRow icon={CircleQuestionMark} label="Help & Support" onClick={onOpenHelp} />
              {/* TODO: clear the session once auth exists. */}
              <ProfileRow icon={LogOut} label="Log out" danger onClick={() => {}} />
            </section>
          </div>

          <div className="profile-main">
            <h2 className="profile-section-title">Recent orders</h2>
            <div className="profile-orders">
              {orders.map((order) => (
                <ProfileOrderCard
                  key={order.id}
                  order={order}
                  total={summarizeOrder(order).total}
                  onRate={(rating) => onRate(order.id, rating)}
                  onReorder={() => reorder(order)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------- Loyalty Wallet (Figma node 1:4103) ---------- */

const WalletSection = () => (
  <>
    <ProfileHero tone="primary" title="Loyalty Wallet">
      <ProfileFigure amount={formatPrice(PROFILE.balance)} caption="Available Balance" />
    </ProfileHero>

    <div className="profile-body profile-container">
      <div className="profile-columns">
        <div className="profile-rail">
          <div className="profile-tiles">
            <a className="profile-tile" href={profilePath('points')}>
              <span className="profile-tile-row">
                <span>
                  <span className="profile-tile-value">
                    <PointsIcon size={24} />
                    {PROFILE.points}
                  </span>
                  <span className="profile-tile-label block mt-[10px]">Cozy Points</span>
                </span>
                <ProfileCaret />
              </span>
            </a>
            {/* TODO: open the top-up flow once payments support it. */}
            <ProfileTile icon={CirclePlus} label="Top up wallet" onClick={() => {}} />
          </div>

          <section className="profile-section">
            <h2 className="profile-section-title">Payment method</h2>
            <button type="button" className="profile-card">
              <span className="profile-card-left">
                <ModalImage name={PROFILE.card.image} className="profile-card-art" />
                <span>
                  <span className="profile-card-title">{PROFILE.card.brand}</span>
                  <span className="profile-card-text block">**** {PROFILE.card.last4}</span>
                </span>
              </span>
              <ProfileCaret />
            </button>
          </section>
        </div>

        <div className="profile-main">
          <div className="profile-section-head">
            <h2 className="profile-section-title">Recent transactions</h2>
            <button type="button" className="profile-pill-btn">
              View all
            </button>
          </div>
          <ProfileActivityList
            items={WALLET_TRANSACTIONS}
            renderValue={(item) => (
              <span className="profile-list-amount">
                -{formatPrice(Math.abs(item.amount))}
              </span>
            )}
          />
        </div>
      </div>
    </div>
  </>
)

/* ---------- Cozy Points (Figma node 1:4353) ---------- */

const PointsSection = () => (
  <>
    <ProfileHero title="Cozy Points">
      <div className="profile-hero-row">
        <div>
          <p className="profile-hero-name flex items-center gap-[10px]">
            <PointsIcon size={32} />
            {PROFILE.points}
          </p>
          <p className="profile-hero-email">Cozy Points</p>
        </div>
        {/* TODO: move the balance into the wallet once the points API exists. */}
        <button type="button" className="profile-primary-btn">
          Withdraw to wallet
        </button>
      </div>
    </ProfileHero>

    <div className="profile-body profile-container">
      <div className="profile-columns">
        <div className="profile-rail">
          <section className="profile-section">
            <h2 className="profile-section-title">How to earn?</h2>
            <ProfileEarnList methods={EARN_METHODS} />
          </section>
        </div>

        <div className="profile-main">
          <h2 className="profile-section-title">Recent rewards</h2>
          <ProfileActivityList
            items={POINT_REWARDS}
            renderValue={(item) => (
              <span className="profile-list-points">
                <PointsIcon />+{item.points}
              </span>
            )}
          />
        </div>
      </div>
    </div>
  </>
)

/* ---------- Orders (Figma node 1:4628) ---------- */

const OrderDetail = ({ order, onRate, onComment, onReorder }) => {
  const { lines, subtotal, vat, total } = summarizeOrder(order)
  const image = PRODUCTS[order.lines[0].productId].image

  return (
    <div className="profile-detail">
      <div className="profile-detail-art">
        <ModalImage name={image} />
      </div>

      <div className="profile-detail-body">
        <div className="profile-detail-head">
          <div>
            <p className="profile-detail-title">Order #{order.id}</p>
            <p className="profile-detail-date">Delivered {order.date}</p>
          </div>
          <p className="profile-detail-points">
            <PointsIcon />+{order.points}
          </p>
        </div>

        <div className="rating-card">
          <p className="order-card-title">How was your experience?</p>
          <div className="rating-stars">
            {RATINGS.map((value) => (
              <button
                key={value}
                type="button"
                aria-label={`${value} star${value > 1 ? 's' : ''}`}
                aria-pressed={order.rating === value}
                className={`rating-star ${value <= (order.rating ?? 0) ? 'rating-star--filled' : ''}`}
                onClick={() => onRate(order.id, value)}
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
              value={order.comment}
              onChange={(event) => onComment(order.id, event.target.value)}
            />
          </label>
        </div>

        <button type="button" className="modal-btn modal-btn-primary" onClick={onReorder}>
          Reorder
        </button>

        <div className="profile-detail-summary">
          <h3 className="profile-section-title">Order summary</h3>

          {lines.map((line) => (
            <p className="order-row" key={line.productId}>
              <span>
                {line.qty}x {line.name}
              </span>
              <span>{formatPrice(line.amount)}</span>
            </p>
          ))}

          <hr className="order-divider" />

          <p className="order-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </p>
          <p className="order-row">
            <span>Delivery Fee ({order.deliverySpeed})</span>
            <span>{formatPrice(order.deliveryFee)}</span>
          </p>
          <p className="order-row">
            <span>VAT</span>
            <span>{formatPrice(vat)} (2.5%)</span>
          </p>

          <hr className="order-divider" />

          <p className="order-row">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

const OrdersSection = ({ orders, onRate, onComment }) => {
  const [selectedId, setSelectedId] = useState(orders[0]?.id ?? null)
  const reorder = useReorder()
  const selected = orders.find((order) => order.id === selectedId) ?? null

  return (
    <>
      <ProfileHero>
        <h1 className="profile-hero-page-title">Orders</h1>
      </ProfileHero>

      <div className="profile-body profile-container">
        <div className="profile-columns">
          <div className="profile-main">
            <h2 className="profile-section-title">Recent orders</h2>
            <div className="profile-orders">
              {orders.map((order) => (
                <ProfileOrderCard
                  key={order.id}
                  order={order}
                  total={summarizeOrder(order).total}
                  selected={order.id === selectedId}
                  onSelect={() => setSelectedId(order.id)}
                  onRate={(rating) => onRate(order.id, rating)}
                  onReorder={() => reorder(order)}
                />
              ))}
            </div>
          </div>

          {selected && (
            <OrderDetail
              order={selected}
              onRate={onRate}
              onComment={onComment}
              onReorder={() => reorder(selected)}
            />
          )}
        </div>
      </div>
    </>
  )
}

/* ---------- Favourites (Figma node 1:4902) ---------- */

const FavouritesSection = () => {
  const { ids } = useFavourites()
  const products = ids.map((id) => PRODUCTS[id]).filter(Boolean)

  return (
    <>
      <ProfileHero>
        <h1 className="profile-hero-page-title">Favourites</h1>
      </ProfileHero>

      <div className="profile-body profile-container">
        {products.length === 0 ? (
          <p className="profile-empty">Nothing saved yet — tap the heart on any product.</p>
        ) : (
          <div className="profile-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

/* ---------- Page ---------- */

const Profile = ({ section = 'overview' }) => {
  // Ratings and comments live here until the account API exists.
  const [orders, setOrders] = useState(PROFILE_ORDERS)
  const [helpOpen, setHelpOpen] = useState(false)

  const update = (id, changes) =>
    setOrders((list) =>
      list.map((order) => (order.id === id ? { ...order, ...changes } : order)),
    )

  const handleRate = (id, rating) => update(id, { rating })
  const handleComment = (id, comment) => update(id, { comment })

  return (
    <div className="profile-page">
      {section === 'wallet' && <WalletSection />}
      {section === 'points' && <PointsSection />}
      {section === 'orders' && (
        <OrdersSection orders={orders} onRate={handleRate} onComment={handleComment} />
      )}
      {section === 'favourites' && <FavouritesSection />}
      {section !== 'wallet' && section !== 'points' && section !== 'orders' && section !== 'favourites' && (
        <Overview orders={orders} onRate={handleRate} onOpenHelp={() => setHelpOpen(true)} />
      )}

      {helpOpen && <HelpCenter onClose={() => setHelpOpen(false)} />}
    </div>
  )
}

export default Profile
