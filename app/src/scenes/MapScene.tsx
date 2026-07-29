import { useEffect, useMemo } from 'react'
import { AppShell } from '@/app/AppShell'
import {
  axialKey,
  axialToPixel,
  hexCornerPoints,
  useClearMapSession,
  useMapSession,
  useStartMapSession,
  type HexMap,
} from '@/systems/hex-map'

const HEX_SIZE = 22

function MapHexGrid({ map }: { map: HexMap }) {
  const layout = useMemo(() => {
    const placed = map.tiles.map((tile) => {
      const { x, y } = axialToPixel(tile.q, tile.r, HEX_SIZE)
      return { tile, x, y }
    })
    const xs = placed.map((p) => p.x)
    const ys = placed.map((p) => p.y)
    const pad = HEX_SIZE * 1.2
    const minX = Math.min(...xs) - pad
    const maxX = Math.max(...xs) + pad
    const minY = Math.min(...ys) - pad
    const maxY = Math.max(...ys) + pad
    return {
      placed,
      viewBox: `${minX} ${minY} ${maxX - minX} ${maxY - minY}`,
    }
  }, [map])

  const coreKey = axialKey(map.core.q, map.core.r)

  return (
    <svg
      className="hex-map-svg"
      viewBox={layout.viewBox}
      role="img"
      aria-label="六边形地图：核心与邻格已揭示，外围为迷雾"
    >
      {layout.placed.map(({ tile, x, y }) => {
        const isCore = axialKey(tile.q, tile.r) === coreKey
        const stateClass =
          tile.visibility === 'fog' ? 'hex-tile-fog' : 'hex-tile-revealed'
        const contentClass =
          tile.visibility === 'revealed' && tile.content === 'resource'
            ? 'hex-tile-resource'
            : ''
        return (
          <g
            key={axialKey(tile.q, tile.r)}
            className={`hex-tile ${stateClass} ${contentClass}`.trim()}
            transform={`translate(${x} ${y})`}
          >
            <polygon points={hexCornerPoints(0, 0, HEX_SIZE * 0.95)} />
            {tile.visibility === 'revealed' && tile.content === 'resource' ? (
              <circle className="hex-resource-dot" r={4} />
            ) : null}
            {isCore ? <circle className="hex-core-marker" r={5.5} /> : null}
          </g>
        )
      })}
    </svg>
  )
}

export function MapScene() {
  const session = useMapSession()
  const startNewSession = useStartMapSession()
  const clearSession = useClearMapSession()

  useEffect(() => {
    startNewSession()
    return () => {
      clearSession()
    }
  }, [startNewSession, clearSession])

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
        <p className="lede">
          每次进入生成新会话。开局落入安全格并揭示周围邻格。翻格、移动与回合结算尚未接入。
        </p>
        <div className="game-viewport hex-map-viewport">
          {session ? (
            <>
              <p className="hex-map-session-id">
                会话种子 <code>{session.seed.toString(16)}</code>
                <span className="hex-map-session-core">
                  · 核心 ({session.map.core.q},{session.map.core.r})
                </span>
              </p>
              <MapHexGrid map={session.map} />
              <p className="hex-map-legend">
                实心圆为核心菌落 · 浅格已揭示 · 深格迷雾
                {session.map.tiles.some(
                  (t) => t.visibility === 'revealed' && t.content === 'resource',
                )
                  ? ' · 点为资源'
                  : ''}
              </p>
            </>
          ) : (
            <p className="hex-map-legend">正在创建地图会话…</p>
          )}
        </div>
      </section>
    </AppShell>
  )
}
