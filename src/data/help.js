// Help Center content. Static for now — swap for the support/CMS API once it
// exists. `screen` on a menu entry is the id the Help Center drawer routes to.

export const HELP_MENU = [
  {
    title: 'Orders',
    items: [
      { id: 'order-help', icon: 'invoice', label: 'Get help with my order', screen: 'orders' },
      { id: 'order-trouble', icon: 'invoice', label: 'Trouble placing order', screen: 'trouble' },
      { id: 'payments', icon: 'payment', label: 'Payment & refunds', screen: 'payments' },
    ],
  },
  {
    title: 'Account',
    items: [
      { id: 'account-update', icon: 'user-edit', label: 'Update account information', screen: 'account-update' },
      { id: 'account-issues', icon: 'user-circle', label: 'Have issues with my account', screen: 'account-issues' },
    ],
  },
  {
    title: 'Experience',
    items: [
      { id: 'safety', icon: 'security', label: 'Safety concerns', screen: 'safety' },
      { id: 'rewards', icon: 'discount', label: 'Discounts & rewards', screen: 'rewards' },
      { id: 'faqs', icon: 'help', label: 'FAQs', screen: 'faqs' },
    ],
  },
]

// Recent orders shown under "Get help with your order". Replace with the
// customer's real order history once the orders API exists.
export const HELP_ORDERS = [
  { id: '231SHA', placedAt: '1-9-2026 10:10 AM', items: 2, status: 'Delivered' },
  { id: '232SHA', placedAt: '1-10-2026 3:45 PM', items: 5, status: 'Delivered' },
  { id: '233SHA', placedAt: '1-11-2026 1:30 PM', items: 3, status: 'Delivered' },
  { id: '234SHA', placedAt: '1-12-2026 9:00 AM', items: 0, status: 'Delivered' },
]

// Topics offered once an order is picked. Each opens an order-scoped screen.
export const ORDER_TOPICS = [
  { id: 'refund-time', label: 'What is my refund turnaround time?', screen: 'refund-time' },
  { id: 'refund-status', label: 'Check my refund status', screen: 'refund-status' },
  { id: 'cozy-points', label: 'I did not receive cozy points', screen: 'cozy-points' },
  { id: 'order-feedback', label: 'Feedback on order', screen: 'order-feedback' },
]

// Order-scoped screens: either a read-only answer or a dispute form.
export const ORDER_SCREENS = {
  'refund-time': {
    title: 'Refund turnaround time',
    body: "For orders paid via credit/debit card, all eligible order's amount will be refunded instantly to your loyalty wallet and will be ready to use on your next order with us!",
    feedback: true,
  },
  'refund-status': {
    title: 'Refund status',
    lines: [
      "Requested a refund and but haven't received it yet?",
      'Reach out to customer support to get more help.',
    ],
    form: { orderId: false, issuePlaceholder: 'I did not get a refund' },
  },
  'cozy-points': {
    title: 'Cozy Points',
    lines: [
      'You get cozy points on certain orders and special offers, if you believe we are wrong, please let us know the issue,',
    ],
    form: { orderId: true, issuePlaceholder: 'Shows I got points but did not update in wallet' },
  },
  'order-feedback': {
    title: 'Feedback',
    lines: [
      'You get cozy points on certain orders and special offers, if you believe we are wrong, please let us know the issue,',
    ],
    form: { orderId: true, issuePlaceholder: 'Shows I got points but did not update in wallet' },
  },
}

