import { useState } from 'react'
import { MATCH_ROUTES, DEFAULT_MATCH_ROUTE } from '../routes/matchRoutes.jsx'
import { CHART_TYPES } from '../routes/chartRoutes.jsx'

export function useChartData() {
  const [selectedMatchPath, setSelectedMatchPath] = useState(DEFAULT_MATCH_ROUTE?.path ?? '')
  const [selectedChartType, setSelectedChartType] = useState(CHART_TYPES[0].id)

  const selectedMatch =
    MATCH_ROUTES.find((matchRoute) => matchRoute.path === selectedMatchPath) ?? DEFAULT_MATCH_ROUTE
    
  const chartSummaryData = selectedMatch.data.reduce((summary, event) => {
    const eventType = event?.type?.name ?? 'Okänd'
    summary[eventType] = (summary[eventType] || 0) + 1
    return summary
  }, {})

  const chartSummaryDataArray = Object.entries(chartSummaryData).map(([category, value]) => ({
    category,
    value,
  }))

  return {
    selectedMatchPath,
    setSelectedMatchPath,
    selectedChartType,
    setSelectedChartType,
    selectedMatch,
    chartSummaryDataArray,
  }
}