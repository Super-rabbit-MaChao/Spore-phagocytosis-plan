import { useCallback, useState, type ReactNode } from 'react'
import {
  applyEndTurn,
  applySpendActionPoint,
} from '@/systems/turn-action-points'
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

  const spendActionPoint = useCallback(() => {
    setSession((current) => {
      if (!current) {
        return current
      }
      const next = applySpendActionPoint(current)
      return next === current ? current : next
    })
  }, [])

  const endTurn = useCallback(() => {
    setSession((current) => {
      if (!current) {
        return current
      }
      return applyEndTurn(current)
    })
  }, [])

  return (
    <MapSessionContext.Provider
      value={{
        session,
        startNewSession,
        clearSession,
        spendActionPoint,
        endTurn,
      }}
    >
      {children}
    </MapSessionContext.Provider>
  )
}
