import { createContext } from 'react'
import type { MapSession } from './types'

export type MapSessionContextValue = {
  session: MapSession | null
  /** 进入地图时调用：始终新建会话 */
  startNewSession: () => void
  /** 离开地图时调用：丢弃当前会话 */
  clearSession: () => void
  /** 消耗 1 行动点；不足则拒绝 */
  spendActionPoint: () => void
  /** 结束回合：AP 重置，回合 +1 */
  endTurn: () => void
}

export const MapSessionContext = createContext<MapSessionContextValue | null>(
  null,
)
