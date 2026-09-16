import { ChevronRight, DollarSign, UserPlus, Users, Zap } from 'lucide-react'
import { AdminHeader, AdminTable, NameCell, StatCard, StatusPill } from './AdminParts'
import { adminLinkClick, adminPaths } from './navigation'
import {
  ADMIN_STATS,
  NEW_BAKERIES,
  RECENT_USERS,
  formatCurrency,
  formatDate,
  formatNumber,
} from '../data/admin'

const STAT_ICONS = { current: Users, active: Zap, revenue: DollarSign, new: UserPlus }

const USER_COLUMNS = [
  { key: 'name', label: 'User', render: (u) => <NameCell name={u.name} sub={u.email} /> },
  { key: 'joined', label: 'Joined', render: (u) => formatDate(u.joined) },
  { key: 'orders', label: 'Orders', align: 'right' },
  { key: 'status', label: 'Status', render: (u) => <StatusPill status={u.status} /> },
]

const BAKERY_COLUMNS = [
  { key: 'name', label: 'Bakery', render: (b) => <NameCell name={b.name} sub={b.city} /> },
  { key: 'joined', label: 'Joined', render: (b) => formatDate(b.joined) },
  { key: 'products', label: 'Products', align: 'right' },
  { key: 'status', label: 'Status', render: (b) => <StatusPill status={b.status} /> },
]

const Dashboard = () => (
  <div className="admin-page">
    <AdminHeader title="Dashboard" subtitle="An overview of how Cozy is doing." />

    <div className="admin-stats">
      {ADMIN_STATS.map((stat, index) => (
        <StatCard
          key={stat.key}
          icon={STAT_ICONS[stat.key]}
          label={stat.label}
          value={stat.currency ? formatCurrency(stat.value) : formatNumber(stat.value)}
          change={stat.change}
          highlight={index === 0}
        />
      ))}
    </div>

    <div className="admin-grid">
      <AdminTable title="Recent Users" columns={USER_COLUMNS} rows={RECENT_USERS} />
      <AdminTable
        title="New Bakeries"
        columns={BAKERY_COLUMNS}
        rows={NEW_BAKERIES}
        action={
          <a href={adminPaths.bakeries} className="admin-link" onClick={adminLinkClick(adminPaths.bakeries)}>
            View all <ChevronRight strokeWidth={2} />
          </a>
        }
      />
    </div>
  </div>
)

export default Dashboard
