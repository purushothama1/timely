import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label, 
    Row, 
    Col
  } from "reactstrap";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import {statusToStuck, predictDate, applyPredictedDate, continueActivity, recognizePeer} from "../../redux/actions/task"
import CrownIcon from "../../../src/assets/img/noun_Crown_324965.png"
import EnergyIcon from "../../../src/assets/img/noun_Energy_3267239.png"
import KnownRouteWhite from "../../../src/assets/img/known-route-white.png"
import NewRouteOrange from "../../../src/assets/img/new-route-orange.png"

import KnownRouteOrange from "../../../src/assets/img/known-route-orange.png"
import NewRouteWhite from "../../../src/assets/img/new-route-white.png"

import PeerRecognitionImage from "../../../src/assets/img/Peer-Recognition-Image.png"
import RecognizePeer from "../../../src/assets/img/Recognize-Peer.png"
import RecognizeSelf from "../../../src/assets/img/Recognize-Self.png"

import RecognizePeerWhite from "../../../src/assets/img/Recognize-Peer-White.png"
import RecognizeSelfOrange from "../../../src/assets/img/Recognize-Self-Orange.png"

import Dice from "../../../src/assets/img/dice.png"
import Calendar from "../../../src/assets/img/calendar.png"

import "../../../src/assets/scss/pages/status-modal.scss"
import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";



class StatusModal extends Component {

    constructor(props){
        super(props)
        this.state={
            startDate: '',
            endDate: '',
            predictDate: '',
            known: true,
            new: false,
            timeTaken: '',
            route: 'known',
            karmaPage: false,
            self: true,
            peer: false,
            peerList: [],
            selectedPeer: "",
            comments: ""
        }
    }

    toggleModal = () => {
            this.clearStates()
            this.props.closeModal(false)
        }

        clearStates=()=>{
            this.setState({
                startDate: '',
                endDate: '',
                predictDate: '',
                known: true,
                new: false,
                self: true,
                peer: false,
                timeTaken: '',
                route: 'known',
                karmaPage: false,
                selectedPeer: "",
                comments: ""
            })
        }
    predictDate = async() =>{
        let obj={
            "todaysDate": moment(new Date()).format("YYYY-MM-DD"),
            "optimisticDate": moment(this.state.startDate).format("YYYY-MM-DD"),
            "conservativeDate": moment(this.state.endDate).format("YYYY-MM-DD"),
            "token":localStorage.getItem('token')
        }
        let predictDateResult = await this.props.predictDate(obj)
        if(predictDateResult.statusCode == 200){
            this.setState({
                predictDate: predictDateResult.resData.predictedDate
            })
        }
    }

    applyPredictedDate =async() =>{
        let obj={
            "task": this.props.taskIdRow,
            "predictedDate": this.state.predictDate,
            "token":localStorage.getItem('token')
        }
        let applyPredictedDateResult = await this.props.applyPredictedDate(obj)
        if(applyPredictedDateResult.statusCode == 200){
            this.clearStates()
            this.props.closeModal(true)
        }
    }


     statusToStuck = async() => {
        let obj={"task": this.props.taskIdRow, "taskStatus":"stuck", "token":localStorage.getItem('token')}
        let stuckResult = await this.props.statusToStuck(obj)
        if(stuckResult.statusCode == 200){
            this.clearStates()
            this.props.closeModal(true)
        }
    }

    routeButton=(route)=>{
        this.setState({
            route: route,
            known: route == "known" ? true:false,
            new: route == "new" ? true:false
        })
    }

    recognizeButton=(recognize)=>{
        this.setState({
            route: recognize,
            self: recognize == "self" ? true:false,
            peer: recognize == "peer" ? true:false
        })
    }

    continueActivity= async ()=>{
        let obj ={
                "task": this.props.taskIdRow,
                "actualTimeTaken": this.state.timeTaken,
                "routeTaken": this.state.route,
                "user": localStorage.getItem("user"),
                "company": localStorage.getItem("company"),
                "token":localStorage.getItem('token')
        }
    let continueActivityResponse = await this.props.continueActivity(obj)
   
        if(continueActivityResponse.statusCode == 200){
            this.setState({
                karmaPoints: continueActivityResponse.resData.karmaPoints,
                peerList: continueActivityResponse.resData.peersList.map((peer)=>({
                        "label": peer.name,"value":peer._id
                      })),
                karmaPage: true
            })
        }
    }

    selectPeer= selectedOption => {
        this.setState({ selectedPeer: selectedOption.value});
      };

