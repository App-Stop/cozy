import { useEffect, useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminLayout from './AdminLayout'
import Dashboard from './Dashboard'
import Bakeries from './Bakeries'
import { adminLogout, getAdminSession } from '../services/adminAuth'
import { currentAdminPage } from './navigation'
import './admin.css'

const AdminApp = () => {
  const [session, setSession] = useState(getAdminSession)
  const [page, setPage] = useState(currentAdminPage)

  useEffect(() => {
    document.title = 'Cozy Admin'
    const handleChange = () => {
      setPage(currentAdminPage())
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', handleChange)
    return () => window.removeEventListener('popstate', handleChange)
  }, [])

  if (!session) return <AdminLogin onLogin={setSession} />

  const logout = () => {
    adminLogout()
    setSession(null)
  }

  return (
    <AdminLayout page={page} session={session} onLogout={logout}>
      {page === 'dashboard' && <Dashboard />}
      {page === 'bakeries' && <Bakeries />}
    </AdminLayout>
  )
}

export default AdminApp
