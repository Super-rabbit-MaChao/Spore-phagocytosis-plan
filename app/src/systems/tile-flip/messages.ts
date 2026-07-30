import type { FlipFailReason } from './flip'

const FLIP_FAIL_MESSAGES: Record<FlipFailReason, string> = {
  missing: '目标格不存在',
  'not-fog': '该格已揭示，无法翻格',
  'not-adjacent': '只能翻开核心相邻的迷雾格',
  'no-ap': '行动点不足',
  'no-energy': '能量不足',
}

export function flipFailMessage(reason: FlipFailReason): string {
  return FLIP_FAIL_MESSAGES[reason]
}
