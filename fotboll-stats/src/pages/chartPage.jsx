import { useState } from 'react'
import BarChart from '../components/Charts/BarChart.jsx'
import RadarChart from '../components/Charts/RadarChart.jsx'
import PieChart from '../components/Charts/PieChart.jsx'
import { getTopEventTypeData } from '../components/Charts/chartDataUtils.js'
import { MATCH_ROUTES } from '../components/Routes/matchRoutes.jsx'

const CHART_TYPES = [
  { id: 'bar', label: 'Stapeldiagram' },
  { id: 'radar', label: 'Radar Diagram' },
  { id: 'pie', label: 'Cirkeldiagram' },
]

export const ChartPage = () => {
  const [selectedMatchPath, setSelectedMatchPath] = useState(MATCH_ROUTES[0]?.path ?? '')
  const [selectedChartType, setSelectedChartType] = useState(CHART_TYPES[0].id)

  const selectedMatch =
    MATCH_ROUTES.find((matchRoute) => matchRoute.path === selectedMatchPath) ?? MATCH_ROUTES[0]

  const chartSummaryData = getTopEventTypeData(selectedMatch?.data ?? [])

  const chartTitleByType = {
    bar: `Stapeldiagram · ${selectedMatch.label}`,
    radar: `Radar Diagram · ${selectedMatch.label}`,
    pie: `Cirkeldiagram · ${selectedMatch.label}`,
  }

  const selectedChart = (() => {
    if (selectedChartType === 'radar') {
      return <RadarChart data={chartSummaryData} title={chartTitleByType.radar} />
    }

    if (selectedChartType === 'pie') {
      return <PieChart data={chartSummaryData} title={chartTitleByType.pie} />
    }

    return <BarChart data={selectedMatch?.data ?? []} title={chartTitleByType.bar} />
  })()

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-6 bg-gray-900 px-6 py-8 text-center text-white">
      <h1 className="mt-5 text-3xl font-bold">Charts</h1>
      <p className="text-gray-400">Här kan du se olika diagram baserade på matchdata.</p>

      <div className="flex flex-wrap items-end justify-center gap-6 rounded-xl bg-gray-800 p-6 shadow-2xl ring-1 ring-white/10">
        <label htmlFor="match-select" className="flex flex-col gap-2 text-left text-sm text-gray-300">
          Välj match
          <select
            id="match-select"
            className="rounded bg-gray-700 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedMatchPath}
            onChange={(event) => setSelectedMatchPath(event.target.value)}
          >
            {MATCH_ROUTES.map((matchRoute) => (
              <option key={matchRoute.id} value={matchRoute.path}>
                {matchRoute.label}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="chart-type-select" className="flex flex-col gap-2 text-left text-sm text-gray-300">
          Välj diagram
          <select
            id="chart-type-select"
            className="rounded bg-gray-700 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedChartType}
            onChange={(event) => setSelectedChartType(event.target.value)}
          >
            {CHART_TYPES.map((chartType) => (
              <option key={chartType.id} value={chartType.id}>
                {chartType.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex w-full flex-1 justify-center">{selectedChart}</div>
    </div>
  )
}

export default ChartPage