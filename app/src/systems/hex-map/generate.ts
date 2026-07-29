import { axialKey, axialNeighbors, hexesInRadius } from './coords'
import { createSeededRandom, randomSeed } from './rng'
import type { AxialCoord, HexMap, HexTile } from './types'

/** 第一版固定半径：外围应仍有迷雾 */
export const DEFAULT_MAP_RADIUS = 3

export type GenerateHexMapOptions = {
  radius?: number
  /** 固定种子；省略则随机 */
  seed?: number
  /** 可注入随机源（优先于 seed） */
  random?: () => number
}

function pickSafeCore(
  tiles: HexTile[],
  random: () => number,
): AxialCoord {
  const safe = tiles.filter((t) => t.safe)
  const pool = safe.length > 0 ? safe : tiles
  const pick = pool[Math.floor(random() * pool.length)]!
  return { q: pick.q, r: pick.r }
}

/**
 * 生成小型六边形地图：随机安全落点，揭示核心格与最多 6 邻格。
 */
export function generateHexMap(options: GenerateHexMapOptions = {}): HexMap {
  const radius = options.radius ?? DEFAULT_MAP_RADIUS
  const seed = options.seed ?? randomSeed()
  const random = options.random ?? createSeededRandom(seed)

  const cells = hexesInRadius(radius)
  const tiles: HexTile[] = cells.map(({ q, r }) => {
    // 第一版：约 15% 标为非安全，开局避开；资源约 25%
    const safe = random() >= 0.15
    const content = random() < 0.25 ? 'resource' : 'empty'
    return {
      q,
      r,
      visibility: 'fog',
      content,
      safe,
    }
  })

  const byKey = new Map(tiles.map((t) => [axialKey(t.q, t.r), t]))
  const core = pickSafeCore(tiles, random)

  const toReveal = [
    core,
    ...axialNeighbors(core.q, core.r).filter((n) => byKey.has(axialKey(n.q, n.r))),
  ]

  for (const cell of toReveal) {
    const tile = byKey.get(axialKey(cell.q, cell.r))
    if (tile) {
      tile.visibility = 'revealed'
    }
  }

  return {
    radius,
    seed,
    tiles,
    core,
  }
}
