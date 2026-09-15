import React from 'react'
import { ChevronRight } from 'lucide-react'

// `items` is a list of `{ label, href?, onClick? }`; the last one is the current page.
const Breadcrumb = ({ items }) => (
  <nav className="breadcrumb page-container" aria-label="Breadcrumb">
    {items.map(({ label, href, onClick }, index) => {
      const isCurrent = index === items.length - 1

      return (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="breadcrumb-arrow" size={16} strokeWidth={1.5} aria-hidden="true" />
          )}
          {isCurrent ? (
            <span className="breadcrumb-current" aria-current="page">
              {label}
            </span>
          ) : href ? (
            <a href={href} className="breadcrumb-link" onClick={onClick}>
              {label}
            </a>
          ) : (
            <span className="breadcrumb-text">{label}</span>
          )}
        </React.Fragment>
      )
    })}
  </nav>
)

export default Breadcrumb
