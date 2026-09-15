import React, { useEffect, useState } from 'react'
import MainLayout from './layouts/MainLayout'
import Hero from './components/Hero'
import MenuTabs from './components/MenuTabs'
import MenuSection from './components/MenuSection'
import BakedSection from './components/BakedSection'
import AppPromo from './components/AppPromo'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import Tracking from './pages/Tracking'
import { CATEGORIES } from './data/categories'
import { useHashRoute } from './hooks/useHashRoute'

const App = () => {
  const [category, setCategory] = useState(CATEGORIES[0].id)
  const { page, productId, orderId } = useHashRoute()

  // Switching pages replaces the content, so jump to the top — or to the
  // in-page anchor (e.g. `#menu`) once the home page has rendered it.
  useEffect(() => {
    const anchor = page === 'home' && window.location.hash.length > 1
      ? document.getElementById(window.location.hash.slice(1))
      : null

    if (anchor) anchor.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [page, productId, orderId])

  return (
    <MainLayout>
      {page === 'product' && (
        <ProductDetails key={productId} productId={productId} onOpenCategory={setCategory} />
      )}

      {page === 'checkout' && <Checkout />}

      {page === 'tracking' && <Tracking key={orderId} orderId={orderId} />}

      {page === 'home' && (
        <>
          <Hero />
          <section id="menu" className="page-container">
            <MenuTabs activeId={category} onChange={setCategory} />
            <MenuSection categoryId={category} />
          </section>
          <AppPromo />
          <BakedSection />
        </>
      )}
    </MainLayout>
  )
}

export default App
