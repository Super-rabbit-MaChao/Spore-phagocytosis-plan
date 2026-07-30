# Plan: 006 · 翻开相邻未知格

- goal: 翻开邻接迷雾格后已揭示并扣 AP/能量；非法目标或资源不足不可翻
- status: done
- current: 02-flip-rejects-with-hint.md
- mode: openspec

## Order

| id | file | status | verify (short) |
|----|------|--------|----------------|
| 01 | 01-flip-adjacent-fog-reveals.md | done | lint/build OK；翻格揭示+扣 AP/能量 |
| 02 | 02-flip-rejects-with-hint.md | done | lint/build OK；拒绝原因短提示 |

## Notes

- 依赖：`004` 地图会话、`005` 行动点、`002`/`003` 角色能量
- 设定：翻格耗 1 AP + `1 × 难度` 能量（土壤难度 1.0 → 能量 1）；仅核心相邻未知格
- **验收注意：** 开局已揭示核心 6 邻，默认无「邻接迷雾」。切片 01 需提供仅开发可见的调试（如「遮回一邻格」）以便 30 秒内验收成功翻格；不改变正式开局规则
- 本阶段不做：移动、采集、非土壤难度表、翻格范围扩展到非核心邻格
- 全部切片已完成；可选：把进度同步回 `tasks.md`（先问再勾选）
