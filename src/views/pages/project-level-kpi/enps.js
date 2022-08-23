import React from "react";
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
const enps = () => {
  return (
    <div className="col-sm-12 enpstabcontent">
      <p className="tab1head">eNPS for the month of April 2022</p>
      <div className="row">
        <div className="col-sm-6 inputpadbtm">
          <Label className="label-class-custom">Date</Label>
          <Flatpickr
            className="form-control enpsdate"
            // value={startDate}
            options={{
              //  minDate: "today",
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "Y-m-d",
            }}
            onChange={(date) => {
              this.setState({
                startDate: date[0],
                errorStartDate: "",
              });
            }}
          />
        </div>
        <div className="col-sm-12 ">
          <div className="row">
            <p>Rated</p>
            <div className="col alignright"> 1</div>
            <div className="col alignright">2</div>
            <div className="col alignright">3</div>
            <div className="col alignright">4</div>
            <div className="col alignright">5</div>
            <div className="col alignright">6</div>
            <div className="col alignright">7</div>
            <div className="col alignright">8</div>
            <div className="col alignright">9</div>
            <div className="col alignright">10</div>
          </div>
          <div className="row emojirow">
            <div className="col-sm-12">
              <p className="ratedheading">
                How likely are they to recommend us as place of work to family &
                friends?
              </p>
            </div>

            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="sceptic" src={sceptic}></img>
                <div className="box">
                  <input className="boxinput" type="number"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="pain" src={pain}></img>
                <div className="box">
                  <input className="boxinput" type="number"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="sad" src={sad}></img>
                <div className="box">
                  <input className="boxinput" type="number"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="sad1" src={sad1}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="meh" src={meh}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="smile" src={smile}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="smile1" src={smile1}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="happy2" src={happy2}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="happy1" src={happy1}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="happy" src={happy}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
          </div>
          <div className="row emojirow">
            <div className="col-sm-12">
              <p className="ratedheading">
                How relevant is their work with your professional goals?
              </p>
            </div>

            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="sceptic" src={sceptic}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="pain" src={pain}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="sad" src={sad}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="sad1" src={sad1}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="meh" src={meh}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="smile" src={smile}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="smile1" src={smile1}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="happy2" src={happy2}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="happy1" src={happy1}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="happy" src={happy}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
          </div>

          <div className="row emojirow">
            <div className="col-sm-12">
              <p className="ratedheading">
                How satisified are they with their pay?
              </p>
            </div>

            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="sceptic" src={sceptic}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="pain" src={pain}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="sad" src={sad}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="sad1" src={sad1}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="meh" src={meh}></img>
                <div className="box">
                  {" "}
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="smile" src={smile}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="smile1" src={smile1}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="happy2" src={happy2}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="happy1" src={happy1}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="happy" src={happy}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
          </div>
          <div className="row emojirow">
            <div className="col-sm-12">
              <p className="ratedheading">
                How satisified are they with their employee benefits?{" "}
              </p>
            </div>

            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="sceptic" src={sceptic}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="pain" src={pain}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="sad" src={sad}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="sad1" src={sad1}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="meh" src={meh}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="smile" src={smile}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="smile1" src={smile1}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="happy2" src={happy2}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="happy1" src={happy1}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="emojisec">
                <img className="emojiimg" alt="happy" src={happy}></img>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
          </div>

          <div className="row emojirow">
            <div className="col-sm-12">
              <p className="ratedheading">
                How do they feel about cultural needs at codewave?
              </p>
            </div>

            <div className="col">
              <div className="emojisec culturalcodewave">
                <img className="emojiimg" alt="sceptic" src={sceptic}></img>
                <div className="boxtext">
                  <p>Not at all well</p>
                </div>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec culturalcodewave">
                <img className="emojiimg" alt="sad1" src={sad1}></img>
                <div className="boxtext">
                  <p>Slightly well</p>
                </div>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec culturalcodewave">
                <img className="emojiimg" alt="smile" src={smile}></img>
                <div className="boxtext">
                  <p>Moderately well</p>
                </div>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec culturalcodewave">
                <img className="emojiimg" alt="happy2" src={happy2}></img>
                <div className="boxtext">
                  <p>Very well</p>
                </div>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec culturalcodewave">
                <img className="emojiimg" alt="happy" src={happy}></img>
                <div className="boxtext">
                  <p>Extremely well</p>
                </div>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
          </div>

          <div className="row emojirow">
            <div className="col-sm-12">
              <p className="ratedheading">How do they feel about teamwork? </p>
            </div>

            <div className="col">
              <div className="emojisec culturalcodewave">
                <img className="emojiimg" alt="sceptic" src={sceptic}></img>
                <div className="boxtext">
                  <p>Not at all well</p>
                </div>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec culturalcodewave">
                <img className="emojiimg" alt="sad1" src={sad1}></img>
                <div className="boxtext">
                  <p>Slightly well</p>
                </div>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec culturalcodewave">
                <img className="emojiimg" alt="smile" src={smile}></img>
                <div className="boxtext">
                  <p>Moderately well</p>
                </div>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec culturalcodewave">
                <img className="emojiimg" alt="happy2" src={happy2}></img>
                <div className="boxtext">
                  <p>Very well</p>
                </div>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec culturalcodewave">
                <img className="emojiimg" alt="happy" src={happy}></img>
                <div className="boxtext">
                  <p>Extremely well</p>
                </div>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
          </div>

          <div className="row emojirow">
            <div className="col-sm-12">
              <p className="ratedheading">
                {" "}
                How do they feel about work-life balance?
              </p>
            </div>

            <div className="col">
              <div className="emojisec culturalcodewave">
                <img className="emojiimg" alt="sceptic" src={sceptic}></img>
                <div className="boxtext">
                  <p>Not at all well</p>
                </div>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec culturalcodewave">
                <img className="emojiimg" alt="sad1" src={sad1}></img>
                <div className="boxtext">
                  <p>Slightly well</p>
                </div>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec culturalcodewave">
                <img className="emojiimg" alt="smile" src={smile}></img>
                <div className="boxtext">
                  <p>Moderately well</p>
                </div>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec culturalcodewave">
                <img className="emojiimg" alt="happy2" src={happy2}></img>
                <div className="boxtext">
                  <p>Very well</p>
                </div>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="emojisec culturalcodewave">
                <img className="emojiimg" alt="happy" src={happy}></img>
                <div className="boxtext">
                  <p>Extremely well</p>
                </div>
                <div className="box">
                  <input className="boxinput" type="text"></input>
                </div>
              </div>
            </div>
            <div class="col-sm-12 subcanmaindiv">
              <div class="subcan">
                <button class="subbutt">Submit</button>
                <button class="canbutt">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default enps;
