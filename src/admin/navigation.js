// Path router for the `/admin` app. Unknown admin paths fall back to the dashboard.
const PAGES = {
  '/admin': 'dashboard',
  '/admin/bakeries': 'bakeries',
}

export const adminPaths = { dashboard: '/admin', bakeries: '/admin/bakeries' }

export const currentAdminPage = () =>
  PAGES[window.location.pathname.replace(/\/+$/, '')] ?? 'dashboard'

export const navigateAdmin = (path) => {
  window.history.pushState(null, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

// onClick for admin `<a>` links: keeps modifier-clicks (new tab) working.
export const adminLinkClick = (path) => (event) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
  event.preventDefault()
  navigateAdmin(path)
}
