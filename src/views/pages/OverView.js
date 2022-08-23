import React from "react"
import { Row, Col } from "reactstrap"
import queryString from "query-string"
import ReactApexChart from "react-apexcharts";
import { connect } from "react-redux"
import ProjectData from "../projectoverview/ProjectData";
import ProjectPlannedGraph from "../projectoverview/ProjectPlannedGraph";
import SprintMemberTile from "../projectoverview/SprintMemberTile";
import {
  getProjectOverViewInfo, getProjectOverView_members, 
  project_over_view_sprint_task_info, project_over_view_planned_vs_actual_sprint_tasks
} from "../../redux/actions/overview";
import axios from "axios"
import config from "../../configs/properties";
import {
  toast
} from "react-toastify"

import { createBrowserHistory } from "history"
export let history = createBrowserHistory()

let $primary = "#325BE2",
  $success = "#43BCA6",
  $danger = "#D77564",
  $warning = "#FF9F43",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $stroke_color = "#b9c3cd",
  $label_color = "#e7eef7",

  $info = "#00cfe8",
  $label_color_light = "#dae1e7"

let themeColors = [$primary, $success, $danger, $warning, $info]



class OverView extends React.PureComponent  {

constructor(props){
  super(props);
    this.state={
      isLoading :false,
      PROJECT_OVERVIEW_INFO : null,
      location:this.props.location,
      tasks:null,
      members:null
    }
}
componentDidMount =async()=>{

  
  const param={
    projectId:this.props.match.params.projectId
  }
  // this.setState({isLoading:false})
  // console.log("param",param)
  const sprintTask = await axios.post(config.base_url + "v1/project-over-view-sprint-task-info", param);
  const members =  await axios.post(config.base_url + "v1/project-overview-team-members", param);

  // console.log("SPRINT TASKS",sprintTask.data.result)
  // console.log("MEMEBERS",members.data.result)
  // console.log(this.props)
  // const { match: { params } } = this.props;

  this.setState({tasks:sprintTask.data.result,
  members:members.data.result})
  // const overViewInfo = await axios.post(config.base_url + "v1/project-overview-info", params)

  // // console.log("IN COMPONENT ",overViewInfo)
  // this.setState({
  //   PROJECT_OVERVIEW_INFO:overViewInfo.data.result[0]
  // })

  // this.setState({isLoading:true})
  // const _data = await getProjectOverViewInfo(params);
  // const _d1 = await getProjectOverView_members(params);
  // const d2 = await project_over_view_sprint_task_info(params);
  // const d3 = await project_over_view_planned_vs_actual_sprint_tasks(params)
  

}
componentDidUpdate(){
  if(this.props.location !== this.state.location){
    history.go('0')
  }
}
  render() {
    return (
      <div>  
      <Row>
          <Col sm="7">
            <ProjectData   projectId={ this.props.match.params.projectId} />
          </Col>
          <Col sm="5">
            <ProjectPlannedGraph themeColors={themeColors}  primary="#96AEFF"  projectId={ this.props.match.params.projectId} />
          </Col>
        </Row>
        <SprintMemberTile  task={this.state.tasks} members={this.state.members} projectId={this.props.match.params.projectId}/>
    </div>
        
    )
  }
}


const mapStateToProps = state => {
  return {
    projectData: state.projectOverView,
    // sprintScore: state.sprints.sprintScore,
    // totalPages: state.sprints.totalPages,
    // projectName: state.sprints.projectName
  }
}

export default connect(mapStateToProps, {
  getProjectOverViewInfo,
  // deleteSprint,
  // searchSprintData
  // getData,
  // deleteData,
  // updateData,
  // addData,
  // getInitialData,
  // filterData
})(OverView)
