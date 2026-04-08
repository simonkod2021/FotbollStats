import { useHeatmapData } from "../../hooks/useHeatMapData";
import HeatmapCanvas from "./HeatmapCanvas";
import HeatmapFilters from "./HeatmapFilters";
import HeatmapLegend from "./HeatmapLegend";

export default function Heatmap({ data = [], title = "Heatmap" }) {
  const {
    selectedEventTypeId,
    setSelectedEventTypeId,
    selectedTeamId,
    setSelectedTeamId,
    availableEventTypes,
    availableTeams,
    filteredEvents,
    heatmapDots,
    pitchWidth,
    pitchHeight,
    pixelsPerXUnit,
    pixelsPerYUnit,
    statsbombPitchWidth,
  } = useHeatmapData(data);

  return (
    <main className="flex flex-1 flex-col items-center gap-6 pt-8">
      <HeatmapFilters
        selectedTeamId={selectedTeamId}
        setSelectedTeamId={setSelectedTeamId}
        availableTeams={availableTeams}
        selectedEventTypeId={selectedEventTypeId}
        setSelectedEventTypeId={setSelectedEventTypeId}
        availableEventTypes={availableEventTypes}
      />

      <p className="text-sm text-gray-500">
        {filteredEvents.length.toLocaleString()} events
      </p>

      <HeatmapCanvas
        heatmapDots={heatmapDots}
        pitchCanvasWidth={pitchWidth}
        pitchCanvasHeight={pitchHeight}
        pixelsPerXUnit={pixelsPerXUnit}
        pixelsPerYUnit={pixelsPerYUnit}
        statsbombPitchWidth={statsbombPitchWidth}
      />

      <HeatmapLegend />
      <h3 className="font-bold tracking-wide text-white p-10">{title}</h3>
    </main>
  );
}
