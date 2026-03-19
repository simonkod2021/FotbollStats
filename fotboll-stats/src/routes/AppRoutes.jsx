import { Navigate, Route, Routes } from 'react-router'
import Heatmap from '../components/Heatmap/Heatmap.jsx'
import BarChart from '../components/Charts/BarChart.jsx'
import RadarChart from '../components/Charts/RadarChart.jsx'
import { ChartPage } from '../pages/chartPage.jsx'
import { MATCH_ROUTES } from '../components/Routes/matchRoutes.jsx'

const DEFAULT_MATCH_ROUTE = MATCH_ROUTES[0]

function toRadarData(events) {
  const countsByEventType = {}

  for (const event of events) {
    if (!event?.type?.name) continue
    countsByEventType[event.type.name] = (countsByEventType[event.type.name] || 0) + 1
  }

  return Object.entries(countsByEventType)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([category, value]) => ({ category, value }))
}

const radarData = toRadarData(DEFAULT_MATCH_ROUTE?.data ?? [])

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
      <Route path="/bar" element={<BarChart data={DEFAULT_MATCH_ROUTE.data} title="Bar Chart · Barcelona vs Deportivo Alavés" />} />
      <Route path="/radar" element={<RadarChart data={radarData} title="Radar Chart · Barcelona vs Deportivo Alavés" />} />
      <Route path="*" element={<Navigate to={DEFAULT_MATCH_ROUTE.path} replace />} />
    </Routes>
  )
}

export default AppRoutes
