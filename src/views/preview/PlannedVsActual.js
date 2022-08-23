
import React from "react";
import { Row, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import "../../assets/scss/pages/preview.scss";
import {
  Card,
  CardBody,
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

import { ChevronsRight, ChevronDown } from "react-feather";
import {
  getRoles,
  planedVsactual,
  getOngoingProjects,
  getsprintList
} from "../../redux/actions/dashboard";

import { getSprintData } from "../../redux/actions/sprint"
import { connect } from "react-redux";
import config from "../../configs/properties";

let companyid = {
  company: localStorage.getItem("company"),
};

class PlannedVsActual extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      options: {
        colors: this.props.plannedColor,
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: "rounded",
            columnWidth: "25px",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        legend: {
          offsetY: -10,
        },
        xaxis: {
          categories: [
            "sp. 4",
            "sp. 5",
            "sp. 6",
            "sp. 7",
            "sp. 8",
            "sp. 9",
            "sp. 10",
            "sp. 11",
            "sp. 12",
          ],
        },
        //   yaxis: {
        //     title: {
        //       text: "$ (thousands)"
        //     }
        //   },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "" + val + " " + "Task";
            },
          },
        },
      },

      activePlannedvsactual: [],
      projectdata: [],
      projectname: "All projects",
      dateSelector: "Select",
      startdate: "2020-09-01",
      enddate: "2021-02-26"


    }

    this.sprintDetails = this.sprintDetails.bind(this)
    // this.Oneweek = this.Oneweek.bind(this)
    // this.Onemonth = this.Onemonth(this)
    this.getStartDateEndDate = this.getStartDateEndDate.bind(this)
  }





  async componentDidMount() {
    this.setState({
      thisweek: "This week",
      thismonth: "Last Month"
    })
    let project = await this.props.getOngoingProjects();
    console.log(project.data.result);
    if (project.data.statusCode == 200) {
      this.setState({
        projectids :project.data.result.map(b => b._id),
        projectdata: project.data.result.map((b) => b.project)
      });
    }

    console.log(this.state.projectdata)
    // let projectData = {
    //   "projectId": projectid[0],
    //   "startDate": this.state.startdate,
    //   "endDate": this.state.enddate,
    //   "page": 1,
    //   "size": 4
    // }
    // let sprintdetails = await this.props.getsprintList(projectData)
    // console.log(sprintdetails)
    // if (sprintdetails.data.statusCode == 200) {
    //   // var sprints = []
    //   // sprintdetails.data.result.sprints.map((data,idx) =>{
    //   //   sprints.push(`sp. ${idx + 1}`)
    //   // })
    //   this.setState({
    //     sprintdetail: sprintdetails.data.result,
    //     sprintnumber: sprintdetails.data.result.sprints,
        
    //     //  xaxis: {
    //     //     categories:sprints
    //     //   }
    //   })



    //   console.log(sprintdetails)
    //   console.log(this.state.sprintnumber)
    //   console.log(this.state.projectname)
    //   var active_series = [
    //     {
    //       name: "PLANNED",
    //       data: this.state.sprintdetail.sprints.map((a, i) => a.task.length),
    //     },
    //     {
    //       name: "ACTUAL",
    //       data: this.state.sprintdetail.sprints.map((a) => a.completedTask),
    //     },
    //   ];


    //   console.log(this.state.sprintdetail.sprints)
    //   this.setState({

    //     activePlannedvsactual: active_series
    //   });
    // }


    // let plannedVsacctual = await this.props.planedVsactual(param);
    // if (plannedVsacctual.data.statusCode == 200) {
    //   this.setState({
    //     plannedVsActual: plannedVsacctual.data.result,
    //   });
    //   console.log(this.state.plannedVsActual)
    //   var active_series = [
    //     {
    //       name: "PLANNED",
    //       data: this.state.plannedVsActual.map((a) => a.totalTasks),
    //     },
    //     {
    //       name: "ACTUAL",
    //       data: this.state.plannedVsActual.map((b) => b.completedTaskStatus),
    //     },
    //   ];

    //   var abc = this.state.plannedVsActual.map((a) => a.totalTasks);
    //   console.log(abc);

    //   this.setState({
    //     activePlannedvsactual: active_series,
    //   });

    //   console.log(this.state.activePlannedvsactual);


    // }


  }
  Oneweek = () => {
    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

    var current = new Date();     // get current date    
    var weekstart = current.getDate() - current.getDay() + 1;
    var weekfri = weekstart + 4;       // end day is the first day + 4 
    var monday = convert(new Date(current.setDate(weekstart)));
    var friday = convert(new Date(current.setDate(weekfri)));
    var week = "This week"
    return {
      startdate: monday,
      enddate: friday,
      week: week

    }


  }

  oneMonth = () => {
    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var startdate = new Date(y, m, 1);
    var enddate = new Date(y, m + 1, 0);
    var sdate = convert(startdate.setMonth(startdate.getMonth() - 1))
    var edate = convert(enddate.setMonth(enddate.getMonth() - 1))
    var month = "Last Month"

    return {
      startdate: sdate,
      enddate: edate,
      month: month
    }


  }



  getStartDateEndDate = (data) => {
    if(this.state.currentProjectId){
      if (data == "week") {
        let item = this.Oneweek()
        console.log(item)
  
        let projectData = {
          "projectId": this.state.currentProjectId,
          "startDate": item.startdate,
          "endDate": item.enddate,
          "page": 1,
          "size": 4
        }
        this.setState({
          dateSelector: this.state.thisweek
        })
        this.getSprintDetails(projectData)
      }
      else if (data == "month") {
        let item = this.oneMonth()
        let projectData = {
          "projectId": this.state.currentProjectId,
          "startDate": item.startdate,
          "endDate": item.enddate,
          "page": 1,
          "size": 4
        }
        this.setState({
          dateSelector: this.state.thismonth
        })
        this.getSprintDetails(projectData)
      }
    }else{
      alert('please select a project')
    }
  }

  getSprintDetails = async (projectData) => {
      let sprintdetails = await this.props.getsprintList(projectData)
      console.log(sprintdetails)
      if (sprintdetails.data.statusCode == 200) {
        
        var sprints = []
        sprintdetails.data.result.sprints.map((data,idx) =>{
          sprints.push(`sp. ${idx + 1}`)
        })
        this.setState({
          sprintdetail: sprintdetails.data.result,
          sprintnumber: sprintdetails.data.result.sprints,
          projectname: this.state.currentProjectname,
          options: {xaxis: {
            categories: sprints 
          } }
        })
        var active_series = [
          {
            name: "PLANNED",
            data: this.state.sprintdetail.sprints.map((a, i) => a.task.length),
          },
          {
            name: "ACTUAL",
            data: this.state.sprintdetail.sprints.map((a) => a.completedTask),
          },
        ];
  
  
        console.log(this.state.sprintdetail.sprints)
        this.setState({
  
          activePlannedvsactual: active_series
        });
  
        console.log(this.state.activePlannedvsactual)
      }
 
  }

  sprintDetails = async (param) => {
    this.setState({
      currentProjectId: param._id,
      currentProjectname: param.name
    })

    console.log(param)
    let projectData = {
      "projectId": param._id,
      "startDate": this.state.startdate,
      "endDate": this.state.enddate,
      "page": 1,
      "size": 4,

    }
    console.log(param)
    this.getSprintDetails(projectData)

    // else {

    // }

  }
  render() {
    return (
      <Card className="planned_actual">
        <CardHeader>
          <CardTitle>Planned vs. Actual </CardTitle>
        </CardHeader>
        <UncontrolledDropdown className="dropd_pva ">
          <DropdownToggle tag="small" className=" cursor-pointer">
            {this.state.projectname.length > 15? this.state.projectname.slice(0, 14)+"...":this.state.projectname }
            <ChevronDown size={10} />
          </DropdownToggle>
          <DropdownMenu right style={{ height: "10em", overflow: "auto" }}  >
            {this.state.projectdata.map((b) => {

              return <DropdownItem onClick={() => this.sprintDetails(b)}>{b.name}</DropdownItem>
            })}

            {/* <DropdownItem>Last Month</DropdownItem>
                  <DropdownItem>Last Year</DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>


        {/* <UncontrolledDropdown className="dropd_pva1">
          <DropdownToggle tag="small" className="text-bold-500 cursor-pointer">
            All roles
            <ChevronDown size={10} />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Last 28 days</DropdownItem>
            <DropdownItem>Last Month</DropdownItem>
            <DropdownItem>Last Year</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
        <UncontrolledDropdown className="dropd_pva1">
          <DropdownToggle tag="small" className=" cursor-pointer">
            {this.state.dateSelector}
            <ChevronDown size={10} />
          </DropdownToggle>
          <DropdownMenu >
            <DropdownItem onClick={() => this.getStartDateEndDate("week")}>{this.state.thisweek}</DropdownItem>
            <DropdownItem onClick={() => this.getStartDateEndDate("month")}>{this.state.thismonth}</DropdownItem>
            {/* <DropdownItem>Last Year</DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>
        <CardBody>
          <Chart
            options={this.state.options}
            series={this.state.activePlannedvsactual}
            type="bar"
            height={240}
          />
        </CardBody>
      </Card>
    );
  }
} //class

const mapStateToProps = (state) => { };
export default connect(mapStateToProps, {
  getSprintData,
  getRoles,
  planedVsactual,
  getOngoingProjects,
  getsprintList
})(PlannedVsActual);
