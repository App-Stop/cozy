// Placeholder promo API — swap for the real endpoint once the backend exists.
// Until then only the test code COZY10 (10% off) is accepted.
const TEST_CODES = { COZY10: 10 }

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const applyPromoCode = async (rawCode) => {
  await delay(400)
  const code = rawCode.trim().toUpperCase()
  const percentOff = TEST_CODES[code]
  if (!percentOff) throw new Error('Invalid promo code')
  return { code, percentOff }
}