    recognizeFun=async()=>{
        if(this.state.self){
        var obj ={ 
            "date": moment(new Date()).format("YYYY-MM-DD"),
            "user": localStorage.getItem("user"),
            "type":"self",
            "recognizer":"",
            "points": this.state.karmaPoints,
            "task": this.props.taskIdRow,
            "comments": this.state.comments
        }
        }
        else{
            var obj ={ 
                "date": moment(new Date()).format("YYYY-MM-DD"),
                "user": this.state.selectedPeer,
                "type":"shared",
                "recognizer": localStorage.getItem("user"),
                "points": this.state.karmaPoints,
                "task": this.props.taskIdRow,
                "comments": this.state.comments,
                "token":localStorage.getItem('token')
            }
        }
       let recognizePeerResponse = await this.props.recognizePeer(obj)
       if(recognizePeerResponse.statusCode == 200){
            this.clearStates()
            this.props.closeModal(true)
       }
    }

    render(){

        const activeRouteStyle={
            background: "#FFBA55",
            boxShadow:" 0 2px 6px 2px rgba(197, 197, 197, 0.38)"
        }

        const inActiveRouteStyle={
            background: "#fff",
            border: "1px solid #FFBA55",
            boxShadow: "none"
        }


        return(
            <Modal
            isOpen={this.props.open}
            toggle={this.toggleModal}
            className="modal-dialog-centered"
            >

            {this.props.status == "stuck"?
            <div>
                <ModalHeader toggle={this.toggleModal} className="modal-header-coustom" >
                    Pro Tip
                </ModalHeader>
                <ModalBody style={{textAlign: "center"}}>
                    <p><img src={CrownIcon}/></p>
                    <p className="status-body-class">
                        Stuck? Happens! <br/>
                        We’re in this together—let’s help you solve this. 
                    </p>
                    <p className="available-div-class">
                        Click here to see who’s available to help
                    </p>
                </ModalBody>
                <ModalFooter>
                <Button className="okay-button" onClick={this.statusToStuck}>
                    Okay
                </Button>
                </ModalFooter>
            </div>
           : this.props.status == "completed" ?
           !this.state.karmaPage?
           <div>
                <ModalHeader toggle={this.toggleModal} className="modal-header-coustom" >
                    Activity Completed
                </ModalHeader>
                <ModalBody style={{textAlign: "center"}}>
                    <p><img src={EnergyIcon}/></p>
                    <p className="commendable-effort">Commendable effort!</p>
                    <p className="completed-status-body-class">
                        There’s something to learn from every <br/>experience to inform our future estimations
                    </p>
                    <div style={{width: "50%", float: "left", paddingRight: "26px"}}>
                        <div className="known-route-div-wrap" onClick={()=>this.routeButton("known")} style= {this.state.known? activeRouteStyle: inActiveRouteStyle}>
                            <img src={this.state.known ? KnownRouteWhite: KnownRouteOrange} style={{width: "81px",height: "27px"}}/>
                            <div className="known-route-div"  style={{color: this.state.known? "#fff": "#FFBA55"}}>Took a known route</div>
                        </div>
                        
                    </div>
                    <div style={{width: "50%", float: "left", paddingLeft: "26px"}}>
                        <div className="new-route-div-wrap" onClick={()=>this.routeButton("new")} style={this.state.new? activeRouteStyle: inActiveRouteStyle}>
                            <img src={this.state.new ? NewRouteWhite: NewRouteOrange}  style={{width: "81px",height: "27px"}}/>
                            <div className="new-route-div" style={{color: this.state.new? "#fff": "#FFBA55"}}>Took a new route</div>
                        </div>
                    </div>
                    <p className="duration-div">
                        What duration do you attribute to this activity?
                    </p>
                    <div className="duration-input-div">
                        <Input type="number" id="basicInput" value = {this.state.timeTaken} placeholder="Enter time (in hours)" onChange={e=>this.setState({timeTaken: e.target.value})}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button className="okay-button" onClick={()=>this.continueActivity()} disabled={this.state.timeTaken ==""}>
                    Continue
                </Button>
                </ModalFooter>
            </div>
            :
            <div>
                    <ModalHeader toggle={this.toggleModal} className="modal-header-coustom" >
                            Recognize a peer
                    </ModalHeader>
                    <ModalBody style={{textAlign: "center"}}>
                        <p><img src={PeerRecognitionImage}/></p>
                        <p className="commendable-effort">Well done!</p>
                        <p className="completed-status-body-class">
                            You earned <span style={{color: "#1D4CC4"}}>{this.state.karmaPoints}</span> karma points through this<br/>
                            effort & shared peer spirit.  
                        </p>
                        <p className="send-karma-points">
                            Show gratitude by sending karma points to the one who helped you
                        </p>
                        <div style={{width: "50%", float: "left", paddingRight: "26px"}}>
                            <div className="known-route-div-wrap" style={{width: "140px"}} onClick={()=>this.recognizeButton("self")} style= {this.state.self? activeRouteStyle: inActiveRouteStyle}>
                                <img src={this.state.self ? RecognizeSelf: RecognizeSelfOrange} style={{height: "27px"}}/>
                                <div className="known-route-div" style={{color: this.state.self? "#fff": "#FFBA55"}}>Recognize self</div>
                            </div>
                            
                        </div>
                        <div style={{width: "50%", float: "left", paddingLeft: "26px"}}>
                            <div className="new-route-div-wrap" style={{width: "140px"}} onClick={()=>this.recognizeButton("peer")} style= {this.state.peer? activeRouteStyle: inActiveRouteStyle}>
                                  <img src={this.state.peer ? RecognizePeerWhite: RecognizePeer} style={{height: "27px"}}/>
                                <div className="new-route-div" style={{color: this.state.peer? "#fff": "#FFBA55"}}>Recognize a peer</div>
                            </div>
                        </div>
                        {this.state.peer?
                        <div className="select-peer-div">
                            <Select
                                className="React"
                                classNamePrefix="select"
                                placeholder="Select a peer"
                                name="color"
                                options={this.state.peerList}
                                onChange={this.selectPeer}
                            />
                        </div>:""
                            }
                        <div className="textarea-optional-div">
                            <Input
                                type="textarea"
                                name="text"
                                id="exampleText"
                                rows="3"
                                placeholder="Tell us why.. (Optional)"
                                onChange={e=>this.setState({comments: e.target.value})}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <div className="go-back-div" onClick={()=>this.setState({karmaPage: false})}>
                        GO BACK
                    </div>
                    <Button className="okay-button" onClick={this.recognizeFun} disabled={this.state.peer &&  this.state.selectedPeer == ""}>
                        Done
                    </Button>
                    </ModalFooter>
                </div>
            : 
            this.props.status == "predict"?
            <div>
                <ModalHeader toggle={this.toggleModal} className="modal-header-coustom" >
                    Predict your ETA
                </ModalHeader>
                <ModalBody style={{textAlign: "center"}}>
                    <p><img src={Dice}/></p>
                    <p className="predict-header">
                        UI Development [{this.props.estTime} Hours]
                    </p>
                    <p className="conservative-div">
                         What’s your optimistic and conservative bet?
                    </p>
                    <Row>
                    <Col md="6" sm="12" style={{position: "relative"}}>
                        <Flatpickr
                        className="form-control optimistic"
                        placeholder="Optimistic"
                        value={this.state.startDate}
                        options={{ minDate: "today", altInput: true, altFormat: "F j, Y", dateFormat: "Y-m-d"}}
                        onChange={date => {
                            this.setState({ startDate : date[0]});
                        }}
                        />
                        <img src={Calendar} className="calender-icon-left"/>
                    </Col>
                    <Col md="6" sm="12" style={{position: "relative"}}>
                        <Flatpickr
                        className="form-control conservative"
                        placeholder="Conservative"
                        value={this.state.endDate}
                        options={{  minDate: "today", altInput: true, altFormat: "F j, Y", dateFormat: "Y-m-d"}}
                        onChange={date => {
                            this.setState({ endDate : date[0]});
                        }}
                        />
                        <img src={Calendar} className="calender-icon-right"/>
                    </Col>
                        </Row>
                        {this.state.predictDate !== "" ?
                        <div className="predicted-date-div">
                            The system predicted date is {moment(this.state.predictDate).format("MMM DD")} ({moment(this.state.predictDate).format('ddd')})
                        </div>
                        :""
                        }
                </ModalBody>
                <ModalFooter>
                {this.state.predictDate == "" ?
                <Button className="predict-button" onClick={this.predictDate} disabled={this.state.startDate == "" || this.state.endDate == ""}>
                    Predict
                </Button>
                :
                <Button className="predict-button" onClick={this.applyPredictedDate}>
                    Apply
                </Button>
                }
                <p className="try-again-div" onClick={()=>this.setState({ startDate: '', endDate: '', predictDate: ''})}>
                    TRY AGAIN
                </p>
                </ModalFooter>
            </div>
            :
            <div>
            ss
            </div>
            }
            </Modal>
        )
    }

}


const mapStateToProps = state => {
    return {
    }
  }
  
  export default connect(mapStateToProps, {
    statusToStuck,
    predictDate,
    applyPredictedDate,
    continueActivity,
    recognizePeer
  })(StatusModal)