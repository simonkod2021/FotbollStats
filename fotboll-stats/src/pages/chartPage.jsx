import { useChartData } from "../hooks/useChartData.jsx";
import BarChart from "../components/Charts/BarChart.jsx";
import RadarChart from "../components/Charts/RadarChart.jsx";
import PieChart from "../components/Charts/PieChart.jsx";
import { CHART_TYPES } from "../routes/chartRoutes.jsx";
import { MatchRoutes } from "../routes/matchRoutes.jsx";
import { MoonLoader } from "react-spinners";

export const ChartPage = () => {
  const {
    selectedMatchPath,
    setSelectedMatchPath,
    selectedChartType,
    setSelectedChartType,
    selectedMatch,
    chartSummaryDataArray,
    loading,
  } = useChartData();

  const chartByType = {
    radar: (
      <RadarChart
        data={chartSummaryDataArray}
        title={`Radar Diagram · ${selectedMatch.label}`}
      />
    ),
    pie: (
      <PieChart
        data={chartSummaryDataArray}
        title={`Cirkeldiagram · ${selectedMatch.label}`}
      />
    ),
    bar: (
      <BarChart
        data={chartSummaryDataArray}
        title={`Stapeldiagram · ${selectedMatch.label}`}
      />
    ),
  };

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center gap-6 bg-gray-900  py-8 text-center text-white">
      <h1 className="mt-5 text-3xl font-bold">Diagram</h1>
      <p className="text-foreground max-w-2xl text-sm">
        Här kan du se olika diagram baserade på matchdata.
      </p>

      <div className="flex flex-wrap items-end justify-center gap-6 rounded-xl bg-gray-800 p-6 shadow-2xl ring-1 ring-white/10">
        <label className="flex flex-col gap-2 text-left text-sm text-gray-300">
          Välj match
          <select
            id="match-select"
            className="rounded bg-gray-700 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedMatchPath}
            onChange={(event) => setSelectedMatchPath(event.target.value)}
          >
            {MatchRoutes.map((matchRoute) => (
              <option key={matchRoute.id} value={matchRoute.path}>
                {matchRoute.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-left text-sm text-gray-300">
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
      <div className="flex w-full flex-1 justify-center">
        {loading ? (
          <div className="flex items-center justify-center">
            <MoonLoader size={60} />
          </div>
        ) : (
          chartByType[selectedChartType]
        )}
      </div>
    </main>
  );
};

export default ChartPage;
