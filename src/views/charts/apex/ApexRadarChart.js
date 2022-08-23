import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Chart from "react-apexcharts"

class ApexRadialCharts extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      options: {
        yaxis: {
         
          show:false
        },
        labels: ["Dependebility", "Impact", "Teamplay", "Competence", "Ownership"],
        plotOptions: {
          radar:{
            polygons:{
              connectorColors: 'transparent',
            },
            
          },
          
  
        },
        
        fill: {
         colors:["transparent"]
        },
   
      },
     
      series: [
        {
          name: "Series 1",
          data: [this.props.data.dependability,this.props.data.impact, this.props.data.teamplay, this.props.data.competence, this.props.data.ownership]
        }
      ]
    }
    
  }
  

  render() {
    console.log(this.props.data.length)
    return (
      <Card style={{"background":"none","boxShadow":"none","width":"50%","float":"left"}}>
        
        <CardBody>
          {
            this.props.data.length === undefined?
            <Chart
            options={this.state.options}
            series={[{name:"Series 1",data:[this.props.data.dependability,this.props.data.impact, this.props.data.teamplay, this.props.data.competence, this.props.data.ownership]}]}
            type="radar"
            height={350}
          />:'Loading ....'
          }
          
        </CardBody>
      </Card>
    )
  }
}
export default ApexRadialCharts
