import React, { Component } from "react"
import { Label, Input, FormGroup, Button, Row, Col, CustomInput} from "reactstrap"
import { X, Check } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import Flatpickr from "react-flatpickr";
import Tooltip from "rc-tooltip"
import Slider from "rc-slider"
import Select from "react-select"
import {companyRolesPeers, addTask, fetchCompanyActivities, updateTask} from "../../redux/actions/task"
import { connect } from "react-redux"
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";

import classnames from "classnames";

const Handle = Slider.Handle;

const handle = props => {

  const { value, dragging, index, ...restProps } = props
  return (
    <Tooltip
      overlay={value == 1? value + '\xa0' + "hr": value  + '\xa0' +  "hrs"}
      // visible={dragging}
      placement="bottom"
      key={index}
    >
      <Handle value={value} {...restProps}/>
    </Tooltip>
  )
}

class ViewAllTaskSidebar extends Component {
  state = {
    taskFunctionValue: "",
    activityType: "",
    crossFunction: false,
    description: "",
    taskDetailLink: "",
    estimatedTime: "",
    assignedTo: ""
  }

  addNew = false

  async componentDidMount(){
    let obj ={
      "companyId": localStorage.getItem('company'),
      "projectId": this.props.projectID,
      "token":localStorage.getItem('token'),
    }
      const companyRolesPeers = await this.props.companyRolesPeers(obj);
      
      this.setState({
        functionTypeOptions: [...companyRolesPeers.data.result.companyroles.map(options => ({"label": options.role,"value":options._id}))],
        assignedToPeerOptions: [...companyRolesPeers.data.result.projectpeers.map(options => ({"label": options.name,"value":options.emailId}))]
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== null && prevProps.data === null) {
      if (this.props.data.taskFunction !== prevState.taskFunctionValue) {
        this.setState({ taskFunctionValue: this.props.data.taskFunction })
      }
      if (this.props.data.activityType !== prevState.activityType) {
        this.setState({ activityType: this.props.data.activityType
        },async ()=>{
          let obj ={
              "companyRole": this.state.taskFunctionValue,
             "companyId": localStorage.getItem('company')
          //   "companyRole":"5e95bd9dbc99a0000769276a",
          //  "companyId":"5e95bd97bc99a0000769274e"
            }
            const activityTypeOptions = await this.props.fetchCompanyActivities(obj)
           
            this.setState({
              activityTypeDrop: activityTypeOptions.length !== 0 ?[...activityTypeOptions.map(options => ({"label": options.activityName,"value":options._id}))]: []
            })
        })
      }
      if (this.props.data.isCrossfunctional !== prevState.crossFunction) {
        this.setState({ crossFunction: this.props.data.isCrossfunctional })
      }
      if (this.props.data.description !== prevState.description) {
        this.setState({ description: this.props.data.description })
      }
      if (this.props.data.taskLink !== prevState.taskDetailLink) {
        this.setState({ taskDetailLink: this.props.data.taskLink })
      }
      if (this.props.data.estimatedTime !== prevState.estimatedTime) {
        this.setState({ estimatedTime: this.props.data.estimatedTime })
      }
      if (this.props.data.assignedTo !== prevState.assignedTo) {
        this.setState({  assignedTo: this.props.data.assignedTo})
      }
    }
    if (this.props.data === null && prevProps.data !== null) {
      this.setState({
       taskFunctionValue: "",
       activityType: "",
       crossFunction: false,
       description: "",
       taskDetailLink: "",
       estimatedTime: "",
       assignedTo: ""
      })
    }
    if (this.addNew) {
      this.setState({
       taskFunctionValue: "",
       activityType: "",
       crossFunction: false,
       description: "",
       taskDetailLink: "",
       estimatedTime: "",
       assignedTo: "",
       errorActivityName: "",
        errorTaskFunction: "",
        errorActivityType: "",
        errorEstTime: "",
      })
    }
    this.addNew = false
  }

  handleSubmit = obj => {
   
      let taskDetails = {
        "sprintId": this.props.sprintID,
        "taskType": obj.activityType,
        "taskFunction": obj.taskFunctionValue,
        "isCrossfunctional": obj.crossFunction,
        "description": obj.description,	
        "taskLink": obj.taskDetailLink,
        "estimatedtime": obj.estimatedTime,
        "assignedPeermailId": obj.assignedTo !== "" ? obj.assignedTo.emailId : null
      }
      // this.addNew = true
     
    if (this.props.data !== null) {
      let taskEditDetails = {...taskDetails, "taskId": this.props.data.task_id, "token":localStorage.getItem('token')}
      if(!this.state.description){
        this.setState({
          errorActivityName:"Please fill the activity name",
        })
        return this.props.show
      }
      else if(!this.state.taskFunctionValue){
          this.setState({
            errorTaskFunction:"Please select task function",
          })
          return this.props.show
      }
      else if(!this.state.activityType){
        this.setState({
          errorActivityType:"Please select activity type",
        })
        return this.props.show
    }
      else if(!this.state.estimatedTime){
        this.setState({
          errorEstTime:"Please select estimated time",
        })
        return this.props.show
    }
      else{
        this.props.updateTask(taskEditDetails)
      }
    } 
    else {
      if(!this.state.description){
        this.setState({
          errorActivityName:"Please fill the activity name",
        })
        return this.props.show
      }
      else if(!this.state.taskFunctionValue){
          this.setState({
            errorTaskFunction:"Please select task function",
          })
          return this.props.show
      }
      else if(!this.state.activityType){
        this.setState({
          errorActivityType:"Please select activity type",
        })
        return this.props.show
    }
      else if(!this.state.estimatedTime){
        this.setState({
          errorEstTime:"Please select estimated time",
        })
        return this.props.show
    }
      else{
        this.addNew = true
        this.props.addTask(taskDetails)
      }
    }
    // let params = Object.keys(this.props.dataParams).length
    //   ? this.props.dataParams
    //   : { page: 1, perPage: 4 }
    this.props.handleSidebar(false, true)
    setTimeout(function(){  window.location.reload(false) }, 4000);  
  }

   handleChangeTaskFunction = selectedOption => {
  
    this.setState({ taskFunctionValue: selectedOption.label, errorTaskFunction: ""},async ()=>{
      let obj ={
        "companyRole": this.state.taskFunctionValue,
       "companyId": localStorage.getItem('company')
      // "companyRole":"5e95bd9dbc99a0000769276a",
		  // "companyId":"5e95bd97bc99a0000769274e"
      }
      const activityTypeOptions = await this.props.fetchCompanyActivities(obj)
    
      this.setState({
        activityType: "",
        activityTypeDrop: activityTypeOptions.length !== 0 ?[...activityTypeOptions.map(options => ({"label": options.activityName,"value":options._id}))]: [{"label": "Others","value": "others"}]
      })
    });
  };

  handleChangeActivityFunction = selectedOption => {
    this.setState({ activityType: selectedOption.label, errorActivityType: ""});
  }

  estimatedTimeHandleChange(estTime){
    this.setState({
      estimatedTime:estTime,
      errorEstTime: ""
    })
  }

  handleChangeAssignedPeer = selectedOption => {
    this.setState({ assignedTo: {name: selectedOption.label, emailId: selectedOption.value}});
  };

  clearDataOnCancel(){
    this.addNew = true
  }

  render() {
    var handleStyle={
      border: "2px solid #ffdc29",
      boxShadow: "0 0 5px #ffdc29",
      width: "18px",
      height: "18px",
      marginTop: "-7px"
    }
    var errorMessageStyle={
      color:"red",
   }
    let { show, handleSidebar, data } = this.props
    let { description, taskDetailLink, activityType, taskFunctionValue, assignedTo, activityTypeDrop, estimatedTime, functionTypeOptions, assignedToPeerOptions, crossFunction} = this.state
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show
        })}>
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "UPDATE DATA" : "ADD NEW TASK"}</h4>
          <X size={20} onClick={() => {handleSidebar(false, true); this.clearDataOnCancel()}} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}>
            <FormGroup>
            <Label for="data-name" className="label-class-custom">Activity name</Label>
            <Input
              type="text"
              value={description}
              placeholder=""
              onChange={e => this.setState({ description: e.target.value, errorActivityName:"" })}
              id="data-name"
            />
             <span style={errorMessageStyle}>
                  {this.state.errorActivityName}
            </span>
          </FormGroup>
          <FormGroup>
            <Label className="label-class-custom">Function</Label>
            <Select
               className="React"
               classNamePrefix="select"
               value= {{"label": taskFunctionValue }}
               name="taskfunction"
               onChange={this.handleChangeTaskFunction}
               options={functionTypeOptions}/>
            <span style={errorMessageStyle}>
                {this.state.errorTaskFunction}
            </span>
          </FormGroup>
          <FormGroup>
            <Label for="data-name" className="label-class-custom">Activity type</Label>
            <Select
               className="React"
               classNamePrefix="select"
               value= {{"label": activityType }}
               name="activityType"
               onChange={this.handleChangeActivityFunction}
               options={activityTypeDrop}/>
            <span style={errorMessageStyle}>
                {this.state.errorActivityType}
            </span>
          </FormGroup>
          <FormGroup>
            <div className="d-inline-block mr-1 label-class-custom">
              <Checkbox
                icon={<Check size={18} />}
                // defaultChecked={false}
                label="Is cross-functional"
                size="md"
                onChange={e => this.setState({ crossFunction: e.target.checked})}
                checked={crossFunction}
              />
            </div>
          </FormGroup>
          
          <FormGroup>
            <Label for="data-name" className="label-class-custom">Task Detail Link (optional)</Label>
            <Input
              type="text"
              value={taskDetailLink}
              placeholder="Ex: Google docs, Invision link, Jira/Git"
              onChange={e => this.setState({ taskDetailLink: e.target.value })}
              id="taskDetailLink"
            />
          </FormGroup>
          <FormGroup>
             <Label className="recurring-period label-class-custom">Est. Time</Label>
                <Slider
                  min={1}
                  // max={20}
                  // defaultValue={3}
                  trackStyle={{backgroundColor: "#ffdc29"}}
                  handleStyle={handleStyle}
                  handle={handle}
                  reverse={this.props.rtl === "rtl"}
                  value={estimatedTime}
                  onChange={e =>this.estimatedTimeHandleChange(e)}
                  tipProps={{
                    prefixCls: "rc-slider-tooltip"
                  }}
                />
              <span style={errorMessageStyle}>
                {this.state.errorEstTime}
            </span>
          </FormGroup>
          <FormGroup>
          <Label for="data-name" className="label-class-custom">Assigned to</Label>
            <Select
               className="React"
               classNamePrefix="select"
              //  defaultValue={colourOptions[0]}
               name="assignedPeer"
               value= {{"label": assignedTo.name }}
               onChange={e =>this.handleChangeAssignedPeer(e)}
               options={assignedToPeerOptions}/>
          </FormGroup>

        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button className="submit-button-style" onClick={() => this.handleSubmit(this.state)}>
            {data !== null ? "Update" : "Submit"}
          </Button>
          <Button
            className="ml-1"
            className="close-button-class"
            outline
            onClick={() => {handleSidebar(false, true); this.clearDataOnCancel()}}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    
  }
}

export default connect(mapStateToProps, {
  companyRolesPeers,
  addTask,
  fetchCompanyActivities,
  updateTask
})(ViewAllTaskSidebar)
