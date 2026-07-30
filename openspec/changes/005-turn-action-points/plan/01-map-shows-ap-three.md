# 地图 HUD 显示行动点 3

- id: 01
- status: done
- depends: []
- maps-to-task: [1.1, 2.1, 3.1]

## Intent

在地图会话中增加回合状态（至少 `actionPoints`、`turnIndex`），新会话开局行动点为 3，并在地图 HUD 可见。场景只展示，规则与状态放在 `systems/`。

## Verify

约 30 秒内手动确认：

1. 从培养皿进入地图
2. 地图界面可见剩余行动点为 `3`（可同时看到回合序号，可选）
3. 无翻格/移动等玩法动作；仅确认显示正确

## Steps

- [x] 扩展地图会话（或并列回合模块）加入 `actionPoints`、`turnIndex`；新会话 AP=`3`、回合从 `1` 起
- [x] 地图 HUD 渲染剩余行动点
- [x] 按 Verify 走一遍

## Notes

- 第一版写死 `MAX_ACTION_POINTS = 3`，不考虑进化修正
- 扣点与结束回合放在切片 02
- 验证：`pnpm lint` / `pnpm build` 通过。请培养皿→地图确认「回合 1 · 行动点 3」。
