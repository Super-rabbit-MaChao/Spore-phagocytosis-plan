# Plan: 002 · 角色运行时状态

- goal: 进入培养皿可见默认芽孢杆菌的族群/能量/水分/营养/上限
- status: done
- current: 01-petri-shows-species-runtime.md
- mode: openspec

## Order

| id | file | status | verify (short) |
|----|------|--------|----------------|
| 01 | 01-petri-shows-species-runtime.md | done | lint/build OK；bundle 含默认数值；目视确认培养皿 HUD |

## Notes

- 依赖：`001` 空白壳（主菜单 / 培养皿 / 地图路由已通）
- 设定未给出精确开局数值 → 本阶段写死第一版默认，并在切片 Verify 中写死验收数字
- 本阶段不做：真实时间恢复、投喂、持久化、多角色、地图消耗/撤离
- 后续 `003-petri-realtime-recovery` 会挂在本切片的运行时状态上
- 全部切片已完成；可选：把进度同步回 `tasks.md`（先问再勾选）
