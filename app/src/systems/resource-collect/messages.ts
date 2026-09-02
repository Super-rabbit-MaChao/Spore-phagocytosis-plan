import type { CollectFailReason } from './collect'

const COLLECT_FAIL_MESSAGES: Record<CollectFailReason, string> = {
  missing: '目标格不存在',
  'not-resource': '当前格没有可采集资源',
  'no-ap': '行动点不足',
  'no-energy': '能量不足',
}

export function collectFailMessage(reason: CollectFailReason): string {
  return COLLECT_FAIL_MESSAGES[reason]
}
