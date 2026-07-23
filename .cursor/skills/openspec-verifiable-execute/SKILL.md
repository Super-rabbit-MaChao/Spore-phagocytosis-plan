---
name: openspec-verifiable-execute
description: >-
  从 plan/ 执行下一个可验证阶段：实现一个阶段文件、按 verify 验收、更新状态后停止。
  在用户要求执行子任务、执行切片、做下一个 plan、按阶段继续实现时使用。
  可独立使用；与 OpenSpec 结合时由 openspec-slice-adapter 指定 change 下的 plan/ 路径。
disable-model-invocation: true
---

# 可验证执行（openspec-verifiable-execute）

从 `plan/` 中取出**当前一个**阶段文件，实现 → 验证 → 更新状态 → **默认停止**。

## 何时使用

- 用户要执行子任务 / 下一个切片 / 按 plan 推进
- 已有 `plan/_index.md` 与 `NN-*.md`（通常由 `openspec-verifiable-decompose` 生成）
- **不要**一次做完整个 plan，除非用户明确要求连续做 N 个

## 硬性规则

1. 默认只执行 **一个** 阶段文件（`_index.md` 的 `current`）
2. 仅当用户明确说「连续做 N 个」或「做到某文件为止」时，才连续执行
3. `verify` 失败 → 将该文件标为 `blocked`，报告原因，**不**扩大范围、不跳到下一文件
4. 发现拆错了 → 停止，建议用户回到 `openspec-verifiable-decompose` 修订；不在执行中大幅改写队列
5. 不创建 OpenSpec change、不归档、不代替 `openspec-apply-change` 清整份 `tasks.md`
6. 本 skill 只认切片契约（见 [slice-format.md](slice-format.md)），不关心文件在项目 `plan/` 还是某 change 下的 `plan/`

## 如何确定 plan 目录

1. 用户给出路径 → 用它
2. 否则若对话中刚拆解过 → 用那次的 `plan/`
3. 否则若存在候选目录，询问确认：
   - `<项目根>/plan/`
   - 或用户指出的 `openspec/changes/<name>/plan/`
4. 仍不明确 → 问用户

## 工作流程

1. **读 `_index.md`**  
   确认 `goal`、`current`、各行 status。

2. **选中目标文件**  
   - 默认：`current` 指向的文件  
   - 若 `current` 已 `done`，移到顺序中下一个 `pending`（并更新 `current`）  
   - 若依赖未完成 → 标 `blocked` 或停下来说明

3. **宣布范围**  
   说明：正在执行哪个文件、Intent、Verify 标准。然后才改代码。

4. **实现**  
   - 只做该文件 Intent / Steps 所需的最小改动  
   - 随做随勾选 Steps（`- [ ]` → `- [x]`）  
   - 文件 status：`pending` → `doing` →（成功）`done` 或（失败）`blocked`

5. **验证**  
   - 按该文件 **Verify** 执行（运行、打开场景、检查行为等）  
   - 能自动跑的命令就跑；需人工看的，写出准确操作步骤与预期  
   - 失败：写 Notes、status=`blocked`、更新 `_index.md`，停止

6. **更新 `_index.md`**  
   - 更新该行 status 与短 verify 备注  
   - 成功：将 `current` 指到下一个 `pending`（若还有）  
   - 若全部 `done`：`status: done`

7. **停止并汇报**  
   - 做了什么  
   - 验证结果  
   - 下一个 `current` 是什么（如有）  
   - **不要**自动开始下一文件

## 连续执行（仅当用户要求）

若用户说连续做 N 个：每完成一个仍跑 verify；任一失败立即停；做满 N 个或队列结束则停。

## 反模式

- 偷偷做下一个阶段文件
- verify 含糊通过（「应该没问题」）
- 借机大重构或顺手做远期功能
- 无 `_index.md` 时凭记忆乱序执行（先补 index 或让用户确认顺序）
