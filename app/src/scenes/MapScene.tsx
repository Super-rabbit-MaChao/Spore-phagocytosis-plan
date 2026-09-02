import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '@/app/AppShell'
import {
  applyMoveColony,
  isMovableTile,
  moveFailMessage,
} from '@/systems/colony-move'
import {
  applyCollect,
  COLLECT_ENERGY_COST,
  collectFailMessage,
  setCoreTileResource,
} from '@/systems/resource-collect'
import { applyEvacuate, evacuateEnergyCost, evacuateFailMessage } from '@/systems/spore-evacuate'
import {
  axialKey,
  axialToPixel,
  hexCornerPoints,
  useClearMapSession,
  useEndTurn,
  useMapSession,
  useReplaceMapSession,
  useSpendActionPoint,
  useStartMapSession,
  type AxialCoord,
  type HexMap,
  type HexTile,
  type MapSession,
} from '@/systems/hex-map'
import {
  useCollectCarry,
  useSetEnergy,
  useSpeciesRuntime,
  useSpendEnergy,
} from '@/systems/species-runtime'
import { canSpendActionPoint } from '@/systems/turn-action-points'
import {
  applyFlipTile,
  flipFailMessage,
  fogOneCoreNeighbor,
  isFlippableTile,
} from '@/systems/tile-flip'

const HEX_SIZE = 22
const isDev = import.meta.env.DEV
const HINT_MS = 2200

type MapHexGridProps = {
  map: HexMap
  session: MapSession
  energy: number
  onTileClick: (target: AxialCoord) => void
}

