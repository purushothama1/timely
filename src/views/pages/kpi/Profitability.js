import React from "react";
import { Col, Container, Row } from "reactstrap";
import Chart from "react-apexcharts";

const Profitability = () => {
  const series = [44, 55, 41];
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
    colors: ["#F6981D", "#168948", "#FD6448"],
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
    labels: ["Expenses", "Profit", "Profit"],
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
              label: "28%",
              fontSize: "16px",
              fontFamily: "Avenir, sans-serif",
              fontWeight: 600,
              color: "#FD6448",
              formatter: function (w) {
                return "/30%";
              },
            },
          },
        },
      },
    },
  };
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={4} className="p-0">
          <div className="revenue-bodyleft">
            <div className="revenue-infodiv">
              <div className="rev-heading">Haplomind profitability info</div>
              <div className="rev-tex-div spe">
                <div className="rev-subText">AS ON DATE</div>
                <div className="rev-boldText">20/05/2022</div>
              </div>
              <div className="rev-tex-div spe">
                <div className="rev-subText">PROJECT COMPLETION</div>
                <div className="rev-boldText">50%</div>
              </div>
              <div className="rev-tex-div spe">
                <div className="rev-subText">CURRENT PROFITABILITY</div>
                <div className="rev-boldText">20%</div>
              </div>
              <div className="rev-tex-div spe">
                <div className="rev-subText">COLLECTION OF THE MONTH</div>
                <div className="rev-boldText">R 475,500</div>
              </div>
              <div className="rev-tex-div spe">
                <div className="rev-subText">EXPENSES OF THE MONTH</div>
                <div className="rev-boldText">R 205,500</div>
              </div>
              <div className="rev-tex-div spe">
                <div className="rev-subText">PROJECT HEALTH</div>
                <div className="rev-boldText">Good</div>
              </div>
              <div className="rev-tex-div spe">
                <div className="rev-subText">DESCRIPTION</div>
                <div className="rev-boldText">
                  Planned to cope up with the issues in the coming milestone
                </div>
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
              <div className="rev-heading2">
                Profitability of the project for Apr 2022
              </div>
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profitability;
