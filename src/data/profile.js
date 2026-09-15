import { PRODUCTS, VAT_RATE } from './products'

// Account content for the profile pages. Static for now — swap for the account
// API once the backend exists.

export const PROFILE = {
  name: 'John Doe',
  email: 'john@gmail.com',
  phone: '(555) 214 12312',
  balance: 10.5,
  points: 456,
  card: { brand: 'Mastercard', image: 'card-mastercard', last4: '2134' },
}

// Cozy Points convert into wallet credit at this rate.
export const POINTS_PER_DOLLAR = 100

export const NOTIFICATION_GROUPS = [
  {
    title: 'Orders & Updates',
    options: [
      { key: 'orderStatus', label: 'Order status' },
      { key: 'riderUpdates', label: 'Rider updates' },
      { key: 'rateOrder', label: 'Rate order' },
    ],
  },
  {
    title: 'From Cozy',
    options: [
      { key: 'promotions', label: 'Promotions & Offers' },
      { key: 'pointsUpdates', label: 'Cozy points updates' },
      { key: 'securityUpdates', label: 'Security updates' },
    ],
  },
]

// Products shown on the Favourites page before the customer saves their own.
export const DEFAULT_FAVOURITE_IDS = [
  'classic-butter-croissant',
  'chocolate-croissant',
  'almond-croissant',
  'ham-cheese-croissant',
  'pistachio-croissant',
  'matcha-white-choc-croissant',
  'cinnamon-creme-croissant',
]

// Past orders. `lines` reference the catalogue so Reorder can refill the
// basket and the summary can be priced from the real products; `rating` is
// null until the customer rates the order.
export const PROFILE_ORDERS = [
  {
    id: '231SHA',
    date: '1-9-2026',
    rating: null,
    comment: '',
    points: 50,
    deliverySpeed: 'Standard',
    deliveryFee: 1.2,
    lines: [
      { productId: 'almond-croissant', qty: 1 },
      { productId: 'chocolate-croissant', qty: 1 },
    ],
  },
  {
    id: '232SHA',
    date: '1-9-2026',
    rating: 4,
    comment: 'Really loved the croissant!',
    points: 50,
    deliverySpeed: 'Standard',
    deliveryFee: 1.2,
    lines: [{ productId: 'chocolate-croissant', qty: 1 }],
  },
  {
    id: '233SHA',
    date: '1-9-2026',
    rating: 5,
    comment: '',
    points: 50,
    deliverySpeed: 'Standard',
    deliveryFee: 1.2,
    lines: [
      { productId: 'plain-croissant', qty: 2 },
      { productId: 'classic-butter-croissant', qty: 1 },
    ],
  },
  {
    id: '234SHA',
    date: '1-9-2026',
    rating: 5,
    comment: '',
    points: 50,
    deliverySpeed: 'Standard',
    deliveryFee: 1.2,
    lines: [
      { productId: 'raspberry-croissant', qty: 1 },
      { productId: 'pistachio-croissant', qty: 1 },
    ],
  },
  {
    id: '235SHA',
    date: '1-9-2026',
    rating: null,
    comment: '',
    points: 50,
    deliverySpeed: 'Standard',
    deliveryFee: 1.2,
    lines: [
      { productId: 'ham-cheese-croissant', qty: 2 },
      { productId: 'classic-butter-croissant', qty: 1 },
    ],
  },
]

// Prices an order from the catalogue: items, VAT on the subtotal, delivery fee.
export const summarizeOrder = (order) => {
  const lines = order.lines.map(({ productId, qty }) => {
    const product = PRODUCTS[productId]
    return { productId, qty, name: product.name, amount: product.price * qty }
  })

  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0)
  const vat = subtotal * VAT_RATE

  return { lines, subtotal, vat, total: subtotal + vat + order.deliveryFee }
}

export const WALLET_TRANSACTIONS = [
  { id: 't1', label: 'Order', date: '1-9-2026', amount: -20 },
  { id: 't2', label: 'Order', date: '1-10-2026', amount: -15 },
  { id: 't3', label: 'Order', date: '1-11-2026', amount: -30 },
  { id: 't4', label: 'Order', date: '1-12-2026', amount: -25 },
  { id: 't5', label: 'Order', date: '1-13-2026', amount: -30 },
  { id: 't6', label: 'Order', date: '1-14-2026', amount: -20 },
]

export const POINT_REWARDS = [
  { id: 'r1', label: 'Order', date: '1-9-2026', points: 50 },
  { id: 'r2', label: 'Order', date: '1-10-2026', points: 50 },
  { id: 'r3', label: 'Order', date: '1-11-2026', points: 50 },
  { id: 'r4', label: 'Order', date: '1-12-2026', points: 50 },
  { id: 'r5', label: 'Order', date: '1-13-2026', points: 50 },
  { id: 'r6', label: 'Order', date: '1-14-2026', points: 50 },
]

// `image` is a file name in src/assets/modals/; a placeholder shows until the
// artwork is exported.
export const EARN_METHODS = [
  {
    id: 'streaks',
    image: 'points-streak',
    title: 'Complete weekly streaks',
    text: 'Every week, complete the streak to gain +100 cozy points',
  },
  {
    id: 'scratch',
    image: 'points-scratch-card',
    title: 'Scratch card',
    text: 'We send some scratch cards to some of our orders, be sure to check them out 😄',
  },
  {
    id: 'order',
    image: 'points-order',
    title: 'Or simply, just order',
    text: 'On most orders, you get rewarded with cozy points',
  },
]
