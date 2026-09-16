// Admin panel content. Static for now — swap for the admin API once the
// backend exists.

export const ADMIN_STATS = [
  { key: 'current', label: 'Current Users', value: 12480, change: 4.2 },
  { key: 'active', label: 'Active Users', value: 3912, change: 8.1 },
  { key: 'revenue', label: 'Total Revenue', value: 284310.5, change: 12.6, currency: true },
  { key: 'new', label: 'New Users (this month)', value: 846, change: -2.3 },
]

export const RECENT_USERS = [
  { id: 'u-1042', name: 'Ava Thompson', email: 'ava.t@gmail.com', joined: '2026-09-15', orders: 3, status: 'Active' },
  { id: 'u-1041', name: 'Liam Carter', email: 'liam.carter@outlook.com', joined: '2026-09-15', orders: 1, status: 'Active' },
  { id: 'u-1040', name: 'Noah Patel', email: 'noahp@gmail.com', joined: '2026-09-14', orders: 0, status: 'Pending' },
  { id: 'u-1039', name: 'Mia Rossi', email: 'mia.rossi@yahoo.com', joined: '2026-09-13', orders: 5, status: 'Active' },
  { id: 'u-1038', name: 'Ethan Brooks', email: 'ebrooks@gmail.com', joined: '2026-09-12', orders: 2, status: 'Inactive' },
]

// Newest first.
export const BAKERIES = [
  { id: 'b-218', name: 'Golden Crumb', owner: 'Sofia Marin', city: 'Brooklyn, NY', joined: '2026-09-14', products: 24, orders: 112, revenue: 3240.8, rating: 4.8, status: 'Active' },
  { id: 'b-217', name: 'Flour & Fold', owner: 'James Lee', city: 'Austin, TX', joined: '2026-09-11', products: 18, orders: 64, revenue: 1890, rating: 4.6, status: 'Active' },
  { id: 'b-216', name: 'Butter Moon', owner: 'Priya Shah', city: 'Seattle, WA', joined: '2026-09-08', products: 9, orders: 0, revenue: 0, rating: null, status: 'Pending' },
  { id: 'b-215', name: 'The Rolling Pin', owner: 'Marco Bianchi', city: 'Chicago, IL', joined: '2026-09-03', products: 31, orders: 287, revenue: 8412.4, rating: 4.9, status: 'Active' },
  { id: 'b-214', name: 'Crust Collective', owner: 'Hannah Kim', city: 'Portland, OR', joined: '2026-08-27', products: 22, orders: 403, revenue: 11205.1, rating: 4.7, status: 'Active' },
  { id: 'b-213', name: 'Sugar Loaf', owner: 'Daniel Ortiz', city: 'Miami, FL', joined: '2026-08-19', products: 15, orders: 198, revenue: 5120, rating: 4.4, status: 'Suspended' },
  { id: 'b-212', name: 'Morning Proof', owner: 'Chloe Martin', city: 'Denver, CO', joined: '2026-08-02', products: 27, orders: 612, revenue: 17340.75, rating: 4.8, status: 'Active' },
  { id: 'b-211', name: 'Petit Four', owner: 'Omar Haddad', city: 'San Francisco, CA', joined: '2026-07-21', products: 40, orders: 931, revenue: 26880.3, rating: 4.9, status: 'Active' },
]

export const NEW_BAKERIES = BAKERIES.slice(0, 5)

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export const formatNumber = (value) => value.toLocaleString('en-US')

export const formatCurrency = (value) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
