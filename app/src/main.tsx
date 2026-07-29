import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/app/AppRoutes'
import { MapSessionProvider } from '@/systems/hex-map'
import { SpeciesRuntimeProvider } from '@/systems/species-runtime'
import '@/styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SpeciesRuntimeProvider>
        <MapSessionProvider>
          <AppRoutes />
        </MapSessionProvider>
      </SpeciesRuntimeProvider>
    </BrowserRouter>
  </StrictMode>,
)
