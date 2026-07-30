import type { MoveFailReason } from './move'

const MOVE_FAIL_MESSAGES: Record<MoveFailReason, string> = {
  missing: '目标格不存在',
  fog: '不能移入未揭示格',
  'not-adjacent': '只能移动到核心相邻的已揭示格',
  'same-tile': '已在该格',
  'no-ap': '行动点不足',
  'no-energy': '能量不足',
}

export function moveFailMessage(reason: MoveFailReason): string {
  return MOVE_FAIL_MESSAGES[reason]
}
