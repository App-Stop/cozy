import React from 'react'
import ModalImage from './ModalImage'
import caretIcon from '../../assets/modals/caret-down.svg'

export const TextField = ({ label, ...inputProps }) => (
  <label className="modal-field">
    <span className="modal-field-label">{label}</span>
    <input type="text" className="modal-field-input" {...inputProps} />
  </label>
)

export const SelectField = ({ label, options, ...selectProps }) => (
  <label className="modal-field">
    <span className="modal-field-label">{label}</span>
    <select className="modal-field-input modal-field-select" {...selectProps}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <img src={caretIcon} alt="" className="modal-field-caret" />
  </label>
)

export const MapCard = ({ image, title, children }) => (
  <div className="map-card">
    <ModalImage name={image} className="map-card-image" />
    {children}
    <p className="map-card-title">{title}</p>
  </div>
)
