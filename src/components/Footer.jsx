import React, { useState } from 'react'
import { Mail } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import logo from '../assets/navbar/logo.svg'

// Replace the `#` hrefs with real pages and profiles.
const SOCIAL_LINKS = [
  { name: 'instagram', label: 'Instagram', Icon: FaInstagram, href: '#' },
  { name: 'facebook', label: 'Facebook', Icon: FaFacebookF, href: '#' },
  { name: 'twitter', label: 'Twitter', Icon: FaTwitter, href: '#' },
]

const NAV_COLUMNS = [
  {
    title: 'About',
    links: [
      { label: 'Our story', href: '#' },
      { label: 'Bakery', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Menu',
    links: [
      { label: 'Croissants', href: '#menu' },
      { label: 'Cakes', href: '#menu' },
      { label: 'Coffee', href: '#menu' },
    ],
  },
  {
    title: 'Locations',
    links: [
      { label: 'Find a bakery', href: '#' },
      { label: 'Delivery zones', href: '#' },
      { label: 'Pickup', href: '#' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Support', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Partners', href: '#' },
    ],
  },
]

const LEGAL_LINKS = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Cookies', href: '#' },
]

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // No newsletter backend yet — confirm locally so the form feels complete.
  const subscribe = (event) => {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <div className="footer-newsletter">
      <h2 className="footer-heading">Newsletter</h2>
      <p className="footer-text">
        Get new drops, seasonal specials, and early access to limited batches.
      </p>

      {subscribed ? (
        <p className="footer-subscribed" role="status">
          Thanks! You're on the list for {email}.
        </p>
      ) : (
        <form className="footer-form" onSubmit={subscribe}>
          <label className="footer-input">
            <Mail className="footer-input-icon" strokeWidth={1.5} aria-hidden="true" />
            <span className="sr-only">Email address</span>
            <input
              type="email"
              required
              placeholder="Email address"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <button type="submit" className="footer-subscribe">
            Subscribe
          </button>
        </form>
      )}

      <p className="footer-fineprint">By subscribing, you agree to our Terms and Privacy Policy.</p>
    </div>
  )
}

// Figma node 1:873 — site footer.
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src={logo} alt="Cozy" className="footer-logo" />
          <p className="footer-text">
            Freshly baked, delivered to your door. From classic butter to seasonal specials — every
            bite is made with care.
          </p>
          <ul className="footer-social">
            {SOCIAL_LINKS.map(({ name, label, Icon, href }) => (
              <li key={name}>
                <a href={href} className="footer-social-link" aria-label={label}>
                  <Icon className="footer-social-icon" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          {NAV_COLUMNS.map(({ title, links }) => (
            <div key={title} className="footer-column">
              <h2 className="footer-heading">{title}</h2>
              <ul className="footer-links">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="footer-link">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <Newsletter />
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Cozy. All rights reserved.</p>
        <ul className="footer-legal">
          {LEGAL_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="footer-link">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
