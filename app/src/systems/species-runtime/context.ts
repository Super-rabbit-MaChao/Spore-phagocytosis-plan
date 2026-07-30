import { createContext } from 'react'
import type { SpeciesRuntime } from './types'

export type SpeciesRuntimeContextValue = {
  runtime: SpeciesRuntime
  feed: () => void
  /** 按当前时间结算真实时间恢复（培养皿挂载时调用） */
  settleRecovery: () => void
  /** 调试：快进若干个 10 分钟恢复间隔，默认 1 */
  fastForwardRecovery: (intervals?: number) => void
  /** 调试：族群填满至上限 */
  fillPopulationToCap: () => void
  /** 扣除能量；不足则拒绝 */
  spendEnergy: (amount: number) => void
  /** 调试：将能量设为指定值 */
  setEnergy: (energy: number) => void
}

export const SpeciesRuntimeContext =
  createContext<SpeciesRuntimeContextValue | null>(null)
