import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartPill from '../components/cart/CartPill'
import CartSidebar from '../components/cart/CartSidebar'
import LocationProvider from '../context/LocationProvider'
import CartProvider from '../context/CartProvider'
import OrderProvider from '../context/OrderProvider'

const MainLayout = ({ children }) => {
  return (
    <OrderProvider>
      <LocationProvider>
        <CartProvider>
          <div className="app-shell">
            <Navbar />
            <main className="app-main">{children}</main>
            <Footer />
            <CartPill />
            <CartSidebar />
          </div>
        </CartProvider>
      </LocationProvider>
    </OrderProvider>
  )
}

export default MainLayout
