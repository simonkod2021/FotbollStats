import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { DEFAULT_MATCH_ROUTE, MATCH_ROUTES } from './matchRoutes.jsx'
import { MoonLoader } from 'react-spinners' // ✅ Statisk import — laddas alltid först

// Lazy-laddas efter MoonLoader är redo
const Heatmap = lazy(() => import('../components/Heatmap/Heatmap.jsx'))
const ChartPage = lazy(() => import('../pages/chartPage.jsx'))
const HeatMapPage = lazy(() => import('../pages/heatMap.jsx'))


// Fallback-komponent som visas medan de stora komponenterna laddas
function RouteFallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <MoonLoader color="#36d7b7" size={100} />
    </div>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Navigate to={DEFAULT_MATCH_ROUTE.path} replace />} />

        {MATCH_ROUTES.map((matchRoute) => (
          <Route
            key={matchRoute.path}
            path={matchRoute.path}
            element={<Heatmap data={matchRoute.data} title={matchRoute.title} />}
          />
        ))}

        <Route path="/heatmap" element={<HeatMapPage />} />
        <Route path="/charts" element={<ChartPage />} />
        <Route path="*" element={<Navigate to={DEFAULT_MATCH_ROUTE.path} replace />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes