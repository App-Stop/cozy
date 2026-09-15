import React from 'react'

// Export the background from Figma (node 1:830) into src/assets/baked/ as
// baked-bg.jpg (or .png / .webp). Until then a placeholder background is shown.
const files = import.meta.glob('../assets/baked/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const background = Object.entries(files).find(([path]) =>
  /\/baked-bg\.\w+$/.test(path),
)?.[1]

// Figma node 1:829 — full-width brand banner with a call to order.
const BakedSection = () => {
  return (
    <section className="baked">
      {background ? (
        <img src={background} alt="" className="baked-media" />
      ) : (
        <div className="baked-media hero-media-placeholder" aria-hidden="true" />
      )}

      <div className="baked-overlay" aria-hidden="true" />

      <div className="baked-content">
        <h2 className="baked-title">Baked with precision, care and love for you</h2>

        <div className="baked-actions">
          <a href="#menu" className="hero-btn">
            Order Now
          </a>
          <p className="baked-note">Free Delivery*</p>
        </div>
      </div>
    </section>
  )
}

export default BakedSection
