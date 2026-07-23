---
name: openspec-slice-adapter
description: >-
  将 openspec-verifiable-decompose / openspec-verifiable-execute 与本仓库 OpenSpec
  变更桥接。在用户要求适配 OpenSpec、把提案/change 拆进 plan/、把 plan 进度同步到
  tasks.md、或对 openspec 变更做阶段性实现时使用。不替代两个核心 skill，只做路径与上下文路由。
disable-model-invocation: true
---

# OpenSpec 切片适配

把本仓库的 OpenSpec 变更接到 `openspec-verifiable-decompose` / `openspec-verifiable-execute`。  
本 skill **只做路由与互译**，不重新定义「什么叫好切片」，也不代替实现。

## 何时使用

- 用户要对某个 OpenSpec change / 提案做可验证拆解或阶段性执行
- 用户提到：适配 OpenSpec、`changes/.../plan/`、把 tasks 切成 plan
- 需要把切片进度回写到 `tasks.md`

## 何时不要用

- 仓库没有 OpenSpec、或用户只要独立 `plan/` → 直接用 `openspec-verifiable-decompose` / `openspec-verifiable-execute`（项目根 `plan/`）
- 用户只想按 `tasks.md` 一口气做完 → 用 `openspec-apply-change`，不用本适配

## 硬性规则

1. 有活跃 change 时：plan 目录固定为 `openspec/changes/<name>/plan/`
2. 拆解对象是**该提案**的子任务（读 proposal/design/tasks 等产出物），不是另起无关大目标
3. 无 OpenSpec / 无可用 change → **降级说明**后结束，或请用户改用项目根 `plan/` + 核心 skill；禁止半残运行
4. 不实现业务功能；实现交给 `openspec-verifiable-execute`（用户点名或本 skill 明确移交）
5. 回写 `tasks.md` 默认**先询问再勾选**，不静默改 OpenSpec 产出物
6. 核心切片契约不变：多文件默认、每文件有 verify、一次执行一块（见 `openspec-verifiable-decompose/slice-format.md`）

## 工作流 A — 绑定并拆解某个变更

1. **选定 change**  
   - 用户给了名称 → 用它  
   - 否则 `openspec-cn list --json`（或 `openspec list --json`）  
   - 不明确则询问  
   - 宣布：`适配变更：<name>`

2. **确认产出物可读**  
   ```bash
   openspec-cn status --change "<name>" --json
   ```  
   至少能读到 tasks 或 proposal。若变更未就绪，建议先 `/opsx:continue` 或 `openspec-continue-change`，不要空拆。

3. **准备 plan 目录**  
   - 路径：`openspec/changes/<name>/plan/`  
   - 不存在则创建

4. **移交拆解**  
   按 `openspec-verifiable-decompose` 的规则拆解，并强制：  
   - 输出目录 = 上述 `plan/`  
   - `_index.md` 中 `mode: openspec`  
   - 输入上下文 = 该 change 下的 proposal / design / tasks（及用户点名的设定文档）  
   - 每个 `NN-*.md` 尽量填 `maps-to-task`（对应 tasks.md 条目）  
   - **默认多文件**；仅当该 change 本身已是单阶段时才单文件

5. **停止**  
   展示 plan 摘要，等待用户确认后再执行。

## 工作流 B — 执行该变更的下一个切片

1. 选定 change（同 A）
2. 确认 `openspec/changes/<name>/plan/_index.md` 存在；否则先走工作流 A
3. 移交 `openspec-verifiable-execute`，plan 目录指向该 change 的 `plan/`
4. 执行结束后汇报；若用户同意，再考虑工作流 C

## 工作流 C — 将进度同步回 tasks.md（可选）

1. 读取 `plan/` 中已 `done` 的文件及其 `maps-to-task`
2. 若某 task 被其映射切片全部覆盖且均 done → **提议**勾选 `tasks.md` 对应项
3. 用户确认后再改 `- [ ]` → `- [x]`
4. 映射不清时不要猜，标出歧义让用户决定

## 降级（无 OpenSpec）

若检测失败（无 CLI、无 `openspec/changes`、无 change）：

```
未检测到可用的 OpenSpec 变更。
请直接使用：
- openspec-verifiable-decompose → <项目根>/plan/
- openspec-verifiable-execute
或先创建变更：/opsx:new 或 /opsx:propose / /opsx:ff
```

然后结束，不要写入 `openspec/changes/...`。

## 与其他 skill 的关系

```
openspec-propose / ff / continue     → 产出物
        ↓
openspec-slice-adapter               → 路径与上下文（本 skill）
        ↓
openspec-verifiable-decompose        → changes/<name>/plan/*.md
        ↓
openspec-verifiable-execute × N      → 阶段性实现
        ↓
openspec-verify / archive            → 收尾（用户另调）

openspec-apply-change                → 可选替代路径（高吞吐，非本节奏）
```

## 路径速查

| 模式 | plan 目录 |
|------|-----------|
| OpenSpec（本适配） | `openspec/changes/<name>/plan/` |
| 独立（核心 skill） | `<项目根>/plan/` |
