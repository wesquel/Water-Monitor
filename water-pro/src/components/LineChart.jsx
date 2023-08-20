import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  tension: 0.3,
  scales: {
    y: {
      grid: {
        color: "#33312E",
      },
    },
    x: {
      grid: {
        color: "#33312E",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
};

function LineChart({ name, values, label }) {
  const labels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
  var data = {
    labels,
    datasets: [
      {
        data: [12, 25, 32, 12, 2, 5, 7],
        fill: "start",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(0,166,251,1)");
          gradient.addColorStop(1, "rgba(0,166,251,0)");
          return gradient;
        },
        borderColor: "rgb(0,166,251)",
      },
    ],
  };

  return (
    <div className="bg-secondBlack lg:p-9 px-6 py-8 rounded-xl w-full  flex flex-col justify-center gap-6">
      <h1 className="text-mainWhite">{name}</h1>
      <Line options={options} data={data} />
    </div>
  );
}

export default LineChart;
