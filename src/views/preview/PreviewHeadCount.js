import React from "react";
import { Row, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import "../../assets/scss/pages/preview.scss";
import axios from "axios";
import { getTodayHeadCount } from "../../redux/actions/dashboard";
import { connect } from "react-redux";
import moment from "moment";
import initialImg from "../../assets/img/pages/Group 166.png";
import { data } from "jquery";
class PreviewHeadCount extends React.Component {
  constructor() {
    super();
    this.state = {
      headerCount: [],
      totaluser_wfh: 0,
      initialdata: false,
    };
  }

  async componentDidMount() {
    var currentDate = moment().format("YYYY-MM-DD");
    // console.log(currentDate)
    let params = { todayDate: currentDate };
    const userOptions = await this.props.getTodayHeadCount(params);
    console.log(userOptions);
    if (userOptions.data.statusCode == 200) {
      this.setState({
        headerCount: userOptions.data.result,
      });

      if (userOptions.data.result.totalHead == 69) {
        this.setState({
          initialdata: true,
        });
      }

      // console.log(this.state.headerCount,"a")

      var wfh =
        parseInt(this.state.headerCount.DefaultLocation) +
        parseInt(this.state.headerCount.WFH);
      this.setState({
        totaluser_wfh: wfh,
      });
    }
  }
  render() {
    return (
      <div className="head_count_div" style={{ height: "400px" }}>
        <h1 className="head_count_heading"> Today’s head count</h1>
        {this.state.initialdata ? (
          <>
            <div style={{ textAlign: "center" }}>
              <img
                alt=""
                class="total_headcount_initial"
                src={initialImg}
              ></img>
            </div>

            <p style={{ textAlign: "center" }}>There are no Peers</p>
          </>
        ) : (
          <>
            <h2 className="at_office_count">{this.state.totaluser_wfh}</h2>
            <p className="at_office_text">WFH</p>
            <div className="hor_line"></div>
            <div className="head_bottom_div">
              <div className="headcount_sec_section">
                <h2 className="remote_count">
                  <span className="wfh_color">
                    {this.state.headerCount.OFFICE}
                  </span>
                </h2>
                <h2 className="at_office_text">office</h2>
              </div>
              <div className="headcount_sec_section">
                <h2 className="remote_count">
                  <span className="onfield_color">
                    {this.state.headerCount.ONFIELD}
                  </span>
                </h2>
                <h2 className="at_office_text">On field</h2>
              </div>
              <div className="headcount_sec_section">
                <h2 className="remote_count">
                  <span className="leave_color">
                    {this.state.headerCount.LEAVE}
                  </span>
                </h2>
                <h2 className="at_office_text">Leave</h2>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, {
  getTodayHeadCount,
})(PreviewHeadCount);
