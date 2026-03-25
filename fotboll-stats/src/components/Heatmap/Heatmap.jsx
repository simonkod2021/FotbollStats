import { useHeatmapData } from '../../hooks/useHeatMapData'
import HeatmapCanvas from './HeatmapCanvas'
import HeatmapFilters from './HeatmapFilters'
import HeatmapLegend from './HeatmapLegend'

// Main component, takes data prop (array of events) and optional title prop
export default function Heatmap({ data = [], title = 'Heatmap' }) {
	const {
		selectedEventTypeId,
		setSelectedEventTypeId,
		selectedTeamId,
		setSelectedTeamId,
		availableEventTypes,
		availableTeams,
		filteredEvents,
		heatmapDots,
		PITCH_CANVAS_WIDTH,
		PITCH_CANVAS_HEIGHT,
		PIXELS_PER_X_UNIT,
		PIXELS_PER_Y_UNIT,
		STATSBOMB_PITCH_WIDTH,
	} = useHeatmapData(data)

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

			<p className="text-sm text-gray-500">{filteredEvents.length.toLocaleString()} events</p>

			<HeatmapCanvas
				heatmapDots={heatmapDots}
				pitchCanvasWidth={PITCH_CANVAS_WIDTH}
				pitchCanvasHeight={PITCH_CANVAS_HEIGHT}
				pixelsPerXUnit={PIXELS_PER_X_UNIT}
				pixelsPerYUnit={PIXELS_PER_Y_UNIT}
				statsbombPitchWidth={STATSBOMB_PITCH_WIDTH}
			/>

			<HeatmapLegend />
            <h3 className="font-bold tracking-wide text-white p-10">
				{title}
			</h3>
		</main>
	)
}