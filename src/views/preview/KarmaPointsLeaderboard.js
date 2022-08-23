import React from "react";
import { Row, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import "../../assets/scss/pages/preview.scss";
import KarmaPointsIcon from "../../../src/assets/img/Karma_points_icon.png";
import initialImage from '../../assets/img/pages/Group 182.png'
import { connect } from "react-redux";

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
import avatar1 from "../../assets/img/portrait/small/avatar-s-5.jpg";
import avatar2 from "../../assets/img/portrait/small/avatar-s-7.jpg";
import avatar3 from "../../assets/img/portrait/small/avatar-s-10.jpg";
import avatar4 from "../../assets/img/portrait/small/avatar-s-8.jpg";
import avatar5 from "../../assets/img/portrait/small/avatar-s-1.jpg";
import avatar6 from "../../assets/img/portrait/small/avatar-s-2.jpg";
import avatar7 from "../../assets/img/portrait/small/avatar-s-3.jpg";
import avatar8 from "../../assets/img/portrait/small/avatar-s-4.jpg";
import { karmaPoints, getRoles } from "../../redux/actions/dashboard";

import { ChevronsRight, ChevronDown } from "react-feather";

class KarmaPointsLeaderboard extends React.Component {
  constructor(props) {
    super();

    this.state = {
      showKarmaPoints: 6,
      karmaPointsresult: [],
      rolenames: [],
      thisweek: "This week",
      lastmonth: "Last Month",
      dateSelector: "select",
      year: "year",
      startdate: "2020-01-01",
      enddate: "2021-04-20",
      initialrole: "All Roles",
      initialdata: false
    };
    this.karmapoints = this.karmapoints.bind(this)
  }

  async componentDidMount() {
    let companyid = {
      "company": localStorage.getItem('company')
    }
    const role = await this.props.getRoles(companyid)
    console.log(role)
    if (role.data.statusCode == 200) {
      this.setState({
        roleids: role.data.data,
        rolenames: role.data.data,
        roleIds: role.data.data.map(a => a._id)
      })
    }


    console.log(this.state.roleids)

    let param = {
      startDate: this.state.startdate,
      endDate: this.state.enddate,
      limit: 30,
      page: 1,
      roleIds: this.state.roleIds
    };

    console.log(param)

    const karmaPoints = await this.props.karmaPoints(param);
    console.log(karmaPoints , "a")
    if (karmaPoints.data.statusCode == 200) {
      this.setState({
        karmaPointsresult: karmaPoints.data.responseData,
        initialdata: true
      });
    }

    if(karmaPoints.data.responseData.length == 0){
        this.setState({
          initialdata: true,
        })

    }

    // console.log(this.state.karmaPointsresult)
    // console.log(this.state.points)
  }


  thisWeek = () => {
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

    return {
      startdate: monday,
      enddate: friday
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
      enddate: edate
    }

  }

  getStartdateEnddate = (data) => {
    if (data == "week") {
      if (!this.state.currentroleid) {
        let item = this.thisWeek()
        console.log(item)
        let roleData = {
          "startDate": item.startdate,
          "endDate": item.enddate,
          "limit": 30,
          "page": 1,
          "roleIds": this.state.roleIds,

        }
        this.setState({
          dateSelector: "This week"
        })
        this.karmapoints(roleData)
      }
      else {
        let item = this.thisWeek()
        console.log(item)
        let roleData = {
          "startDate": item.startdate,
          "endDate": item.enddate,
          "limit": 30,
          "page": 1,
          "roleIds": [this.state.currentroleid]
        }
        this.setState({
          dateSelector: "This week"
        })
        this.karmapoints(roleData)

      }

      let item = this.thisWeek()
      console.log(item)
      let roleData = {
        "startDate": item.startdate,
        "endDate": item.enddate,
        "limit": 30,
        "page": 1,
        "roleIds": [this.state.currentroleid]
      }
      this.setState({
        dateSelector: "This week"
      })
      this.karmapoints(roleData)

    }
    else if (data == "month") {
      if (!this.state.currentroleid) {
        let item = this.oneMonth()
        let roleData = {
          "startDate": item.startdate,
          "endDate": item.enddate,
          "limit": 30,
          "page": 1,
          "roleIds": this.state.roleIds

        }
        this.setState({
          dateSelector: "Last Month"
        })
        this.karmapoints(roleData)
      }
      else {
        let item = this.oneMonth()
        let roleData = {
          "startDate": item.startdate,
          "endDate": item.enddate,
          "limit": 30,
          "page": 1,
          "roleIds": [this.state.currentroleid]

        }
        this.setState({
          dateSelector: "Last Month"
        })
        this.karmapoints(roleData)
      }


    }

    else if (data == "year") {
      if (!this.state.currentroleid) {
        let roleData = {
          "startDate": "2020-01-01",
          "endDate": "2021-04-20",
          "limit": 30,
          "page": 1,
          "roleIds": this.state.roleIds

        }
        this.setState({
          dateSelector: "Year"
        })
        this.karmapoints(roleData)
      }
      else {
        let roleData = {
          "startDate": "2020-01-01",
          "endDate": "2021-04-20",
          "limit": 30,
          "page": 1,
          "roleIds": [this.state.currentroleid]

        }
        this.setState({
          dateSelector: "Year"
        })
        this.karmapoints(roleData)
      }

    }

  }

  karmapoints = async (roleData) => {
    console.log(roleData)
    const karmaPoints = await this.props.karmaPoints(roleData);
    console.log(karmaPoints)
    if (karmaPoints.data.statusCode == 200) {
      this.setState({
        karmaPointsresult: karmaPoints.data.responseData,
      });
    }
  }

  roleDetails = (param) => {
    this.setState({
      currentroleid: param._id,
      initialrole: param.role
    })
    let roleData = {
      "startDate": this.state.startdate,
      "endDate": this.state.enddate,
      "limit": 30,
      "page": 1,
      "roleIds": [param._id]
    }
    console.log(roleData)
    this.karmapoints(roleData)

  }

  render() {
    return (
      <Card className="karma-rectangle">
        <CardHeader className="p-1 ml-1 pl-1">
          <CardTitle className="karma-points-leaderb pb-0">
            Karma Points Leaderboard
          </CardTitle>
          <UncontrolledDropdown className="karma_dropd1 ">
            <DropdownToggle tag="small" className=" cursor-pointer">
              {this.state.dateSelector}
              <ChevronDown size={10} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={() => this.getStartdateEnddate("week")}>{this.state.thisweek}</DropdownItem>
              <DropdownItem onClick={() => this.getStartdateEnddate("month")}>{this.state.lastmonth}</DropdownItem>
              <DropdownItem onClick={() => this.getStartdateEnddate("year")}>{this.state.year}</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown className="karma_dropd2">
            <DropdownToggle tag="small" className=" cursor-pointer">
              {this.state.initialrole.length > 10 ? this.state.initialrole.slice(0, 10) + ".." : this.state.initialrole}
              <ChevronDown size={10} />
            </DropdownToggle>
            <DropdownMenu right style={{ height: "10em", overflow: "auto" }}>
              {this.state.rolenames.map((a) => {

                return <DropdownItem onClick={() => this.roleDetails(a)} >{a.role}</DropdownItem>
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </CardHeader>
        <Table
          responsive
          className="dashboard-table table-hover-animation mb-0 mt-1"
        > 
        {this.state.initialdata? <>
        <div style={{textAlign:"center"}}>
        <img className="karma_points_initial" src={initialImage}></img>
        </div>
          
          <p className="karma_points_initial1">Add peer to see the leaderboard</p>
         </>: <> 
         <tbody>
            {this.state.karmaPointsresult.map((p, i) => {
              return (
                <div className=" karma_row" style={{ backgroundColor: "" }}>
                  <tr className="karma_background ">
                    <td className="pl-2">{i + 1} </td>

                    <td className="karma_td_pad">
                      <ul className="list-unstyled users-list m-0 d-flex">
                        <li className="avatar pull-up">
                          <img
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" }}
                            src={p.profilePic}
                            alt={p.name}
                            height="30"
                            width="30"
                            id={`btn-${i}`}
                          />

                          <UncontrolledTooltip
                            placement="bottom"
                            target={`btn-${i}`}
                          >
                            {p.name}
                          </UncontrolledTooltip>
                        </li>
                      </ul>
                    </td>
                    <td className="w-100 p-0">{p.name}</td>

                    <td className="mr-2" style={{ minWidth: "120px" }}>
                      <img src={KarmaPointsIcon} className="karma_icon" />{" "}
                      {p.totalPoints}Pts
                  </td>
                    <td className="p-0 " style={{ minWidth: "150px" }}>
                      {p.totalPointTimes} times recieved
                  </td>
                  </tr>
                </div>
              );
            })}
          </tbody>
         </>}
          
        </Table>
      </Card>
    );
  }
} //class

const mapStateToProps = (state) => { };

export default connect(mapStateToProps, {
  karmaPoints,
  getRoles
})(KarmaPointsLeaderboard);
