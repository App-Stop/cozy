import { TrendingDown, TrendingUp } from 'lucide-react'

export const AdminHeader = ({ title, subtitle }) => (
  <header className="admin-header">
    <h1 className="admin-title">{title}</h1>
    {subtitle && <p className="admin-subtitle">{subtitle}</p>}
  </header>
)

export const StatCard = ({ icon: Icon, label, value, change, highlight = false }) => {
  const up = change >= 0
  const Trend = up ? TrendingUp : TrendingDown
  return (
    <article className={`admin-stat ${highlight ? 'admin-stat--primary' : ''}`}>
      <div className="admin-stat-top">
        <p className="admin-stat-label">{label}</p>
        <span className="admin-stat-icon"><Icon strokeWidth={1.5} /></span>
      </div>
      <p className="admin-stat-value">{value}</p>
      <p className={`admin-trend ${up ? 'admin-trend--up' : 'admin-trend--down'}`}>
        <Trend strokeWidth={2} />
        {up ? '+' : ''}{change}% <span>vs last month</span>
      </p>
    </article>
  )
}

export const StatusPill = ({ status }) => (
  <span className={`admin-status admin-status--${status.toLowerCase()}`}>{status}</span>
)

// `columns`: [{ key, label, render?, align? }] — `render` receives the row.
export const AdminTable = ({ title, action, columns, rows, empty = 'Nothing to show yet.' }) => (
  <section className="admin-card">
    {(title || action) && (
      <div className="admin-card-head">
        {title && <h2 className="admin-card-title">{title}</h2>}
        {action}
      </div>
    )}
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={col.align === 'right' ? 'text-right' : ''}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={columns.length} className="admin-table-empty">{empty}</td></tr>
          ) : rows.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key} className={col.align === 'right' ? 'text-right' : ''}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
)

export const NameCell = ({ name, sub }) => (
  <div className="admin-name-cell">
    <span className="admin-avatar admin-avatar--sm" aria-hidden="true">{name[0]}</span>
    <div className="min-w-0">
      <p className="admin-cell-strong">{name}</p>
      {sub && <p className="admin-cell-sub">{sub}</p>}
    </div>
  </div>
)
