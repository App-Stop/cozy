import React, { useState } from 'react'
import ModalImage from './modals/ModalImage'
import { useCart } from '../context/cart'
import { formatPrice } from '../data/products'
import { productPath } from '../hooks/useHashRoute'
import fireIcon from '../assets/product-card/fire.svg'
import starIcon from '../assets/product-card/star.svg'
import basketAddIcon from '../assets/product-card/basket-add.svg'
import favouriteIcon from '../assets/product-card/favourite.svg'

// Figma node 1:266 — the photo sits on a blurred copy of itself, which gives
// the soft, colour-matched glow behind each product. The name link stretches
// over the whole card so clicking anywhere opens the product page.
const ProductCard = ({ product }) => {
  const { addItem } = useCart()
  const [isFavourite, setIsFavourite] = useState(false)
  const { id, name, image, price, unit, calories, rating, reviews, isNew } = product

  return (
    <article className="product-card">
      <ModalImage name={image} className="product-card-glow" />
      <ModalImage name={image} className="product-card-image" />

      <div className="product-card-body">
        <div className="product-card-info">
          <h3 className="product-card-name">
            <a href={productPath(id)} className="product-card-link">
              {name}
            </a>
          </h3>

          <p className="product-card-price">
            {formatPrice(price)}
            {unit && <span className="product-card-unit">/{unit}</span>}
          </p>

          <div className="product-card-meta">
            {calories != null && (
              <span className="product-card-stat">
                <img src={fireIcon} alt="" />
                {calories}kCal
              </span>
            )}
            {rating != null && (
              <span className="product-card-stat">
                <img src={starIcon} alt="" />
                {rating}
                {reviews && <span className="product-card-reviews">({reviews})</span>}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          className="product-card-add"
          aria-label={`Add ${name} to cart`}
          onClick={() => addItem(id)}
        >
          <img src={basketAddIcon} alt="" />
          Add to cart
        </button>
      </div>

      {isNew && <span className="product-card-tag">NEW</span>}

      <button
        type="button"
        className="product-card-fav"
        aria-label={`Save ${name} to favourites`}
        aria-pressed={isFavourite}
        onClick={() => setIsFavourite((value) => !value)}
      >
        <img src={favouriteIcon} alt="" />
      </button>
    </article>
  )
}

export default ProductCard
