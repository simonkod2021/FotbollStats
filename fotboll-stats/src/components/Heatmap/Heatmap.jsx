import { useState } from 'react'
import { Stage, Layer, Rect, Circle, Line, Shape } from 'react-konva'

// ── Pitch canvas dimensions (StatsBomb pitch = 120 × 80 units) ───────────────
const STATSBOMB_PITCH_WIDTH = 120
const STATSBOMB_PITCH_HEIGHT = 80
const PITCH_CANVAS_WIDTH = 780
const PITCH_CANVAS_HEIGHT = Math.round((PITCH_CANVAS_WIDTH * STATSBOMB_PITCH_HEIGHT) / STATSBOMB_PITCH_WIDTH)
const PIXELS_PER_X_UNIT = PITCH_CANVAS_WIDTH / STATSBOMB_PITCH_WIDTH
const PIXELS_PER_Y_UNIT = PITCH_CANVAS_HEIGHT / STATSBOMB_PITCH_HEIGHT

// ── Density grid for coloring circles (each cell = 4 × 4 StatsBomb units) ────
const DENSITY_GRID_COLUMNS = 30
const DENSITY_GRID_ROWS = 20

// ── Color scale: density 0→1 maps blue→cyan→green→yellow→red ─────────────────
function getHeatColor(intensity) {
	if (intensity <= 0) return null
	let red
	let green
	let blue

	if (intensity < 0.25) {
		const segmentProgress = intensity / 0.25
		red = 0
		green = Math.round(segmentProgress * 255)
		blue = 255
	} else if (intensity < 0.5) {
		const segmentProgress = (intensity - 0.25) / 0.25
		red = 0
		green = 255
		blue = Math.round((1 - segmentProgress) * 255)
	} else if (intensity < 0.75) {
		const segmentProgress = (intensity - 0.5) / 0.25
		red = Math.round(segmentProgress * 255)
		green = 255
		blue = 0
	} else {
		const segmentProgress = (intensity - 0.75) / 0.25
		red = 255
		green = Math.round((1 - segmentProgress) * 255)
		blue = 0
	}

	const opacity = 0.25 + intensity * 0.55
	return `rgba(${red},${green},${blue},${opacity})`
}

function getGridCell(location) {
	const [x, y] = location
	const column = Math.max(
		0,
		Math.min(Math.floor((x / STATSBOMB_PITCH_WIDTH) * DENSITY_GRID_COLUMNS), DENSITY_GRID_COLUMNS - 1)
	)
	const row = Math.max(
		0,
		Math.min(Math.floor((y / STATSBOMB_PITCH_HEIGHT) * DENSITY_GRID_ROWS), DENSITY_GRID_ROWS - 1)
	)

	return { column, row, index: row * DENSITY_GRID_COLUMNS + column }
}

// ── Pitch markings ────────────────────────────────────────────────────────────
function PitchMarkings() {
	const lineColor = 'rgba(255,255,255,0.85)'
	const lineWidth = 1
	const scaleX = (x) => x * PIXELS_PER_X_UNIT
	const scaleY = (y) => y * PIXELS_PER_Y_UNIT

	return (
		<>
			<Line points={[scaleX(60), 0, scaleX(60), PITCH_CANVAS_HEIGHT]} stroke={lineColor} strokeWidth={lineWidth} listening={false} />
			<Circle x={scaleX(60)} y={scaleY(40)} radius={10 * PIXELS_PER_X_UNIT} stroke={lineColor} strokeWidth={lineWidth} listening={false} />
			<Circle x={scaleX(60)} y={scaleY(40)} radius={3} fill={lineColor} listening={false} />

			<Rect x={0}             y={scaleY(18)} width={scaleX(18)} height={scaleY(62) - scaleY(18)} stroke={lineColor} strokeWidth={lineWidth} fill="transparent" listening={false} />
			<Rect x={scaleX(102)}   y={scaleY(18)} width={scaleX(18)} height={scaleY(62) - scaleY(18)} stroke={lineColor} strokeWidth={lineWidth} fill="transparent" listening={false} />

			<Rect x={0}             y={scaleY(30)} width={scaleX(6)}  height={scaleY(50) - scaleY(30)} stroke={lineColor} strokeWidth={lineWidth} fill="transparent" listening={false} />
			<Rect x={scaleX(114)}   y={scaleY(30)} width={scaleX(6)}  height={scaleY(50) - scaleY(30)} stroke={lineColor} strokeWidth={lineWidth} fill="transparent" listening={false} />

			<Circle x={scaleX(12)}  y={scaleY(40)} radius={3} fill={lineColor} listening={false} />
			<Circle x={scaleX(108)} y={scaleY(40)} radius={3} fill={lineColor} listening={false} />

			<Rect x={-scaleX(2)}                y={scaleY(36)} width={scaleX(2)} height={scaleY(44) - scaleY(36)} stroke={lineColor} strokeWidth={lineWidth} fill="transparent" listening={false} />
			<Rect x={scaleX(STATSBOMB_PITCH_WIDTH)} y={scaleY(36)} width={scaleX(2)} height={scaleY(44) - scaleY(36)} stroke={lineColor} strokeWidth={lineWidth} fill="transparent" listening={false} />
		</>
	)
}

