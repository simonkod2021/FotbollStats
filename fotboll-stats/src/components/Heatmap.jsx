import { useState, useMemo } from 'react'
import { Stage, Layer, Rect, Circle, Line, Shape } from 'react-konva'

// ── Pitch canvas dimensions (StatsBomb pitch = 120 × 80 units) ───────────────
const PITCH_W = 780
const PITCH_H = Math.round((PITCH_W * 80) / 120) // 520
const SX = PITCH_W / 120
const SY = PITCH_H / 80

// ── Density grid for coloring circles (each cell = 4 × 4 StatsBomb units) ────
const GRID_COLS = 30
const GRID_ROWS = 20

// ── Color scale: density 0→1 maps blue→cyan→green→yellow→red ─────────────────
function heatColor(t) {
	if (t <= 0) return null
	let r, g, b
	if (t < 0.25) {
		const s = t / 0.25
		r = 0; g = Math.round(s * 255); b = 255
	} else if (t < 0.5) {
		const s = (t - 0.25) / 0.25
		r = 0; g = 255; b = Math.round((1 - s) * 255)
	} else if (t < 0.75) {
		const s = (t - 0.5) / 0.25
		r = Math.round(s * 255); g = 255; b = 0
	} else {
		const s = (t - 0.75) / 0.25
		r = 255; g = Math.round((1 - s) * 255); b = 0
	}
	const alpha = 0.25 + t * 0.55
	return `rgba(${r},${g},${b},${alpha})`
}

