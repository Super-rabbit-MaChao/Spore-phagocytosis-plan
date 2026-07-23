import { Navigate, Route, Routes } from 'react-router-dom'
import { MainMenuScene } from '@/scenes/MainMenuScene'
import { PetriDishScene } from '@/scenes/PetriDishScene'
import { MapScene } from '@/scenes/MapScene'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainMenuScene />} />
      <Route path="/petri-dish" element={<PetriDishScene />} />
      <Route path="/map" element={<MapScene />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
