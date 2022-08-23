import React from "react"
import ReactApexChart from "react-apexcharts"
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
    Progress
  } from "reactstrap"
  import Chart from "react-apexcharts"
  import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
  import StatisticsCard from "../../components/@vuexy/statisticsCard/StatisticsCard"

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
    AlertOctagon
  } from "react-feather"

  import {
    siteTraffic,
    siteTrafficSeries,
    activeUsers,
    activeUsersSeries,
    newsLetter,
    newsLetterSeries
  } from "../cards/statistics/StatisticsData2"

  import { ChevronsRight, ChevronDown } from "react-feather"
import "../../assets/scss/pages/preview.scss"

import SubscribersGained from "../cards/statistics/SubscriberGained"
import RevenueGenerated from "../cards/statistics/RevenueGenerated"
import OrdersReceived from "../cards/statistics/OrdersReceived"
import QuaterlySales from "../cards/statistics/QuaterlySales"


class PeopleToWfh extends React.Component {


    render(){
        return(
            <React.Fragment>
            
            <Row>
              
              
    
              
              
              
              
                <StatisticsCard
                  iconRight
                  icon={<UserCheck className="success" size={22} />}
                  iconBg="success"
                  stat="85% "
                  statTitle="People availability"
                  options={activeUsers}
                  series={activeUsersSeries}
                  type="line"
                />
              
              
                <StatisticsCard
                  iconRight
                  icon={<Mail className="warning" size={22} />}
                  iconBg="warning"
                  stat="70%   "
                  statTitle="People to WFH"
                  options={newsLetter}
                  series={newsLetterSeries}
                  type="line"
                />
              
            </Row>
          </React.Fragment>
        )
    }

    

}




export default PeopleToWfh