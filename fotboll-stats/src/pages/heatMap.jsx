import { MATCH_ROUTES } from '../components/Routes/matchRoutes.jsx'
import { Navigate } from 'react-router'

export const HeatMapPage = () => {
  return <Navigate to={MATCH_ROUTES[0].path} replace />
}

export default HeatMapPage