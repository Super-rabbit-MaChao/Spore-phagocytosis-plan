import type { SpeciesRuntime } from './types'

/** 第一版：每消耗 5 营养立即 +1 族群 */
export const FEED_NUTRITION_COST = 5

/**
 * 无配方投喂。营养不足或已达族群上限时返回原状态（满员不扣营养）。
 */
export function applyFeed(runtime: SpeciesRuntime): SpeciesRuntime {
  if (runtime.nutrition < FEED_NUTRITION_COST) {
    return runtime
  }
  if (runtime.population >= runtime.populationCap) {
    return runtime
  }

  return {
    ...runtime,
    nutrition: runtime.nutrition - FEED_NUTRITION_COST,
    population: Math.min(runtime.populationCap, runtime.population + 1),
  }
}

export function canFeed(runtime: SpeciesRuntime): boolean {
  return (
    runtime.nutrition >= FEED_NUTRITION_COST &&
    runtime.population < runtime.populationCap
  )
}
