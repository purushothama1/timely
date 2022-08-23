import React from "react";
import ReactApexChart from "react-apexcharts";
import OnGoingProjectsScore from "../preview/OnGoingProjectsScore";
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
  CardHeader,
  CardTitle,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import avatar1 from "../../assets/img/portrait/small/avatar-s-5.jpg";
import avatar2 from "../../assets/img/portrait/small/avatar-s-7.jpg";
import avatar3 from "../../assets/img/portrait/small/avatar-s-10.jpg";
import avatar4 from "../../assets/img/portrait/small/avatar-s-8.jpg";
import avatar5 from "../../assets/img/portrait/small/avatar-s-1.jpg";
import avatar6 from "../../assets/img/portrait/small/avatar-s-2.jpg";
import avatar7 from "../../assets/img/portrait/small/avatar-s-3.jpg";
import avatar8 from "../../assets/img/portrait/small/avatar-s-4.jpg";

import Chart from "react-apexcharts";
import { ChevronsRight, ChevronDown } from "react-feather";
import "../../assets/scss/pages/preview.scss";
import { getOngoingProjects } from "../../redux/actions/dashboard";
import { connect } from "react-redux";
import moment from "moment";
import loginImage from "../../assets/img/pages/Group 178.png";
import axios from "axios";

let $primary = "#9958B5",
  $success = "#F9CA24",
  $danger = "#D77564",
  $warning = "#FF9F43",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $stroke_color = "#b9c3cd",
  $label_color = "#e7eef7",
  $info = "#00cfe8",
  $label_color_light = "#dae1e7";

let themeColors = [$primary, $success, $danger, $warning, $info];

class OnGoingProjects extends React.Component {
  constructor() {
    super();
    this.state = {
      ongoingprojects: [],
      initialdata: false,
      picurl: "",
    };
  }

  async componentDidMount() {
    const onGoingProjects = await this.props.getOngoingProjects();
    console.log(onGoingProjects);
    if (onGoingProjects == undefined) {
    } else if (onGoingProjects.data.statusCode == 200) {
      this.setState({
        ongoingprojects: onGoingProjects.data.result,
        initialdata: true,
      });
    }
    if (
      onGoingProjects.data.result.length <= 0 &&
      onGoingProjects.data.result !== undefined
    ) {
      this.setState({
        initialdata: true,
      });
    }
  }
  render() {
    return (
      <Card className="project-overview">
        <CardHeader className="pb-1">
          <CardTitle>Ongoing projects </CardTitle>
        </CardHeader>
        <Table
          style={{}}
          responsive
          className="dashboard-table table-hover-animation mb-0 mt-1 overflowx-hidden"
        >
          {!this.state.initialdata ? ( //if we remove ! here it will render image here http://localhost:3000/preview
            <>
              <div style={{ textAlign: "center" }}>
                <img alt="" className="ongoing_initial_data" src={loginImage}></img>
              </div>

              <p className="ongoing_initial_data1">
                There are no Ongoing Projects
              </p>
            </>
          ) : (
            <>
              <thead>
                <tr>
                  <th className="oname ">NAME</th>
                  <th className="oname pr-4">TEAM</th>
                  <th className="oname pl-0">SCORE</th>
                  <th className="oname pl-0" style={{ minWidth: "100px" }}>
                    START DATE
                  </th>
                  <th className="oname pl-0" style={{ minWidth: "150px" }}>
                    EST. DELIVERY DATE
                  </th>
                </tr>
              </thead>

              <tbody>
                {this.state.ongoingprojects.map((a) => {
                  return (
                    <tr>
                      <td className=" group-41 pl-1">{a?.project?.name} </td>

                      <td
                        className="p-1"
                        style={{ backgroundColor: "#F8F8F8" }}
                      >
                        <ul className="list-unstyled users-list m-0 d-flex ">
                          <li className="avatar pull-up ">
                            {a.user.slice(0, 4).map((pic) => {
                              return (
                                <>
                                  <img
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                                    }}
                                    src={pic.profilePic}
                                    alt={pic.name}
                                    height="30"
                                    width="30"
                                    id={`btn-${pic._id}`}
                                  />
                                  <UncontrolledTooltip
                                    placement="bottom"
                                    target={`btn-${pic._id}`}
                                  >
                                    {pic.name}
                                  </UncontrolledTooltip>
                                </>
                              );
                            })}
                          </li>
                          <span className="pt-2 ">
                            {a.user.length > 4 ? "+" : null}
                            {a.user.length > 4
                              ? +a.user.length - 4 + "..more"
                              : null}
                          </span>
                        </ul>
                      </td>
                      <td
                        className="ogps_padding pl-0"
                        style={{ backgroundColor: "#F8F8F8" }}
                      >
                        <OnGoingProjectsScore
                          strokeColor={$stroke_color}
                          success={$success}
                          series={Math.floor(a.score)}
                        />
                      </td>

                      <td className="group-41">
                        {moment(a.project.startDate).format("L")}
                      </td>
                      <td className="group-41 pl-0">
                        {moment(a.project.endDate).format("L")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </>
          )}
        </Table>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, {
  getOngoingProjects,
})(OnGoingProjects);
