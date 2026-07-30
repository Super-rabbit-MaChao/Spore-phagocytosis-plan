/** 第一版土壤难度；翻格能量 = ceil(1 × 难度)，最低 1 */
export const FLIP_DIFFICULTY = 1.0

export const FLIP_ENERGY_COST = Math.max(1, Math.ceil(1 * FLIP_DIFFICULTY))
