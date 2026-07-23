import { AppShell } from '@/app/AppShell'

export function PetriDishScene() {
  return (
    <AppShell
      sceneName="培养皿"
      actions={[
        { label: '返回菜单', to: '/' },
        { label: '进入地图', to: '/map', primary: true },
      ]}
    >
      <section className="scene-block">
        <h1>培养皿</h1>
        <p className="lede">安全休整占位。真实时间恢复、投喂与出征逻辑尚未接入。</p>
        <div className="game-viewport placeholder-panel">
          <span>培养皿主视区占位</span>
        </div>
      </section>
    </AppShell>
  )
}
