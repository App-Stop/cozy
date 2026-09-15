import { formatPrice } from './products'

// Delivery speeds offered at checkout; `fee` is the full delivery fee.
export const DELIVERY_SPEEDS = [
  { id: 'standard', label: 'Standard', eta: '30-40 min', fee: 1.2 },
  { id: 'priority', label: 'Priority', eta: '15-25 min', fee: 3.2 },
]

// Pickup orders are collected from the shop; there is no slot picker yet.
export const PICKUP_TIMING = 'Anytime now'

export const TIP_AMOUNTS =[1, 2, 5, 10, 15, 20, 25, 30, 50]

// Cozy Points earned per order, and the extra offered for ordering in the app.
export const ORDER_POINTS = 50
export const APP_BONUS_POINTS = 30

// Seconds the "Placing order" modal waits (so the order can still be changed)
// before it is sent. Keep in sync with `.order-progress-bar` in pages/checkout.css.
export const PLACE_ORDER_DELAY = 5

// Demo timeline: milliseconds after the order is placed at which each tracking
// stage is reached. Replace with live status updates from the backend.
export const ORDER_STAGES = [
  { id: 'preparing', at: 0 },
  { id: 'on-the-way', at: 10_000 },
  { id: 'arrived', at: 25_000 },
  { id: 'delivered', at: 35_000 },
]

export const getOrderStage = (placedAt, now) =>
  ORDER_STAGES.findLast((stage) => now - placedAt >= stage.at) ?? ORDER_STAGES[0]

// Milliseconds from `now` until the next stage, or null once delivered.
export const msUntilNextStage = (placedAt, now) => {
  const next = ORDER_STAGES.find((stage) => placedAt + stage.at > now)
  return next ? placedAt + next.at - now : null
}

export const createOrderId = () => String(Math.floor(10000 + Math.random() * 90000))

// `amount` is what will be collected; pickup orders pay at the counter.
export const describePayment = (payment, amount, { pickup = false } = {}) =>
  payment.type === 'card'
    ? {
        icon: 'payment-card',
        title: `Card ending in ${payment.last4}`,
        detail: `${formatPrice(amount)} will be charged to your card`,
        short: `Card •••• ${payment.last4}`,
      }
    : {
        icon: 'payment-cash',
        title: 'Cash',
        detail: `Pay ${formatPrice(amount)} in cash ${pickup ? 'at the counter' : 'to the rider'}`,
        short: 'Cash',
      }
