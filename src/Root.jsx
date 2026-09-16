import { Suspense, lazy } from 'react'
import App from './App.jsx'

// `/admin` is a separate, gated app — loaded on demand so the storefront
// bundle never ships it.
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'))

const Root = () =>
  /^\/admin(\/|$)/.test(window.location.pathname) ? (
    <Suspense fallback={null}>
      <AdminApp />
    </Suspense>
  ) : (
    <App />
  )

export default Root
