import { useChartData } from '../hooks/useChartData.jsx'
import BarChart from '../components/Charts/BarChart.jsx'
import RadarChart from '../components/Charts/RadarChart.jsx'
import PieChart from '../components/Charts/PieChart.jsx'
import { CHART_TYPES } from '../routes/chartRoutes.jsx'
import { MATCH_ROUTES } from '../routes/matchRoutes.jsx'

export const ChartPage = () => {
  // 1️⃣ Hämtar state och beräknad data från hooken
  const {
    selectedMatchPath,      // vilket matchPath är valt
    setSelectedMatchPath,   // uppdaterar valt matchPath
    selectedChartType,      // vilket diagram är valt ("bar" | "radar" | "pie")
    setSelectedChartType,   // uppdaterar valt diagram
    selectedMatch,          // hela match-objektet (label, data, path)
    chartSummaryDataArray,  // [{category, value}] — aggregerad från selectedMatch.data
  } = useChartData()

  // 2️⃣ Mappar diagramtyp → komponent med rätt data
  //    chartSummaryDataArray används av radar + pie (aggregerad)
  //    selectedMatch.data används av bar (rådata per event)
  const chartByType = {
    radar: <RadarChart data={chartSummaryDataArray} title={`Radar Diagram · ${selectedMatch.label}`} />,
    pie:   <PieChart   data={chartSummaryDataArray} title={`Cirkeldiagram · ${selectedMatch.label}`} />,
    bar:   <BarChart   data={selectedMatch?.data ?? []} title={`Stapeldiagram · ${selectedMatch.label}`} />,
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-6 bg-gray-900 px-6 py-8 text-center text-white">
      <h1 className="mt-5 text-3xl font-bold">Charts</h1>
      <p className="text-gray-400">Här kan du se olika diagram baserade på matchdata.</p>

      <div className="flex flex-wrap items-end justify-center gap-6 rounded-xl bg-gray-800 p-6 shadow-2xl ring-1 ring-white/10">

        {/* 3️⃣ Match-väljare → anropar setSelectedMatchPath → hooken räknar om selectedMatch + chartSummaryDataArray */}
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

        {/* 4️⃣ Diagram-väljare → anropar setSelectedChartType → chartByType väljer rätt komponent */}
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

      {/* 5️⃣ Renderar rätt diagram baserat på selectedChartType */}
      <div className="flex w-full flex-1 justify-center">{chartByType[selectedChartType]}</div>
    </div>
  )
}

export default ChartPage