import React from "react";
import { Container, Row, Col } from "reactstrap";
import Chart from "react-apexcharts";

const Revenue = () => {
  const series = [44, 55, 41, 17, 15];
  const options = {
    chart: {
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: ["#168948", "#F6981D", "#FD6448", "#B8B8B8", "#B8B8B8"],
    legend: {
      fontSize: "16px",
      fontFamily: "Avenir, Arial",
      fontWeight: 500,
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      // height: 300,
      labels: {
        colors: "#0B0C1F",
      },
      markers: {
        width: 18,
        height: 18,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 0,
        customHTML: undefined,
        onClick: undefined,
        offsetX: -5,
        offsetY: 3,
      },
    },
    labels: [
      "Advance- Paid on time",
      "Milestone 1-Paid 10 days later",
      "Milestone 2 - Pending payment",
      "Milestone 3 - Yet to start",
      "Milestone 4 - Yet to start",
    ],
    plotOptions: {
      pie: {
        donut: {
          size: "78%",
          labels: {
            show: true,
            value: {
              show: true,
              fontSize: "16px",
              fontFamily: "Avenir, sans-serif",
              fontWeight: 600,
              color: "#0B0C1F",
              offsetY: 16,
              // formatter: function (val) {
              //   return "1902000";
              // },
            },
            total: {
              show: true,
              showAlways: true,
              label: "95100",
              fontSize: "16px",
              fontFamily: "Avenir, sans-serif",
              fontWeight: 600,
              color: "#FD6448",
              formatter: function (w) {
                return "/1902000";
              },
            },
          },
        },
      },
    },
  };
  return (
    <Container fluid>
      <Row className="revenue-wrapper">
        <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={4} className="p-0">
          <div className="revenue-bodyleft">
            <div className="revenue-infodiv">
              <div className="rev-heading">Haplomind revenue info</div>
              <div className="rev-tex-div spe">
                <div className="rev-subText">TOTAL PROJECT COST</div>
                <div className="rev-boldText">R 19,02,000</div>
              </div>
              <div className="rev-tex-div spe">
                <div className="rev-subText">PROFIT MARGIN</div>
                <div className="rev-boldText">30%</div>
              </div>
              <div className="rev-tex-div spe">
                <div className="rev-subText">EXPECTED PROFIT</div>
                <div className="rev-boldText">R 5,70,600</div>
              </div>
              <div className="rev-tex-div spe">
                <div className="rev-subText">ADVANCE PAYMENT</div>
                <div className="rev-boldText">R 4,75,500</div>
              </div>
            </div>
            <div className="project-infodiv">
              <div className="rev-heading">Project info</div>
              <div className="rev-tex-div spe">
                <div className="rev-subText">PROJECT TIMELINE</div>
                <div className="rev-boldText">3 months</div>
              </div>
              <div className="rev-tex-div spe">
                <div className="rev-subText">MILESTONES</div>
                <div className="rev-boldText">03</div>
              </div>
              <div className="rev-tex-div spe">
                <div className="rev-subText">CURRENT MILESTONES</div>
                <div className="rev-boldText">02</div>
              </div>
            </div>
          </div>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={6}
          lg={8}
          xl={8}
          xxl={8}
          className=""
          style={{ paddingRight: "0px" }}
        >
          <div className="revenue-bodyright">
            <div className="rev-tex-div">
              <div className="rev-heading2">Revenue info for Apr 2022</div>
              <div>
                <select className="rev-monthSelect">
                  <option>Apr 2022</option>
                  <option>May 2022</option>
                </select>
              </div>
            </div>
            <div>
              <Chart
                type="donut"
                height={350}
                width={"100%"}
                options={options}
                series={series}
              />
            </div>
            <div className="revenue-chart-text">
              <spna className="revenue-chart-text1">
                Client payment frequency
              </spna>

              <span className="revenue-chart-text2">Min 2 - Max 5 days</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Revenue;
