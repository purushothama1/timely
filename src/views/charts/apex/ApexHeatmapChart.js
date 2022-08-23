import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Chart from "react-apexcharts"
import axios from 'axios';
import config from "../../../configs/properties";
import "../../../assets/scss/pages/apexheatmapchart.scss"

import {
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Progress
} from "reactstrap"
import { ChevronsRight, ChevronDown } from "react-feather"
import { dashboard_availablity, getRoles, getOngoingProjects } from "../../../redux/actions/dashboard"
import { connect } from "react-redux";
import { param } from "jquery";
import { marker } from "leaflet";

const generateData = (count, yrange) => {
  var i = 0,
    series = []
  while (i < count) {
    var x = "w" + (i + 1).toString(),
      y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

    series.push({
      x: x,
      y: y
    })
    i++
  }
  return series
}

const generateWeeklyData = (count, yrange) => {
  // console.log(yrange)
  var i = 0,
    series = []
  // console.log(yrange)
  while (i < count) {
    var x = "w" + (i + 1).toString(),
      y = yrange[i].workingHoursPercentage


    series.push({
      x: x,
      y: y
    })
    i++
  }
  return series
}

class ApexHeatmapCharts extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

      options: {
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            colorScale: {

              ranges: [{
                from: 0,
                to: 25,
                name: '0-25%',
                color: '#E3EAFF'
              },
              {
                from: 25,
                to: 50,
                name: '25-50%',
                color: '#BBCAFF'
              },
              {
                from: 50,
                to: 75,
                name: '50-75%',
                color: '#6F90FF'
              },
              {
                from: 46,
                to: 55,
                name: '75-100%',
                color: '#083FF2'
              },
                {
                  from: 100,
                  to: 2000,
                  name: ' >100%',
                  color: '#FF0000'
                }

              ]
            }

          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 1,
        },
        legend: {
          showForSingleSeries: true,
          position: 'bottom',
          horizontalAlign: "center",
          // offsetX: 65,
          height:30,
          offsetY: 7,
          markers: {
            width:14,
            height: 14, 
            margin:10
          }

        },

        
      },
      series: [],
      projectdata: [],
      rolenames: [],
      currentProjectid: [],
      currentroleid: [],
      projectname: `by project`,
      errormessage: "",
      currentrolename: `by Role`,
      startdate: "",
      enddate:""
      
    }
    this.projectInfo = this.projectInfo.bind(this)
  }
  componentDidMount = async () => {
    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var startdate = new Date(y, m, 1);
    var sdate = convert(startdate.setMonth(startdate.getMonth() - 3))
    var weekstart = date.getDate() - date.getDay() + 1;
    var weekfri = weekstart + 4;
    var edate = convert(new Date(date.setDate(weekfri)));
  
    let project = await this.props.getOngoingProjects();
    console.log(project.data.result);
    if (project.data.statusCode == 200) {
      this.setState({
        projectids: project.data.result.map(b => b._id),
        projectdata: project.data.result.map((b) => b.project)
      });
    }

    // console.log(this.state.projectids)
    console.log(this.state.projectdata)
    var names = this.state.projectdata.map((b) => b.name)
    console.log(names)

    let companyid = {
      "company": localStorage.getItem('company')
    }
    const role = await this.props.getRoles(companyid)
    if (role.data.statusCode == 200) {
      this.setState({
        roleids: role.data.data,
        rolenames: role.data.data,
        roleIds: role.data.data.map(a => a._id)
      })
    }

    this.setState({
      startdate: sdate,
      enddate: edate
    })
    let data = {
      "startDate": this.state.startdate,
      "endDate": this.state.enddate,
      "projectIds": ["5f1142363ffe0c5439e741d9"],
      "roleIds": []
    }
    const dashboard_availablity = await this.props.dashboard_availablity(data)
    if (dashboard_availablity.data.statusCode === 200) {
      const seriesData = dashboard_availablity.data.result.filter((da, i) => i < 10).map(da => {
        return {
          name: da.name,
          data: generateWeeklyData(da.data.length, da.data)
        }
      })

      this.setState({
        series: seriesData
      })
    }
  }

  projectInfo = (param) => {
    console.log(param._id)
    this.setState({
      currentProjectid: [param._id],
      projectname: param.name
    }, () => {
      this.getAvilabilityChart(this.state.currentProjectid)

    })

    let data1 = this.state.currentProjectid
    console.log(this.state.currentProjectid)



  }

  roleData = (param) => {
    this.setState({
      currentroleid: [param._id],
      currentrolename: param.role
    }, () => {
      this.getAvilabilityChart(this.state.currentroleid)
    })
  }

  getAvilabilityChart = async (param) => {
    console.log(param)
    console.log(this.state.startdate)
    if (param == this.state.currentProjectid[0]) {
      let data = {
        "startDate": this.state.startdate,
        "endDate": this.state.enddate,
        "projectIds": param,
        "roleIds": []
      }
      const dashboard_availablity = await this.props.dashboard_availablity(data)
      console.log(dashboard_availablity.data.result)
      if (dashboard_availablity.data.statusCode === 200) {
        const seriesData = dashboard_availablity.data.result.filter((da, i) => i < 10).map(da => {
          return {
            name: da.name,
            data: generateWeeklyData(da.data.length, da.data)
          }
        })

        this.setState({
          series: seriesData,
          flag: false
        })
      }

    } else {
      let data = {
        "startDate": this.state.startdate,
        "endDate": this.state.enddate,
        "projectIds": this.state.currentProjectid,
        "roleIds": param
      }
      const dashboard_availablity = await this.props.dashboard_availablity(data)
      console.log(dashboard_availablity)
      if (dashboard_availablity == undefined) {
        this.setState({
          errormessage: "Role not found",
          flag: true
        })
      }
      else if (dashboard_availablity.data.statusCode === 200) {
        const seriesData = dashboard_availablity.data.result.filter((da, i) => i < 10).map(da => {
          return {
            name: da.name,
            data: generateWeeklyData(da.data.length, da.data)
          }
        })

        this.setState({
          series: seriesData,
          flag: false
        })
      }

    }



  }


  render() {
    return (
      <Card >
        <CardHeader >
          {/* <CardTitle>Availability Chart
          
          </CardTitle>
          <div className="filter_text">Filter Peers</div>
          <div style= {{position: "relative"}}>
          <UncontrolledDropdown className="heatmap_dropdown"  >
            <DropdownToggle tag="small" className="text-bold-500 cursor-pointer drop_padding">
              <span className="thisweek_text">{this.state.projectname.length > 10 ? this.state.projectname.slice(0, 10)+"..." : this.state.projectname}</span><ChevronDown size={10} />
            </DropdownToggle>
            <DropdownMenu right style={{ height: "10em", overflow: "auto" }}>
              {this.state.projectdata.map((b) => {
                return <DropdownItem onClick={() => this.projectInfo(b)}>{b.name}</DropdownItem>
              })}


            </DropdownMenu>
          </UncontrolledDropdown>
          </div>
          
                <div><UncontrolledDropdown className="heatmap_dropdown1">
            <DropdownToggle tag="small" className="cursor-pointer drop_padding">
              <span className="thisweek_text1">{this.state.currentrolename.length > 10 ? this.state.currentrolename.slice(0, 10)+"..." : this.state.currentrolename}</span><ChevronDown size={10} />
            </DropdownToggle>
            <DropdownMenu right style={{ height: "10em", overflow: "auto" }}>
              {this.state.rolenames.map((a) => {
                return <DropdownItem onClick={() => this.roleData(a)}>{a.role}</DropdownItem>
              })}
            </DropdownMenu>
          </UncontrolledDropdown></div>
           */}
        </CardHeader>
        <div className = "row" >
          <div className ="col-3 heading">Availability Chart</div>
          <div className ="col-3 col-md col-lg filterpeers">Filter Peers</div>
          <div className="col-3">
          <UncontrolledDropdown className="newheat_map">
            <DropdownToggle tag="small" className="text-bold-500 cursor-pointer drop_padding">
              <p style={{display:"inline"}} className="thisweek_text">{this.state.projectname.length > 10 ? this.state.projectname.slice(0, 10)+"..." : this.state.projectname }</p> <p className="float-right mb-0" style={{display:"inline"}}><ChevronDown size={20}/></p>
            </DropdownToggle>
            <DropdownMenu right style={{ height: "10em", overflow: "auto" }}>
              {this.state.projectdata.map((b) => {
                return <DropdownItem onClick={() => this.projectInfo(b)}>{b.name}</DropdownItem>
              })}


            </DropdownMenu>
          </UncontrolledDropdown>
          </div>
          <div className="col-sm-3">
          <UncontrolledDropdown className="newheat_map1">
            <DropdownToggle tag="small" className="cursor-pointer drop_padding">
              <span className="thisweek_text1">{this.state.currentrolename.length > 10 ? this.state.currentrolename.slice(0, 11)+"..." : this.state.currentrolename}</span><p className="float-right mb-0" style={{display:"inline"}}><ChevronDown size={20}/></p>
            </DropdownToggle>
            <DropdownMenu right style={{ height: "10em", overflow: "auto" }}>
              {this.state.rolenames.map((a) => {
                return <DropdownItem onClick={() => this.roleData(a)}>{a.role}</DropdownItem>
              })}
            </DropdownMenu>
          </UncontrolledDropdown>

          </div>

        </div>
        <CardBody>
          <p className="errormsg">{this.state.flag ? this.state.errormessage : null}</p>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="heatmap"
            height={320}
          />

        </CardBody>
      </Card>
    )
  }
}
const mapStateToProps = (state) => { };
export default connect(mapStateToProps, {
  getRoles,
  getOngoingProjects,
  dashboard_availablity
})(ApexHeatmapCharts);
