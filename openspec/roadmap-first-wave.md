# 玩法切片路线图（第一波已提案）

空白壳完成后，按「一个变更 = 一个可验证功能」推进。变更目录名必须带三位编号前缀（见 `.cursor/rules/openspec-change-numbering.mdc`）。

建议实现顺序（后者依赖前者）：

| 编号 | 变更 | 可验证点 |
|---|---|---|
| 001 | `001-bootstrap-blank-cross-platform-shell` | 空白壳可启动（已完成） |
| 002 | `002-species-runtime-state` | 培养皿可见族群/能量等默认数值 |
| 003 | `003-petri-realtime-recovery` | 快进/投喂后族群增加且不超过上限 |
| 004 | `004-hex-map-session` | 每次进入地图重生成；开局揭示 6 邻格 |
| 005 | `005-turn-action-points` | AP=3；扣点与结束回合 |
| 006 | `006-tile-flip` | 翻邻接迷雾格，扣 AP/能量 |
| 007 | `007-colony-move` | 移到已揭示邻格 |
| 008 | `008-resource-collect` | 采集后资源增加，局内不再生 |
| 009 | `009-spore-evacuate` | 10% 能量撤离回培养皿 |

下一可用编号：**010**

## 后续建议提案（尚未创建）

| 建议编号 | 建议变更名 | 功能 | 可验证点 |
|---|---|---|---|
| 010 | `010-colony-spread` | 蔓延占领邻格 | 扣族群/营养后出现蔓延格 |
| 011 | `011-map-upkeep` | 回合维持消耗（难度×环境） | 结束回合后能量/水分按公式下降 |
| 012 | `012-population-zero-fail` | 族群归零失败 | 族群到 0 回培养皿并丢本局收益 |
| 013 | `013-temp-evolution` | 临时进化 + 撤离固化 | 地图内生效；失败丢失；撤离保留 |
| 014 | `014-resource-allocation` | 公共库存分配到角色 | 分配后角色可用、互不共享 |
| 015 | `015-soil-long-term-vars` | 土壤地区长期变量 | 跨局保留探索次数等轻度偏向 |

实现时请对单个变更运行：

```text
/opsx:apply 002-species-runtime-state
```

不要一次混做多个。
