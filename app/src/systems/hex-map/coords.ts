import type { AxialCoord } from './types'

/** pointy-top 六邻方向 */
const AXIAL_DIRECTIONS: ReadonlyArray<AxialCoord> = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
]

export function axialKey(q: number, r: number): string {
  return `${q},${r}`
}

export function axialNeighbors(q: number, r: number): AxialCoord[] {
  return AXIAL_DIRECTIONS.map((d) => ({ q: q + d.q, r: r + d.r }))
}

/** 半径 `radius` 的实心六边形（含中心） */
export function hexesInRadius(radius: number): AxialCoord[] {
  const cells: AxialCoord[] = []
  for (let q = -radius; q <= radius; q += 1) {
    const r1 = Math.max(-radius, -q - radius)
    const r2 = Math.min(radius, -q + radius)
    for (let r = r1; r <= r2; r += 1) {
      cells.push({ q, r })
    }
  }
  return cells
}

/** pointy-top：轴向 → 像素中心 */
export function axialToPixel(
  q: number,
  r: number,
  size: number,
): { x: number; y: number } {
  const x = size * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r)
  const y = size * ((3 / 2) * r)
  return { x, y }
}

export function hexCornerPoints(cx: number, cy: number, size: number): string {
  const points: string[] = []
  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI / 180) * (60 * i - 30)
    const x = cx + size * Math.cos(angle)
    const y = cy + size * Math.sin(angle)
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`)
  }
  return points.join(' ')
}
