import { useCallback, useState, type ReactNode } from 'react'
import { MapSessionContext } from './MapSessionContext'
import { createMapSession } from './session'
import type { MapSession } from './types'

type MapSessionProviderProps = {
  children: ReactNode
}

export function MapSessionProvider({ children }: MapSessionProviderProps) {
  const [session, setSession] = useState<MapSession | null>(null)

  const startNewSession = useCallback(() => {
    setSession(createMapSession())
  }, [])

  const clearSession = useCallback(() => {
    setSession(null)
  }, [])

  return (
    <MapSessionContext.Provider
      value={{ session, startNewSession, clearSession }}
    >
      {children}
    </MapSessionContext.Provider>
  )
}
