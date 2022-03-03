import React, { memo, useState, useEffect } from "react";
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
import { ChartToolTip } from "..";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function ChartLine({
  chart,
  indexShow,
  setIndexShow,
  songs,
  totalScore,
  position,
  setPosition,
  setPointPosition,
  setChange,
  setLeft,
  setTop,
}) {
  const [didMount, setDidMount] = useState(false);
  useEffect(() => {
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
  }, []);

  if (!didMount) return null;
  const { items, times } = chart;
  const newLabels = [];
  const chartAreaBorder = {
    id: "chartAreaBorder",
    beforeDraw(chart) {
      const newArr = [...chart._metasets];
      let listPoint = [];
      newArr.forEach((item, index) => {
        if (index === 0) {
          const { x, y } = item.data[1];
          listPoint.push({ x, y });
        } else if (index === 1) {
          const { x, y } = item.data[10];
          listPoint.push({ x, y });
        } else {
          const { x, y } = item.data[20];
          listPoint.push({ x, y });
        }
      });
      setPointPosition(JSON.stringify(listPoint));
      const { left, bottom, top } = chart.chartArea;
      setLeft(left);
      setTop(top);
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const ctx = chart.ctx;
        ctx.save();
        setChange(false);
        let color = "";
        const {
          datasetIndex,
          element: { x, y },
          index,
        } = chart.tooltip._active[0];

        setPosition((prev) => {
          return { ...prev, xTop: y + top, xLeft: x + left, indexPoint: index };
        });

        if (datasetIndex === 0) {
          color = "#4a90e2";
        } else if (datasetIndex === 1) {
          color = "#50e3c2";
        } else {
          color = "#e35050";
        }

        setIndexShow(datasetIndex);
        ctx.beginPath();
        ctx.moveTo(x, top);
        ctx.lineTo(x, bottom);
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.restore();
      } else {
        setChange(true);
      }
    },
  };

  times.forEach((time) => {
    newLabels.push(`${time.hour}:00`);
  });

  const result = Object.keys(items).map((item, index) => {
    let data = {};
    items[item].forEach((value, index) => {
      const { hour, counter } = value;
      const textHour = `${hour}:00`;
      data[textHour] = counter;
    });
    let color = "";
    let sizePoint = 0;
    if (index === 0) {
      color = "#4a90e2";
    } else if (index === 1) {
      color = "#50e3c2";
    } else if (index === 2) {
      color = "#e35050";
    }
    if (index === indexShow) {
      sizePoint = 5;
    }

    return {
      data,
      fill: false,
      backgroundColor: "#fff",
      borderColor: color,
      cubicInterpolationMode: "monotone",
      tension: 0,
      radius: sizePoint,
      borderWidth: 2,
      elements: {
        point: {
          duration: 1000,
          hoverBackgroundColor: color,
          hoverRadius: 7,
          hoverBorderColor: "#fff",
          hoverBorderWidth: 5,
          hitRadius: 20,
        },
      },
    };
  });

  const data = {
    labels: newLabels,
    datasets: [...result],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          align: "center",
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
    <div
      className={styles.container}
      onClick={() => {
        setChange(false);
      }}
    >
      <Line data={data} options={options} plugins={[chartAreaBorder]} />
      <ChartToolTip
        songs={songs}
        indexShow={indexShow}
        position={position}
        totalScore={totalScore}
        position={position}
      />
    </div>
  );
}
const areEqual = (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};

export default memo(ChartLine, areEqual);
