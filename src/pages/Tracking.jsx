import React, { useEffect, useState } from 'react'
import { ChevronRight, MessageSquare } from 'lucide-react'
import { MdDeliveryDining } from 'react-icons/md'
import Breadcrumb from '../components/Breadcrumb'
import ProductCard from '../components/ProductCard'
import ModalImage from '../components/modals/ModalImage'
import PaymentPicker from '../components/checkout/PaymentPicker'
import OrderDeliveredModal from '../components/checkout/OrderDeliveredModal'
import HelpCenter from '../components/help/HelpCenter'
import {
  AppPromoCard,
  InfoCard,
  OrderItemsCard,
  StatusGlow,
  StatusHero,
} from '../components/checkout/OrderParts'
import { useOrders } from '../context/order'
import { PRODUCTS, formatPrice } from '../data/products'
import {
  DELIVERY_SPEEDS,
  TIP_AMOUNTS,
  describePayment,
  getOrderStage,
  msUntilNextStage,
} from '../data/orders'
import homePinIcon from '../assets/modals/home-pin.svg'
import './checkout.css'

const RECOMMENDED_PRODUCT_IDS = [
  'classic-butter-croissant',
  'chocolate-croissant',
  'almond-croissant',
  'raspberry-croissant',
]

// Re-renders whenever the order reaches its next stage.
const useOrderStage = (placedAt) => {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!placedAt) return undefined
    const wait = msUntilNextStage(placedAt, now)
    if (wait === null) return undefined
    const timer = setTimeout(() => setNow(Date.now()), wait)
    return () => clearTimeout(timer)
  }, [placedAt, now])

  return placedAt ? getOrderStage(placedAt, now).id : null
}

// Copy and artwork for each stage. Pickup orders skip the rider stages.
const describeStatus = (order, stageId) => {
  const isPickup = order.fulfilment.type === 'pickup'

  if (stageId === 'delivered') {
    return {
      view: 'card',
      art: 'checkmark',
      title: isPickup ? 'Collected' : 'Delivered',
      text: 'Enjoy your freshly baked meal',
    }
  }
  // Figma node 1:6111 — the shop map, with the order ready to collect.
  if (isPickup && stageId === 'arrived') {
    return {
      view: 'map',
      variant: 'arrived',
      art: 'order-ready',
      title: 'Your order is ready!',
      text: 'Pickup from the shop',
    }
  }
  if (!isPickup && stageId === 'on-the-way') {
    const speed = DELIVERY_SPEEDS.find((option) => option.id === order.speed) ?? DELIVERY_SPEEDS[0]
    return {
      view: 'map',
      variant: 'route',
      art: 'rider-on-the-way',
      title: 'Rider is on the way',
      text: `Reaching in ${speed.eta.replace('min', 'minutes')}`,
    }
  }
  if (!isPickup && stageId === 'arrived') {
    return {
      view: 'map',
      variant: 'arrived',
      art: 'rider-arrived',
      title: 'Rider is at your address',
      text: 'Collect your order from the rider',
    }
  }
  return {
    view: 'card',
    art: 'preparing-order',
    artClassName: 'status-art--float-twice',
    title: 'Preparing your order',
    text: 'Takes about 2-3 minutes',
  }
}

// Figma nodes 1:5799 / 1:6396 — the map image is exported with the route drawn on.
const MapStatus = ({ variant, art, title, text }) => (
  <div className={`map-status map-status--${variant}`}>
    <ModalImage name={variant === 'route' ? 'tracking-map-route' : 'tracking-map'} className="map-status-image" />
    <span className="map-status-shade" aria-hidden="true" />
    <img src={homePinIcon} alt="" className="map-status-home" />
    <span className="map-status-rider" aria-hidden="true">
      <MdDeliveryDining />
    </span>

    <div className="map-status-info">
      <div className="map-status-copy">
        <h1 className="map-status-title">{title}</h1>
        <p className="map-status-text">{text}</p>
      </div>
      <ModalImage name={art} className="map-status-art" />
    </div>
  </div>
)

const StatusCard = ({ status }) =>
  status.view === 'map' ? (
    <MapStatus {...status} />
  ) : (
    <div className="status-card">
      <StatusGlow />
      <StatusHero
        art={status.art}
        title={status.title}
        text={status.text}
        titleAs="h1"
        artClassName={status.artClassName}
      />
    </div>
  )

