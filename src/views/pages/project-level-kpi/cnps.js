import React from "react";
import mailicon from "../../../assets/img/mailicon.svg";
import phoneicon from "../../../assets/img/phoneicon.svg";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { Label } from "reactstrap";
import sceptic from "../../../assets/img/sceptic.svg";
import pain from "../../../assets/img/pain.svg";
import sad from "../../../assets/img/sad.svg";
import sad1 from "../../../assets/img/sad1.svg";
import meh from "../../../assets/img/meh.svg";
import smile from "../../../assets/img/smile.svg";
import smile1 from "../../../assets/img/smile1.svg";
import happy2 from "../../../assets/img/happy2.svg";
import happy1 from "../../../assets/img/happy1.svg";
import happy from "../../../assets/img/happy.svg";

import Tags from "./tags";

const cnps = () => {
  return (
    <div className="col-sm-12">
      <div className="row">
        <div className="col-sm-4">
          <div className="clientinfodiv">
            <p className="clientinfohead">Haplomind client info</p>
            <div className="clientinfodetails">
              <p className="clientname">Sonali Quantius</p>
              <p className="clientdesignation">CEO</p>
              <div className="row">
                <div className="col-sm-2">
                  <img alt="mailicon" src={mailicon}></img>
                </div>
                <div className="col-sm-10 clientemailpadding">
                  <p className="clientemail">sonali@protonmail.com</p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  <img alt="mailicon" src={phoneicon}></img>
                </div>
                <div className="col-sm-10 clientemailpadding">
                  <p className="clientemail">9876543210</p>
                </div>
              </div>
            </div>

            <div className="client2infodetails">
              <p className="clientname">Srinivas Ravi</p>
              <p className="clientdesignation">COO</p>
              <div className="row">
                <div className="col-sm-2">
                  <img alt="mailicon" src={mailicon}></img>
                </div>
                <div className="col-sm-10 clientemailpadding">
                  <p className="clientemail">srinivasravi@protonmail.com</p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  <img alt="mailicon" src={phoneicon}></img>
                </div>
                <div className="col-sm-10 clientemailpadding">
                  <p className="clientemail">9012345678</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="clientbeedbackdiv">
            <div className="row rowmar0">
              <div className="col-sm-10">
                <p className="feedbackhead">Client feedback</p>
              </div>
              <div className="col-sm-2">
                {/* <Label className="label-class-custom">Date</Label> */}
                <Flatpickr
                  className="form-control enpsdate"
                  // value={startDate}
                  options={{
                    //  minDate: "today",
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                    placeholder: "Date",
                  }}
                  onChange={(date) => {
                    this.setState({
                      startDate: date[0],
                      errorStartDate: "",
                    });
                  }}
                />
              </div>
            </div>
            <div className="row rowmar0">
              <div className="col-sm-6">
                <label htmlFor="domain" className="tl-domain-label">
                  Rated by
                  <select
                    id="domain"
                    name="domain"
                    className="tl-domain-select"
                  >
                    <option>1</option>
                    <option>2</option>
                  </select>
                </label>
              </div>
              <div className="col-sm-6">
                <label htmlFor="domain" className="tl-domain-label">
                  Taken by
                  <select
                    id="domain"
                    name="domain"
                    className="tl-domain-select"
                  >
                    <option>1</option>
                    <option>2</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="row rowmar0">
              <div className="col-sm-12">
                <p>Rating</p>
              </div>

              <div className="col">
                <img className="emojiimg1" alt="sceptic" src={sceptic}></img>
              </div>
              <div className="col">
                <img className="emojiimg1" alt="pain" src={pain}></img>
              </div>
              <div className="col">
                <img className="emojiimg1" alt="sad" src={sad}></img>
              </div>
              <div className="col">
                <img className="emojiimg1" alt="sad1" src={sad1}></img>
              </div>
              <div className="col">
                <img className="emojiimg1" alt="meh" src={meh}></img>
              </div>
              <div className="col">
                <img className="emojiimg1" alt="smile" src={smile}></img>
              </div>
              <div className="col">
                <img className="emojiimg1" alt="smile1" src={smile1}></img>
              </div>
              <div className="col">
                <img className="emojiimg1" alt="happy2" src={happy2}></img>
              </div>
              <div className="col">
                <img className="emojiimg1" alt="happy1" src={happy1}></img>
              </div>
              <div className="col">
                <img className="emojiimg1" alt="happy" src={happy}></img>
              </div>
            </div>
            <div className="row rowmar0">
              <div className="tagsdiv">
                <Tags />
              </div>
            </div>
            <div className="row rowmar0">swfredf</div>
            <div className="row decsec rowmar0">
              <label className="desclabel">Description</label>
              <textarea
                id="desc"
                className="desc1"
                name="desc"
                rows="4"
                cols="100"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cnps;
