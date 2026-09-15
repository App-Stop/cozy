import { createContext, useContext } from 'react'

export const LocationContext = createContext(null)

export const useFulfilment = () => {
  const context = useContext(LocationContext)
  if (!context) throw new Error('useFulfilment must be used inside <LocationProvider>')
  return context
}
