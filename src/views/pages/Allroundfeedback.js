import React from "react";
import ApexRadialCharts from "../charts/apex/ApexRadarChart"
import ApexLineCharts from "../charts/apex/ApexLineChart"
import PaginationIcons from "../../components/@vuexy/pagination/pagination"
import AvailablePeersConfig from "../availability/AvailablePeersConfig"
import queryString from "query-string"
import { Label, Input, FormGroup, Button,Row,Col,Card,CardBody,CardHeader } from "reactstrap"
import Select from "react-select"
import Feedback from '../feedback' 
import axios from 'axios'
import { connect } from "react-redux"
import moment from 'moment'
import config from '../../configs/properties'

class AllroundFeedback extends React.Component{
constructor(props)
{
  
  super(props)
  this.state={
    projects:[],
    reviewStartDuration:moment().format('YYYY-MM-DD'),
    reviewEndDuration:moment().format('YYYY-MM-DD'),
    selectedProject:"",
    selectedRole:"",
    selectedMate:"",
    roles:[],
    average:[],
    lineGraph:[],
    projectmates:[]
  }
}

componentDidUpdate(prevProps,prevState){
  if(this.props.projectList !== prevProps.projectList)
  {
    this.setState({
      projects:[...this.props.projectList.map(prj=>{
        return {"label":prj.name,"value":prj._id}
      })]
    })
  }
}

getMyProjectMates=async(project)=>{
const projectMates=await axios.post(config.base_url+"v1/my-project-team-members",{
  projects:[project]
})
  if(projectMates.data.statusCode === 200)
  {

    this.setState({
      projectmates:projectMates.data.data.length > 0?[...projectMates.data.data.map(prj=>{
        return {"label":prj.name,"value":prj._id,"role":prj.role}
      })]:[]
    })
  }
}
  componentDidMount=async ()=>{

this.setState({
  projects:[...this.props.projectList.map(prj=>{
    return {"label":prj.name,"value":prj._id}
  })]
})

try
{
  const getAllRoles=await axios.post(config.base_url+"v1/get-all-roles",{
    company:localStorage.getItem('company')
  })
  if(getAllRoles.data.statusCode === 200)
  {
    this.setState({
      roles:[...getAllRoles.data.data.map(role=>{
        return {"label":role.role,"value":role._id}
      })]
    })
  }
}
catch(e)
{
  
}
    // const overallFeedback=await axios.post(config.base_url+"v1/get-overall-peer-review",
    // {
    //   "peer_id":localStorage.getItem('user'),
    //   "reviewDurationStart": "2021-01-01T00:00:00Z",
    //   "reviewDurationEnd": "2021-02-28T23:59:59.999Z"
    // })

    // console.log(overallFeedback)
   
    }
    getOverallFeedback=async ()=>{
     const overallFeedback= await axios.post(config.base_url+"v1/get-overall-peer-review",{
        "peer_id": localStorage.getItem('user'),
        "reviewDurationStart": this.state.reviewStartDuration,
        "reviewDurationEnd": this.state.reviewEndDuration,
        "project":[this.state.selectedProject],
        "ReviewerRole":this.state.selectedRole === ""?[...this.state.roles.map(r=>r.value)]:[this.state.selectedRole],
        "reviewBy":this.state.selectedMate === ""?[...this.state.projectmates.map(p=>p.value)]:[this.state.selectedMate]
      })
      if(overallFeedback.data.statusCode === 200)
      {
       
            this.setState({
              average:overallFeedback.data.avaerage,
              lineGraph:overallFeedback.data.data
            })
        
      }
      console.log(overallFeedback)
    }
    handleProjectChange=(e)=>{
       console.log(e)
       this.setState({
         selectedProject:e.value
       },async ()=>{
        await this.getMyProjectMates(e.value)
        await this.getOverallFeedback()
        
       })

    }
    handleRoleChange=(e)=>{
     this.setState({
      selectedRole:e.value
     
     },async ()=>{
      await this.getOverallFeedback()
     })
    }
    handleNameChange=(e)=>{
      this.setState({
        selectedMate:e.value
       },async ()=>{
        //await this.getOverallFeedback()
       })
    }
    getDate=(startDate,endDate)=>{
     
     this.setState({
       reviewStartDuration:moment(new Date(startDate)).format('YYYY-MM-DD'),
       reviewEndDuration:moment(new Date(endDate)).format('YYYY-MM-DD')
     },()=>{
      this.getOverallFeedback()
     })
    }
  render(){
    
    return(
      <React.Fragment>
    <Card>
      <CardBody>
    <Row>
      <Col>Select a peer to view 360 feedback </Col>
      
      <Col>
            <Select
               // className="proj"
                //classNamePrefix="select"
                placeholder ="by Project"
                
                onChange={(e)=>this.handleProjectChange(e)}
                options={this.state.projects}/>
                

      </Col>
      <Col>
            <Select
                className="React"
                classNamePrefix="select"
                placeholder ="by Role"
                
                onChange={(e)=>this.handleRoleChange(e)}
                width='100px'
                options={this.state.roles}/>

      </Col>
      <Col>
            <Select
                className="React"
                classNamePrefix="select"
                placeholder ="by Name"
                
                 onChange={(e)=>this.handleNameChange(e)}
               
                //width='100px'
                options={this.state.projectmates}/>

      </Col>
     
     </Row>
      {
        this.state.selectedProject === ""?<div>Please select a project to load the graph</div>:
        <React.Fragment>
        <ApexRadialCharts  data={this.state.average}/>
        <Feedback getDate={(start,end)=>this.getDate(start,end)}></Feedback>
        
        </React.Fragment>
      }
      
      </CardBody>

      </Card>
      <Card>
        {
          this.state.selectedProject !== ""&&
          <ApexLineCharts data={this.state.lineGraph}></ApexLineCharts>
        }
        
      </Card>
      </React.Fragment>
    
    );
  }
}

const mapStateToProps = state => {
  return {
    projectList : state.projectList.projectList
  }
}

export default connect(mapStateToProps,null)(AllroundFeedback)

