# 切片计划格式

`openspec-verifiable-decompose` 与 `openspec-verifiable-execute` 共用的契约。

## 目录结构

```
plan/
├── _index.md
├── 01-some-visible-result.md
├── 02-next-stage.md
└── ...
```

- **默认多文件** `NN-slug.md`
- **单文件例外**：仅当整段目标本身已是一个最小可验证阶段

## `_index.md`

```markdown
# Plan: <阶段目标标题>

- goal: <一句话阶段目标>
- status: active | paused | done
- current: 01-some-visible-result.md
- mode: standalone | openspec

## Order

| id | file | status | verify (short) |
|----|------|--------|----------------|
| 01 | 01-some-visible-result.md | pending | ... |
| 02 | 02-next-stage.md | pending | ... |

## Notes

- 依赖 / 风险 / 本阶段不做的事
```

`current` 指向下一个要执行的文件（或正在进行的文件）。

行状态：`pending` | `doing` | `done` | `blocked`

## `NN-slug.md`

```markdown
# <阶段标题>

- id: 01
- status: pending
- depends: []
- maps-to-task: []    # 可选；适配 OpenSpec 时填写 tasks 条目

## Intent

<本阶段增加什么，一小段话>

## Verify

<约 30 秒内可观察的验收方式，写具体>

## Steps

- [ ] ...
- [ ] ...

## Notes

- 阻塞原因 / 决策 / 链接
```

## 粒度

| 单位 | 含义 |
|------|------|
| 一个 `NN-*.md` 文件 | 一个可交付、可验证的阶段 |
| 文件内的 Steps | 该阶段的实现清单 |

优先做完后能多一点「游戏感 / 产品感」的阶段，而不是只有看不见的底层准备。
