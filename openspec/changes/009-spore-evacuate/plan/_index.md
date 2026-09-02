# Plan: 009 · 孢子化撤离

- goal: 能量足够时孢子化撤离回培养皿并按公式扣能量；不足时拒绝并提示
- status: done
- current: 02-evacuate-rejects-with-hint.md
- mode: openspec

## Order

| id | file | status | verify (short) |
|----|------|--------|----------------|
| 01 | 01-evacuate-returns-to-petri.md | done | lint/build OK；撤离回培养皿、能量按公式减少 |
| 02 | 02-evacuate-rejects-with-hint.md | done | lint/build OK；缺 AP/能量拒绝短提示 |

## Notes

- 依赖：`004` 地图会话、`005` 行动点、`002` 角色能量/携带
- 设定：耗 1 AP + `max(1, ceil(当前能量 × 0.1))` 能量；开局能量 20 → 消耗 2，撤离后 18
- BottomBar 最多 3 个动作：用「孢子化撤离」替换「返回培养皿」（撤离即回培养皿）；保留结束回合与主菜单
- 角色运行时是全局的，成功撤离不重置水分/营养；结束地图会话后再次进地图会新建会话
- 本阶段不做：进化固化、孢子库存、传播格加成、确认弹窗、族群归零失败、禁止主菜单免费离场
- 全部切片已完成；可选：把进度同步回 `tasks.md`（先问再勾选）
