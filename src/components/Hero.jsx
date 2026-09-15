import React from 'react'

// Drop the background video into src/assets/hero/ as hero.mp4 (and optionally
// hero.webm / hero-poster.jpg). Until then a placeholder background is shown.
const files = import.meta.glob('../assets/hero/*.{mp4,webm,jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const findAsset = (name) =>
  Object.entries(files).find(([path]) => path.split('/').pop() === name)?.[1]

const videoMp4 = findAsset('hero.mp4')
const videoWebm = findAsset('hero.webm')
const poster =
  findAsset('hero-poster.jpg') ?? findAsset('hero-poster.webp') ?? findAsset('hero-poster.png')

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const Hero = () => {
  const hasVideo = Boolean(videoMp4 || videoWebm)

  return (
    <section className="hero">
      {hasVideo ? (
        <video
          className="hero-media"
          poster={poster}
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          {videoWebm && <source src={videoWebm} type="video/webm" />}
          {videoMp4 && <source src={videoMp4} type="video/mp4" />}
        </video>
      ) : (
        <div className="hero-media hero-media-placeholder" aria-hidden="true" />
      )}

      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content">
        <h1 className="hero-title">
          Oven baked freshness,
          <br />
          at your home
        </h1>

        <div className="hero-actions">
          <a href="#menu" className="hero-btn">
            Browse Menu
          </a>
          <a href="#menu" className="hero-scroll">
            or scroll down
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
