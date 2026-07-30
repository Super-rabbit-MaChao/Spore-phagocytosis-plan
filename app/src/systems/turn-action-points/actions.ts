import type { MapSession } from '@/systems/hex-map/types'
import { MAX_ACTION_POINTS } from './constants'

export function canSpendActionPoint(session: MapSession): boolean {
  return session.actionPoints > 0
}

/**
 * 消耗 1 点行动点。不足时返回原会话（拒绝）。
 */
export function applySpendActionPoint(session: MapSession): MapSession {
  if (!canSpendActionPoint(session)) {
    return session
  }
  return {
    ...session,
    actionPoints: session.actionPoints - 1,
  }
}

/**
 * 结束回合：行动点重置为上限，回合序号 +1。
 * 本阶段不做环境维持结算。
 */
export function applyEndTurn(session: MapSession): MapSession {
  return {
    ...session,
    actionPoints: MAX_ACTION_POINTS,
    turnIndex: session.turnIndex + 1,
  }
}
