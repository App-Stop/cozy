import React, { useState } from 'react'
import DeliverModal from '../components/modals/DeliverModal'
import AddressFormModal from '../components/modals/AddressFormModal'
import AddressBookModal from '../components/modals/AddressBookModal'
import { LocationContext } from './location'
import { SAMPLE_ADDRESSES, describeFulfilment } from '../data/locations'

// Owns the saved addresses, the chosen delivery / pickup option and the
// modals used to change them, so any component (navbar, cart) can open them.
const LocationProvider = ({ children }) => {
  const [addresses, setAddresses] = useState(SAMPLE_ADDRESSES)
  const [fulfilment, setFulfilment] = useState(null)
  // 'deliver' | 'address-book' | 'address-form' | null
  const [activeModal, setActiveModal] = useState(null)
  // Modal the address form returns to: the picker, or the profile's address book.
  const [formReturn, setFormReturn] = useState('deliver')
  const [editingAddress, setEditingAddress] = useState(null)
  // Tab to open the picker on ('delivery' | 'pickup'); null follows the current choice.
  const [pickerTab, setPickerTab] = useState(null)

  const closeModal = () => setActiveModal(null)

  const choose = (nextFulfilment) => {
    setFulfilment(nextFulfilment)
    closeModal()
  }

  const openAddressForm = (address = null, returnTo = 'deliver') => {
    setEditingAddress(address)
    setFormReturn(returnTo)
    setPickerTab('delivery')
    setActiveModal('address-form')
  }

  const saveAddress = (address) => {
    if (address.id) {
      setAddresses((list) => list.map((item) => (item.id === address.id ? address : item)))
    } else {
      const id = crypto.randomUUID()
      setAddresses((list) => [...list, { ...address, id }])
      setFulfilment({ type: 'delivery', addressId: id })
    }
    setActiveModal(formReturn)
  }

  const deleteAddress = (id) => {
    setAddresses((list) => list.filter((item) => item.id !== id))
    if (fulfilment?.addressId === id) setFulfilment(null)
    setActiveModal(formReturn)
  }

  const value = {
    fulfilment,
    ...describeFulfilment(fulfilment, addresses),
    openLocationPicker: (tab = null) => {
      setPickerTab(tab)
      setActiveModal('deliver')
    },
    openAddressBook: () => setActiveModal('address-book'),
  }

  return (
    <LocationContext.Provider value={value}>
      {children}

      {activeModal === 'deliver' && (
        <DeliverModal
          initialTab={pickerTab ?? (fulfilment?.type === 'pickup' ? 'pickup' : 'delivery')}
          addresses={addresses}
          selectedAddressId={fulfilment?.addressId}
          selectedShopId={fulfilment?.shopId}
          onSelectAddress={(addressId) => choose({ type: 'delivery', addressId })}
          onUseCurrentLocation={(coords) => choose({ type: 'current', coords })}
          onSaveShop={(shopId) => choose({ type: 'pickup', shopId })}
          onAddAddress={() => openAddressForm()}
          onEditAddress={openAddressForm}
          onClose={closeModal}
        />
      )}

      {activeModal === 'address-book' && (
        <AddressBookModal
          addresses={addresses}
          selectedAddressId={fulfilment?.type === 'delivery' ? fulfilment.addressId : null}
          onSelect={(addressId) => setFulfilment({ type: 'delivery', addressId })}
          onEdit={(address) => openAddressForm(address, 'address-book')}
          onAdd={() => openAddressForm(null, 'address-book')}
          onClose={closeModal}
        />
      )}

      {activeModal === 'address-form' && (
        <AddressFormModal
          address={editingAddress}
          onSubmit={saveAddress}
          onDelete={deleteAddress}
          onClose={() => setActiveModal(formReturn)}
        />
      )}
    </LocationContext.Provider>
  )
}

export default LocationProvider
