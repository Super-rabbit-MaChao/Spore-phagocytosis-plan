import { useContext } from 'react'
import type { CarryGain } from './carry'
import { SpeciesRuntimeContext } from './context'
import type { SpeciesRuntime } from './types'

function useSpeciesRuntimeContext() {
  const value = useContext(SpeciesRuntimeContext)
  if (!value) {
    throw new Error('Species runtime hooks must be used within SpeciesRuntimeProvider')
  }
  return value
}

export function useSpeciesRuntime(): SpeciesRuntime {
  return useSpeciesRuntimeContext().runtime
}

export function useSpeciesFeed(): () => void {
  return useSpeciesRuntimeContext().feed
}

export function useSettleRecovery(): () => void {
  return useSpeciesRuntimeContext().settleRecovery
}

export function useFastForwardRecovery(): (intervals?: number) => void {
  return useSpeciesRuntimeContext().fastForwardRecovery
}

export function useFillPopulationToCap(): () => void {
  return useSpeciesRuntimeContext().fillPopulationToCap
}

export function useSpendEnergy(): (amount: number) => void {
  return useSpeciesRuntimeContext().spendEnergy
}

export function useSetEnergy(): (energy: number) => void {
  return useSpeciesRuntimeContext().setEnergy
}

export function useCollectCarry(): (
  energySpent: number,
  gain: CarryGain,
) => void {
  return useSpeciesRuntimeContext().collectCarry
}
