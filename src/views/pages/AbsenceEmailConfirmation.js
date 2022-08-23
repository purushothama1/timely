import React from "react";
import {AbsenceEmail} from "../../redux/actions/absenceEmail"
import { connect } from "react-redux"
import queryString from 'query-string'
import { history } from "../../history"
import ThankYouImage from "../../../src/assets/img/ThankYou.png"
import "../../../src/assets/scss/pages/absence-confirm.scss"

class AbsenceEmailConfirmation extends React.Component{

    constructor(){
        super();
        this.state={
            thankYou: false
        }
    }

onButtonCLick=async(response)=>{

    const value=queryString.parse(this.props.location.search);
    let decodedData = JSON.parse(Buffer.from(value.data, 'base64').toString());
    let params={
        "user": localStorage.getItem("user"),
        "peerEmailId": decodedData.peer,
        "response": response,
        "fromDate": decodedData.from,
        "toDate": decodedData.to,
        "token":localStorage.getItem('token'),
    }
    const absenceEmailResult = await this.props.AbsenceEmail(params)
    if(absenceEmailResult.data.statusCode = 200){
        this.setState({
            thankYou: true
        })
    }
}

onClickDone (){
    localStorage.getItem("user") === null?
    history.push('/')
    :
    history.push('/dashboard')
}
  render(){
    return(
      <div className="div-wrap">
        <div style={{display: "inline-block"}}>
        {!this.state.thankYou?
                <div>
                    <div className="heading">
                        Are you happy with this peer’s decision?
                    </div>
                    <div className="all-good" onClick={()=>this.onButtonCLick("positive")}>
                        Ok, all good!
                    </div>
                    <div className="manage" onClick={()=>this.onButtonCLick("neutral")}>
                        Ok, can manage. Yet, can it be reconsidered?
                    </div>
                    <div className="unsure" onClick={()=>this.onButtonCLick("negative")}>
                        Bit unsure. Can we please discuss this?
                    </div>
                </div>
           :
           <div>
                <div className="thank-you-div">
                    Thank you for the feedback!<br/> Peer will be notified.
                </div>
                <div className="thank-you-image">
                    <img src={ThankYouImage}/>
                </div>
                <div className="done-button" onClick={this.onClickDone}>
                    Done
                </div>
            </div>
            }
        </div>
    </div>
    );
  }
}

const mapStateToProps = state => {
    return {}
  }
  
  export default connect(mapStateToProps, {
    AbsenceEmail
  })(AbsenceEmailConfirmation)