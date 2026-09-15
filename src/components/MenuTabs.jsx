import React from 'react'
import { CATEGORIES } from '../data/categories'
import { PRODUCTS } from '../data/products'

// Real product counts win; categories without products yet keep their design count.
const productCounts = Object.values(PRODUCTS).reduce((counts, { category }) => {
  if (category) counts[category] = (counts[category] ?? 0) + 1
  return counts
}, {})

// Figma node 1:198 — category tabs shown below the hero.
const MenuTabs = ({ activeId = CATEGORIES[0].id, onChange }) => {
  return (
    <div className="menu-tabs" role="tablist" aria-label="Menu categories">
      {CATEGORIES.map(({ id, name, icon, count: designCount }) => {
        const count = productCounts[id] ?? designCount

        return (
        <button
          key={id}
          type="button"
          role="tab"
          id={`menu-tab-${id}`}
          aria-selected={id === activeId}
          className="menu-tab"
          onClick={() => onChange?.(id)}
        >
          <span className="menu-tab-label">
            {/* Icon is masked so it takes the tab's text colour. */}
            <span
              className="menu-tab-icon"
              style={{ '--icon': `url("${icon}")` }}
              aria-hidden="true"
            />
            {name}
          </span>
          <span className="menu-tab-count">{count}</span>
        </button>
        )
      })}
    </div>
  )
}

export default MenuTabs
