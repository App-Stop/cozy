import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import TrackOrderModal from './modals/TrackOrderModal'
import SignupModal from './modals/SignupModal'
import { useFulfilment } from '../context/location'
import { trackingPath } from '../hooks/useHashRoute'
import logo from '../assets/navbar/logo.svg'
import locationIcon from '../assets/navbar/location.svg'
import gpsIcon from '../assets/navbar/gps.svg'
import searchIcon from '../assets/navbar/search.svg'
import filterIcon from '../assets/navbar/filter.svg'
import globeIcon from '../assets/navbar/globe.svg'
import arrowDownIcon from '../assets/navbar/arrow-down.svg'

const SearchBar = ({ className = '' }) => (
  <label className={`navbar-search ${className}`}>
    <img src={searchIcon} alt="" className="navbar-icon" />
    <input
      type="text"
      className="navbar-search-input"
      placeholder="Search croissant, cakes, fresh items"
      aria-label="Search"
    />
    <button type="button" className="navbar-search-filter" aria-label="Filters">
      <img src={filterIcon} alt="" className="navbar-icon" />
    </button>
  </label>
)

const Navbar = () => {
  // 'track' | 'signup' | null — location modals live in LocationProvider.
  const [activeModal, setActiveModal] = useState(null)
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const { label, value, openLocationPicker } = useFulfilment()

  const closeModal = () => setActiveModal(null)

  const openModal = (name) => {
    setMenuOpen(false)
    setActiveModal(name)
  }

  // Close the mobile menu on Escape, or once the viewport reaches desktop width.
  useEffect(() => {
    if (!menuOpen) return undefined

    const desktop = window.matchMedia('(min-width: 80rem)')
    const close = () => setMenuOpen(false)
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') close()
    }
    const handleBreakpoint = (event) => {
      if (event.matches) close()
    }

    document.addEventListener('keydown', handleKeyDown)
    desktop.addEventListener('change', handleBreakpoint)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      desktop.removeEventListener('change', handleBreakpoint)
    }
  }, [menuOpen])

  // Accepts "ORDER-21332" or just "21332".
  const handleTrack = (orderId) => {
    closeModal()
    window.location.assign(trackingPath(orderId.replace(/\D/g, '') || orderId))
  }

  const fulfilmentButton = (
    <button
      type="button"
      className="navbar-action"
      onClick={() => {
        setMenuOpen(false)
        openLocationPicker()
      }}
    >
      <img src={locationIcon} alt="" className="navbar-icon" />
      <span className="navbar-action-text">
        <span className="navbar-action-label">{label}</span>
        <span className="navbar-action-value navbar-address-value">{value}</span>
      </span>
    </button>
  )

  const trackButton = (
    <button type="button" className="navbar-action" onClick={() => openModal('track')}>
      <img src={gpsIcon} alt="" className="navbar-icon" />
      <span className="navbar-action-value">Track your order</span>
    </button>
  )

  const languageButton = (className = '') => (
    <button type="button" className={`navbar-lang ${className}`}>
      <img src={globeIcon} alt="" className="navbar-icon" />
      <span className="navbar-lang-value">En</span>
      <img src={arrowDownIcon} alt="" className="navbar-lang-caret" />
    </button>
  )

  const authControls = user ? (
    <span className="navbar-user">Hi, {user.name.split(' ')[0]}</span>
  ) : (
    <>
      <button type="button" className="navbar-btn-outline">
        Log in
      </button>

      <button type="button" className="navbar-btn-solid" onClick={() => openModal('signup')}>
        Sign up for free delivery
      </button>
    </>
  )

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <a href="/" className="navbar-brand">
            <img src={logo} alt="cozy" className="navbar-logo" />
          </a>

          <div className="navbar-actions">
            <span className="navbar-divider" />
            {fulfilmentButton}
            <span className="navbar-divider" />
            {trackButton}
          </div>
        </div>

        <SearchBar className="navbar-search--desktop" />

        <div className="navbar-right">
          {languageButton('navbar-lang--desktop')}
          <div className="navbar-auth">{authControls}</div>

          <button
            type="button"
            className="navbar-menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="navbar-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div className="navbar-mobile-search">
        <SearchBar />
      </div>

      {menuOpen && (
        <nav id="navbar-menu" className="navbar-menu" aria-label="Main menu">
          {fulfilmentButton}
          {trackButton}

          <div className="navbar-menu-extra">
            <span className="navbar-menu-divider" />
            {languageButton()}
            <div className="navbar-menu-auth">{authControls}</div>
          </div>
        </nav>
      )}

      {activeModal === 'track' && <TrackOrderModal onTrack={handleTrack} onClose={closeModal} />}

      {activeModal === 'signup' && (
        <SignupModal
          onComplete={(signedUpUser) => {
            setUser(signedUpUser)
            closeModal()
          }}
          onClose={closeModal}
        />
      )}
    </header>
  )
}

export default Navbar
