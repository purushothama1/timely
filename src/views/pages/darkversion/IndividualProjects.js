import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import RadarChart from "../kpi/KpiRadarCharts";
import { Radar } from "react-chartjs-2";
import Slider from "react-slick";
import DetailChart from "./DetailChart";
import random from "../../../assets/img/avatar1.jpg"

const IndividualProjects = ({ singleProjects }) => {
  const projects = useSelector((state) => state?.kpidata?.allProjects);

  const [revenue, setRevenue] = useState(null)
  const [profit, setProfit] = useState(null)


  // const chartData = {
  //   labels: ["Revenue", "Profitability", "eNPS", "cNPS", "Self Mgmt"],
  //   datasets: [
  //     {
  //       fillColor: "red",
  //       strokeColor: "rgba(2  55,255,255,1)",
  //       pointColor: "rgba(220,220,220,1)",
  //       pointStrokeColor: "#fff",
  //       data: [8, 9, 8, 9, 3],
  //       backgroundColor: "#C0A278",
  //       borderColor: "transparent",
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  useEffect(()=>{
    dataSort()
  },[singleProjects])

  const dataSort=()=>{
    let revenues=singleProjects?.achievedRevenue/singleProjects?.projectRevenue*10;
    let profitability=singleProjects?.achievedProfit/10;

    if(profitability>10) {
      setProfit(10)
    }
    else if(profitability<0) {
      setProfit(0)
    } else{
      setProfit(profitability)
    }
    if(revenues>10){
      setRevenue(10)
    }else if(revenues<0){
      setRevenue(0)
    }else {
      setRevenue(revenues)
    }
  }

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 1000,
    cssEase: "linear",
  };

  return (
    <div>
      <div className="col-sm-12">
        <div className="row teamdiv">
          <div className="col-sm-4">
            <p className="tvprojectname">{singleProjects?.project?.name}</p>

            <div className="slider-image-wrapper">
              <p className="teamhead">Team</p>
              <Slider {...settings}>
                {singleProjects?.teamMembers?.map((member) => (
                  <img
                    className="teamimg"
                    src={member?.profilePic?member?.profilePic:random}
                    key={member?.employeeId}
                  />
                ))}
              </Slider>
            </div>
          </div>
          <div className="col-sm-2">
            <p className="kpihead">KPIs</p>
            <p className="kpisubhead">Revenue</p>
            <p className="kpisubhead">Profitability</p>
            <p className="kpisubhead">eNPS</p>
            <p className="kpisubhead">cNPS</p>
            <p className="kpisubhead">Self Management</p>
          </div>
          <div className="col-sm-2">
            <p className="kpihead">
              <br />
            </p>
            <p className="kpisubhead data-color">
              <span>&#8377;</span> {singleProjects?.achievedRevenue}
            </p>
            <p className="kpisubhead data-color">
              {singleProjects?.achievedProfit}%
            </p>
            <p className="kpisubhead data-color">
              {singleProjects?.achievedENPS}/10
            </p>
            <p className="kpisubhead data-color">
              {singleProjects?.achievedCNPS}/10
            </p>
            <p className="kpisubhead data-color">9/10</p>
          </div>

          <div className="col-sm-4">
            
          <DetailChart dataone={[revenue,profit,singleProjects?.achievedENPS,singleProjects?.achievedCNPS,9]}/>

            {/* <Radar
              data={chartData}
              options={{
                maintainAspectRatio: false,
                legend: false,
                scale: {
                  gridLines: {
                    color: "transparent",
                  },
                  pointLabels: {
                    fontSize: 12,
                    fontColor:"#CDD2D7",
                  },
                  ticks: {
                    suggestedMin: 0,
                    suggestedMax: 10,
                    display: false,
                    maxTicksLimit: 5,
                  },
                },
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProjects;
