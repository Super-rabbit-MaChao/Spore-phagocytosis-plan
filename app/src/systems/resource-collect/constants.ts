/** 第一版土壤难度；采集能量 = ceil(1 × 难度)，最低 1 */
export const COLLECT_DIFFICULTY = 1.0

export const COLLECT_ENERGY_COST = Math.max(1, Math.ceil(1 * COLLECT_DIFFICULTY))

/** 第一版一次采空产出（糖分/矿物质/基因点不做） */
export const COLLECT_YIELD = {
  energy: 3,
  moisture: 2,
  nutrition: 2,
} as const
