import { DEFAULT_MATCH_ROUTE } from '../routes/matchRoutes.jsx'
import { Navigate } from 'react-router'

export const HeatMapPage = () => {
  return <Navigate to={DEFAULT_MATCH_ROUTE.path} replace />
}

export default HeatMapPage