// Accordion screens. `points` adds the Cozy Points header (Discounts & rewards).
export const ARTICLE_SCREENS = {
  'account-issues': {
    title: 'Help with my account',
    faqs: [
      {
        q: 'How do I reset my password?',
        a: "Go to Settings > Security > Change password. You'll receive a verification code via email to confirm the reset.",
      },
      {
        q: 'How do I update my email address?',
        a: 'Open Settings > Account and edit your email. We send a confirmation link to the new address — the change applies once you follow it.',
      },
      {
        q: 'Why was my account locked?',
        a: 'Accounts are locked automatically after repeated failed sign-ins or unusual activity. Reset your password to unlock, or start a chat if that does not help.',
      },
      {
        q: 'How do I delete my account?',
        a: 'Settings > Account > Delete account. Any open orders must be completed first, and the deletion finishes within 30 days.',
      },
    ],
  },
  'account-update': {
    title: 'Update account information',
    faqs: [
      {
        q: 'How do I change my name?',
        a: 'Open Settings > Profile, edit your name and save. The new name appears on future orders and receipts.',
      },
      {
        q: 'How do I update my phone number?',
        a: 'Settings > Profile > Phone number. We send a one-time code to the new number to confirm it belongs to you.',
      },
      {
        q: 'How do I manage my saved addresses?',
        a: 'Addresses are managed from the delivery picker at checkout, or in Settings > Addresses, where you can add, edit or remove any saved place.',
      },
      {
        q: 'How do I change my notification preferences?',
        a: 'Settings > Notifications lets you turn order updates, offers and app notifications on or off independently.',
      },
    ],
  },
  trouble: {
    title: 'Trouble placing order',
    faqs: [
      {
        q: 'Why was my payment declined?',
        a: 'Declines usually come from the bank — an expired card, insufficient funds, or a blocked online payment. Try another card or pay with cash at the door.',
      },
      {
        q: 'Why can I not check out?',
        a: 'Checkout is blocked when the basket falls below the shop minimum, the shop is closed, or an item just went out of stock. The basket shows which applies.',
      },
      {
        q: 'Why is my address not available for delivery?',
        a: 'The address may sit outside the delivery radius of every open shop. Switch to pickup, or pick a shop closer to you.',
      },
      {
        q: 'My order did not go through but I was charged',
        a: 'Pending authorisations are released automatically within a few days. If the charge settles, start a chat with an order ID and we will refund it.',
      },
    ],
  },
  payments: {
    title: 'Payments & Refunds',
    faqs: [
      {
        q: "What's the refund policy?",
        a: 'Our refund policy allows you to request a refund within 30 days of your purchase. To initiate the process, please contact our customer support team.',
      },
      {
        q: 'Payment Methods',
        a: 'We accept Visa, Mastercard and Amex, plus cash on delivery and at the counter for pickup orders.',
      },
      {
        q: 'Refund Process',
        a: 'Approved refunds go back to your loyalty wallet instantly, or to the original card within 5-7 working days.',
      },
      {
        q: 'Payment Security',
        a: 'Card details are handled by our payment provider and never stored on our servers. Every payment is 3-D Secure verified.',
      },
    ],
  },
  safety: {
    title: 'Safety Guidelines',
    faqs: [
      {
        q: 'Allergies',
        a: 'This section provides essential information regarding safety protocols and practices to ensure a secure environment. It covers various topics including emergency procedures, equipment handling, and health regulations.',
      },
      { q: 'Incident Reporting', a: 'Report any incident through this Help Center or the chat. We respond to safety reports within one hour.' },
      { q: 'Safety Training', a: 'Every team member completes food handling and hygiene training before their first shift, refreshed annually.' },
      { q: 'Protective Equipment', a: 'Kitchen staff wear gloves, hairnets and aprons, and riders carry insulated, sealed bags for every order.' },
      { q: 'Health Protocols', a: 'Shops are cleaned on a fixed schedule and anyone showing symptoms of illness is stood down from food handling.' },
      { q: 'Safety Audits', a: 'Each shop is audited quarterly by an independent inspector, and the results are shared with the local authority.' },
      { q: 'Hazard Identification', a: 'Hazards are logged as they are spotted and fixed before service continues. Serious hazards close the shop until resolved.' },
      { q: 'First Aid Procedures', a: 'Every shop keeps a stocked first aid kit and at least one trained first aider on each shift.' },
      { q: 'Unsafe Conditions', a: 'If something feels unsafe during delivery or in a shop, tell us straight away — start a chat and we will escalate it immediately.' },
    ],
  },
  rewards: {
    title: 'Discounts & Rewards',
    points: 456,
    faqs: [
      {
        q: 'How do I spend the points?',
        a: 'To redeem your points, simply navigate to the rewards section in your account. From there, you can choose from a variety of exciting offers and discounts tailored just for you!',
      },
      { q: 'How to earn the points?', a: 'You earn 50 Cozy Points on every completed order, plus 30 bonus points for ordering in the app.' },
      { q: 'What discounts can I get?', a: 'Points convert to wallet credit, and unlock free drinks, pastry bundles and free delivery on selected shops.' },
      { q: 'Does cozy offer any promo codes?', a: 'Yes — seasonal codes go out by email and in the app. Enter them in the basket before checkout.' },
      { q: "What's the maximum discount cap?", a: 'A single order can be discounted by up to 50% of the item subtotal. Delivery fees are discounted separately.' },
    ],
  },
  faqs: {
    title: 'FAQs',
    faqs: [
      { q: 'How long does delivery take?', a: 'Standard delivery arrives in 30-40 minutes and priority in 15-25 minutes, depending on how far you are from the shop.' },
      { q: 'Can I change my order after placing it?', a: 'You have a short window right after placing an order to change it. Once the shop starts baking, start a chat and we will do what we can.' },
      { q: 'Do you cater for large groups?', a: 'Yes — orders above 20 items are handled as catering. Start a chat at least 24 hours ahead so the shop can prepare.' },
      { q: 'Where do you deliver?', a: 'Delivery covers the area around each open shop. Enter your address in the search bar to see which shops can reach you.' },
      { q: 'How do I track my order?', a: 'Every placed order opens a live tracking page showing the baking, rider and arrival stages in real time.' },
    ],
  },
}

// Opening messages and quick replies for the support chat.
export const CHAT_GREETING = {
  author: 'Emily',
  time: '9:30 AM',
  messages: [
    'Hi John, thanks for reaching out to Cozy Support, how do we help you today?',
    'Use the suggested queries or type below your problem.',
  ],
}

export const CHAT_SUGGESTIONS = [
  'I did not receive cozy points',
  'Where is my order?',
  'Check refund status',
]
