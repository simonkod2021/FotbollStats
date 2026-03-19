import Chart from 'react-apexcharts'
export default function PieChart ({ data=[], title='Cirkeldiagram' }) {
    const options = {
        chart: { type: 'donut' },
        colors: ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6'],
        dataLabels: {
            enabled: true,
            style: { colors: ['#a3a3a3'], fontSize: '15px', fontWeight: 600 },
        },
        legend: {
            labels: { colors: '#a3a3a3', fontSize: '14px' },
        },
        tooltip: { theme: 'dark' },
        states: {
            hover: { filter: { type: 'darken', value: 0.1 } },
        },
        series: data.map(({ value }) => value),
        labels: data.map(({ category }) => category),
    }

    return (
        <div className="flex flex-col items-center justify-center h-full w-full text-center gap-10">
            <h2 className="text-2xl font-bold mt-8">{title}</h2>
            <Chart options={options} series={data.map(({ value }) => value)} type="donut" width={500} />
        </div>
    )
}