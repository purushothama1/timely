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
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import StatisticsCard from "../../components/@vuexy/statisticsCard/StatisticsCard";

import {
  Monitor,
  UserCheck,
  Mail,
  Eye,
  MessageSquare,
  ShoppingBag,
  Heart,
  Smile,
  Truck,
  Cpu,
  Server,
  Activity,
  AlertOctagon,
} from "react-feather";

import {
  siteTraffic,
  siteTrafficSeries,
  activeUsers,
  activeUsersSeries,
  newsLetter,
  newsLetterSeries,
} from "../cards/statistics/StatisticsData2";

import { ChevronsRight, ChevronDown } from "react-feather";
import "../../assets/scss/pages/preview.scss";

import SubscribersGained from "../cards/statistics/SubscriberGained";
import RevenueGenerated from "../cards/statistics/RevenueGenerated";
import OrdersReceived from "../cards/statistics/OrdersReceived";
import QuaterlySales from "../cards/statistics/QuaterlySales";
import {
  getPeopleAvailability,
  getPeopleHostedWeekly,
} from "../../redux/actions/dashboard";
import { connect } from "react-redux";
import moment from "moment";
class PeopleAvailability extends React.Component {
  constructor() {
    super();
    this.state = {
      PeopleAvailability: [],
      totalamount: 0,
      totalamounts: 0,
      active_user: [],
      active_user_series: [],
      newsLetter_Series: [],
      newsLetter_Series_user: [],
    };
  }
  async componentDidMount() {
    var currentDate = moment().format("YYYY-MM-DD");
    var dateFrom = moment().add(6, "d").format("YYYY-MM-DD");
    console.log(currentDate);
    console.log(dateFrom);

    let param = {
      startDate: currentDate,
      endDate: dateFrom,
      "type": "THISWEEK"
    };
    const userOptions = await this.props.getPeopleAvailability(param);
    // console.log(userOptions,"userOptions")
    if (userOptions.data.statusCode == 200) {
      this.setState({
        PeopleAvailability: userOptions.data.result,
      });
      // console.log(userOptions.data.result)
      var active_user = [
        {
          name: "Active Users",
          data: this.state.PeopleAvailability.map(
            (a) => a.TOTAL_USER - a.LEAVE
          ),
        },
      ];
      this.setState({
        active_user_series: active_user,
      });

      var newsLetter_Series = [
        {
          name: "WFH",
          data: this.state.PeopleAvailability.map(
            (a) => a.TOTAL_USER - a.LEAVE - a.OFFICE - a.ONFIELD
          ),
        },
      ];
      this.setState({
        newsLetter_Series_user: newsLetter_Series,
      });

      if (this.state.PeopleAvailability.length > 0) {
        var total_availability = this.state.PeopleAvailability.map(
          (a) => ((a.TOTAL_USER - a.LEAVE) / a.TOTAL_USER) * 100
        );
        // console.log(total_availability,"total_availability");
        const total_availabilty_avgvalue = total_availability.reduce(function (
          result,
          item
        ) {
          return result + item;
        },
        0);

        //  console.log(total_availabilty_avgvalue,"total_availabilty_avgvalue")
        var total_availability_avg =
          total_availabilty_avgvalue / total_availability.length;
        var total_WFH_availability = this.state.PeopleAvailability.map(
          (a) =>
            ((a.TOTAL_USER - a.LEAVE - a.OFFICE - a.ONFIELD) / a.TOTAL_USER) *
            100
        );
        //  console.log(total_WFH_availability,"total_WFH_availability")
        const total_WFH_availabilty_avgvalue = total_WFH_availability.reduce(
          function (result, item) {
            return result + item;
          },
          0
        );
        var total_WFH_availability_avg =
          total_WFH_availabilty_avgvalue / total_availability.length;

        //at wfh
      }

      this.setState({
        totalamount: Math.round(total_availability_avg),
        totalamounts: Math.round(total_WFH_availability_avg),
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col >
            <StatisticsCard
              iconRight
              icon={<UserCheck className="success" size={22} />}
              iconBg="success"
              stat={this.state.totalamount + "%   "}
              statTitle="People availability (Next week)"
              options={activeUsers}
              series={this.state.active_user_series}
              type="line"
            />
            {/* <div><pre>{JSON.stringify(this.state.active_user_series) }</pre></div>; */}
          </Col>

          <Col>
            <StatisticsCard
              iconRight
              icon={<Mail className="warning" size={22} />}
              iconBg="warning"
              stat={this.state.totalamounts + "%   "}
              statTitle="People to WFH   (Next week)"
              options={newsLetter}
              series={this.state.newsLetter_Series_user}
              type="line"
            />
            {/* <div><pre>{JSON.stringify(this.state.newsLetter_Series_user) }</pre></div>; */}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, {
  getPeopleAvailability,
})(PeopleAvailability);
