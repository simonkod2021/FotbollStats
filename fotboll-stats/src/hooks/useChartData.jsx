import { useEffect, useState } from "react";
import { MatchRoutes } from "../routes/matchRoutes.jsx";
import { CHART_TYPES } from "../routes/chartRoutes.jsx";

export function useChartData() {
  const [selectedMatchPath, setSelectedMatchPath] = useState(MatchRoutes[0].path);
  const [selectedChartType, setSelectedChartType] = useState(CHART_TYPES[0].id);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedMatch =
    MatchRoutes.find((matchRoute) => matchRoute.path === selectedMatchPath) || null;

  useEffect(() => {
    if (!selectedMatch?.loadData) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    selectedMatch
      .loadData()
      .then((module) => setData(module.default))
      .catch((err) => {
        console.error("Kunde inte ladda matchdata:", err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [selectedMatch]);

  const chartSummaryData = data.reduce((summary, event) => {
    const eventType = event?.type?.name ?? "Okänd";
    summary[eventType] = (summary[eventType] || 0) + 1;
    return summary;
  }, {});

  const chartSummaryDataArray = Object.entries(chartSummaryData).map(
    ([category, value]) => ({
      category,
      value,
    }),
  );

  return {
    selectedMatchPath,
    setSelectedMatchPath,
    selectedChartType,
    setSelectedChartType,
    selectedMatch,
    chartSummaryDataArray,
    loading,
  };
}
