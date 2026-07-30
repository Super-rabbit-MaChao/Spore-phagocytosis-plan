import type { SpeciesRuntime } from './types'

/**
 * 扣除能量。不足时返回原状态。
 */
export function applySpendEnergy(
  runtime: SpeciesRuntime,
  amount: number,
): SpeciesRuntime {
  if (amount <= 0) {
    return runtime
  }
  if (runtime.energy < amount) {
    return runtime
  }
  return {
    ...runtime,
    energy: runtime.energy - amount,
  }
}
