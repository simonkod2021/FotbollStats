import Chart from "react-apexcharts";
import "./charts.css";

export default function BarChart({ data = [], title = "Stapeldiagram" }) {
  const series = [
    {
      name: "Antal events",
      data: data.map((item) => item.value),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      background: "transparent",
      toolbar: { show: false },
    },
    xaxis: {
      categories: data.map((item) => item.category),
      labels: { style: { colors: "#a3a3a3", fontSize: "15px" } },
    },
    yaxis: {
      labels: { style: { colors: "#a3a3a3", fontSize: "15px" } },
    },
    colors: ["#3b82f6"],
    plotOptions: {
      bar: { borderRadius: 4 },
    },
    dataLabels: { enabled: false },
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 text-center">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <Chart
        options={options}
        series={series}
        type="bar"
        width={1250}
        height={500}
      />
    </div>
  );
}
