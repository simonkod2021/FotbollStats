import Chart from 'react-apexcharts'

export default function RadarChart({ data=[], title = 'Radar Chart' }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full  text-center">
      <h2 className="text-2xl font-bold mt-6">{title}</h2>
      <Chart
        options={{
          chart: {
            type: 'radar',
            background: 'transparent',
          },
          colors: ['#3b82f6'],
          plotOptions: {
            radar: {
              polygons: {
                strokeColors: '#ffffff1a',
                fill: { colors: ['#ffffff0d', '#ffffff1a'] },
              },
            },
          },
          dataLabels: {
            enabled: true,
            style: { colors: ['#a3a3a3'], fontSize: '8px', fontWeight: 600 },
          },
          xaxis: {
            categories: data.map(({ category }) => category),
            labels: {
              style: { colors: '#a3a3a3', fontSize: '15px' },
            },
          },
          yaxis: {
            stepSize: 100,
            labels: { style: { colors: '#a3a3a3' } },
          },
          tooltip: {
            theme: 'dark',
          },
          states: {
            hover: { filter: { type: 'darken', value: 0.1 } },
          },
        }}
        series={[{ name: 'Value', data: data.map(({ value }) => value) }]}
        type="radar"
        height={750}
        width={750}
      />
    </div>
  )
}