import { AppShell } from '@/app/AppShell'

export function MainMenuScene() {
  return (
    <AppShell
      sceneName="主菜单"
      actions={[{ label: '进入培养皿', to: '/petri-dish', primary: true }]}
    >
      <section className="scene-hero">
        <p className="eyebrow">空白跨端壳</p>
        <h1>孢子进化</h1>
        <p className="lede">
          培养皿休整 · 地图探索 · 孢子化撤离。本阶段仅场景占位，不含回合与进化逻辑。
        </p>
        <div className="game-viewport placeholder-panel" aria-hidden="true">
          <span>GameViewport</span>
        </div>
      </section>
    </AppShell>
  )
}