const TipCard = ({ tip, payment, onTipChange, onChangePayment, onHide }) => {
  const paymentInfo = describePayment(payment, tip ?? 0)

  return (
    <div className="order-card tip-card">
      <div className="tip-card-header">
        <div className="tip-card-intro">
          <ModalImage name="rider-tip" className="tip-card-art" />
          <div>
            <p className="order-card-title">Would you like to tip the rider?</p>
            <p className="tip-card-text">Your tips directly goes to the rider’s account</p>
          </div>
        </div>
        <button type="button" className="cart-chip" onClick={onHide}>
          Hide
        </button>
      </div>

      <div className="tip-amounts" role="radiogroup" aria-label="Tip amount">
        {TIP_AMOUNTS.map((amount) => (
          <button
            key={amount}
            type="button"
            role="radio"
            aria-checked={tip === amount}
            className="tip-amount"
            onClick={() => onTipChange(tip === amount ? null : amount)}
          >
            {formatPrice(amount)}
          </button>
        ))}
      </div>

      {tip && (
        <button type="button" className="tip-payment" onClick={onChangePayment}>
          <ModalImage name={paymentInfo.icon} className="checkout-option-icon" />
          <span className="payment-text">
            <span className="payment-title">{paymentInfo.title}</span>
            <span className="payment-detail">
              {payment.type === 'card'
                ? `${formatPrice(tip)} tip charged to your card`
                : `Pay ${formatPrice(tip)} tip in cash to the rider`}
            </span>
          </span>
          <ChevronRight className="checkout-chevron" size={20} strokeWidth={1.5} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

const MissingOrder = ({ orderId }) => (
  <div className="tracking-page">
    <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Tracking' }]} />
    <div className="checkout-container checkout-empty">
      <h1 className="checkout-title">We couldn’t find order #{orderId}</h1>
      <p className="checkout-empty-text">Check the Order ID in your SMS or email and try again.</p>
      <a href="#menu" className="hero-btn">
        Back to menu
      </a>
    </div>
  </div>
)

// Figma nodes 1:5252 (preparing), 1:5794 (on the way) and 1:6391 (arrived).
const Tracking = ({ orderId }) => {
  const { getOrder, updateOrder } = useOrders()
  const order = getOrder(orderId)
  const stageId = useOrderStage(order?.placedAt)
  const [tipHidden, setTipHidden] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)
  // Which Help Center screen to open on, or null while it is closed.
  const [helpScreen, setHelpScreen] = useState(null)

  if (!order) return <MissingOrder orderId={orderId} />

  const status = describeStatus(order, stageId)
  const isPickup = order.fulfilment.type === 'pickup'
  const tipPayment = order.tipPayment ?? order.payment
  const showTip = !isPickup && !tipHidden && (stageId === 'on-the-way' || stageId === 'arrived')
  const tipRows = order.tip ? [{ label: 'Rider tip', value: formatPrice(order.tip) }] : []
  const paymentLabel = describePayment(order.payment, order.total).short

  return (
    <div className="tracking-page">
      <Breadcrumb
        items={[{ label: 'Home', href: '#' }, { label: 'Tracking' }, { label: `Order#${order.id}` }]}
      />

      <div className="checkout-container">
        <div className="tracking-layout">
          <div className="tracking-main">
            <StatusCard status={status} />

            <div className="tracking-details">
              <InfoCard title={isPickup ? 'Pickup from' : 'Delivery address'}>{order.fulfilment.value}</InfoCard>

              {showTip && (
                <TipCard
                  tip={order.tip ?? null}
                  payment={tipPayment}
                  onTipChange={(tip) => updateOrder(order.id, { tip })}
                  onChangePayment={() => setPaymentOpen(true)}
                  onHide={() => setTipHidden(true)}
                />
              )}

              <OrderItemsCard
                lines={order.lines}
                rows={tipRows}
                total={order.total + (order.tip ?? 0)}
                note={paymentLabel}
              />
            </div>
          </div>

          <div className="tracking-side">
            <div className="order-card support-card">
              <div className="support-card-copy">
                <p className="order-card-title">Need support?</p>
                <p className="order-card-text">Report or see general solutions to your problem.</p>
              </div>
              <button type="button" className="support-btn" onClick={() => setHelpScreen('home')}>
                Help Center
              </button>
            </div>

            <section className="tracking-products-section">
              <h2 className="tracking-products-title">You may also love</h2>
              <div className="tracking-products">
                {RECOMMENDED_PRODUCT_IDS.map((id) => (
                  <ProductCard key={id} product={PRODUCTS[id]} />
                ))}
              </div>
            </section>

            <AppPromoCard />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="support-chat"
        aria-label="Chat with support"
        onClick={() => setHelpScreen('home')}
      >
        <MessageSquare strokeWidth={1.5} />
        <span className="support-chat-badge" aria-hidden="true">
          1
        </span>
      </button>

      {helpScreen && (
        <HelpCenter initialScreen={helpScreen} onClose={() => setHelpScreen(null)} />
      )}

      {paymentOpen && (
        <PaymentPicker
          value={tipPayment}
          onChange={(payment) => updateOrder(order.id, { tipPayment: payment })}
          onClose={() => setPaymentOpen(false)}
        />
      )}

      {stageId === 'delivered' && !order.feedback && (
        <OrderDeliveredModal
          title={status.title}
          lines={order.lines}
          total={order.total + (order.tip ?? 0)}
          note={paymentLabel}
          onClose={(feedback) => updateOrder(order.id, { feedback })}
        />
      )}
    </div>
  )
}

export default Tracking
