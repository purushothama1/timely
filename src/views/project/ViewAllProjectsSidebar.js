import React, { Component } from "react"
import { Label, Input, FormGroup, Button, Row, Col, } from "reactstrap"
import { X, Check } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import Flatpickr from "react-flatpickr";
import Tooltip from "rc-tooltip"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import 'rc-tooltip/assets/bootstrap.css';
import classnames from "classnames"
import Slider from "rc-slider"
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy";
import 'rc-slider/assets/index.css';
import { addProjectData, allteammembers, updateProjectData } from "../../redux/actions/projects";
import { fetchAllProjects } from "../../redux/actions/sidemenu"
import { connect } from "react-redux"
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Handle = Slider.Handle;

const animatedComponents = makeAnimated()

let companyid = {
  "company": localStorage.getItem('company'),
  "token": localStorage.getItem('token'),
}


const handle = props => {

  const { value, dragging, index, ...restProps } = props
  return (
    <Tooltip
      overlay={value == 1 ? value + '\xa0' + "month" : value + '\xa0' + "months"}
      visible={dragging}
      placement="bottom"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  )
}

class ViewAllProjectsSidebar extends Component {
  state = {
    id: "",
    name: "",
    description: "",
    projectStatus: "",
    platform: null,
    startDate: "",
    endDate: "",
    recurring: false,
    recurringperiod: "",
    manager: null,
    members: null,
    fetchallteam: [],
    fetchallmangers: [],
    fetchallplatforms: []
  }

  addNew = false

