# Plan: 005 · 回合行动点

- goal: 地图内可见 AP=3；扣点后减少；结束回合后回到 3
- status: done
- current: 02-spend-ap-and-end-turn.md
- mode: openspec

## Order

| id | file | status | verify (short) |
|----|------|--------|----------------|
| 01 | 01-map-shows-ap-three.md | done | lint/build OK；会话 AP=3 + HUD |
| 02 | 02-spend-ap-and-end-turn.md | done | lint/build OK；扣点/结束回合/拒绝 |

## Notes

- 依赖：`004-hex-map-session`（地图会话已存在）
- 设定：每回合初始 3 行动点；每动作 1 点；本阶段不做进化加减与环境结算表
- 本阶段不做：翻格、移动、采集、维持消耗、真实动作绑定（可用调试扣点验收接口）
- 状态放在 `systems/`，与地图会话绑定；新会话回合从 1、AP=3 开始
- 全部切片已完成；可选：把进度同步回 `tasks.md`（先问再勾选）
