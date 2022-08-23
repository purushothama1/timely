import React from "react";
import {Card,CardBody,Row,Col,Progress} from "reactstrap"
import CardWithoutContact from "../cards/CardWithoutContact"
import CardWithContact from "../cards/CardWithContact"
import { history } from "../../history"
import "../../../src/assets/scss/pages/sprint-member-tile.scss"
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const  allSprints=(projectId)=>{
    history.push("/data-list/view-all-sprints/"+projectId)
}

const SprintMemberTile = ({ task, members,projectId}) => {

    return(
        <Row className="sprint-member-tile-wrap">
        <Col lg="6" md="12" sm="12">
            <Card className="card-div">
                <Row className="card-head-wrap">
                    <Col lg="7" md="6" sm="12">
                        {
                            task?.sprintNumber !== undefined?
                            <div className="card-heading-main">
                            {
                            "Sprint "+task?.sprintNumber+" - "
                            +
                            task?.name}
                        </div>
                        
                        :
                        <div className="card-heading-main">
                        NO SPRINTS
                    </div>
                        }
                        <div>
                       
                            {
                                 task?.startDate!== undefined?
                                <div className="card-head-date">
                                {months[new Date(task?.startDate).getMonth()] +" "+ (new Date(task?.startDate).getDate())+"-"+ months[new Date(task?.endDate).getMonth()] +" "+ (new Date(task?.endDate).getDate())}
                            </div>
                            :
                            <div className="card-head-date">
                                --:--
                            </div>
                            }
                        </div>

                        <div className="view-all-sprints"  onClick={()=>allSprints(projectId)}>
                            View All Sprints
                        </div>
                    </Col>
                    <Col lg="5" md="6" sm="12" style={{margin: "auto"}}>
                    <span style={{width: "100%"}}>
                         {
                             task?.totalTasks!== undefined?
                                <div className="text-left progress-status-div">{task?.totalTasks - task?.remainingTasks+" completed"}</div>
                                :
                                "0 completed"
                         }
                        <div className="text-right progress-status-div" style={{color: "rgba(0, 0, 0, 0.37)"}}>{task?.totalTasks}</div>
                        <Progress
                            className="w-100 mb-0 progress-md"
                            color="primary"
                            value={100-(task?.remainingTasks/task?.totalTasks)*100 }
                        />
                    </span>
                    </Col>
                </Row>
                <CardBody className ="task-card-body-style">
                   {
                   task?.remainingTasks!== undefined?
                    <div className="remaining-task-details">
                        {"Remaining Tasks ("+task?.remainingTasks+")"}
                    </div>
                    :
                    <div className="remaining-task-details">
                        {"Remaining Tasks (0)"}
                    </div>
                    
                }
               <div>
               {
                        task?.remainingTaskList.map(_data=>
                            <CardWithoutContact name={_data.name} description={_data.description} estimatedtime={_data.estimatedtime} user={_data.user} />
                        )
                    }
               </div>
                
                </CardBody>
            </Card>
        </Col>
        <Col lg="6" md="12" sm="12">
            <Card className="card-div">
                <CardBody className ="task-card-body-style">
                    {
                        <div> 
                            <div>
                                        <div className="team-members-details-head">
                                         { members!== undefined && members!==null?"Team Members ("+members.length+")":"Team Members (0)"}
                                        </div>
                                        <div className="manage-team">
                                            Manage Team
                                        </div>
                                    </div>
                                    {
                                        members !== undefined || members !== null?
                                        members?.map(_data=>
                                            <CardWithContact data={_data.projectMember} />
                                            )
                                            :"NO DATA"
                                    }
                            </div>
                    }
                </CardBody>
            </Card>
        </Col>

        
    </Row>
    )
    }

 export default SprintMemberTile;   