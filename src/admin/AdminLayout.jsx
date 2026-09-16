import { LayoutDashboard, LogOut, Store } from 'lucide-react'
import logo from '../assets/navbar/logo.svg'
import { adminLinkClick, adminPaths } from './navigation'

const NAV = [
  { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { page: 'bakeries', label: 'Bakeries', icon: Store },
]

const AdminLayout = ({ page, session, onLogout, children }) => (
  <div className="admin-shell">
    <aside className="admin-sidebar">
      <a href={adminPaths.dashboard} className="admin-brand" onClick={adminLinkClick(adminPaths.dashboard)}>
        <img src={logo} alt="cozy" className="admin-logo" />
        <span className="admin-badge">Admin</span>
      </a>

      <nav className="admin-nav">
        {NAV.map(({ page: id, label, icon: Icon }) => (
          <a
            key={id}
            href={adminPaths[id]}
            className="admin-nav-link"
            aria-current={page === id ? 'page' : undefined}
            onClick={adminLinkClick(adminPaths[id])}
          >
            <Icon strokeWidth={1.5} />
            {label}
          </a>
        ))}
      </nav>

      <div className="admin-account">
        <span className="admin-avatar" aria-hidden="true">{session.name[0]}</span>
        <div className="admin-account-text">
          <p className="admin-account-name">{session.name}</p>
          <p className="admin-account-email">{session.email}</p>
        </div>
        <button type="button" className="admin-icon-btn" onClick={onLogout} aria-label="Sign out">
          <LogOut strokeWidth={1.5} />
        </button>
      </div>
    </aside>

    <main className="admin-main">{children}</main>
  </div>
)

export default AdminLayout
