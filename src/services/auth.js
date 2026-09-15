// Placeholder auth API — swap these for real endpoints once the backend exists.
// Until then no SMS is sent and any 4-digit code is accepted.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const sendOtp = async (phone) => {
  await delay(600)
  return { phone }
}

export const verifyOtp = async (phone, code) => {
  await delay(600)
  if (!/^\d{4}$/.test(code)) throw new Error('Invalid code')
  return { phone }
}
