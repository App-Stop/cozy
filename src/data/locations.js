export const STATES = ['Texas', 'California', 'Florida', 'New York']

// `pin` is the shop's marker offset (px) from the centre of the pickup map.
export const SHOPS = [
  {
    id: 'cozy-23-eve',
    state: 'Texas',
    name: 'The Cozy Cafe, 23 Eve, Texas',
    address: '742 Cozy Cafe, Texas',
    pin: { x: -0.5, y: -2.69 },
  },
  {
    id: 'cozy-riverside',
    state: 'Texas',
    name: 'The Cozy Cafe, Riverside, Texas',
    address: '18 Riverside Walk, Texas',
    pin: { x: -55.5, y: -124 },
  },
  {
    id: 'cozy-old-town',
    state: 'Texas',
    name: 'The Cozy Cafe, Old Town, Texas',
    address: '9 Market Square, Texas',
    pin: { x: 88.5, y: -57 },
  },
  {
    id: 'cozy-harbor',
    state: 'Texas',
    name: 'The Cozy Cafe, Harbor, Texas',
    address: '51 Harbor Road, Texas',
    pin: { x: -128.5, y: 49 },
  },
  {
    id: 'cozy-parkway',
    state: 'Texas',
    name: 'The Cozy Cafe, Parkway, Texas',
    address: '230 Parkway Drive, Texas',
    pin: { x: 155.5, y: 68 },
  },
]

export const SAMPLE_ADDRESSES = [
  { id: 'home', state: 'Texas', area: '742 Evergreen Terrace', instructions: 'Please ring the bell twice' },
  { id: 'work', state: 'Texas', area: '18 Maple Avenue', instructions: '' },
  { id: 'parents', state: 'Texas', area: '5 Harbor Road', instructions: '' },
]

export const formatAddress = (address) =>
  [address.area, address.state].filter(Boolean).join(', ')

// Human-readable summary of the chosen delivery / pickup option.
export const describeFulfilment = (fulfilment, addresses) => {
  if (fulfilment?.type === 'pickup') {
    const shop = SHOPS.find((item) => item.id === fulfilment.shopId)
    return { type: 'pickup', label: 'Pickup from', value: shop?.address ?? 'Select a shop' }
  }

  if (fulfilment?.type === 'current') {
    return { type: 'delivery', label: 'Deliver to', value: 'Current location' }
  }

  const address = addresses.find((item) => item.id === fulfilment?.addressId)
  return {
    type: 'delivery',
    label: 'Deliver to',
    value: address ? formatAddress(address) : 'Select your address',
    instructions: address?.instructions ?? '',
  }
}
