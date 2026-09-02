/** 孢子化按当前能量 10% 扣费，向上取整，最低 1 */
export const EVACUATE_ENERGY_RATIO = 0.1

export const EVACUATE_ENERGY_MIN = 1

export function evacuateEnergyCost(energy: number): number {
  return Math.max(EVACUATE_ENERGY_MIN, Math.ceil(energy * EVACUATE_ENERGY_RATIO))
}
