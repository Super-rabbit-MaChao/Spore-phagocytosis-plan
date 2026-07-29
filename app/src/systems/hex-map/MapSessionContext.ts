import { createContext } from 'react'
import type { MapSession } from './types'

export type MapSessionContextValue = {
  session: MapSession | null
  /** 进入地图时调用：始终新建会话 */
  startNewSession: () => void
  /** 离开地图时调用：丢弃当前会话 */
  clearSession: () => void
}

export const MapSessionContext = createContext<MapSessionContextValue | null>(
  null,
)
