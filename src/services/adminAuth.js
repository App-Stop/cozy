// Placeholder admin auth — swap for the real admin API once the backend exists.
// Until then any valid email with the demo password signs in. The session lives
// in sessionStorage, so it ends with the tab. This is a UI gate only: real
// protection must come from the backend.
const SESSION_KEY = 'cozy-admin-session'
const DEMO_PASSWORD = 'cozyadmin'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const getAdminSession = () => {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}

export const adminLogin = async (email, password) => {
  await delay(600)
  if (!/^\S+@\S+\.\S+$/.test(email) || password !== DEMO_PASSWORD) {
    throw new Error('Incorrect email or password')
  }
  const session = { email, name: email.split('@')[0] }
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    // Storage blocked — the session just won't survive a reload.
  }
  return session
}

export const adminLogout = () => {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // Nothing stored to clear.
  }
}
