import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = () => {
  const barChartRef = useRef(null);

  useEffect(() => {
    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext("2d");

      if (barChartRef.current.chart) {
        barChartRef.current.chart.destroy();
      }

      barChartRef.current.chart = new Chart(ctx, getBarChartConfig());
    }
  }, []);

  const getBarChartConfig = () => {
    const data = {
      labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "Label 6", "Label 7", "Label 8", "Label 9"],
      datasets: [
        {
          label: "Bar Chart Data",
          data: [10, 20, 30, 40, 10, 30, 20, 15, 25],
          backgroundColor: ["white", "white", "white", "white", "white"],
          borderWidth: 1,
          barPercentage: 0.6, // Adjust to control bar width
          categoryPercentage: 1.0, // Adjust to control space between bars
        },
      ],
    };

    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return {
      type: "bar",
      data,
      options,
    };
  };
  

  return (
    <div className="chart">
      <canvas
        ref={barChartRef}
        className="chart-canvas"
        // width="700"
        // height="400"
      ></canvas>
    </div>
  );
};

export default BarChart;