// ── Pitch markings ────────────────────────────────────────────────────────────
function PitchMarkings() {
	const stroke = 'rgba(255,255,255,0.85)'
	const sw = 1
	const px = (x) => x * SX
	const py = (y) => y * SY

	return (
		<>
			<Line points={[px(60), 0, px(60), PITCH_H]} stroke={stroke} strokeWidth={sw} listening={false} />
			<Circle x={px(60)} y={py(40)} radius={10 * SX} stroke={stroke} strokeWidth={sw} listening={false} />
			<Circle x={px(60)} y={py(40)} radius={3} fill={stroke} listening={false} />

			<Rect x={0}       y={py(18)} width={px(18)} height={py(62) - py(18)} stroke={stroke} strokeWidth={sw} fill="transparent" listening={false} />
			<Rect x={px(102)} y={py(18)} width={px(18)} height={py(62) - py(18)} stroke={stroke} strokeWidth={sw} fill="transparent" listening={false} />

			<Rect x={0}       y={py(30)} width={px(6)}  height={py(50) - py(30)} stroke={stroke} strokeWidth={sw} fill="transparent" listening={false} />
			<Rect x={px(114)} y={py(30)} width={px(6)}  height={py(50) - py(30)} stroke={stroke} strokeWidth={sw} fill="transparent" listening={false} />

			<Circle x={px(12)}  y={py(40)} radius={3} fill={stroke} listening={false} />
			<Circle x={px(108)} y={py(40)} radius={3} fill={stroke} listening={false} />

			<Rect x={-px(2)}  y={py(36)} width={px(2)} height={py(44) - py(36)} stroke={stroke} strokeWidth={sw} fill="transparent" listening={false} />
			<Rect x={px(120)} y={py(36)} width={px(2)} height={py(44) - py(36)} stroke={stroke} strokeWidth={sw} fill="transparent" listening={false} />
		</>
	)
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Heatmap({ data = [], title = 'Heatmap' }) {
	const [typeId, setTypeId] = useState(null)
	const [teamId, setTeamId] = useState(null)

	const allEvents = useMemo(
		() => data.filter((e) => Array.isArray(e.location)),
		[data]
	)

	const eventTypes = useMemo(() => [
		{ id: null, name: 'All events' },
		...Array.from(
			new Map(allEvents.map((e) => [e.type.id, e.type])).values()
		).sort((a, b) => a.name.localeCompare(b.name)),
	], [allEvents])

	const teams = useMemo(() => [
		{ id: null, name: 'Both teams' },
		...Array.from(
			new Map(allEvents.map((e) => [e.team.id, e.team])).values()
		).sort((a, b) => a.name.localeCompare(b.name)),
	], [allEvents])

	const filtered = useMemo(
		() =>
			allEvents.filter(
				(e) =>
					(typeId === null || e.type.id === typeId) &&
					(teamId === null || e.team.id === teamId)
			),
		[typeId, teamId, allEvents]
	)

	// Build density grid to determine circle color per area
	const { densityGrid, maxCount } = useMemo(() => {
		const grid = new Array(GRID_COLS * GRID_ROWS).fill(0)
		for (const e of filtered) {
			const [x, y] = e.location
			const col = Math.max(0, Math.min(Math.floor((x / 120) * GRID_COLS), GRID_COLS - 1))
			const row = Math.max(0, Math.min(Math.floor((y / 80)  * GRID_ROWS), GRID_ROWS - 1))
			grid[row * GRID_COLS + col]++
		}
		return { densityGrid: grid, maxCount: Math.max(1, ...grid) }
	}, [filtered])

	// Pre-compute circle data: { cx, cy, color } for each event
	const dots = useMemo(() => {
		return filtered.map((e) => {
			const [x, y] = e.location
			const col = Math.max(0, Math.min(Math.floor((x / 120) * GRID_COLS), GRID_COLS - 1))
			const row = Math.max(0, Math.min(Math.floor((y / 80)  * GRID_ROWS), GRID_ROWS - 1))
			const density = densityGrid[row * GRID_COLS + col] / maxCount
			return {
				cx: x * SX,
				cy: y * SY,
				color: heatColor(density),
			}
		})
	}, [filtered, densityGrid, maxCount])

	return (
		<main className="flex flex-1 flex-col items-center gap-6 bg-gray-900 pt-8">

			{/* Filter controls */}
			<div className="flex flex-wrap gap-10">
				<label className="flex flex-col gap-1 text-sm text-gray-400">
					Team
					<select
						className="cursor-pointer rounded bg-gray-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
						value={teamId ?? ''}
						onChange={(e) =>
							setTeamId(e.target.value === '' ? null : Number(e.target.value))
						}
					>
						{teams.map((t) => (
							<option key={String(t.id)} value={t.id ?? ''}>{t.name}</option>
						))}
					</select>
				</label>

				<label className="flex flex-col gap-1 text-sm text-gray-400">
					Event type
					<select
						className="cursor-pointer rounded bg-gray-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
						value={typeId ?? ''}
						onChange={(e) =>
							setTypeId(e.target.value === '' ? null : Number(e.target.value))
						}
					>
						{eventTypes.map((t) => (
							<option key={String(t.id)} value={t.id ?? ''}>{t.name}</option>
						))}
					</select>
				</label>
			</div>

			<p className="text-sm text-gray-500">{filtered.length.toLocaleString()} events</p>

			{/* Pitch + dot canvas */}
			<div className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
				<Stage width={PITCH_W} height={PITCH_H}>
					<Layer>
						{/* Grass */}
						<Rect x={0} y={0} width={PITCH_W} height={PITCH_H} fill="#2d6a4f" />

						{/* Event dots – all drawn in one sceneFunc pass for performance */}
						<Shape
							listening={false}
							sceneFunc={(ctx) => {
								for (const { cx, cy, color } of dots) {
									if (!color) continue
									ctx.beginPath()
									ctx.arc(cx, cy, 3.5, 0, Math.PI * 2)
									ctx.fillStyle = color
									ctx.fill()
								}
							}}
						/>

						{/* Pitch outline */}
						<Rect
							x={0} y={0} width={PITCH_W} height={PITCH_H}
							stroke="rgba(255,255,255,0.85)" strokeWidth={1.5} listening={false}
						/>

						<PitchMarkings />
					</Layer>
				</Stage>
			</div>

			{/* Color legend */}
			<div className="flex items-center gap-3 text-xs text-gray-400">
				<span>Low density</span>
				<div
					className="h-3 w-48 rounded-full"
					style={{
						background:
							'linear-gradient(to right, rgba(0,100,255,0.4), rgba(0,255,255,0.6), rgba(0,255,0,0.7), rgba(255,255,0,0.8), rgba(255,0,0,0.9))',
					}}
				/>
				<span>High density</span>
                
			</div>
            <h3 className="font-bold tracking-wide text-white p-10">
				{title}
			</h3>
		</main>
	)
}