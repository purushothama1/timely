import React from "react";
import ReactApexChart from "react-apexcharts";
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
} from "reactstrap";
import Chart from "react-apexcharts";
import { ChevronsRight, ChevronDown } from "react-feather";
import "../../assets/scss/pages/preview.scss";
import { CardHeader, CardTitle } from "reactstrap";
import { activitySummary } from "../../redux/actions/dashboard";
import { connect } from "react-redux";
import initialImg from '../../assets/img/pages/Group 153.png'

import { HelpCircle } from "react-feather";

class ActivitySummary extends React.Component {
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
          size: 110,
          startAngle: -140,
          endAngle: 150,
          hollow: {
            size: "75%",
          },
          track: {
            background: this.props.strokeColor,
            strokeWidth: "50%",
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: 13,
              color: this.props.strokeColor,
              fontSize: "3rem",
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
    activitysummary: [],
    series: [],
    progress: [],
    stuck: [],
    initialdata: false
  };

  async componentDidMount() {
    const activitySummary = await this.props.activitySummary();
    console.log(activitySummary);
    if (activitySummary.data.statusCode == 200) {
      this.setState({
        activitysummary: activitySummary.data.result,
        progress: activitySummary.data.result.onGoingProjects,
        stuck: activitySummary.data.result.stuckProjects,
        series: [Math.round(activitySummary.data.result.percentage)],
        initialdata: true
      });
    }

      if(activitySummary.data.result.totalProjects == 0){
        this.setState({
          initialdata: true
        })
      }
  }

  render() {
    return (
     
      <Card className="activity-rectangle  " >
        <CardHeader>
          <CardTitle>Activity Summary </CardTitle>
         
        </CardHeader>
        {this.state.initialdata? <>
        <img className="activity_initial" src={initialImg}></img>
        <p className="activity_initial1">Add projects to see the score</p>
        </>: 
        <>
        <CardBody>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="radialBar"
            height={140}
          
          />
        </CardBody>
        <div className="d-flex mt-2">
          <div className="completed border-top border-right text-center w-50 py-1 inprogress_bg">
            <p className="mb-50">In progress</p>
            <p className="font-large-1 text-bold-600 mb-50">
              {this.state.progress}
            </p>
          </div>
          <div className="in-progress border-top border-right text-center w-50 py-1 stuck_bg">
            <p className="mb-50">Stuck </p>
            <p className="font-large-1 text-bold-600 mb-50">
              {this.state.stuck}
            </p>
          </div>
        </div>
        </>}
        
      </Card>
    
    );
  }
}

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, {
  activitySummary,
})(ActivitySummary);
