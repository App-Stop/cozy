import { Plus } from 'lucide-react'
import Modal from './Modal'
import { formatAddress } from '../../data/locations'
import editIcon from '../../assets/modals/edit.svg'

// Figma node 1:8768 — saved addresses opened from the profile page. Picking
// one makes it the delivery address; the pencil opens the address form.
const AddressBookModal = ({ addresses, selectedAddressId, onSelect, onEdit, onAdd, onClose }) => (
  <Modal title="Addresses" onClose={onClose}>
    {addresses.length > 0 ? (
      <div className="address-cards" role="radiogroup" aria-label="Saved addresses">
        {addresses.map((address) => (
          <div key={address.id} className="address-card">
            <button
              type="button"
              role="radio"
              aria-checked={address.id === selectedAddressId}
              className="address-option address-card-option"
              onClick={() => onSelect(address.id)}
            >
              <span className="address-radio" />
              <span className="truncate">{formatAddress(address)}</span>
            </button>

            <button
              type="button"
              className="address-edit"
              aria-label={`Edit ${formatAddress(address)}`}
              onClick={() => onEdit(address)}
            >
              <img src={editIcon} alt="" />
            </button>
          </div>
        ))}
      </div>
    ) : (
      <p className="modal-hint">You haven’t saved any addresses yet.</p>
    )}

    <button type="button" className="modal-btn modal-btn-soft gap-[10px]" onClick={onAdd}>
      <Plus className="size-6" strokeWidth={1.5} aria-hidden="true" />
      Add new address
    </button>
  </Modal>
)

export default AddressBookModal
