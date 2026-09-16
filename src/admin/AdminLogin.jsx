import { useState } from 'react'
import { Lock } from 'lucide-react'
import logo from '../assets/navbar/logo.svg'
import { adminLogin } from '../services/adminAuth'

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      onLogin(await adminLogin(email.trim(), password))
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <main className="admin-login">
      <span className="admin-login-glow" aria-hidden="true" />

      <form className="admin-login-card" onSubmit={submit}>
        <div className="admin-login-head">
          <img src={logo} alt="cozy" className="admin-logo" />
          <span className="admin-badge">
            <Lock strokeWidth={2} />
            Admin
          </span>
        </div>

        <div className="modal-heading">
          <h1 className="modal-title">Welcome back</h1>
          <p className="modal-hint">Sign in to manage users and bakeries.</p>
        </div>

        <div className="modal-fields">
          <label className="modal-field">
            <span className="modal-field-label">Email</span>
            <input
              className="modal-field-input"
              type="email"
              autoComplete="username"
              placeholder="admin@cozy.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="modal-field">
            <span className="modal-field-label">Password</span>
            <input
              className="modal-field-input"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="modal-error" role="alert">{error}</p>}
        </div>

        <button type="submit" className="modal-btn modal-btn-primary" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}

export default AdminLogin
