export type AxialCoord = {
  q: number
  r: number
}

export type TileVisibility = 'fog' | 'revealed'

/** 第一版已揭示内容：空或资源标记 */
export type TileContent = 'empty' | 'resource'

export type HexTile = {
  q: number
  r: number
  visibility: TileVisibility
  content: TileContent
  /** 是否可作为开局安全落点 */
  safe: boolean
}

export type HexMap = {
  /** 六边形岛半径（含中心） */
  radius: number
  /** 生成种子，用于验收两次进入是否不同 */
  seed: number
  tiles: HexTile[]
  core: AxialCoord
}

/** 一局地图会话：进入时创建，离开后丢弃 */
export type MapSession = {
  id: string
  seed: number
  map: HexMap
}
