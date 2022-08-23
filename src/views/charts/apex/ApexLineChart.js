import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Chart from "react-apexcharts"

class ApexLineCharts extends React.Component {
  state = {
    options: {
      chart: {
        id: "lineChart"
      },
      xaxis: {
        categories: [
          "Jan 2021",
          "Feb 2021",
          "Mar 2021",
          "Apr 2021",
          "May 2021",
          "Jun 2021",
          "Jul 2021",
          "Aug 2021",
          "Sep 2021"
        ]
      },
      yaxis:{
        labels:{
          show:false
        },
        axisBorder:{
          show:true
        }
      },
      legend:{
        show:true,
        inverseOrder:false,
        position:'right', offsetY: 70
      },
      stroke: {
        curve: "straight",
        width: [1,1,1,1]
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "Showing data by parameter for the last 6 months",
        align: "left"
      },
      colors: this.props.themeColors,
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      }
    }
    
  }
  componentDidMount=()=>{
    
  }

  render() {
    return (
      <Card style={{"background":"none","boxShadow":"none","width":"50%","float":"left"}}>
        
        <CardBody>
          <Chart
            options={this.state.options}
            series={this.props.data.length > 0?[{name:"Dependability",data:[...this.props.data.map(d=>d.dependability)]},
                                                {name:"Competence",data:[...this.props.data.map(d=>d.competence)]},
                                                {name:"Ownership",data:[...this.props.data.map(d=>d.ownership)]},
                                                {name:"Teamplay",data:[...this.props.data.map(d=>d.teamplay)]},
                                                {name:"Impact",data:[...this.props.data.map(d=>d.impact)]}]:[]}
            type="line"
            height={350}
          />
        </CardBody>
      </Card>
    )
  }
}
export default ApexLineCharts
