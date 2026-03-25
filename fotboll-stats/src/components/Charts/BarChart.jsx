import { useState } from 'react'
import Chart from 'react-apexcharts'


function getEventChoice(event, groupBy) {
	if (groupBy === 'team') {
		return event.team?.name
	}

	return event.type?.name
}

export default function BarChart({ data = [], title = 'Bar Chart' }) {
	const [choice, setChoice] = useState('');

	const allEvents = data.filter((event) => Array.isArray(event.location))

	const chartData = (() => {
		const grouped = {}

		for (const event of allEvents) {
			const label = getEventChoice(event, choice)
			if (!label) continue

			grouped[label] = (grouped[label] || 0) + 1
		}

		let sorted = Object.entries(grouped).sort((a, b) => b[1] - a[1])

		if (choice === 'eventType') {
			sorted = sorted.slice(0, 15)
		}

		return {
			series: [{ name: 'Events', data: sorted.map((entry) => entry[1]) }],
			categories: sorted.map((entry) => entry[0]),
		}
	})()

	const chartOptions = {
		chart: {
			type: 'bar',
			toolbar: { show: false },
			background: 'transparent',
		},
		colors: ['#3b82f6'],
		plotOptions: {
			bar: {
				borderRadius: 6,
				horizontal: false,
				columnWidth: '50%',
				dataLabels: { position: 'top' },
			},
		},
		dataLabels: {
			enabled: true,
			offsetY: -25,
			style: { colors: ['#a3a3a3'], fontSize: '15px', fontWeight: 600 },
		},
		xaxis: {
			categories: chartData.categories,
			labels: {
				style: { colors: '#a3a3a3', fontSize: '15px' },
			},
			axisBorder: { show: false },
			axisTicks: { show: false },
		},
		yaxis: {
			labels: { style: { colors: '#a3a3a3' } },
		},
		grid: {
			borderColor: '#ffffff1a',
			strokeDashArray: 5,
		},
		tooltip: {
			theme: 'dark',
			style: { backgroundColor: '#1f2937' },
		},
		states: {
			hover: { filter: { type: 'darken', value: 0.1 } },
		},
	}

	return (
		<main className="flex flex-1 flex-col items-center gap-6 bg-gray-900 px-4 py-10">
			<h3 className="text-2xl font-bold tracking-wide text-white">{title}</h3>

			<div className="flex gap-4">
				<label className="flex flex-col gap-1 text-sm text-gray-400">
					Sortera efter
					<select
						className="cursor-pointer rounded bg-gray-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
						value={choice}
						onChange={(e) => setChoice(e.target.value)}
					>
						<option value="eventType">Eventtyp</option>
						<option value="team">Lag</option>
					</select>
				</label>
			</div>

			<p className="text-sm text-gray-500">{allEvents.length.toLocaleString()} totalt antal events</p>

			<div className="w-full rounded-xl bg-gray-800 p-6 shadow-2xl ring-1 ring-white/10">
				<Chart
					type="bar"
					series={chartData.series}
					options={chartOptions}
					height={400}
					width="100%"
				/>
			</div>
		</main>
	)
}
