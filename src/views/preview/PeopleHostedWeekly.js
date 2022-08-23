import React from "react"
import ReactApexChart from "react-apexcharts"
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  CardHeader,
  CardTitle,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Progress
} from "reactstrap"
import Chart from "react-apexcharts"
import { ChevronsRight, ChevronDown } from "react-feather"
import "../../assets/scss/pages/preview.scss"
import moment from "moment";

import { getPeopleAvailability } from '../../redux/actions/dashboard';
import { connect } from "react-redux";

class PeopleHostedWeekly extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      PeopleAvailability: [],
      active_user: [],
      active_user_series: [],
      options: {
        colors: this.props.themeColors,
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: "rounded",
            columnWidth: "55%"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        legend: {
          offsetY: -10
        },
        xaxis: {
          categories: [
            "Mon",
            "Tue",
            "Wed",
            "Thur",
            "Fri", 
           

          ]
        },
        // yaxis: {
        //   title: {
        //     text: "$ (thousands)"
        //   }
        // },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return + val
            }
          }
        }
      },
      series: [
        {
          name: "WFH",
          data: [12, 13, 12, 10, 15]
        },
        {
          name: "On field",
          data: [14, 11, 12, 16, 12]
        },
        {
          name: "Leave",
          data: [10, 9, 10, 13, 12]
        }
      ],
      dateSelector: "Select",
      week: "This week",
      month: "Last Month",
    }

  }


  async componentDidMount() {
    console.log(this.state.options.xaxis.categories)
    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    var current = new Date();     // get current date    
    var weekstart = new Date().getDate() - new Date().getDay() + 1;
    var weekfri = weekstart + 4;       // end day is the first day + 4 
    var monday = convert(new Date(new Date().setDate(weekstart)));
    var friday = convert(new Date(new Date().setDate(weekfri)));
console.log(monday)
console.log(friday)
console.log(new Date())
    let param = {
      "startDate": monday,
      "endDate": friday,
      "type": "THISWEEK"
    }
    const userOptions = await this.props.getPeopleAvailability(param)
    console.log(userOptions)
    if (userOptions.data.statusCode == 200) {
      this.setState({
        PeopleAvailability: userOptions.data.result
      })
      console.log(this.state.PeopleAvailability , "aa")
      var active_user = [
        {
          name: "Active Users",
          data: this.state.PeopleAvailability.map(a => ((a.TOTAL_USER - a.LEAVE)))
        },
        {
          name: "On field",
          data: this.state.PeopleAvailability.map(a => (a.ONFIELD))
        },
        {
          name: "Leave",
          data: this.state.PeopleAvailability.map(a => (a.LEAVE))
        }
      ]
      this.setState({
        active_user_series: active_user
      })
      if (this.state.PeopleAvailability.length > 0) {
        var total_available_office = this.state.PeopleAvailability.map(a => ((a.TOTAL_USER - a.LEAVE - a.WFH - a.ONFIELD) / a.TOTAL_USER) * 100)
        // console.log(total_available_office)
        const total_available_office_avgvalue = total_available_office.reduce(function (result, item) {
          return result + item;
        }, 0);
        // console.log(total_available_office.length)
        //  console.log(total_available_office_avgvalue);
        var total_available_office_avgvalue_weekly = total_available_office_avgvalue / total_available_office.length;
        //  console.log(total_available_office_avgvalue_weekly)

        var totalCounts_WFH_AVG = this.state.PeopleAvailability.map(a => ((a.TOTAL_USER - a.LEAVE - a.OFFICE - a.ONFIELD) / a.TOTAL_USER) * 100)
        // console.log(totalCounts_WFH_AVG,"totalCounts_WFH_AVG")
        const total_available_wfh_avgvalue = totalCounts_WFH_AVG.reduce(function (result, item) {
          return result + item;
        }, 0);
        var total_available_wfh_avgvalue_weekly = total_available_wfh_avgvalue / totalCounts_WFH_AVG.length;
        // console.log(total_available_wfh_avgvalue_weekly)

        var total_available_office_avgvalue_cal = Math.floor(total_available_wfh_avgvalue_weekly) - Math.floor(total_available_office_avgvalue_weekly)
        //  console.log(total_available_office_avgvalue_cal)
        this.setState({
          totaluser_office: Math.round(total_available_office_avgvalue_cal),
          totaluser_wfh: Math.round(total_available_wfh_avgvalue_weekly)
        })

      }
    }
  }



  thisWeek = () => {
    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

    var current = new Date();     // get current date    
    var weekstart = new Date().getDate() - new Date().getDay() + 1;
    var weekfri = weekstart + 4;       // end day is the first day + 4 
    var monday = convert(new Date(new Date().setDate(weekstart)));
    var friday = convert(new Date(new Date().setDate(weekfri)));

    return {
      startdate: monday,
      enddate: friday
    }

  }



  getStartdateEnddate = async (data) => {

    if (data == "week") {
      let item = this.thisWeek()
      console.log(item)
      let dates = {
        "startDate": item.startdate,
        "endDate": item.enddate,
        "type": "THISWEEK"
      }
      this.setState({
        dateSelector: "This week"
      })
      this.getpeopleCount(dates)

    }
    else if (data == "month") {
      let item = this.oneMonth()
      let dates = {
        "startDate": item.startdate,
        "endDate": item.enddate,
        "type": "THISMONTH"
      }
      this.setState({
        dateSelector: "Last Month"
      })
      this.getpeopleCount(dates)

    }
  }

  getpeopleCount = async (param) => {
    const userOptions = await this.props.getPeopleAvailability(param)
    if (userOptions.data.statusCode == 200) {
      this.setState({
        PeopleAvailability: userOptions.data.result
      })
      console.log(this.state.PeopleAvailability , "aa")
      if(param.type == "THISMONTH"){
        var weeks = []
        this.state.PeopleAvailability.map( a => {
          weeks.push(a.WEEK)
        })
        
         this.setState({
           options: { xaxis: {
             categories: weeks
           }}
         })

      }
      else if( param.type == "THISWEEK"){
        var days = []
        this.state.PeopleAvailability.map( a => {
          days.push(a.DAY)
        })
        this.setState({
          options: {
            xaxis: {
              categories: days
            }
          }
        })
      }

     
     
      var active_user = [
        {
          name: "Active Users",
          data: this.state.PeopleAvailability.map(a => ((a.TOTAL_USER - a.LEAVE)))
        },
        {
          name: "On field",
          data: this.state.PeopleAvailability.map(a => (a.ONFIELD))
        },
        {
          name: "Leave",
          data: this.state.PeopleAvailability.map(a => (a.LEAVE))
        }
      ]
      this.setState({
        active_user_series: active_user
      })
      if (this.state.PeopleAvailability.length > 0) {
        var total_available_office = this.state.PeopleAvailability.map(a => ((a.TOTAL_USER - a.LEAVE - a.WFH - a.ONFIELD) / a.TOTAL_USER) * 100)
        // console.log(total_available_office)
        const total_available_office_avgvalue = total_available_office.reduce(function (result, item) {
          return result + item;
        }, 0);
        // console.log(total_available_office.length)
        //  console.log(total_available_office_avgvalue);
        var total_available_office_avgvalue_weekly = total_available_office_avgvalue / total_available_office.length;
        //  console.log(total_available_office_avgvalue_weekly)

        var totalCounts_WFH_AVG = this.state.PeopleAvailability.map(a => ((a.TOTAL_USER - a.LEAVE - a.OFFICE - a.ONFIELD) / a.TOTAL_USER) * 100)
        // console.log(totalCounts_WFH_AVG,"totalCounts_WFH_AVG")
        const total_available_wfh_avgvalue = totalCounts_WFH_AVG.reduce(function (result, item) {
          return result + item;
        }, 0);
        var total_available_wfh_avgvalue_weekly = total_available_wfh_avgvalue / totalCounts_WFH_AVG.length;
        // console.log(total_available_wfh_avgvalue_weekly)

        var total_available_office_avgvalue_cal = Math.floor(total_available_wfh_avgvalue_weekly) - Math.floor(total_available_office_avgvalue_weekly)
        //  console.log(total_available_office_avgvalue_cal)
        this.setState({
          totaluser_office: Math.round(total_available_office_avgvalue_cal),
          totaluser_wfh: Math.round(total_available_wfh_avgvalue_weekly)
        })

      }
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

  render() {
    return (
      <Card>
        <CardHeader>
          <div className="session-info">
            <h2 className="text-bold-600 mb-25">Avg. {this.state.totaluser_wfh + "%   "}</h2>
            <p className="text-bold-500 mb-75">People working from home                </p>
            <h5 className="font-medium-2">
              <span className="text-success">{this.state.totaluser_office + "%   "} </span>
              <span>People hosted at office  </span>
            </h5>
          </div>



          <UncontrolledDropdown className="dropd2">
            <DropdownToggle tag="small" className=" cursor-pointer">
              {this.state.dateSelector}<ChevronDown size={10} />
            </DropdownToggle>
            <DropdownMenu right>
              {/* <DropdownItem>Last 28 days</DropdownItem> */}
              <DropdownItem onClick={() => this.getStartdateEnddate("month")}>{this.state.month}</DropdownItem>
              <DropdownItem onClick={() => this.getStartdateEnddate("week")}>{this.state.week}</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          {/* <UncontrolledDropdown className="dropd2">
            <DropdownToggle tag="small" className="*- cursor-pointer">
              All roles<ChevronDown size={10} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Last 28 days</DropdownItem>
              <DropdownItem>Last Month</DropdownItem>
              <DropdownItem>Last Year</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}

        </CardHeader>
        <CardBody className="hosted_card_body phw_card-body">
          <Chart
            options={this.state.options}
            series={this.state.active_user_series}
            type="bar"
            height={250}
          />
        </CardBody>
        {/* <div><pre>{JSON.stringify(this.state.active_user_series) }</pre></div>; */}
      </Card>
    )
  }

}  //class

const mapStateToProps = state => { }
export default connect(mapStateToProps,
  {
    getPeopleAvailability
  })(PeopleHostedWeekly)

