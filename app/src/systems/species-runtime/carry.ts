import { applySpendEnergy } from './energy'
import type { SpeciesRuntime } from './types'

export type CarryGain = {
  energy: number
  moisture: number
  nutrition: number
}

/**
 * 增加角色携带。三项均为 0 时返回原状态。
 */
export function applyGainCarry(
  runtime: SpeciesRuntime,
  gain: CarryGain,
): SpeciesRuntime {
  if (gain.energy === 0 && gain.moisture === 0 && gain.nutrition === 0) {
    return runtime
  }
  return {
    ...runtime,
    energy: runtime.energy + gain.energy,
    moisture: runtime.moisture + gain.moisture,
    nutrition: runtime.nutrition + gain.nutrition,
  }
}

/**
 * 采集结算：先扣消耗能量，再把产出加入携带。能量不足则原状态。
 */
export function applyCollectCarry(
  runtime: SpeciesRuntime,
  energySpent: number,
  gain: CarryGain,
): SpeciesRuntime {
  const spent = applySpendEnergy(runtime, energySpent)
  if (energySpent > 0 && spent === runtime) {
    return runtime
  }
  return applyGainCarry(spent, gain)
}
