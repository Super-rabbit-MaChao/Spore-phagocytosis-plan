import { axialNeighbors } from '@/systems/hex-map/coords'
import type { AxialCoord, MapSession } from '@/systems/hex-map/types'
import { canSpendActionPoint } from '@/systems/turn-action-points'
import { MOVE_ENERGY_COST } from './constants'

export type MoveFailReason =
  | 'missing'
  | 'fog'
  | 'not-adjacent'
  | 'same-tile'
  | 'no-ap'
  | 'no-energy'

export type MoveResult =
  | { ok: true; session: MapSession; energySpent: number }
  | { ok: false; reason: MoveFailReason }

function isAdjacentToCore(session: MapSession, target: AxialCoord): boolean {
  return axialNeighbors(session.map.core.q, session.map.core.r).some(
    (n) => n.q === target.q && n.r === target.r,
  )
}

/**
 * 核心移动到相邻已揭示格。成功则更新 core 并扣 1 AP；能量由调用方扣除。
 */
export function applyMoveColony(
  session: MapSession,
  target: AxialCoord,
  energy: number,
): MoveResult {
  if (target.q === session.map.core.q && target.r === session.map.core.r) {
    return { ok: false, reason: 'same-tile' }
  }

  const tile = session.map.tiles.find(
    (t) => t.q === target.q && t.r === target.r,
  )
  if (!tile) {
    return { ok: false, reason: 'missing' }
  }
  if (tile.visibility !== 'revealed') {
    return { ok: false, reason: 'fog' }
  }
  if (!isAdjacentToCore(session, target)) {
    return { ok: false, reason: 'not-adjacent' }
  }
  if (!canSpendActionPoint(session)) {
    return { ok: false, reason: 'no-ap' }
  }
  if (energy < MOVE_ENERGY_COST) {
    return { ok: false, reason: 'no-energy' }
  }

  return {
    ok: true,
    energySpent: MOVE_ENERGY_COST,
    session: {
      ...session,
      actionPoints: session.actionPoints - 1,
      map: {
        ...session.map,
        core: { q: target.q, r: target.r },
      },
    },
  }
}

export function isMovableTile(
  session: MapSession,
  target: AxialCoord,
  energy: number,
): boolean {
  return applyMoveColony(session, target, energy).ok
}
