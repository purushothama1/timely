import React, { useState } from "react";
import {
  Label,
  Input,
  FormGroup,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "rc-slider/assets/index.css";
//import revenueediticon from "../../../assets/img/revenueediticon.svg";
import Slider from "rc-slider";
import Revenue from "./revenue";
import Profitability from "./profitability";
import Enps from "./enps";
import Cnps from "./cnps";
import calendaricon from "../../../assets/img/calendaricon.svg";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class projectLevelKpi extends React.Component {
  state = {
    name: "",

    // recurringPeriod: "",
    startDate: null,
    endDate: null,
    // isRecurringActivity: false,
  };

  render() {
    return (
      <>
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-3">
              <p className="plkheading">Project-level KPIs</p>
            </div>
            <div className="col-sm-6"></div>
            <div className="col-sm-3">
              <Col>
                <Select
                  // className="proj"
                  //classNamePrefix="select"
                  placeholder="This month"
                  //   onChange={(e) => this.handleProjectChange(e)}
                  //   options={this.state.projects}
                />
              </Col>
            </div>
          </div>
        </div>
        <h2 className="projname">Haplomind</h2>

        <div className="tabs">
          <Tabs>
            <Tab label="Revenue">
              <Revenue />
            </Tab>
            <Tab label="Profitability">
              <Profitability />
            </Tab>
            <Tab label="eNPS">
              <Enps />
            </Tab>
            <Tab label="cNPS">
              <div>
                <Cnps />
              </div>
            </Tab>
            <Tab label="Self management">
              <div>
                <p>Tab 5 content</p>
              </div>
            </Tab>
            <Tab label="Thought leadership">
              <div>
                <p>Tab 6 content</p>
              </div>
            </Tab>
          </Tabs>
        </div>
      </>
    );
  }
}

class Tabs extends React.Component {
  state = {
    activeTab: this.props.children[0].props.label,
  };
  changeTab = (tab) => {
    this.setState({ activeTab: tab });
  };
  render() {
    let content;
    let buttons = [];
    return (
      <div>
        {React.Children.map(this.props.children, (child) => {
          buttons.push(child.props.label);
          if (child.props.label === this.state.activeTab)
            content = child.props.children;
        })}

        <TabButtons
          activeTab={this.state.activeTab}
          buttons={buttons}
          changeTab={this.changeTab}
        />
        <div className="tab-content">{content}</div>
      </div>
    );
  }
}

const TabButtons = ({ buttons, changeTab, activeTab }) => {
  return (
    <div className="tab-buttons">
      {buttons.map((button) => {
        return (
          <button
            className={button === activeTab ? "active" : ""}
            onClick={() => changeTab(button)}
          >
            {button}
          </button>
        );
      })}
    </div>
  );
};

const Tab = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default projectLevelKpi;
