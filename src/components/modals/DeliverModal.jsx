import React, { useState } from 'react'
import Modal from './Modal'
import ModalImage from './ModalImage'
import { MapCard, SelectField } from './ModalParts'
import { SHOPS, formatAddress } from '../../data/locations'
import locationIcon from '../../assets/modals/location-outline.svg'
import editIcon from '../../assets/modals/edit.svg'
import shopPinIcon from '../../assets/modals/shop-pin.svg'
import shopPinActiveIcon from '../../assets/modals/shop-pin-active.svg'
import pinShadow from '../../assets/modals/pin-shadow.svg'

const PICKUP_STATES = [...new Set(SHOPS.map((shop) => shop.state))]

const TABS = [
  { id: 'delivery', label: 'Delivery', icon: 'delivery-scooter' },
  { id: 'pickup', label: 'Pickup', icon: 'pickup-shop' },
]

const DeliveryPanel = ({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onUseCurrentLocation,
  onAddAddress,
  onEditAddress,
}) => {
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState('')

  const locate = () => {
    if (!navigator.geolocation) {
      setError('Location is not supported by this browser.')
      return
    }

    setLocating(true)
    setError('')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false)
        onUseCurrentLocation({ lat: coords.latitude, lng: coords.longitude })
      },
      () => {
        setLocating(false)
        setError('We couldn’t get your location. Check your browser permissions.')
      },
      { timeout: 10000 },
    )
  }

  return (
    <div className="address-list">
      <div>
        <button type="button" className="address-option" onClick={locate} disabled={locating}>
          <img src={locationIcon} alt="" className="address-location-icon" />
          <span>{locating ? 'Locating…' : 'Use my current location'}</span>
        </button>
        {error && <p className="modal-error">{error}</p>}
      </div>

      {addresses.length > 0 ? (
        <div className="address-list" role="radiogroup" aria-label="Saved addresses">
          {addresses.map((address) => {
            const label = formatAddress(address)

            return (
              <div key={address.id} className="address-row">
                <button
                  type="button"
                  role="radio"
                  aria-checked={address.id === selectedAddressId}
                  className="address-option"
                  onClick={() => onSelectAddress(address.id)}
                >
                  <span className="address-radio" />
                  <span className="truncate">{label}</span>
                </button>

                <button
                  type="button"
                  className="address-edit"
                  aria-label={`Edit ${label}`}
                  onClick={() => onEditAddress(address)}
                >
                  <img src={editIcon} alt="" />
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="modal-hint">You haven’t saved any addresses yet.</p>
      )}

      <button type="button" className="modal-btn modal-btn-soft" onClick={onAddAddress}>
        Add new address
      </button>
    </div>
  )
}

const PickupPanel = ({ selectedShopId, onSaveShop }) => {
  const initialShop = SHOPS.find((shop) => shop.id === selectedShopId) ?? SHOPS[0]
  const [state, setState] = useState(initialShop.state)
  const [shopId, setShopId] = useState(initialShop.id)

  const shops = SHOPS.filter((shop) => shop.state === state)
  const selectedShop = shops.find((shop) => shop.id === shopId)

  const changeState = (nextState) => {
    setState(nextState)
    setShopId(SHOPS.find((shop) => shop.state === nextState)?.id)
  }

  return (
    <>
      <div className="modal-fields">
        <SelectField
          label="State"
          value={state}
          onChange={(event) => changeState(event.target.value)}
          options={PICKUP_STATES.map((name) => ({ value: name, label: name }))}
        />
        <SelectField
          label="Shop"
          value={shopId}
          onChange={(event) => setShopId(event.target.value)}
          options={shops.map((shop) => ({ value: shop.id, label: shop.name }))}
        />
      </div>

      <MapCard image="map-shops" title={selectedShop?.address}>
        {shops.map((shop) => {
          const active = shop.id === shopId

          return (
            <button
              key={shop.id}
              type="button"
              className="map-pin"
              aria-pressed={active}
              aria-label={shop.name}
              style={{ left: `calc(50% + ${shop.pin.x}px)`, top: `calc(50% + ${shop.pin.y}px)` }}
              onClick={() => setShopId(shop.id)}
            >
              {active && (
                <span className="map-pin-shadow">
                  <img src={pinShadow} alt="" />
                </span>
              )}
              <img src={active ? shopPinActiveIcon : shopPinIcon} alt="" />
            </button>
          )
        })}
      </MapCard>

      <button
        type="button"
        className="modal-btn modal-btn-primary"
        disabled={!selectedShop}
        onClick={() => onSaveShop(shopId)}
      >
        Save changes
      </button>
    </>
  )
}

const DeliverModal = ({ initialTab = 'delivery', selectedShopId, onSaveShop, onClose, ...deliveryProps }) => {
  const [tab, setTab] = useState(initialTab)
  const isPickup = tab === 'pickup'

  return (
    <Modal
      title={isPickup ? 'Select a shop' : 'Where to deliver?'}
      illustration={isPickup ? 'pickup-shop' : 'delivery-scooter'}
      onClose={onClose}
    >
      <div className="modal-body">
        <div className="modal-tabs" role="tablist">
          {TABS.map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className="modal-tab"
              onClick={() => setTab(id)}
            >
              <ModalImage name={icon} className="modal-tab-icon" />
              {label}
            </button>
          ))}
        </div>

        {isPickup ? (
          <PickupPanel selectedShopId={selectedShopId} onSaveShop={onSaveShop} />
        ) : (
          <DeliveryPanel {...deliveryProps} />
        )}
      </div>
    </Modal>
  )
}

export default DeliverModal
