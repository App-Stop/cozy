import { useEffect, useState } from 'react'

// Minimal hash router: `#/product/<id>`, `#/checkout`, `#/tracking/<orderId>`
// and `#/profile[/<section>]` open their pages; anything else (including
// in-page anchors like `#menu`) renders the home page.
const ROUTES = [
  [/^#\/product\/([^/?#]+)/, (productId) => ({ page: 'product', productId })],
  [/^#\/checkout\/?$/, () => ({ page: 'checkout' })],
  [/^#\/tracking\/([^/?#]+)/, (orderId) => ({ page: 'tracking', orderId })],
  [/^#\/profile\/([^/?#]+)/, (section) => ({ page: 'profile', section })],
  [/^#\/profile\/?$/, () => ({ page: 'profile', section: 'overview' })],
]

const parseHash = () => {
  for (const [pattern, toRoute] of ROUTES) {
    const match = window.location.hash.match(pattern)
    if (match) return toRoute(...match.slice(1).map(decodeURIComponent))
  }
  return { page: 'home' }
}

export const productPath = (productId) => `#/product/${encodeURIComponent(productId)}`

export const checkoutPath = '#/checkout'

export const trackingPath = (orderId) => `#/tracking/${encodeURIComponent(orderId)}`

// `section` is one of 'overview', 'wallet', 'points', 'orders', 'favourites'.
export const profilePath = (section = 'overview') =>
  section === 'overview' ? '#/profile' : `#/profile/${section}`

export const useHashRoute = () => {
  const [route, setRoute] = useState(parseHash)

  useEffect(() => {
    const handleChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', handleChange)
    return () => window.removeEventListener('hashchange', handleChange)
  }, [])

  return route
}
