import { useMemo, useState } from 'react'
import { Search, Star } from 'lucide-react'
import { AdminHeader, AdminTable, NameCell, StatusPill } from './AdminParts'
import { BAKERIES, formatCurrency, formatDate, formatNumber } from '../data/admin'

const FILTERS = ['All', 'Active', 'Pending', 'Suspended']

const COLUMNS = [
  { key: 'name', label: 'Bakery', render: (b) => <NameCell name={b.name} sub={b.id} /> },
  { key: 'owner', label: 'Owner' },
  { key: 'city', label: 'Location' },
  { key: 'joined', label: 'Joined', render: (b) => formatDate(b.joined) },
  { key: 'products', label: 'Products', align: 'right' },
  { key: 'orders', label: 'Orders', align: 'right', render: (b) => formatNumber(b.orders) },
  { key: 'revenue', label: 'Revenue', align: 'right', render: (b) => formatCurrency(b.revenue) },
  {
    key: 'rating',
    label: 'Rating',
    render: (b) => b.rating
      ? <span className="admin-rating"><Star strokeWidth={0} />{b.rating.toFixed(1)}</span>
      : <span className="admin-cell-sub">—</span>,
  },
  { key: 'status', label: 'Status', render: (b) => <StatusPill status={b.status} /> },
]

const Bakeries = () => {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return BAKERIES.filter((b) =>
      (filter === 'All' || b.status === filter) &&
      (!q || [b.name, b.owner, b.city].some((field) => field.toLowerCase().includes(q))))
  }, [query, filter])

  return (
    <div className="admin-page">
      <AdminHeader title="Bakeries" subtitle={`${BAKERIES.length} bakeries are using Cozy right now.`} />

      <div className="admin-toolbar">
        <label className="admin-search">
          <Search strokeWidth={1.5} />
          <input
            type="search"
            aria-label="Search bakeries"
            placeholder="Search bakery, owner or city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="admin-filters" role="group" aria-label="Filter by status">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              className="admin-filter"
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <AdminTable columns={COLUMNS} rows={rows} empty="No bakeries match your search." />
    </div>
  )
}

export default Bakeries
