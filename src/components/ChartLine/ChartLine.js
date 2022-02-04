import React, { useEffect } from "react";
import styles from "./ChartLine.module.scss";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartLine({ chart, idState }) {
  const { items, times } = chart;
  console.log(items);
  const newLabels = [];
  const newDataSets = [];
  console.log(newDataSets);

  times.forEach((time, index) => {
    newLabels.push(`${time.hour}:00`);
  });

  console.log(Object.keys(items));

  const result = Object.keys(items).map((item, index) => {
    let data = {};
    items[item].forEach((value, index) => {
      const { hour, counter } = value;
      const textHour = `${hour}:00`;
      data[textHour] = counter;
    });
    let color = "";
    if (index === 0) {
      color = "#4a90e2";
    } else if (index === 1) {
      color = "#50e3c2";
    } else if (index === 2) {
      color = "#e35050";
    }
    return {
      label: "Price in USD",
      data,
      fill: false,
      backgroundColor: "#fff",
      borderColor: color,
      cubicInterpolationMode: "monotone",
      tension: 0.4,
      radius: 5,
      borderWidth: 2,
    };
  });
  console.log(result);

  //   items.map((item) => {
  //     console.log(item);
  //   });

  //   items.forEach((item, index) => {
  //     console.log(item);
  //   });

  const data = {
    labels: newLabels,
    datasets: [...result],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
    elements: {
      point: {
        hoverRadius: 8,
        hoverBackgroundColor: "#e35050",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          align: "start",
          callback: function (value, index) {
            return index % 2 === 0 ? this.getLabelForValue(value) : null;
          },
        },
      },
      y: {
        grid: {
          display: true,
          borderDash: [3, 5],
          drawTicks: false,
          drawBorder: false,
          lineWidth: 0.5,
          color: "hsla(0, 0%, 100%, 0.5)",
        },
        ticks: {
          display: false,
        },
      },
    },
  };
  return (
    <div className="">
      <Line data={data} options={options} />
    </div>
  );
}

export default ChartLine;
