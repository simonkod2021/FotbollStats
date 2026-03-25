import Chart from 'react-apexcharts'

export default function RadarChart({ data = [], title = 'Radardiagram' }) {
    const series = [
        {
            name: 'Antal events',
            data: data.map((item) => item.value),
        },
    ]

    const options = {
        chart: {
            type: 'radar',
            toolbar: { show: true },
        },
        grid: {
          padding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
          }
        },
        xaxis: {
            categories: data.map((item) => item.category),
            labels: { style: { colors: '#ffffff', fontSize: '12px', fontWeight: 'bold' } },
        },
        yaxis: {
            labels: { style: { colors: '#ffffff', fontSize: '12px'} },
        },
        colors: ['#3b82f6'],
        stroke: { width: 2 },
        fill: { opacity: 0.25 },
        markers: { size: 4 },
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 text-center">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <Chart options={options} series={series} type="radar" width={750} height={750} />
        </div>
    )
}