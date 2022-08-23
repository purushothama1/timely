import React from 'react'
import Flatpickr from "react-flatpickr";
import moment from 'moment'
import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"

import {Container,Row,Col} from 'reactstrap'
class Feedback extends React.Component{
    constructor() {
        super();
    
        this.state = {
          startDate: new Date(),
          endDate:new Date()
        };
      }
      changeStartDate=(date)=>{
        this.setState({
            startDate:date
        },()=>{
          this.props.getDate(this.state.startDate,this.state.endDate)
        })
      }
      changeEndDate=(date)=>{
        this.setState({
            endDate:date
        },()=>{
        
            this.props.getDate(this.state.startDate,this.state.endDate)
        })
      }
    render()
    {
        const {startDate,endDate}=this.state
        return (<Container className="p-4" style={{"width":"50%","float":"left"}}>
        <Row>
            <Col> <Flatpickr
        className="form-control"
        value={startDate}
        onChange={(date)=>this.changeStartDate(date)}
      /></Col>
            <Col> <Flatpickr
        className="form-control"
        value={endDate}
        onChange={(date)=>this.changeEndDate(date)}
      /></Col>
        </Row>
  </Container>)
    }
   
}

export default Feedback