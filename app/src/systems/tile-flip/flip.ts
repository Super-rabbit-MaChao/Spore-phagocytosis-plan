import { axialKey, axialNeighbors } from '@/systems/hex-map/coords'
import type { AxialCoord, MapSession } from '@/systems/hex-map/types'
import { canSpendActionPoint } from '@/systems/turn-action-points'
import { FLIP_ENERGY_COST } from './constants'

export type FlipFailReason =
  | 'missing'
  | 'not-fog'
  | 'not-adjacent'
  | 'no-ap'
  | 'no-energy'

export type FlipResult =
  | { ok: true; session: MapSession; energySpent: number }
  | { ok: false; reason: FlipFailReason }

function isAdjacentToCore(session: MapSession, target: AxialCoord): boolean {
  return axialNeighbors(session.map.core.q, session.map.core.r).some(
    (n) => n.q === target.q && n.r === target.r,
  )
}

/**
 * 翻开与核心相邻的未知格。成功则揭示并扣 1 AP；能量消耗由调用方扣除。
 */
export function applyFlipTile(
  session: MapSession,
  target: AxialCoord,
  energy: number,
): FlipResult {
  const tile = session.map.tiles.find(
    (t) => t.q === target.q && t.r === target.r,
  )
  if (!tile) {
    return { ok: false, reason: 'missing' }
  }
  if (tile.visibility !== 'fog') {
    return { ok: false, reason: 'not-fog' }
  }
  if (!isAdjacentToCore(session, target)) {
    return { ok: false, reason: 'not-adjacent' }
  }
  if (!canSpendActionPoint(session)) {
    return { ok: false, reason: 'no-ap' }
  }
  if (energy < FLIP_ENERGY_COST) {
    return { ok: false, reason: 'no-energy' }
  }

  const tiles = session.map.tiles.map((t) =>
    t.q === target.q && t.r === target.r
      ? { ...t, visibility: 'revealed' as const }
      : t,
  )

  return {
    ok: true,
    energySpent: FLIP_ENERGY_COST,
    session: {
      ...session,
      actionPoints: session.actionPoints - 1,
      map: {
        ...session.map,
        tiles,
      },
    },
  }
}

/** 调试：将一个已揭示的核心邻格改回迷雾，便于验收翻格 */
export function fogOneCoreNeighbor(session: MapSession): MapSession {
  const neighborKeys = new Set(
    axialNeighbors(session.map.core.q, session.map.core.r).map((n) =>
      axialKey(n.q, n.r),
    ),
  )
  const candidate = session.map.tiles.find(
    (t) =>
      neighborKeys.has(axialKey(t.q, t.r)) && t.visibility === 'revealed',
  )
  if (!candidate) {
    return session
  }

  return {
    ...session,
    map: {
      ...session.map,
      tiles: session.map.tiles.map((t) =>
        t.q === candidate.q && t.r === candidate.r
          ? { ...t, visibility: 'fog' }
          : t,
      ),
    },
  }
}

export function isFlippableTile(
  session: MapSession,
  target: AxialCoord,
  energy: number,
): boolean {
  return applyFlipTile(session, target, energy).ok
}
