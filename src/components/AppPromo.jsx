import React from 'react'

// Export these from Figma (node 1:837) into src/assets/app-promo/ — until a
// file exists, a placeholder box of the right size is shown in its place:
//   google-play.svg  — "Get it on Google Play" button
//   app-store.svg    — "Download on the App Store" button
//   qr-code.png      — download QR code
//   app-mockup.png   — hand holding the phone (flattened, transparent background)
const files = import.meta.glob('../assets/app-promo/*.{svg,png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const images = Object.fromEntries(
  Object.entries(files).map(([path, src]) => [
    path.split('/').pop().replace(/\.\w+$/, ''),
    src,
  ]),
)

// Replace with the real store listings.
const STORE_LINKS = [
  { name: 'google-play', label: 'Get it on Google Play', href: '#' },
  { name: 'app-store', label: 'Download on the App Store', href: '#' },
]

const PromoImage = ({ name, alt = '', className }) => {
  const src = images[name]

  if (src) return <img src={src} alt={alt} className={className} />

  return (
    <span
      className={`app-promo-placeholder ${className}`}
      title={`Missing image: src/assets/app-promo/${name}`}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
    />
  )
}

// Figma node 1:837 — app download banner.
const AppPromo = () => {
  return (
    <section className="app-promo">
      <div className="app-promo-content">
        <div className="app-promo-copy">
          <h2 className="app-promo-title">Get exclusive discounts &amp; rewards on our app.</h2>
          <p className="app-promo-text">
            Save more with every order — download now and enjoy free delivery on your first 3
            orders.
          </p>
        </div>

        <div className="app-promo-downloads">
          <div className="app-promo-stores">
            {STORE_LINKS.map(({ name, label, href }) => (
              <a key={name} href={href} className="app-promo-store" aria-label={label}>
                <PromoImage name={name} className="app-promo-store-badge" />
              </a>
            ))}
          </div>

          <div className="app-promo-qr">
            <p className="app-promo-qr-label">Or scan to download</p>
            <PromoImage name="qr-code" alt="QR code to download the app" className="app-promo-qr-image" />
          </div>
        </div>
      </div>

      <PromoImage name="app-mockup" className="app-promo-mockup" />
    </section>
  )
}

export default AppPromo
