# Plan: 004 · 六边形地图会话生成

- goal: 每次进入地图得到新布局；开局可见核心格与邻格揭示，外围迷雾
- status: done
- current: 02-reenter-new-map-session.md
- mode: openspec

## Order

| id | file | status | verify (short) |
|----|------|--------|----------------|
| 01 | 01-hex-opening-reveal-visible.md | done | lint/build OK；半径3开局揭示+迷雾渲染 |
| 02 | 02-reenter-new-map-session.md | done | lint/build OK；显式会话+可见种子 |

## Notes

- 依赖：空白壳地图路由；建议在 `002`/`003` 之后（本变更不改培养皿恢复）
- 设定：每次进入重生成；安全格落点；核心格 + 最多 6 邻格开局揭示
- 本阶段不做：翻格、行动点、移动、采集、撤离、回合结算
- 地图尺寸第一版写死（如小半径六边形岛）；已揭示内容可简化为空/资源标记
- 全部切片已完成；可选：把进度同步回 `tasks.md`（先问再勾选）
