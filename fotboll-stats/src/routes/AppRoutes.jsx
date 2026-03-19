import { Navigate, Route, Routes } from 'react-router'
import Heatmap from '../components/Heatmap/Heatmap.jsx'
import { ChartPage } from '../pages/chartPage.jsx'
import { MATCH_ROUTES } from '../components/Routes/matchRoutes.jsx'

const DEFAULT_MATCH_ROUTE = MATCH_ROUTES[0]

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={DEFAULT_MATCH_ROUTE.path} replace />} />

      {MATCH_ROUTES.map((matchRoute) => (
        <Route
          key={matchRoute.path}
          path={matchRoute.path}
          element={<Heatmap data={matchRoute.data} title={matchRoute.title} />}
        />
      ))}

      <Route path="/heatmap" element={<Navigate to={DEFAULT_MATCH_ROUTE.path} replace />} />
      <Route path="/charts" element={<ChartPage />} />
      <Route path="*" element={<Navigate to={DEFAULT_MATCH_ROUTE.path} replace />} />
    </Routes>
  )
}

export default AppRoutes
