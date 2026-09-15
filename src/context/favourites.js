import { createContext, useContext } from 'react'

export const FavouritesContext = createContext(null)

export const useFavourites = () => {
  const context = useContext(FavouritesContext)
  if (!context) throw new Error('useFavourites must be used inside <FavouritesProvider>')
  return context
}
