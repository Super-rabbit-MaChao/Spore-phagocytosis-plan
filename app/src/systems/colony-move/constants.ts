/** 第一版土壤难度；移动能量 = ceil(2 × 难度)，最低 1 */
export const MOVE_DIFFICULTY = 1.0

export const MOVE_ENERGY_COST = Math.max(1, Math.ceil(2 * MOVE_DIFFICULTY))