function MapHexGrid({ map, session, energy, onTileClick }: MapHexGridProps) {
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
      aria-label="六边形地图：邻接迷雾可翻格，邻接已揭示可移动，当前格可采集"
    >
      {layout.placed.map(({ tile, x, y }) => {
        const isCore = axialKey(tile.q, tile.r) === coreKey
        const flippable = isFlippableTile(session, tile, energy)
        const movable = isMovableTile(session, tile, energy)
        const stateClass =
          tile.visibility === 'fog' ? 'hex-tile-fog' : 'hex-tile-revealed'
        const contentClass =
          tile.visibility === 'revealed' && tile.content === 'resource'
            ? 'hex-tile-resource'
            : ''
        const actionClass = flippable
          ? 'hex-tile-flippable'
          : movable
            ? 'hex-tile-movable'
            : ''
        return (
          <g
            key={axialKey(tile.q, tile.r)}
            className={`hex-tile ${stateClass} ${contentClass} ${actionClass}`.trim()}
            transform={`translate(${x} ${y})`}
            onClick={() => {
              onTileClick({ q: tile.q, r: tile.r })
            }}
            style={{ cursor: 'pointer' }}
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
  const navigate = useNavigate()
  const session = useMapSession()
  const startNewSession = useStartMapSession()
  const clearSession = useClearMapSession()
  const spendActionPoint = useSpendActionPoint()
  const endTurn = useEndTurn()
  const replaceSession = useReplaceMapSession()
  const species = useSpeciesRuntime()
  const spendEnergy = useSpendEnergy()
  const collectCarry = useCollectCarry()
  const setEnergy = useSetEnergy()
  const [hint, setHint] = useState<string | null>(null)

  useEffect(() => {
    startNewSession()
    return () => {
      clearSession()
    }
  }, [startNewSession, clearSession])

  useEffect(() => {
    if (!hint) {
      return
    }
    const id = window.setTimeout(() => {
      setHint(null)
    }, HINT_MS)
    return () => window.clearTimeout(id)
  }, [hint])

  const canSpend = session ? canSpendActionPoint(session) : false

  const showHint = (message: string) => {
    setHint(message)
  }

  const handleTileClick = (target: AxialCoord) => {
    if (!session) {
      return
    }

    const tile = session.map.tiles.find(
      (t) => t.q === target.q && t.r === target.r,
    )
    if (!tile) {
      return
    }

    if (tile.visibility === 'fog') {
      const flip = applyFlipTile(session, target, species.energy)
      if (!flip.ok) {
        showHint(flipFailMessage(flip.reason))
        return
      }
      replaceSession(flip.session)
      spendEnergy(flip.energySpent)
      setHint(null)
      return
    }

    const move = applyMoveColony(session, target, species.energy)
    if (!move.ok) {
      showHint(moveFailMessage(move.reason))
      return
    }
    replaceSession(move.session)
    spendEnergy(move.energySpent)
    setHint(null)
  }

  const handleCollect = () => {
    if (!session) {
      return
    }
    const collect = applyCollect(session, species.energy)
    if (!collect.ok) {
      showHint(collectFailMessage(collect.reason))
      return
    }
    replaceSession(collect.session)
    collectCarry(collect.energySpent, collect.gained)
    setHint(null)
  }

  const handleFogNeighbor = () => {
    if (!session) {
      return
    }
    replaceSession(fogOneCoreNeighbor(session))
  }

  const handleEvacuate = () => {
    if (!session) {
      return
    }
    const evacuate = applyEvacuate(session, species.energy)
    if (!evacuate.ok) {
      showHint(evacuateFailMessage(evacuate.reason))
      return
    }
    spendEnergy(evacuate.energySpent)
    clearSession()
    navigate('/petri-dish')
  }

  const evacuateCost = evacuateEnergyCost(species.energy)

  return (
    <AppShell
      sceneName="地图"
      actions={[
        {
          label: `孢子化撤离（${evacuateCost} 能量）`,
          onClick: handleEvacuate,
        },
        {
          label: '结束回合',
          primary: true,
          onClick: () => {
            endTurn()
          },
        },
        { label: '主菜单', to: '/' },
      ]}
    >
      <section className="scene-block">
        <h1>地图探索</h1>
        <p className="lede">
          邻接迷雾可翻格（1 AP + 1 能量）；邻接已揭示可移动（1 AP + 2 能量）。当前格可采集（1 AP + {COLLECT_ENERGY_COST} 能量）。底栏可孢子化撤离。
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
              <p className="hex-map-turn-hud" aria-live="polite">
                回合 {session.turnIndex}
                <span className="hex-map-ap">
                  · 行动点 <strong>{session.actionPoints}</strong>
                </span>
                <span className="hex-map-ap">
                  · 能量 <strong>{species.energy}</strong>
                </span>
                <span className="hex-map-ap">
                  · 水分 <strong>{species.moisture}</strong>
                </span>
                <span className="hex-map-ap">
                  · 营养 <strong>{species.nutrition}</strong>
                </span>
              </p>
              {hint ? (
                <p className="hex-map-hint" role="status" aria-live="polite">
                  {hint}
                </p>
              ) : null}
              <div className="hex-map-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCollect}
                >
                  采集
                </button>
              </div>
              <MapHexGrid
                map={session.map}
                session={session}
                energy={species.energy}
                onTileClick={handleTileClick}
              />
              <p className="hex-map-legend">
                实心圆为核心 · 可翻格描边 · 可移动格虚线描边
                {session.map.tiles.some(
                  (t: HexTile) =>
                    t.visibility === 'revealed' && t.content === 'resource',
                )
                  ? ' · 点为资源'
                  : ''}
              </p>
              {isDev ? (
                <div className="hex-map-debug">
                  <p className="hex-map-debug-label">调试</p>
                  <button
                    type="button"
                    className="btn"
                    disabled={!canSpend}
                    onClick={() => {
                      spendActionPoint()
                    }}
                  >
                    消耗 1 AP
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={handleFogNeighbor}
                  >
                    遮回一邻格
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setEnergy(0)
                    }}
                  >
                    能量清零
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      replaceSession(setCoreTileResource(session))
                    }}
                  >
                    当前格设为资源
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <p className="hex-map-legend">正在创建地图会话…</p>
          )}
        </div>
      </section>
    </AppShell>
  )
}
