import React from "react";
import Chart from "react-apexcharts";

const colors = {
  color1: {
    shade1: "#FDEAA7",
    shade2: "#FAD965",
    shade3: "#F9CA24",
  },
  color2: {
    shade1: "#99D9B3",
    shade2: "#4CBB79",
    shade3: "#009F40",
  },
  color3: {
    shade1: "#FFD0B5",
    shade2: "#FFAC7C",
    shade3: "#FF8945",
  },
  color4: {
    shade1: "#F9B0B7",
    shade2: "#F37580",
    shade3: "#F04D5C",
  },
};

const seriesColor = {
  0: "color1",
  1: "color2",
  2: "color3",
  3: "color4",
  4: "color2",
  5: "color3",
};

const findColor = (value, color) => {
  if (value <= 2) return colors[color].shade1;
  if (value <= 3) return colors[color].shade2;
  return colors[color].shade3;
};

const getColor = (value, dataPointIndex, key) => {
  if (key === "Recommend") return findColor(value, seriesColor[dataPointIndex]);
  else if (key === "Culture")
    return findColor(value, seriesColor[dataPointIndex]);
  else if (key === "Work - Life balance")
    return findColor(value, seriesColor[dataPointIndex]);
  else if (key === "Work v/s professional goals")
    return findColor(value, seriesColor[dataPointIndex]);
  else if (key === "Pay") return findColor(value, seriesColor[dataPointIndex]);
  else return findColor(value, seriesColor[dataPointIndex]);
};

const EnpsChart = () => {
  const series = [
    { name: "Series1", data: [2, 1, 2, 4, 3, 3] },
    { name: "Series2", data: [3, 4, 2, 2, 2, 1] },
    { name: "Series3", data: [4, 3, 4, 3, 5, 2] },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 0,
        dataLabels: {
          position: "center",
        },
      },
    },
    yaxis: {
      show: true,
      showAlways: true,
      showForNullSeries: true,
      tickAmount: 10,
      min: 0,
      max: 10,
      axisBorder: {
        show: true,
        color: "#78909C",
        offsetX: 0,
        offsetY: 0,
      },
      labels: {
        style: {
          cssClass: "apexcharts-yaxis-label-text",
        },
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: [
        "Recommend",
        "Culture",
        "Work - Life balance",
        "Work v/s professional goals",
        "Pay",
        "Employee benefits",
      ],
      axisBorder: {
        show: true,
        color: "#78909C",
        offsetX: 0,
        offsetY: 0,
      },
      labels: {
        show: true,
        // rotate: 0,
        // hideOverlappingLabels: false,
        style: {
          cssClass: "apexcharts-xaxis-label-text",
        },
      },
    },
    legend: {
      show: false,
      position: "bottom",
    },
    fill: {
      opacity: 1,
    },
    colors: [
      ({ value, dataPointIndex }) =>
        getColor(value, dataPointIndex, "Recommend"),
      ({ value, dataPointIndex }) => getColor(value, dataPointIndex, "Culture"),
      ({ value, dataPointIndex }) =>
        getColor(value, dataPointIndex, "Work - Life balance"),
      ({ value, dataPointIndex }) =>
        getColor(value, dataPointIndex, "Work v/s professional goals"),
      ({ value, dataPointIndex }) => getColor(value, dataPointIndex, "Pay"),
      ({ value, dataPointIndex }) =>
        getColor(value, dataPointIndex, "Employee benefits"),
    ],
  };

  return (
    <div className="enps-chart-container">
      <Chart
        height={450}
        width={"100%"}
        type="bar"
        options={options}
        series={series}
      />
    </div>
  );
};

export default EnpsChart;
