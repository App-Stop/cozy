import React, { useState } from 'react'
import Modal, { IconButton } from './Modal'
import { MapCard, SelectField, TextField } from './ModalParts'
import { STATES, formatAddress } from '../../data/locations'
import homePinIcon from '../../assets/modals/home-pin.svg'
import deleteIcon from '../../assets/modals/delete.svg'

// Pass `address` to edit an existing address; omit it to add a new one.
const AddressFormModal = ({ address, onSubmit, onDelete, onClose }) => {
  const isEdit = Boolean(address)
  const [form, setForm] = useState({
    state: address?.state ?? STATES[0],
    area: address?.area ?? '',
    instructions: address?.instructions ?? '',
  })

  const updateField = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({
      ...address,
      state: form.state,
      area: form.area.trim(),
      instructions: form.instructions.trim(),
    })
  }

  return (
    <Modal
      title={isEdit ? 'Edit Address' : 'Add New Address'}
      onClose={onClose}
      actions={
        isEdit && (
          <IconButton
            icon={deleteIcon}
            label="Delete address"
            onClick={() => onDelete(address.id)}
          />
        )
      }
    >
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="modal-body">
          <MapCard
            image="map-address"
            title={form.area.trim() ? formatAddress(form) : 'Enter your area below'}
          >
            <img src={homePinIcon} alt="" className="map-pin-static" />
          </MapCard>

          <div className="modal-fields">
            <SelectField
              label="State"
              value={form.state}
              onChange={updateField('state')}
              options={STATES.map((name) => ({ value: name, label: name }))}
            />
            <TextField
              label="Area"
              placeholder="Street, building or area"
              value={form.area}
              onChange={updateField('area')}
              required
            />
            <TextField
              label="Instructions for rider (Optional)"
              placeholder="e.g. Please ring the bell twice"
              value={form.instructions}
              onChange={updateField('instructions')}
            />
          </div>
        </div>

        <button type="submit" className="modal-btn modal-btn-primary" disabled={!form.area.trim()}>
          {isEdit ? 'Save changes' : 'Add Address'}
        </button>
      </form>
    </Modal>
  )
}

export default AddressFormModal
