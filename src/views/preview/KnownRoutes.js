import React from "react"
import { Row, Col } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import Chart from "react-apexcharts"
import "../../assets/scss/pages/preview.scss"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"



class KnownRoutes extends React.Component {

    state = {
        options: {
          colors: this.props.themeColors,
          labels: ["Team A", "Team B", "Team C", "Team D"],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 350
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        },
        series: [44, 55, 13, 43]
      }
    
      render() {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Routes (known vs. new)              </CardTitle>
            </CardHeader>
            <CardBody>
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="pie"
                height={350}
              />
            </CardBody>
          </Card>
        )
      }

}  //class


export default KnownRoutes