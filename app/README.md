# 孢子进化 · 空白跨端壳

本目录是《孢子进化》的可启动 Web 壳，对齐设定中的**主菜单 / 培养皿 / 地图**场景占位。

> 本阶段**不含**回合、翻格、资源、进化、孢子化等玩法逻辑。

## 访问形式

同一应用同时支持：

- 桌面浏览器（网页）
- 手机浏览器（响应式布局）

## 启动

在仓库根目录或 `app/` 目录均可：

```bash
# 仓库根目录
pnpm install --dir app
pnpm dev

# 或进入 app
cd app
pnpm install
pnpm dev
```

默认地址：`http://localhost:5173`

局域网手机访问：启动后终端会打印 Network 地址（已开启 `server.host`）。

## 脚本

| 命令 | 说明 |
|---|---|
| `pnpm dev` | 开发服务器 |
| `pnpm build` | 生产构建 |
| `pnpm preview` | 预览构建产物 |

## 路由场景

| 路径 | 场景 |
|---|---|
| `/` | 主菜单 |
| `/petri-dish` | 培养皿占位 |
| `/map` | 地图占位 |

## 目录约定

```text
src/
  app/        # 路由与 AppShell
  scenes/     # 场景占位
  styles/     # 全局样式
  systems/    # 后续玩法挂载点（当前为空）
```
