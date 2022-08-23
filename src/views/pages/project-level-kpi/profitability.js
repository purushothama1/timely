import React from "react";
import Slider from "rc-slider";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "rc-slider/assets/index.css";
import {
  Label,
  Input,
  FormGroup,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const profitability = () => {
  return (
    <>
      <div className="profmaindiv">
        <div className="col-sm-12">
          <p className="tab1head">Profitability for the month of April 2022</p>
          <div className="row">
            <div className="col-sm-6 inputpadbtm">
              <Label className="label-class-custom">As on date</Label>
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
            <div className="col-sm-6 inputpadbtm">
              <Label for="data-name" className="label-class-custom">
                Total expense of the month
              </Label>
              <Input
                type="text"
                // value={name}
                placeholder=""
                onChange={(e) =>
                  this.setState({ name: e.target.value, errorName: "" })
                }
                id="data-name"
              />
            </div>
            <div className="col-sm-6 inputpadbtm">
              <Label for="data-name" className="label-class-custom">
                Current profitability
              </Label>
              <Input
                type="text"
                // value={name}
                placeholder=""
                onChange={(e) =>
                  this.setState({ name: e.target.value, errorName: "" })
                }
                id="data-name"
              />
            </div>
            <div className="col-sm-6 inputpadbtm">
              <div className="price-slider-title mt-1">
                <h6 className="filter-title mb-0">Project Completion</h6>
              </div>
              <div className="price-slider mt-1">
                <Range
                  min={0}
                  max={100}
                  defaultValue={[0, 50]}
                  tipFormatter={(value) => `${value}%`}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="subcan">
                <button className="subbutt">Submit</button>
                <button className="canbutt">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default profitability;
