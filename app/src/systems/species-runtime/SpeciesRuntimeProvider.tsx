import { useCallback, useState, type ReactNode } from 'react'
import { SpeciesRuntimeContext } from './context'
import { createDefaultBacillusRuntime } from './defaults'
import { applyFeed } from './feed'
import {
  applyRealtimeRecovery,
  fastForwardRecovery as advanceRecovery,
  fillPopulationToCap as fillCap,
} from './recovery'

type SpeciesRuntimeProviderProps = {
  children: ReactNode
}

type ProviderState = {
  runtime: ReturnType<typeof createDefaultBacillusRuntime>
  lastRecoveryAt: number
}

export function SpeciesRuntimeProvider({ children }: SpeciesRuntimeProviderProps) {
  const [state, setState] = useState<ProviderState>(() => ({
    runtime: createDefaultBacillusRuntime(),
    lastRecoveryAt: Date.now(),
  }))

  const feed = useCallback(() => {
    setState((current) => ({
      ...current,
      runtime: applyFeed(current.runtime),
    }))
  }, [])

  const settleRecovery = useCallback(() => {
    setState((current) => {
      const next = applyRealtimeRecovery(
        current.runtime,
        current.lastRecoveryAt,
        Date.now(),
      )
      if (
        next.runtime === current.runtime &&
        next.lastRecoveryAt === current.lastRecoveryAt
      ) {
        return current
      }
      return next
    })
  }, [])

  const fastForwardRecovery = useCallback((intervals = 1) => {
    setState((current) => {
      const next = advanceRecovery(
        current.runtime,
        current.lastRecoveryAt,
        intervals,
        Date.now(),
      )
      if (
        next.runtime === current.runtime &&
        next.lastRecoveryAt === current.lastRecoveryAt
      ) {
        return current
      }
      return next
    })
  }, [])

  const fillPopulationToCap = useCallback(() => {
    setState((current) => {
      const runtime = fillCap(current.runtime)
      if (runtime === current.runtime) {
        return current
      }
      return { ...current, runtime }
    })
  }, [])

  return (
    <SpeciesRuntimeContext.Provider
      value={{
        runtime: state.runtime,
        feed,
        settleRecovery,
        fastForwardRecovery,
        fillPopulationToCap,
      }}
    >
      {children}
    </SpeciesRuntimeContext.Provider>
  )
}
