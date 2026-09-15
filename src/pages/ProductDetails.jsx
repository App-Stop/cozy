import React, { useState } from 'react'
import { Egg, Milk, Minus, Nut, Wheat } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import ProductCard from '../components/ProductCard'
import AppPromo from '../components/AppPromo'
import BakedSection from '../components/BakedSection'
import ModalImage from '../components/modals/ModalImage'
import { useCart } from '../context/cart'
import { CATEGORIES } from '../data/categories'
import { PRODUCTS, SUGGESTED_PRODUCT_IDS, formatPrice } from '../data/products'
import fireIcon from '../assets/product-card/fire.svg'
import starIcon from '../assets/product-card/star.svg'
import favouriteIcon from '../assets/product-card/favourite.svg'
import plusIcon from '../assets/cart/plus.svg'
import plusRoundIcon from '../assets/cart/plus-round.svg'
import './productDetails.css'

// Figma node 1:2684 — each allergen is a tinted circle with its icon and label.
const ALLERGENS = {
  gluten: { label: 'Gluten', Icon: Wheat, color: '#FAEAE4' },
  eggs: { label: 'Eggs', Icon: Egg, color: '#FAF7E4' },
  milk: { label: 'Milk', Icon: Milk, color: '#F2F2F2' },
  nuts: { label: 'Nuts', Icon: Nut, color: '#F3EDE6' },
}

const FrequentlyBought = () => {
  const { addItem } = useCart()

  return (
    <div className="pd-block">
      <h2 className="pd-block-title">Frequently bought together</h2>
      <div className="pd-extras">
        {SUGGESTED_PRODUCT_IDS.map((id) => {
          const extra = PRODUCTS[id]
          return (
            <div key={id} className="pd-extra">
              <div className="pd-extra-info">
                <ModalImage name={extra.image} className="pd-extra-image" />
                <span className="pd-extra-name">{extra.name}</span>
                <span className="pd-extra-price">+{formatPrice(extra.price)}</span>
              </div>
              <button
                type="button"
                className="pd-round-btn"
                aria-label={`Add ${extra.name} to cart`}
                onClick={() => addItem(id)}
              >
                <img src={plusRoundIcon} alt="" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ProductSection = ({ title, products }) => {
  if (products.length === 0) return null

  return (
    <section className="pd-section page-container">
      <h2 className="menu-section-title">{title}</h2>
      <div className="menu-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

// Figma node 1:2615 — product hero, related products, app promo and banner.
const ProductDetails = ({ productId, onOpenCategory }) => {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [isFavourite, setIsFavourite] = useState(false)
  const product = PRODUCTS[productId]

  if (!product) {
    return (
      <div className="pd-missing page-container">
        <h1 className="menu-section-title">We couldn’t find that item</h1>
        <a href="#menu" className="hero-btn">
          Back to menu
        </a>
      </div>
    )
  }

  const { id, name, image, price, unit, calories, rating, reviews, description, ingredients, allergens } =
    product
  const category = CATEGORIES.find((item) => item.id === product.category)
  const catalogue = Object.values(PRODUCTS).filter((item) => item.category && item.id !== id)
  const similar = catalogue.filter((item) => item.category === product.category)
  const others = catalogue.filter((item) => item.category !== product.category)

  const handleAdd = () => {
    addItem(id, qty)
    setQty(1)
  }

  return (
    <div className="product-details">
      <Breadcrumb
        items={[
          { label: 'Home', href: '#' },
          ...(category
            ? [{ label: category.name, href: '#menu', onClick: () => onOpenCategory?.(category.id) }]
            : []),
          { label: product.name },
        ]}
      />

      <section className="pd-hero page-container">
        <ModalImage name={image} className="pd-image" />

        <div className="pd-info">
          <div className="pd-heading">
            <h1 className="pd-title">{name}</h1>
            {description && <p className="pd-description">{description}</p>}
          </div>

          {(calories != null || rating != null) && (
            <div className="pd-chips">
              {calories != null && (
                <span className="pd-chip pd-chip--calories">
                  <img src={fireIcon} alt="" />
                  {calories}kCal
                </span>
              )}
              {rating != null && (
                <span className="pd-chip pd-chip--rating">
                  <img src={starIcon} alt="" />
                  {rating}
                  {reviews && <span className="pd-chip-muted">({reviews})</span>}
                </span>
              )}
            </div>
          )}

          <div className="pd-purchase">
            <div className="pd-price-row">
              <p className="pd-price">
                {formatPrice(price)}
                {unit && <span className="pd-unit">/{unit}</span>}
              </p>

              <div className="pd-stepper">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={qty <= 1}
                  onClick={() => setQty((value) => Math.max(1, value - 1))}
                >
                  <Minus size={20} strokeWidth={1.5} color="#111111" />
                </button>
                <span className="pd-stepper-count" aria-live="polite">
                  {qty}
                </span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQty((value) => value + 1)}>
                  <img src={plusIcon} alt="" />
                </button>
              </div>
            </div>

            <div className="pd-actions">
              <button type="button" className="pd-add" onClick={handleAdd}>
                Add to cart
              </button>
              <button
                type="button"
                className="pd-fav"
                aria-label={`Save ${name} to favourites`}
                aria-pressed={isFavourite}
                onClick={() => setIsFavourite((value) => !value)}
              >
                <img src={favouriteIcon} alt="" />
              </button>
            </div>
          </div>

          <FrequentlyBought />

          {ingredients?.length > 0 && (
            <div className="pd-block">
              <h2 className="pd-block-title">Ingredients</h2>
              <ul className="pd-ingredients">
                {ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}

          {allergens?.length > 0 && (
            <div className="pd-block">
              <h2 className="pd-block-title">Allergens</h2>
              <ul className="pd-allergens">
                {allergens.map((key) => {
                  const { label, Icon, color } = ALLERGENS[key]
                  return (
                    <li key={key} className="pd-allergen" style={{ backgroundColor: color }}>
                      <Icon className="pd-allergen-icon" size={32} strokeWidth={1.5} aria-hidden="true" />
                      {label}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </section>

      <ProductSection title="More like this" products={similar} />
      <AppPromo />
      <ProductSection title="You may also want to try" products={others} />
      <BakedSection />
    </div>
  )
}

export default ProductDetails
