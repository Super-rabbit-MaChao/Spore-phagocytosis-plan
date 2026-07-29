import { useEffect } from 'react'
import { AppShell } from '@/app/AppShell'
import {
  FEED_NUTRITION_COST,
  canFeed,
  useFastForwardRecovery,
  useFillPopulationToCap,
  useSettleRecovery,
  useSpeciesFeed,
  useSpeciesRuntime,
} from '@/systems/species-runtime'

const isDev = import.meta.env.DEV

export function PetriDishScene() {
  const species = useSpeciesRuntime()
  const feed = useSpeciesFeed()
  const settleRecovery = useSettleRecovery()
  const fastForward = useFastForwardRecovery()
  const fillToCap = useFillPopulationToCap()
  const feedEnabled = canFeed(species)

  useEffect(() => {
    settleRecovery()
    const id = window.setInterval(settleRecovery, 1000)
    return () => window.clearInterval(id)
  }, [settleRecovery])

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
        <p className="lede">
          安全休整。族群按真实时间缓慢恢复；也可无配方投喂加速。
        </p>
        <div className="game-viewport species-runtime-hud">
          <p className="species-runtime-name">{species.name}</p>
          <dl className="species-runtime-stats">
            <div>
              <dt>族群</dt>
              <dd>{species.population}</dd>
            </div>
            <div>
              <dt>能量</dt>
              <dd>{species.energy}</dd>
            </div>
            <div>
              <dt>水分</dt>
              <dd>{species.moisture}</dd>
            </div>
            <div>
              <dt>营养</dt>
              <dd>{species.nutrition}</dd>
            </div>
            <div>
              <dt>族群上限</dt>
              <dd>{species.populationCap}</dd>
            </div>
          </dl>
          <div className="species-runtime-actions">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!feedEnabled}
              onClick={() => {
                feed()
              }}
            >
              投喂（{FEED_NUTRITION_COST} 营养 → +1 族群）
            </button>
            {isDev ? (
              <div className="species-runtime-debug">
                <p className="species-runtime-debug-label">调试</p>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    fastForward(1)
                  }}
                >
                  快进 10 分钟
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    fillToCap()
                  }}
                >
                  填满族群
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </AppShell>
  )
}
