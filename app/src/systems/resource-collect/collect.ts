import type { MapSession } from '@/systems/hex-map/types'
import { canSpendActionPoint } from '@/systems/turn-action-points'
import { COLLECT_ENERGY_COST, COLLECT_YIELD } from './constants'

export type CollectFailReason = 'missing' | 'not-resource' | 'no-ap' | 'no-energy'

export type CollectYield = {
  energy: number
  moisture: number
  nutrition: number
}

export type CollectResult =
  | {
      ok: true
      session: MapSession
      energySpent: number
      gained: CollectYield
    }
  | { ok: false; reason: CollectFailReason }

/**
 * 采集核心所在格资源。成功则该格变为空并扣 1 AP；能量与产出由调用方写入角色携带。
 */
export function applyCollect(
  session: MapSession,
  energy: number,
): CollectResult {
  const core = session.map.core
  const tile = session.map.tiles.find((t) => t.q === core.q && t.r === core.r)
  if (!tile) {
    return { ok: false, reason: 'missing' }
  }
  if (tile.content !== 'resource') {
    return { ok: false, reason: 'not-resource' }
  }
  if (!canSpendActionPoint(session)) {
    return { ok: false, reason: 'no-ap' }
  }
  if (energy < COLLECT_ENERGY_COST) {
    return { ok: false, reason: 'no-energy' }
  }

  const tiles = session.map.tiles.map((t) =>
    t.q === core.q && t.r === core.r ? { ...t, content: 'empty' as const } : t,
  )

  return {
    ok: true,
    energySpent: COLLECT_ENERGY_COST,
    gained: {
      energy: COLLECT_YIELD.energy,
      moisture: COLLECT_YIELD.moisture,
      nutrition: COLLECT_YIELD.nutrition,
    },
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

export function canCollect(session: MapSession, energy: number): boolean {
  return applyCollect(session, energy).ok
}

/** 调试：将当前核心格设为资源，便于验收采集 */
export function setCoreTileResource(session: MapSession): MapSession {
  const { q, r } = session.map.core
  const tile = session.map.tiles.find((t) => t.q === q && t.r === r)
  if (!tile || tile.content === 'resource') {
    return session
  }

  return {
    ...session,
    map: {
      ...session.map,
      tiles: session.map.tiles.map((t) =>
        t.q === q && t.r === r
          ? { ...t, content: 'resource' as const, visibility: 'revealed' as const }
          : t,
      ),
    },
  }
}
