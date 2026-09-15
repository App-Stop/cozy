import React from 'react'
import ProductCard from './ProductCard'
import { CATEGORIES } from '../data/categories'
import { PRODUCTS } from '../data/products'

// Figma node 1:263 — heading and product grid for the selected menu tab.
const MenuSection = ({ categoryId }) => {
  const category = CATEGORIES.find(({ id }) => id === categoryId)
  const products = Object.values(PRODUCTS).filter((product) => product.category === categoryId)

  return (
    <div
      className="menu-section"
      role="tabpanel"
      aria-labelledby={`menu-tab-${categoryId}`}
    >
      <h2 className="menu-section-title">{category?.title ?? category?.name}</h2>

      {products.length > 0 ? (
        <div className="menu-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="menu-empty">Fresh {category?.name.toLowerCase()} are coming soon.</p>
      )}
    </div>
  )
}

export default MenuSection