// Main component, takes data prop (array of events) and optional title prop
export default function Heatmap({ data = [], title = 'Heatmap' }) {
	const [selectedEventTypeId, setSelectedEventTypeId] = useState(null)
	const [selectedTeamId, setSelectedTeamId] = useState(null)

	const eventsWithLocation = data.filter((event) => Array.isArray(event.location))

	const availableEventTypes = [
		{ id: null, name: 'Alla händelser' },
		...Array.from(
			new Map(eventsWithLocation.map((event) => [event.type.id, event.type])).values()
		).sort((a, b) => a.name.localeCompare(b.name)),
	]

	const availableTeams = [
		{ id: null, name: 'Båda lagen' },
		...Array.from(
			new Map(eventsWithLocation.map((event) => [event.team.id, event.team])).values()
		).sort((a, b) => a.name.localeCompare(b.name)),
	]

	const filteredEvents = eventsWithLocation.filter(
		(event) =>
			(selectedEventTypeId === null || event.type.id === selectedEventTypeId) &&
			(selectedTeamId === null || event.team.id === selectedTeamId)
	)

	// Build density grid to determine circle color per area
	const { densityCounts, maxDensityCount } = (() => {
		const countsByCell = new Array(DENSITY_GRID_COLUMNS * DENSITY_GRID_ROWS).fill(0)

		for (const event of filteredEvents) {
			const { index } = getGridCell(event.location)
			countsByCell[index]++
		}

		return {
			densityCounts: countsByCell,
			maxDensityCount: Math.max(1, ...countsByCell),
		}
	})()

	// Pre-compute circle data: { cx, cy, color } for each event
	const heatmapDots = filteredEvents.map((event) => {
		const [x, y] = event.location
		const { index } = getGridCell(event.location)
		const densityIntensity = densityCounts[index] / maxDensityCount

		return {
			canvasX: x * PIXELS_PER_X_UNIT,
			canvasY: y * PIXELS_PER_Y_UNIT,
			color: getHeatColor(densityIntensity),
		}
	})

	return (
		<main className="flex flex-1 flex-col items-center gap-6 pt-8">

			{/* Filter controls */}
			<div className="flex flex-wrap gap-10">
				<label className="flex flex-col gap-1 text-sm text-gray-400">
					Lag
					<select
						className="cursor-pointer rounded bg-gray-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
						value={selectedTeamId ?? ''}
						onChange={(event) =>
							setSelectedTeamId(event.target.value === '' ? null : Number(event.target.value))
						}
					>
						{availableTeams.map((team) => (
							<option key={String(team.id)} value={team.id ?? ''}>{team.name}</option>
						))}
					</select>
				</label>

				<label className="flex flex-col gap-1 text-sm text-gray-400">
					Händelse
					<select
						className="cursor-pointer rounded bg-gray-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
						value={selectedEventTypeId ?? ''}
						onChange={(event) =>
							setSelectedEventTypeId(event.target.value === '' ? null : Number(event.target.value))
						}
					>
						{availableEventTypes.map((eventType) => (
							<option key={String(eventType.id)} value={eventType.id ?? ''}>{eventType.name}</option>
						))}
					</select>
				</label>
			</div>

			<p className="text-sm text-gray-500">{filteredEvents.length.toLocaleString()} events</p>

			{/* Pitch + dot canvas */}
			<div className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
				<Stage width={PITCH_CANVAS_WIDTH} height={PITCH_CANVAS_HEIGHT}>
					<Layer>
						{/* Grass */}
						<Rect x={0} y={0} width={PITCH_CANVAS_WIDTH} height={PITCH_CANVAS_HEIGHT} fill="#2d6a4f" />

						{/* Event dots – all drawn in one sceneFunc pass for performance */}
						<Shape
							listening={false}
							sceneFunc={(canvasContext) => {
								for (const { canvasX, canvasY, color } of heatmapDots) {
									if (!color) continue
									canvasContext.beginPath()
									canvasContext.arc(canvasX, canvasY, 3.5, 0, Math.PI * 2)
									canvasContext.fillStyle = color
									canvasContext.fill()
								}
							}}
						/>

						{/* Pitch outline */}
						<Rect
							x={0} y={0} width={PITCH_CANVAS_WIDTH} height={PITCH_CANVAS_HEIGHT}
							stroke="rgba(255,255,255,0.85)" strokeWidth={1.5} listening={false}
						/>

						<PitchMarkings />
					</Layer>
				</Stage>
			</div>

			{/* Color legend */}
			<div className="flex items-center gap-3 text-xs text-gray-400">
				<span>Färre events</span>
				<div
					className="h-3 w-48 rounded-full"
					style={{
						background:
							'linear-gradient(to right, rgba(0,100,255,0.4), rgba(0,255,255,0.6), rgba(0,255,0,0.7), rgba(255,255,0,0.8), rgba(255,0,0,0.9))',
					}}
				/>
				<span>Fler events</span>
                
			</div>
            <h3 className="font-bold tracking-wide text-white p-10">
				{title}
			</h3>
		</main>
	)
}