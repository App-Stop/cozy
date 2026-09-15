import { useEffect, useState } from 'react'
import { FavouritesContext } from './favourites'
import { DEFAULT_FAVOURITE_IDS } from '../data/profile'

// Saved products are kept in localStorage so the Favourites page survives a
// refresh. Swap for the account API once the backend exists.
const STORAGE_KEY = 'cozy-favourites'

const loadFavourites = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(stored) ? stored : DEFAULT_FAVOURITE_IDS
  } catch {
    return DEFAULT_FAVOURITE_IDS
  }
}

const FavouritesProvider = ({ children }) => {
  const [ids, setIds] = useState(loadFavourites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // Storage can be unavailable (private mode, blocked site data).
    }
  }, [ids])

  const value = {
    ids,
    isFavourite: (productId) => ids.includes(productId),
    toggle: (productId) =>
      setIds((list) =>
        list.includes(productId) ? list.filter((id) => id !== productId) : [...list, productId],
      ),
  }

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}

export default FavouritesProvider
