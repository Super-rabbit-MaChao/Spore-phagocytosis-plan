import type { SpeciesRuntime } from './types'

/** 第一版默认：芽孢杆菌开局数值（验收写死） */
export function createDefaultBacillusRuntime(): SpeciesRuntime {
  return {
    id: 'bacillus',
    name: '芽孢杆菌',
    population: 10,
    energy: 20,
    moisture: 20,
    nutrition: 10,
    populationCap: 50,
  }
}
