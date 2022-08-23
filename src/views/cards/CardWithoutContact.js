import React from "react";
import Avatar from "../../components/@vuexy/avatar/AvatarComponent"
import "../../../src/assets/scss/pages/sprint-member-tile.scss"
import avatarImg from "../../../src/assets/img/profile/pages/page-01.jpg"
const CardWithoutContact = ({ name,description,estimatedtime,user}) => (
    <div className="task-details-tile">
        <div className="task-remaining-wrap">
            <div className="task-name-div">
               {name+"["+estimatedtime+"]"}
            </div>
            <div className="task-details-div">
                {description}
            </div>
        </div>
        <div className="member-avatar-task">
            <Avatar
            className="mr-1" 
            img={user?.profilePic}
            size="lg"
            status={user?.currentStatus !== "LEAVE"?"online":"offline"}
            />
        </div>
    </div>
    )

export default CardWithoutContact;   