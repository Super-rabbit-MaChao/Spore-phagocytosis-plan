import { useContext } from 'react'
import { MapSessionContext } from './MapSessionContext'
import type { MapSession } from './types'

function useMapSessionContext() {
  const value = useContext(MapSessionContext)
  if (!value) {
    throw new Error('Map session hooks must be used within MapSessionProvider')
  }
  return value
}

export function useMapSession(): MapSession | null {
  return useMapSessionContext().session
}

export function useStartMapSession(): () => void {
  return useMapSessionContext().startNewSession
}

export function useClearMapSession(): () => void {
  return useMapSessionContext().clearSession
}

export function useSpendActionPoint(): () => void {
  return useMapSessionContext().spendActionPoint
}

export function useEndTurn(): () => void {
  return useMapSessionContext().endTurn
}
