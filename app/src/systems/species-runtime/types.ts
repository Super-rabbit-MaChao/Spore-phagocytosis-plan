export type SpeciesRuntime = {
  id: string
  name: string
  /** 族群数量 */
  population: number
  /** 能量 */
  energy: number
  /** 水分 */
  moisture: number
  /** 营养 */
  nutrition: number
  /** 族群上限 */
  populationCap: number
}
