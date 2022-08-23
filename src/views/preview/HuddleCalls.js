import React from "react"
import { Row, Col } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import Chart from "react-apexcharts"
import "../../assets/scss/pages/preview.scss"
import PlayButton from "../../../src/assets/img/Play_button.png"
import StopButton from "../../../src/assets/img/Stop_button.png"



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
  


  } from "reactstrap"
  import avatar1 from "../../assets/img/portrait/small/avatar-s-5.jpg"
  import avatar2 from "../../assets/img/portrait/small/avatar-s-7.jpg"
  import avatar3 from "../../assets/img/portrait/small/avatar-s-10.jpg"
  import avatar4 from "../../assets/img/portrait/small/avatar-s-8.jpg"
  import avatar5 from "../../assets/img/portrait/small/avatar-s-1.jpg"
  import avatar6 from "../../assets/img/portrait/small/avatar-s-2.jpg"
  import avatar7 from "../../assets/img/portrait/small/avatar-s-3.jpg"
  import avatar8 from "../../assets/img/portrait/small/avatar-s-4.jpg"

  import { ChevronsRight, ChevronDown } from "react-feather"

class KarmaPointsLeaderboard extends React.Component {

    render() {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Huddle calls</CardTitle>
              <UncontrolledDropdown className="dropd_huddle">
              <DropdownToggle tag="small" className="text-bold-500 cursor-pointer">
              Past<ChevronDown size={10} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Last 28 days</DropdownItem>
                <DropdownItem>Last Month</DropdownItem>
                <DropdownItem>Last Year</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>      
           
            </CardHeader>
            <Table
              responsive
              className="dashboard-table table-hover-animation mb-0 mt-1">
              <thead>
              <tr>
                
                <th>Project</th>
                <th>Attendees</th>
                <th>Frequency</th>
                <th>Time</th>
                <th></th>
               
              </tr>
            </thead>
              <tbody>
                



                <tr>
                    <td className="p-1">Timely </td>
                    <td className="p-1">12 out of 15</td>
                    <td>Daily</td>
                    <td> 10:00 AM</td>
                  <td><img src={PlayButton} className="play_icon"/></td> 
                  
                </tr>


                <tr>
                    <td className="p-1">Aap ka Pai..</td>
                    <td className="p-1">15 out of 15</td>
                    <td>M T W T F</td>
                    <td>10:30 AM</td>
                    <td><img src={PlayButton} className="play_icon"/></td> 

                  
                </tr>

                <tr>
                    <td className="p-1">Aap ka Pai..</td>
                    <td className="p-1">15 out of 15</td>
                    <td>M T W T F</td>
                    <td>10:30 AM</td>
                    <td><img src={StopButton} className="play_icon"/></td> 

                  
                </tr>

                <tr>
                    <td className="p-1">Aap ka Pai..</td>
                    <td className="p-1">15 out of 15</td>
                    <td>M T W T F</td>
                    <td>10:30 AM</td>
                    <td><img src={PlayButton} className="play_icon"/></td> 

                  
                </tr>

                <tr>
                    <td className="p-1">Aap ka Pai..</td>
                    <td className="p-1">15 out of 15</td>
                    <td>M T W T F</td>
                    <td>10:30 AM</td>
                    <td><img src={StopButton} className="play_icon"/></td> 

                  
                </tr>

                <tr>
                    <td className="p-1">Aap ka Pai..</td>
                    <td className="p-1">15 out of 15</td>
                    <td>M T W T F</td>
                    <td>10:30 AM</td>
                    <td><img src={PlayButton} className="play_icon"/></td> 

                  
                </tr>
               
               
           
                
              </tbody>
            </Table>
          </Card>
        )
      }

}  //class


export default KarmaPointsLeaderboard