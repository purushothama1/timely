import React from "react"
import { Row, Col } from "reactstrap"
import queryString from "query-string"
import "../../assets/scss/pages/preview.scss"
import ReactApexChart from "react-apexcharts"
import ProjectData from "../projectoverview/ProjectData"
import ProjectPlannedGraph from "../projectoverview/ProjectPlannedGraph"
import SprintMemberTile from "../projectoverview/SprintMemberTile"
import PreviewHeadCount from "../preview/PreviewHeadCount"
import PeopleHostedWeekly from "../preview/PeopleHostedWeekly"
import PeopleAvailability from "../preview/PeopleAvailability"
import KnownRoutes from "../preview/KnownRoutes"
import KarmaPointsLeaderboard from "../preview/KarmaPointsLeaderboard"
import HuddleCalls from "../preview/HuddleCalls"
import PlannedVsActual from "../preview/PlannedVsActual"
import PeopleToWfh from "../preview/PeopleToWfh"
import OnGoingProjectsScore from "../preview/OnGoingProjectsScore"



import OnGoingProjects from "../preview/OnGoingProjects"
import ActivitySummary from "../preview/ActivitySummary"
let $primary = "#9958B5",
  $success = "#F9CA24",
  $danger = "#D77564",
  $warning = "#FF9F43",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $stroke_color = "#b9c3cd",
  $label_color = "#e7eef7",

  $plannedvsactual_color1 = "#325BE2",
  $plannedvsactual_color2 = "#43BCA6",

  $info = "#00cfe8",
  $label_color_light = "#dae1e7"

let themeColors = [$primary, $success, $danger, $warning, $info]
let plannedColor = [$plannedvsactual_color1, $plannedvsactual_color2]

class Preview extends React.Component {

constructor(props){
  super(props);
 
}

 
  render() {
    return (
        <div>
            <row>
            <Col sm="3" className="colwid" >
            <PreviewHeadCount />             
             </Col>
                <Col sm="6" className="colwid">
                <PeopleHostedWeekly labelColor="#325be2" themeColors={themeColors}  primary="#96AEFF"/>
                </Col>
                <Col sm="3" className="colwid">
                <PeopleAvailability/>
                </Col>
            </row>
            <row>
            <Col sm="9" className="colwid" >
            <OnGoingProjects/>
            </Col>

            <Col sm="3" className="colwid " >
            <ActivitySummary strokeColor={$stroke_color} success={$success}  />
            </Col>
            </row>

            <row>
            <Col sm="6" className="colwid">
              <PlannedVsActual  plannedColor={plannedColor} />          
              </Col>

            <Col sm="6" className="colwid">
            <KarmaPointsLeaderboard/>
            </Col> 
            </row>

            <row>
            {/* <Col sm="6" className="colwid">
            <HuddleCalls/>           
            </Col> */}
            <Col sm="6" className="colwid">
            <KnownRoutes/>
            </Col>    
            </row>
            
      </div>
      
    )
  }
}

export default Preview
