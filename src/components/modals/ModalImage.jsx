import React from 'react'

// Raster artwork exported from Figma lives in src/assets/modals/<name>.png
// (illustrations) or src/assets/products/<name>.png (product photos).
// Until a file exists, a placeholder box is rendered in its place.
const files = import.meta.glob(
  ['../../assets/modals/*.{png,jpg,jpeg,webp}', '../../assets/products/*.{png,jpg,jpeg,webp}'],
  { eager: true, import: 'default' },
)

const images = Object.fromEntries(
  Object.entries(files).map(([path, src]) => [
    path.split('/').pop().replace(/\.\w+$/, ''),
    src,
  ]),
)

const ModalImage = ({ name, className = '' }) => {
  const src = images[name]

  if (src) return <img src={src} alt="" className={className} />

  return (
    <span
      className={`modal-image-placeholder ${className}`}
      title={`Missing image: ${name}.png`}
    />
  )
}

export default ModalImage
