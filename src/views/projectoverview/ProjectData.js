import React from "react"
import Chart from "react-apexcharts"
import "../../assets/scss/pages/projectdata.scss"
import internetimg from "../../assets/img/profile/pages/internet.png"
import appleimg from "../../assets/img/profile/pages/apple.png"
import tvimg from "../../assets/img/profile/pages/tv.png"
import androidimg from "../../assets/img/profile/pages/android.png"

import axios from "axios"
import config from "../../configs/properties";
import {
  toast
} from "react-toastify"
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
class ProjectData extends React.Component {
  
constructor(props){
  super(props);
  
  this.state = {
    PROJECT_OVERVIEW_INFO:null,
    projectStatus:null,
    startDate:null,
    endDate:null,
    isActive:null,
    name:null,
    description:null,
    platforminfo:null,
    allSprintPercentage:0,
    data: [],
    totalPages: 0,
    currentPage: 0,
    options: {
      labels: ['Score'],
      chart: {
        sparkline: {
          enabled: true
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1
        }
      },
      colors: ["#28c76f"],
      plotOptions: {
        radialBar: {
          size: 210,
          startAngle: -140,
          endAngle: 150,
          hollow: {
            size: "65%"
          },
          track: {
            background: "#b9c3cd",
            strokeWidth: "100%"
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: '18px',
              color: "#000"
            },
            value: {
              offsetY:6,
              color: "#000",
              fontSize: "24px",
              fontWeight: "600",
              // formatter: function(val) {
              //   return parseInt(val);
              // }
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ea5455"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      }
    },
    series: [0],
    
  }
}

componentDidMount=async()=> {
  const param={
    projectId:this.props.projectId
  }
  // this.setState({isLoading:false})
  const overViewInfo = await axios.post(config.base_url + "v1/project-overview-info", param)

 if(overViewInfo.data.result){
  this.setState({
    projectStatus:overViewInfo.data.result[0].projectStatus,
    startDate:overViewInfo.data.result[0].startDate,
    endDate:overViewInfo.data.result[0].endDate,
    isActive:overViewInfo.data.result[0].isActive,
    name:overViewInfo.data.result[0].name,
    description:overViewInfo.data.result[0].description,
    platforminfo:overViewInfo.data.result[0].platforminfo

  })
 }
 const sprintPercentage = await axios.post(config.base_url+"v1/all-sprint-percentage",param)

 if(sprintPercentage){
   this.setState({
    allSprintPercentage:sprintPercentage.data.result
   })
 }
}


  
  render() {
    let {
      options,
      series
    } = this.state
    return (
      // const seriesInfo = [this.state.allSprintPercentage];
         <div className="app_stdnew">
           <div className="prdata-chart-class">
            <Chart
              options={options}
              series={[this.state.allSprintPercentage]}
              type="radialBar"
              height={120}
              width={120}
            />
        </div>
      <div className="sprint-name">
    <span className="sprname"> {this.state.name}</span>
        <span className="sprdate_spr">{months[new Date(this.state.startDate).getMonth()] +" "+ (new Date(this.state.startDate).getDate())+"-"+ months[new Date(this.state.endDate).getMonth()] +" "+ (new Date(this.state.endDate).getDate())}</span>
        <div className="app_stdnew">
          <span className="img_spr_pr"> 
          {
          this.state.platforminfo !== null?
          this.state.platforminfo.map(_data=>
                <img className="netimg_spr" src={_data.icon} />
          ):""
          }
          </span>
          <span className="des_pr_spr">
            {this.state.description}
          </span>
        </div>

      </div>

         </div>
    )
  }
}

export default ProjectData
