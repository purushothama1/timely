import React from "react";
import revenueediticon from "../../../assets/img/revenueediticon.svg";

const revenue = () => {
  return (
    <>
      <div className="row milestonetab">
        <div className="col-sm-10">
          <p className="tab1head">Milestone-wise data</p>
        </div>
        <div className="col-sm-2">
          <p className="revenueediticon">
            <img alt="revenueediticon" src={revenueediticon}></img>
            Edit/Update
          </p>
        </div>
      </div>
      <div className="row milestonerow">
        <table className="milestonetable">
          <tbody>
            <tr>
              <th>Milestone number</th>
              <td>1</td>
              <td>2 </td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>Design milestone</td>
              <td>Design milestone</td>
              <td>sasasa</td>
              <td>dasdsads</td>
              <td>adsadsad</td>
            </tr>
            <tr>
              <th>Planned raise date</th>
              <td>12/05/2022</td>
              <td>12/06/2022</td>
              <td>dasdsa</td>
              <td>ddsa</td>
              <td>dasdads</td>
            </tr>
            <tr>
              <th>Actual raise date</th>
              <td>16/05/2022</td>
              <td>15/06/2022</td>
              <td>adswwfd</td>
              <td>asaswq</td>
              <td>qwqewqwew</td>
            </tr>
            <tr>
              <th>Actual raise date</th>
              <td>16/05/2022</td>
              <td>15/06/2022</td>
              <td>adswwfd</td>
              <td>asaswq</td>
              <td>qwqewqwew</td>
            </tr>
            <tr>
              <th>Paid on</th>
              <td>30/05/2022</td>
              <td>23/06/2022</td>
              <td>adswwfd</td>
              <td>asaswq</td>
              <td>qwqewqwew</td>
            </tr>
            <tr>
              <th>Raised amount</th>
              <td>₹570,600/-</td>
              <td>₹570,600/-</td>
              <td>adswwfd</td>
              <td>asaswq</td>
              <td>qwqewqwew</td>
            </tr>
            <tr>
              <th>Amount paid</th>
              <td>₹560,600/-</td>
              <td>₹540,600/-</td>
              <td>adswwfd</td>
              <td>asaswq</td>
              <td>qwqewqwew</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>Done</td>
              <td>Done</td>
              <td>adswwfd</td>
              <td>asaswq</td>
              <td>qwqewqwew</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="crinfodiv">
        <div className="crinfohead">
          <p className="tab1head">CR Info</p>
          <table className="crinfotable">
            <tbody>
              <tr className="crinforow">
                <th>CR Date</th>
                <th className="crindesccol">Description</th>
                <th>Effort</th>
                <th>CR Amount</th>
                <th>Planned raise date</th>
                <th>Raised on </th>
                <th>Raised Amount</th>
                <th>Paid on</th>
                <th>Paid amount</th>
              </tr>
              <tr>
                <td>20/06/22</td>
                <td>
                  New login module to be added. Currently it’s only email. Need
                  to add phone number with OTP verification for the flow.
                  Chatbot to be added to the website.
                </td>
                <td>5 days</td>
                <td>₹ 50,900/-</td>
                <td>23/06/22</td>
                <td>24/06/22</td>
                <td>₹ 50,000/-</td>
                <td>27/06/22</td>
                <td>₹ 50,000/-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default revenue;
