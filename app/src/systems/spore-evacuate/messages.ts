import type { EvacuateFailReason } from './evacuate'

const EVACUATE_FAIL_MESSAGES: Record<EvacuateFailReason, string> = {
  'no-ap': '行动点不足',
  'no-energy': '能量不足',
}

export function evacuateFailMessage(reason: EvacuateFailReason): string {
  return EVACUATE_FAIL_MESSAGES[reason]
}
