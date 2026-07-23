import { AppShell } from '@/app/AppShell'

export function MapScene() {
  return (
    <AppShell
      sceneName="地图"
      actions={[
        { label: '返回培养皿', to: '/petri-dish', primary: true },
        { label: '主菜单', to: '/' },
      ]}
    >
      <section className="scene-block">
        <h1>地图探索</h1>
        <p className="lede">六边形探索主视区占位。翻格、移动、蔓延与回合结算尚未接入。</p>
        <div className="game-viewport map-placeholder" role="img" aria-label="地图主视区占位">
          <div className="hex-grid-sketch" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <p>GameViewport · 地图占位</p>
        </div>
      </section>
    </AppShell>
  )
}
