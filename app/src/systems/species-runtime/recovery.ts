import type { SpeciesRuntime } from './types'

/** 第一版：每现实 10 分钟 +1 族群 */
export const RECOVERY_INTERVAL_MS = 10 * 60 * 1000

export type RecoveryState = {
  runtime: SpeciesRuntime
  lastRecoveryAt: number
}

/**
 * 按流逝时间结算自动恢复。已消耗的完整间隔会推进 lastRecoveryAt；
 * 族群钳制到上限，超出部分不累计。
 */
export function applyRealtimeRecovery(
  runtime: SpeciesRuntime,
  lastRecoveryAt: number,
  now: number,
): RecoveryState {
  const elapsed = now - lastRecoveryAt
  if (elapsed < RECOVERY_INTERVAL_MS) {
    return { runtime, lastRecoveryAt }
  }

  const ticks = Math.floor(elapsed / RECOVERY_INTERVAL_MS)
  const room = Math.max(0, runtime.populationCap - runtime.population)
  const gained = Math.min(ticks, room)
  const nextLast = lastRecoveryAt + ticks * RECOVERY_INTERVAL_MS

  if (gained === 0) {
    return { runtime, lastRecoveryAt: nextLast }
  }

  return {
    runtime: {
      ...runtime,
      population: runtime.population + gained,
    },
    lastRecoveryAt: nextLast,
  }
}

/** 调试：在已结算现实时间的基础上，再快进若干个恢复间隔 */
export function fastForwardRecovery(
  runtime: SpeciesRuntime,
  lastRecoveryAt: number,
  intervals = 1,
  now = Date.now(),
): RecoveryState {
  const settled = applyRealtimeRecovery(runtime, lastRecoveryAt, now)
  if (intervals <= 0) {
    return settled
  }
  return applyRealtimeRecovery(
    settled.runtime,
    settled.lastRecoveryAt,
    settled.lastRecoveryAt + intervals * RECOVERY_INTERVAL_MS,
  )
}

export function fillPopulationToCap(runtime: SpeciesRuntime): SpeciesRuntime {
  if (runtime.population >= runtime.populationCap) {
    return runtime
  }
  return {
    ...runtime,
    population: runtime.populationCap,
  }
}