  async componentDidMount() {
    const allteam = await this.props.allteammembers(companyid)

    if (allteam != undefined) {
      this.setState({
        fetchallteam: [...allteam.data.members.map((alltmMbrs) => ({
          "label": alltmMbrs.name + " " + "/" + alltmMbrs.role.role, "value": alltmMbrs._id
        }))],
        fetchallmangers: [...allteam.data.managers.map((alltmMangr) => ({
          "label": alltmMangr.name, "value": alltmMangr._id
        }))],
        fetchallplatforms: [...allteam.data.platforms.map((alltmpltfrms) => ({
          "label": alltmpltfrms.platform, "value": alltmpltfrms._id
        }))],
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== null && prevProps.data === null) {
      if (this.props.data.id !== prevState.id) {
        this.setState({ id: this.props.data.id })
      }
      if (this.props.data.name !== prevState.name) {
        this.setState({ name: this.props.data.name })
      }
      if (this.props.data.description !== prevState.description) {
        this.setState({ description: this.props.data.description })
      }
      //   if (this.props.data.popularity.popValue !== prevState.popularity) {
      //     this.setState({
      //       popularity: {
      //         ...this.state.popularity,
      //         popValue: "75"
      //       }
      //     })
      //   }
      if (this.props.data.projectStatus !== prevState.projectStatus) {
        this.setState({ projectStatus: this.props.data.projectStatus })
      }
      if (this.props.data.platform !== prevState.platform) {
        this.setState({ platform: this.props.data.platform.map((plft) => ({ "label": plft.platform, "value": plft._id })) })
      }
      if (this.props.data.startDate !== prevState.startDate) {
        this.setState({ startDate: this.props.data.startDate })
      }
      if (this.props.data.endDate !== prevState.endDate) {
        this.setState({ endDate: this.props.data.endDate })
      }
      if (this.props.data.recurring !== prevState.recurring) {
        this.setState({ recurring: this.props.data.recurring })
      }
      if (this.props.data.recurringperiod !== prevState.recurringperiod) {
        this.setState({ recurringperiod: this.props.data.recurringperiod })
      }
      if (this.props.data.manager !== prevState.manager) {
        this.setState({ manager: this.props.data.manager.map((mbmr) => ({ "label": mbmr.name, "value": mbmr._id })) })
      }
      if (this.props.data.members !== prevState.members) {
        this.setState({ members: this.props.data.members.map((mbmr) => ({ "label": mbmr.name, "value": mbmr._id })) })
      }
    }
    if (this.props.data === null && prevProps.data !== null) {
      this.setState({
        name: "",
        description: "",
        projectStatus: "",
        platform: null,
        startDate: "",
        endDate: "",
        recurring: false,
        recurringperiod: "",
        manager: "",
        members: null,
      })
    }
    if (this.addNew) {
      this.setState({
        name: "",
        description: "",
        projectStatus: "",
        platform: null,
        startDate: "",
        endDate: "",
        recurring: false,
        recurringperiod: "",
        manager: "",
        members: null,
        errorname: "",
        errordescription: "",
        errorprojectStatus: "",
        errorstartdate: "",
        errorenddate: "",
        errorRecurringperiod: "",
        errorplatform: "",
        errorprojectmanager: "",
        errorprojectTeamMember: ""
      })
    }
    this.addNew = false
  }

  handleSubmit = async obj => {

    let fetchobj = {
      name: obj.name,
      description: obj.description,
      projectStatus: obj.projectStatus,
      platforms: obj.platform != null ? obj.platform.map((pltformid) => pltformid.value) : [],
      startDate: obj.startDate,
      endDate: obj.recurring == false ? obj.endDate : "",
      isRecurring: obj.recurring,
      recurringPeriod: obj.recurring == true ? obj.recurringperiod.toString() : "",
      manager: obj.manager != null ? obj.manager.map((managerid) => managerid.value) : [],
      members: obj.members != null ? obj.members.map((membersid) => membersid.value) : [],
      company: localStorage.getItem('company'),
      "token": localStorage.getItem('token'),
    }
    let projectupdatesubmit = { ...fetchobj, "project": obj.id }
    if (this.props.data !== null) {
      if (!this.state.name) {
        this.setState({
          errorname: "please fill the name",
        })
        return this.props.show
      }
      else if (!this.state.description) {
        this.setState({
          errordescription: "please fill the description",
        })
        return this.props.show
      }
      else if (!this.state.projectStatus) {
        this.setState({
          errorprojectStatus: "please fill the projectStatus",
        })
        return this.props.show
      }
      else if (!this.state.startDate) {
        this.setState({
          errorstartdate: "please fill the startdate",
        })
        return this.props.show
      }
      else if (this.state.recurring == false && !this.state.endDate) {
        this.setState({
          errorenddate: "please fill the endDate",
        })
        return this.props.show
      }
      else if (this.state.recurring == true && !this.state.recurringperiod) {
        this.setState({
          errorRecurringperiod: "please fill the recurring period",
        })
        return this.props.show
      }
      else if (this.state.platform == null) {
        this.setState({
          errorplatform: "please fill the platform",
        })
        return this.props.show
      }
      else if (!this.state.manager) {
        this.setState({
          errorprojectmanager: "please fill the project manager",
        })
        return this.props.show
      }
      else if (this.state.members == null) {
        this.setState({
          errorprojectTeamMember: "please fill the team members",
        })
        return this.props.show
      } else {
        this.props.updateProjectData(projectupdatesubmit)
      }
    } else {
      if (!this.state.name) {
        this.setState({
          errorname: "please fill the name",
        })
        return this.props.show
      }
      else if (!this.state.description) {
        this.setState({
          errordescription: "please fill the description",
        })
        return this.props.show
      }
      else if (!this.state.projectStatus) {
        this.setState({
          errorprojectStatus: "please fill the projectStatus",
        })
        return this.props.show
      }
      else if (!this.state.startDate) {
        this.setState({
          errorstartdate: "please fill the startdate",
        })
        return this.props.show
      }
      else if (this.state.recurring == false && !this.state.endDate) {
        this.setState({
          errorenddate: "please fill the endDate",
        })
        return this.props.show
      }
      else if (this.state.recurring == true && !this.state.recurringperiod) {
        this.setState({
          errorRecurringperiod: "please fill the recurring period",
        })
        return this.props.show
      }
      else if (this.state.platform == null) {
        this.setState({
          errorplatform: "please fill the platform",
        })
        return this.props.show
      }
      else if (!this.state.manager) {
        this.setState({
          errorprojectmanager: "please fill the project manager",
        })
        return this.props.show
      }
      else if (this.state.members == null) {
        this.setState({
          errorprojectTeamMember: "please fill the team members",
        })
        return this.props.show
      }
      else {
        this.addNew = true
        await this.props.addProjectData(fetchobj)
        await this.props.fetchAllProjects()
      }
    }
    let params = Object.keys(this.props.dataParams).length
      ? this.props.dataParams
      : { page: 1, perPage: 4 }
    this.props.handleSidebar(false, true)
    this.props.getData(params)
    setTimeout(function () { window.location.reload(false) }, 4000);
  }

  projectname(e) {

    this.setState({
      name: e.target.value,
      errorname: ""
    })
  }

  projectdescription(e) {

    this.setState({
      description: e.target.value,
      errordescription: ""
    })
  }

  projectStatuschange(e) {

    this.setState({
      projectStatus: e.target.value,
      errorprojectStatus: ""
    })
  }

  checkboxtick(e) {

    this.setState({
      recurring: e.target.checked,
      errorenddate: ""
    })
  }

  recurringchange(recrprd) {

    this.setState({
      recurringperiod: recrprd,
      errorRecurringperiod: ""
    })
  }

  projectmanager(mngrdata) {

    this.setState({
      manager: mngrdata,
      errorprojectmanager: ""
    })
  }

  projectTeamMembers(mbrsdata) {

    this.setState({
      members: mbrsdata,
      errorprojectTeamMember: ""
    })
  }

  projectplatform(ptfrmdata) {

    this.setState({
      platform: ptfrmdata,
      errorplatform: ""
    })
  }

  clearDataOnCancel() {
    this.addNew = true
  }

  render() {
    var handleStyle = {
      border: "2px solid #ffdc29",
      boxShadow: "0 0 5px #ffdc29",
      width: "18px",
      height: "18px",
      marginTop: "-7px"
    }
    var errormsgshowstyle = {
      color: "red",
    }
    let { show, handleSidebar, data } = this.props
    let { name, description, projectStatus, platform, startDate, endDate, recurring, recurringperiod, manager, members } = this.state
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show
        })}>
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "UPDATE DATA" : "ADD NEW PROJECT"}</h4>
          <X size={20} onClick={() => { handleSidebar(false, true); this.clearDataOnCancel() }} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3 scroll-div-wrsp"
          options={{ wheelPropagation: false }}
        >
          <FormGroup>
            <Label for="data-name">Name</Label>
            <Input
              type="text"
              value={name}
              placeholder=""
              onChange={this.projectname.bind(this)}
              id="data-name"
            />
            <span className="errormsgshow" style={errormsgshowstyle}>
              {this.state.errorname}
            </span>
          </FormGroup>
          <FormGroup>
            <Label for="data-description">Description</Label>
            <Input
              type="text"
              value={description}
              placeholder=""
              onChange={this.projectdescription.bind(this)}
              id="data-description"
            />
            <span className="errormsgshow" style={errormsgshowstyle}>
              {this.state.errordescription}
            </span>
          </FormGroup>
          <FormGroup>
            <Label for="data-popularity">Project status</Label>
            <Input
              type="select"
              id="data-status"
              value={projectStatus}
              onChange={this.projectStatuschange.bind(this)}>
              <option value="All" selected="false" style={{ display: "none" }}></option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Delivered">Delivered</option>
              <option value="On Hold">On Hold</option>
            </Input>
            <span className="errormsgshow" style={errormsgshowstyle}>
              {this.state.errorprojectStatus}
            </span>
          </FormGroup>

          <FormGroup>
            <div className="d-inline-block mr-1">
              <Checkbox
                icon={<Check size={18} />}
                defaultChecked={false}
                label="Is recurring activity"
                size="md"
                onChange={e => this.checkboxtick(e)}
                checked={recurring}
              />
            </div>
          </FormGroup>

          <FormGroup>
            <Row>
              <Col md="6" sm="12">
                <Label for="data-category">Start Date</Label>
                <Flatpickr
                  className="form-control"
                  value={startDate}
                  options={{
                    // minDate: "today",
                    altInput: true, altFormat: "F j, Y", dateFormat: "Y-m-d", allowInput: true
                  }}
                  onChange={date => {
                    this.setState({ startDate: date, errorstartdate: "" });
                  }}
                />
                <span className="errormsgshow" style={errormsgshowstyle}>
                  {this.state.errorstartdate}
                </span>
              </Col>
              {
                recurring == false ?
                  <Col md="6" sm="12">
                    <Label for="data-category">End Date</Label>
                    <Flatpickr
                      className="form-control"
                      value={endDate}
                      options={{
                        //  minDate: "today",
                        altInput: true, altFormat: "F j, Y", dateFormat: "Y-m-d",
                      }}
                      onChange={date => {
                        this.setState({ endDate: date, errorenddate: "" });
                      }}
                    />
                    <span className="errormsgshow" style={errormsgshowstyle}>
                      {this.state.errorenddate}
                    </span>
                  </Col>
                  : ""
              }
            </Row>
          </FormGroup>

          {
            recurring == true ?
              <FormGroup>
                <Label className="recurring-period">Recurring Period</Label>
                <Slider
                  min={1}
                  max={20}
                  defaultValue={0}
                  trackStyle={{ backgroundColor: "#ffdc29" }}
                  handleStyle={handleStyle}
                  handle={handle}
                  reverse={this.props.rtl === "rtl"}
                  tipProps={{
                    prefixCls: "rc-slider-tooltip"
                  }}
                  onChange={e => this.recurringchange(e)}
                  value={recurringperiod}
                />
                <span className="errormsgshow" style={errormsgshowstyle}>
                  {this.state.errorRecurringperiod}
                </span>
              </FormGroup>
              : ""
          }

          <FormGroup>
            <Label for="data-status">Platform</Label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={platform}
              isMulti
              options={this.state.fetchallplatforms}
              className="React"
              classNamePrefix="select"
              onChange={this.projectplatform.bind(this)}
            />
            <span className="errormsgshow" style={errormsgshowstyle}>
              {this.state.errorplatform}
            </span>
          </FormGroup>

          <FormGroup>
            <Label for="data-popularity">Project Manager</Label>
            <Select
              closeMenuOnSelect={false}
              value={manager}
              isMulti
              options={this.state.fetchallmangers}
              className="React"
              classNamePrefix="select"
              onChange={this.projectmanager.bind(this)}
            />
            <span className="errormsgshow" style={errormsgshowstyle}>
              {this.state.errorprojectmanager}
            </span>
          </FormGroup>
          <FormGroup>
            <Label for="data-popularity">Team Members</Label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              //defaultValue={[{ "label": 'All Team members', "value": 'all' }]}
              isMulti
              options={this.state.fetchallteam}
              className="React"
              classNamePrefix="select"
              onChange={this.projectTeamMembers.bind(this)}
              value={members}
            />
            <span className="errormsgshow" style={errormsgshowstyle}>
              {this.state.errorprojectTeamMember}
            </span>
          </FormGroup>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button color="primary" onClick={() => this.handleSubmit(this.state)}>
            <ToastContainer autoClose={5000} />
            {data !== null ? "Update" : "Submit"}
          </Button>
          <Button
            className="ml-1"
            color="danger"
            outline
            onClick={() => { handleSidebar(false, true); this.clearDataOnCancel() }}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {

  return {
    projects: state.projects.projects
  }
}

export default connect(mapStateToProps, {
  addProjectData,
  updateProjectData,
  allteammembers,
  fetchAllProjects

})(ViewAllProjectsSidebar)
