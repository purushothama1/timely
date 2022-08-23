import React from "react";
import ReactApexChart from "react-apexcharts";
import { HelpCircle } from "react-feather";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Progress,
  CardHeader,
  CardTitle,
  Table,
  UncontrolledTooltip,
} from "reactstrap";

import Chart from "react-apexcharts";
import { ChevronsRight, ChevronDown } from "react-feather";
import "../../assets/scss/pages/preview.scss";
import { getOngoingProjects } from "../../redux/actions/dashboard";
import { connect } from "react-redux";
import OnGoingProjects from "./OnGoingProjects";

class OnGoingProjectsScore extends React.Component {
  state = {
    options: {
      chart: {
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1,
        },
      },
      colors: [this.props.success],
      plotOptions: {
        radialBar: {
          size: 10,
          startAngle: -140,
          endAngle: 150,
          hollow: {
            size: "50%",
          },
          track: {
            background: this.props.strokeColor,
            strokeWidth: "10%",
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: 5,
              color: this.props.strokeColor,
              fontSize: "1rem",
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#00b5b5"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
    },
    series: [this.props.series],
  };

  render() {
    return (
      <div className="ogps_div">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
          height={70}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, {
  getOngoingProjects,
})(OnGoingProjectsScore);
