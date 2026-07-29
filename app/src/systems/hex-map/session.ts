import { generateHexMap } from './generate'
import { randomSeed } from './rng'
import type { MapSession } from './types'

/** 创建新地图会话（新种子 + 新布局） */
export function createMapSession(seed = randomSeed()): MapSession {
  const map = generateHexMap({ seed })
  return {
    id: `map-${seed.toString(16)}`,
    seed,
    map,
  }
}
