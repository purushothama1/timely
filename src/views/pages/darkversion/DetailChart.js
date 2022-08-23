import React from "react";
import { Radar } from "react-chartjs-2";

const DetailChart = ({dataone}) => {
  const data = {
    labels: ["Revenue", "Profitability", "eNPS", "cNPS", "Self Mgmt"],
    datasets: [
      {
        label: "Expected",
        fill: true,
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(179,181,198,1)",
        data: [10, 10, 10, 10, 10],
        borderWidth: 1,
        radius:0
      },
      {
        label: "Achieved",
        fill: true,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(255,99,132,1)",
        data: dataone,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    responsiveAnimationDuration: 500,
    maintainAspectRatio: false,
    legend: false,
    tooltips: {
      callbacks: {
        label: function (tooltipItems, data) {
          return (
            data.datasets[tooltipItems.datasetIndex].label +
            ": " +
            tooltipItems.yLabel
          );
        },
      },
    },
    scale: {
      reverse: false,
      gridLines: {
        color: "#fff",
      },
      angleLines: {
        color: "black",
        width: 6,
        stroke: 5,
      },
      pointLabels: {
        fontSize: 12,
        fontColor: "#CDD2D7",
      },
      ticks: {
        display: false,
        beginAtZero: true,
        stepSize: 1,
        maxTicksLimit: 1,
      },
    },
    title: {
      display: false,
      text: "Distribution in % of world population",
    },
  };

  return <Radar data={data} options={options} height={150} />;
};

export default DetailChart;
