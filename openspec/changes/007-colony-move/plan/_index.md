# Plan: 007 · 核心菌落移动

- goal: 点选相邻已揭示格后核心位置改变并扣 AP/能量；不可移入未知格
- status: done
- current: 02-move-rejects-with-hint.md
- mode: openspec

## Order

| id | file | status | verify (short) |
|----|------|--------|----------------|
| 01 | 01-move-to-revealed-neighbor.md | done | lint/build OK；移动+扣 AP/能量 |
| 02 | 02-move-rejects-with-hint.md | done | lint/build OK；移动拒绝短提示 |

## Notes

- 依赖：`004` 地图会话、`005` 行动点、`002`/`003` 能量；建议在 `006` 翻格之后（开局邻格已揭示，可直接验移动）
- 设定：移动耗 1 AP + `2 × 难度` 能量（土壤 1.0 → 能量 2）；仅相邻已揭示格
- 本阶段不做：危险格结算、多格移动、采集、蔓延
- 开局核心 6 邻已揭示，成功路径无需调试遮回
- 全部切片已完成；可选：把进度同步回 `tasks.md`（先问再勾选）
