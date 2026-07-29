# Plan: 003 · 培养皿真实时间恢复

- goal: 族群未满时快进或投喂后增加，且不超过上限
- status: done
- current: 02-fastforward-recovers-to-cap.md
- mode: openspec

## Order

| id | file | status | verify (short) |
|----|------|--------|----------------|
| 01 | 01-feed-raises-population.md | done | lint/build OK；feed 规则 10→11→12，不足拒绝 |
| 02 | 02-fastforward-recovers-to-cap.md | done | lint/build OK；快进 +1；满员后不再增加 |

## Notes

- 依赖：`002-species-runtime-state`（培养皿已只读展示默认态；当前 Provider 尚不可变）
- 设定：每现实 10 分钟 +1 族群；投喂每 5 营养 +1 族群；恢复至族群上限后停止
- 本阶段不做：培养皿升级、离线每日恢复上限、持久化、配方投喂、孢子复苏
- 默认开局族群 `10` / 上限 `50` / 营养 `10`，足够立刻验收投喂与单次快进
- 全部切片已完成；可选：把进度同步回 `tasks.md`（先问再勾选）
