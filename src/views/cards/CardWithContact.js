import React from "react";
import Avatar from "../../components/@vuexy/avatar/AvatarComponent"
import "../../../src/assets/scss/pages/sprint-member-tile.scss"
import avatarImg from "../../../src/assets/img/profile/pages/page-01.jpg"
import PhoneIcon from "../../../src/assets/img/phone-receiver.png"
import SkypeIcon from "../../../src/assets/img/skype.png"

const CardWithContact = ({ data }) => {
    return (
        <div className="member-details-tile">
            <div className="team-member-avatar">
            <Avatar
                className="mr-1" 
                img={data.profilePic}
                size="lg"
                status={data.currentStatus !== "LEAVE"?"online":"offline"}
                />
            </div>
            <div className="member-availabity-details">
                <div className="task-details-div">
                    {/* Tiger Pavan Supreme */}
                    {data.name}
                </div>
                <div className="task-name-div">
                    <div className="member-role-title">
                        {data.designation.designation}
                    </div>
                    <div className="member-availability-div">
                       {data.currentStatusStartTime+" - "+data.currentStatusEndTime}
                    </div>
                </div>
            </div>
            <div className="contact-icon-wrap">
                <img src={PhoneIcon} className="contact-icon"/>
                <img src={SkypeIcon} className="contact-icon"/>
            </div>
        </div>
    
        )
}

export default CardWithContact;   