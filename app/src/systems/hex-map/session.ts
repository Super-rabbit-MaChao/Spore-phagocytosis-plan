import { MAX_ACTION_POINTS } from '@/systems/turn-action-points'
import { generateHexMap } from './generate'
import { randomSeed } from './rng'
import type { MapSession } from './types'

/** 创建新地图会话（新种子 + 新布局 + 回合开局 AP） */
export function createMapSession(seed = randomSeed()): MapSession {
  const map = generateHexMap({ seed })
  return {
    id: `map-${seed.toString(16)}`,
    seed,
    map,
    actionPoints: MAX_ACTION_POINTS,
    turnIndex: 1,
  }
}
