import React, { Component } from "react";
import {
  Label,
  Input,
  FormGroup,
  Button,
  Row,
  Col,
  CustomInput,
} from "reactstrap";
import { X, Check } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import Flatpickr from "react-flatpickr";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import { connect } from "react-redux";
import { addSprint, updateSprint } from "../../redux/actions/sprint";
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy";
import moment from "moment";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";

import classnames from "classnames";

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, visible, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      overlay={value == 1 ? value + "\xa0" + "week" : value + "\xa0" + "weeks"}
      // visible={true}
      placement="bottom"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class ViewAllSprintsSidebar extends Component {
  state = {
    name: "",
    recurringPeriod: "",
    startDate: null,
    endDate: null,
    isRecurringActivity: false,
  };

  addNew = false;

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== null && prevProps.data === null) {
      if (this.props.data.name !== prevState.name) {
        this.setState({ name: this.props.data.name });
      }
      if (this.props.data.recurringPeriod !== prevState.recurringPeriod) {
        this.setState({
          recurringPeriod:
            this.props.data.recurringPeriod !== null
              ? this.props.data.recurringPeriod
              : "",
        });
      }
      if (this.props.data.startDate !== prevState.startDate) {
        this.setState({ startDate: this.props.data.startDate });
      }
      if (this.props.data.endDate !== prevState.endDate) {
        this.setState({ endDate: this.props.data.endDate });
      }
      if (this.props.data.isRecurring !== prevState.isRecurringActivity) {
        this.setState({ isRecurringActivity: this.props.data.isRecurring });
      }
    }
    if (this.props.data === null && prevProps.data !== null) {
      this.setState({
        name: "",
        recurringPeriod: "",
        startDate: "",
        endDate: "",
        isRecurringActivity: false,
      });
    }
    if (this.addNew) {
      this.setState({
        name: "",
        recurringPeriod: "",
        startDate: "",
        endDate: "",
        isRecurringActivity: false,
        errorName: "",
        errorStartDate: "",
        errorEndDate: "",
        errorRecurringPeriod: "",
      });
    }
    this.addNew = false;
  }

  handleSubmit = (obj) => {
    let addSprintDetails = {
      name: obj.name,
      startDate: moment(obj.startDate).format("YYYY-MM-DD"),
      endDate: !obj.isRecurringActivity
        ? moment(obj.endDate).format("YYYY-MM-DD")
        : null,
      project: this.props.projectId,
      isRecurring: obj.isRecurringActivity,
      recurringPeriod:
        obj.isRecurringActivity == true ? obj.recurringPeriod : "",
    };

    if (this.props.data !== null) {
      let updateSprintDetails = {
        ...addSprintDetails,
        sprintId: this.props.data._id,
      };

      if (!this.state.name) {
        this.setState({
          errorName: "Please fill the name",
        });
        return this.props.show;
      } else if (!this.state.startDate) {
        this.setState({
          errorStartDate: "Please select start date",
        });
        return this.props.show;
      } else if (
        this.state.isRecurringActivity == false &&
        !this.state.endDate
      ) {
        this.setState({
          errorEndDate: "Please select start date",
        });
        return this.props.show;
      } else if (
        this.state.isRecurringActivity == true &&
        !this.state.recurringPeriod
      ) {
        this.setState({
          errorRecurringPeriod: "Please select recurring period",
        });
        return this.props.show;
      } else {
        this.props.updateSprint(updateSprintDetails);
      }
    } else {
      if (!this.state.name) {
        this.setState({
          errorName: "Please fill the name",
        });
        return this.props.show;
      } else if (!this.state.startDate) {
        this.setState({
          errorStartDate: "Please select start date",
        });
        return this.props.show;
      } else if (
        this.state.isRecurringActivity == false &&
        !this.state.endDate
      ) {
        this.setState({
          errorEndDate: "Please select start date",
        });
        return this.props.show;
      } else if (
        this.state.isRecurringActivity == true &&
        !this.state.recurringPeriod
      ) {
        this.setState({
          errorRecurringPeriod: "Please select recurring period",
        });
        return this.props.show;
      } else {
        this.addNew = true;
        this.props.addSprint(addSprintDetails);
      }
    }
    // let params = Object.keys(this.props.dataParams).length
    //   ? this.props.dataParams
    //   : { page: 1, perPage: 4 }
    this.props.handleSidebar(false, true);
    // this.props.getData(params)
  };

  recurringchange(recrprd) {
    this.setState({
      recurringPeriod: recrprd,
      errorRecurringPeriod: "",
    });
  }

  clearDataOnCancel() {
    this.addNew = true;
  }

  render() {
    var handleStyle = {
      border: "2px solid #ffdc29",
      boxShadow: "0 0 5px #ffdc29",
      width: "18px",
      height: "18px",
      marginTop: "-7px",
    };

    var errorMessageStyle = {
      color: "red",
    };
    let { show, handleSidebar, data } = this.props;
    let { name, recurringPeriod, startDate, endDate, isRecurringActivity } =
      this.state;
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show,
        })}
      >
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "UPDATE DATA" : "ADD NEW SPRINT"}</h4>
          <X
            size={20}
            onClick={() => {
              handleSidebar(false, true);
              this.clearDataOnCancel();
            }}
          />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}
        >
          <FormGroup>
            <Label for="data-name" className="label-class-custom">
              Name
            </Label>
            <Input
              type="text"
              value={name}
              placeholder=""
              onChange={(e) =>
                this.setState({ name: e.target.value, errorName: "" })
              }
              id="data-name"
            />
            <span style={errorMessageStyle}>{this.state.errorName}</span>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col md="6" sm="12">
                <Label className="label-class-custom">Start Date</Label>
                <Flatpickr
                  className="form-control"
                  value={startDate}
                  options={{
                    //  minDate: "today",
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                  }}
                  onChange={(date) => {
                    this.setState({ startDate: date[0], errorStartDate: "" });
                  }}
                />
                <span style={errorMessageStyle}>
                  {this.state.errorStartDate}
                </span>
              </Col>
              {!isRecurringActivity ? (
                <Col md="6" sm="12">
                  <Label className="label-class-custom">End Date</Label>
                  <Flatpickr
                    className="form-control"
                    value={endDate}
                    options={{
                      // minDate: "today",
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d",
                    }}
                    onChange={(date) => {
                      this.setState({ endDate: date[0], errorEndDate: "" });
                    }}
                  />
                  <span style={errorMessageStyle}>
                    {this.state.errorEndDate}
                  </span>
                </Col>
              ) : (
                ""
              )}
            </Row>
          </FormGroup>
          <FormGroup>
            <div className="d-inline-block mr-1 label-class-custom">
              <Checkbox
                icon={<Check size={18} />}
                label="Is recurring activity"
                size="md"
                onChange={(e) =>
                  this.setState({ isRecurringActivity: e.target.checked })
                }
                checked={isRecurringActivity}
              />
            </div>
          </FormGroup>
          {isRecurringActivity ? (
            <FormGroup>
              <Label className="recurring-period label-class-custom">
                Recurring Period
              </Label>
              <Slider
                min={1}
                max={24}
                // defaultValue={3}
                trackStyle={{ backgroundColor: "#ffdc29" }}
                handleStyle={handleStyle}
                handle={handle}
                onChange={(e) => this.recurringchange(e)}
                value={recurringPeriod}
                // reverse={this.props.rtl === "rtl"}
                tipProps={{
                  prefixCls: "rc-slider-tooltip",
                }}
              />
              <span style={errorMessageStyle}>
                {this.state.errorRecurringPeriod}
              </span>
            </FormGroup>
          ) : (
            ""
          )}
          <FormGroup>
            <label class="custom-file-upload">
              <input type="file" accept=".xlsx, .xls, .csv" hidden />
              Upload Excel Sheet
            </label>
            <p style={{ marginTop: "1rem", color: "#000" }}>
              You can upload the Sprint Plan excel sheet or create new tasks
              later
            </p>
          </FormGroup>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button
            className="submit-button-style"
            onClick={() => this.handleSubmit(this.state)}
          >
            {data !== null ? "Update" : "Submit"}
          </Button>
          <Button
            className="ml-1 close-button-class"
            outline
            onClick={() => {
              handleSidebar(false, true);
              this.clearDataOnCancel();
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // projects:state.projects.projects
    sprints: state.sprints.sprints,
  };
};

export default connect(mapStateToProps, {
  addSprint,
  updateSprint,
})(ViewAllSprintsSidebar);
