import React from 'react'
import { Row, Col } from 'reactstrap'
import queryString from 'query-string'
import ReactApexChart from 'react-apexcharts'
import '../../assets/scss/pages/projectdata.scss'
import axios from 'axios'
import config from '../../configs/properties'
var PLANNED_DATA = []
var ACTUAL_DATA = []
var CATEGORIES = []
class ProjectPlannedGraph extends React.PureComponent {
   constructor(props) {
      super(props)

      this.state = {
         series: [
            {
               name: 'PLANNED',
               data: [0],
            },
            {
               name: 'ACTUAL',
               data: [0],
            },
         ],
         options: {
            chart: {
               type: 'bar',
               height: 350,
            },
            colors: this.props.themeColors,
            plotOptions: {
               bar: {
                  horizontal: false,
                  columnWidth: '35%',
                  endingShape: 'flat',
               },
            },
            dataLabels: {
               enabled: false,
            },
            stroke: {
               show: true,
               width: 2,
               colors: ['transparent'],
            },
            xaxis: {
               categories: CATEGORIES,
               labels: {
                  show: false,
               }
            },
            // yaxis: {
            //   title: {
            //     text: '$ (thousands)'
            //   }
            // },
            fill: {
               opacity: 1,
            },
            tooltip: {
               y: {
                  formatter: function (val) {
                     return  val + ' tasks'
                  },
               },
            },
            tooltip: {
               x: {
                  formatter: function (val) {
                     return  val 
                  },
               },
            },
         },
      }
   }
   componentDidMount = async () => {
      const param = {
         projectId: this.props.projectId,
      }


      const actualVsPlanned = await axios.post(
         config.base_url +
            'v1/project-over-view-planned-vs-actual-sprint-tasks',
         param
      ),
      ACTUAL_DATA=[],
      PLANNED_DATA=[],
      CATEGORIES=[];

      if (actualVsPlanned.data.result) {
         const _data = actualVsPlanned.data.result.map((_info) => {
            ACTUAL_DATA.push(_info.completedTaskStatus)
            PLANNED_DATA.push(_info.totalTasks)
            CATEGORIES.push(_info.sprint.name)
         })
         const _series_data = [
            {
               name: 'PLANNED',
               data: PLANNED_DATA,
            },
            {
               name: 'ACTUAL',
               data: ACTUAL_DATA,
            },
         ]

         this.setState({
            series: _series_data,
         })
      }
   }

   render() {
      return (
         <div className="srint_chart" id="bar_spr_chart">
            <div id="chart">
               <ReactApexChart
                  options={this.state.options}
                  series={this.state.series}
                  type="bar"
                  height={280}
               />
            </div>
         </div>
      )
   }
}

export default ProjectPlannedGraph
