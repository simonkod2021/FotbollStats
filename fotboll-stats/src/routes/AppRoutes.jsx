import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { MatchRoutes } from "./matchRoutes.jsx";
import { MoonLoader } from "react-spinners";
import { useMatchData } from "../hooks/useMatchData.jsx";

// Lazy-laddas efter MoonLoader är redo
const Heatmap = lazy(() => import("../components/Heatmap/Heatmap.jsx"));
const ChartPage = lazy(() => import("../pages/chartPage.jsx"));

function RouteFallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <MoonLoader color="#36d7b7" size={100} />
    </div>
  );
}

// Wrapper som laddar data dynamiskt för varje match
function HeatmapRoute({ matchRoute }) {
  const { data, loading, error } = useMatchData(matchRoute);

  if (loading) {
    return <RouteFallback />;
  }

  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-red-400">
        <p>Kunde inte ladda matchdata</p>
      </div>
    );
  }

  return <Heatmap data={data} title={matchRoute.title} />;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {MatchRoutes.map((matchRoute) => (
          <Route
            key={matchRoute.path}
            path={matchRoute.path}
            element={<HeatmapRoute matchRoute={matchRoute} />}
          />
        ))}
        <Route path="/charts" element={<ChartPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
