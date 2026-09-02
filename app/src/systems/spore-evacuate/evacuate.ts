import type { MapSession } from '@/systems/hex-map/types'
import { canSpendActionPoint } from '@/systems/turn-action-points'
import { evacuateEnergyCost } from './constants'

export type EvacuateFailReason = 'no-ap' | 'no-energy'

export type EvacuateResult =
  | { ok: true; session: MapSession; energySpent: number }
  | { ok: false; reason: EvacuateFailReason }

/**
 * 孢子化撤离。成功则扣 1 AP；能量由调用方扣除，并结束地图会话。
 */
export function applyEvacuate(
  session: MapSession,
  energy: number,
): EvacuateResult {
  if (!canSpendActionPoint(session)) {
    return { ok: false, reason: 'no-ap' }
  }
  const energySpent = evacuateEnergyCost(energy)
  if (energy < energySpent) {
    return { ok: false, reason: 'no-energy' }
  }

  return {
    ok: true,
    energySpent,
    session: {
      ...session,
      actionPoints: session.actionPoints - 1,
    },
  }
}

export function canEvacuate(session: MapSession, energy: number): boolean {
  return applyEvacuate(session, energy).ok
}
