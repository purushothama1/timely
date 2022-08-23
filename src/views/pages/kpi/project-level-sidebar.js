import React, { Component, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import { X } from "react-feather";
import { Label, Input } from "reactstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import Siderbar_Formik from "./Siderbar_Formik";
import { advancedSchema } from "./kpiFormikSchema";
import { Formik, Form } from "formik";
import CustomInputForm from "./CustomInputForm";
import {editKpiPoject} from "../../../redux/actions/kpi/kpiApiCall";
import 'react-toastify/dist/ReactToastify.css';

const DataListSidebar = ({
  
  show,
  data,
  title,
  handleSidebar,
  setSidebar,
}) => {
  console.log(show, data, title, "data");

  const intialValue = {
    id: "",
    project: "",
    achievedRevenue: "",
    achievedProfit: "",
    achievedENPS: "",
    achievedCNPS: "",
    projectRevenue: "",
  };
  const [formData, setFormdata] = useState(intialValue);
  const [spinner, setspinner] = useState(false);
  const [errors, setErrors] = useState(intialValue);
  const dispatch = useDispatch();

  const requireData = useSelector((state) => state.kpidata.formik);

  console.log(formData);

  useEffect(() => {
    (title === "edit" || title==="editOrg")?setFormdata(data):setFormdata(intialValue);
  }, [data]);

  useEffect(() => {
    console.log("mohan");
    submitProjectDetails();
  }, [errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validation());
  };

  const submitProjectDetails = () => {
    const formErrors = Object.values(errors).filter((val) => val !== "");
    console.log("edit api");
    console.log(formErrors.length,formErrors,title,"edit api");
    if (formErrors.length === 0 && title === "edit") {
      let editedData = {
        id: formData.id,
        // project: formData.project.toString(),
        achievedRevenue: formData.achievedRevenue.toString(),
        achievedProfit: Number(formData.achievedProfit),
        achievedENPS: Number(formData.achievedENPS),
        achievedCNPS: Number(formData.achievedCNPS),
        projectRevenue: formData.projectRevenue.toString(),
      };
      setspinner(true);
      dispatch(editKpiPoject(editedData));
      console.log("edit api");
      setspinner(false);
      setSidebar(false)
    }
    if (formErrors.length === 0 && title === "add") {
      setspinner(true);
      // dispatch(addNewKpiProject(formData))
      console.log("add api");
      setspinner(false);
    } 
    if (formErrors.length === 0 && title === "editOrg") {
      let editedOrgData = {
        id: formData.id,
        expectedRevenue: Number(formData.achievedRevenue.toString()),
        expectedProfit: Number(formData.achievedProfit),
        expectedENPS: Number(formData.achievedENPS),
        expectedCNPS: Number(formData.achievedCNPS),
        // projectRevenue: formData.projectRevenue.toString(),
      };
      setspinner(true);
      dispatch(editKpiPoject(editedOrgData))
      console.log("editOrg api");
      setspinner(false);
      setSidebar(false)
    }
  };

  const handleCloseSidebar = () => {
    setErrors(intialValue);
    setFormdata(intialValue);
    setSidebar(false);
  };

  const validation = () => {
    const error = {
      id: "",
      project: "",
      achievedRevenue: "",
      achievedProfit: "",
      achievedENPS: "",
      achievedCNPS: "",
      projectRevenue: "",
    };
    // if (formData.project?.toString().trim() === "") {
    //   error.project = "Project Name Cant Be Empty";
    // } else if (formData.project?.trim().length < 4) {
    //   error.project = "Project Name should more than 4 Charecter";
    // }
    if (formData.achievedRevenue.toString().trim() === "") {
      error.achievedRevenue =  (title==="editOrg"?"Expected Revenue Cant Be Empty":"Achieved Revenue Cant Be Empty");
    }
    if (formData.achievedProfit.toString().trim() === "") {
      error.achievedProfit = (title==="editOrg"?"Expected Profit Cant Be Empty":"Achieved Profit Cant Be Empty");
    } else if (formData.achievedProfit > 100) {
      error.achievedProfit = (title==="editOrg"?"Expected Profit Cant Be Greater than 100%":"Achieved Profit Cant Be Greater than 100%");
    }
    if (formData.achievedENPS.toString().trim() === "") {
      error.achievedENPS = (title==="editOrg"?"Expected ENPS Cant Be Empty": "Achieved ENPS Cant Be Empty");
     
    } else if (formData.achievedENPS > 10) {
      error.achievedENPS = (title==="editOrg"?"Expected ENPS Cant Be Greater than 10":"Achieved ENPS Cant Be Greater than 10");
    }else if(formData.achievedENPS < 0){
      error.achievedENPS = (title==="editOrg"?"Expected ENPS Cant Be lesser than 0":"Achieved ENPS Cant Be lesser than 0");
    }
    if (formData.achievedCNPS.toString().trim() === "") {
      error.achievedCNPS = (title==="editOrg"?"Expected CNPS Cant Be Empty":"Achieved CNPS Cant Be Empty");
    } else if (formData.achievedCNPS > 10) {
      error.achievedCNPS = (title==="editOrg"?"Expected CNPS Cant Be Greater than 10":"Achieved CNPS Cant Be Greater than 10");
    }else if (formData.achievedCNPS < 0) {
      error.achievedCNPS = (title==="editOrg"?"Expected CNPS Cant Be lesser than 0":"Achieved CNPS Cant Be lesser than 0");
    }
    return error
     
  };

  return (
    <div
      className={classnames("data-list-sidebar", {
        show: show,
      })}
    >
      <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
        <h4>{title === "add" ? "ADD NEW KPI" : title==="editOrg"? "EDIT ORGNAIZATION KPI" : "EDIT KPI"}</h4>
        <X size={20} className="cursor-pointer" onClick={handleCloseSidebar} />
      </div>
      <PerfectScrollbar
        className="data-list-fields px-2 mt-2"
        options={{ wheelPropagation: false }}
      >
        <form onSubmit={handleSubmit}>
          {title === "add" ? (
            <div className="form-group">
              <Label for="data-name" className="label-class-custom">
                Project Name
              </Label>
              <Input
                type="text"
                placeholder="Enter The Project Name"
                name="project"
                value={formData.project}
                onChange={handleChange}
                id="data-name"
              />
              <span style={{ color: "red" }}>{errors.project}</span>
            </div>
          ) : (
            ""
          )}
          <div className="form-group">
            <Label for="data-name" className="label-class-custom">
              Revenue
            </Label>
            <Input
              type="number"
              placeholder={title==="editOrg"?"Enter The Expected Revenue":"Enter The Achieved Revenue"}
              name="achievedRevenue"
              value={formData.achievedRevenue}
              onChange={handleChange}
              id="data-name"
            />
            <span style={{ color: "red" }}>{errors?.achievedRevenue}</span>
          </div>

         { title==="editOrg"?"": <div className="form-group">
            <Label for="data-name" className="label-class-custom">
              Expected Revenue
            </Label>
            <Input
              type="number"
              placeholder="Enter The Expected Revenue Of The Project"
              name="projectRevenue"
              value={formData.projectRevenue}
              onChange={handleChange}
              id="data-name"
            />
            <span style={{ color: "red" }}>{errors?.projectRevenue}</span>
          </div>}

          <div className="form-group">
            <Label for="data-name" className="label-class-custom">
              Profit
            </Label>
            <Input
              type="number"
              name="achievedProfit"
              placeholder={title==="editOrg"?"Enter The Expected Profit Percentage":"Enter The Achieved Profit Percentage"}
              value={formData.achievedProfit}
              onChange={handleChange}
              id="data-name"
            />
            <span style={{ color: "red" }}>{errors?.achievedProfit}</span>
          </div>
          <div className="form-group">
            <Label for="data-name" className="label-class-custom">
              ENPS
            </Label>
            <Input
              type="number"
              name="achievedENPS"
              placeholder={title==="editOrg"?"Enter The Expected ENPS Out Of 10":"Enter The Achieved ENPS Out Of 10"}
              value={formData.achievedENPS}
              onChange={handleChange}
              id="data-name"
            />
            <span style={{ color: "red" }}>{errors?.achievedENPS}</span>
          </div>
          <div className="form-group">
            <Label for="data-name" className="label-class-custom">
              CNPS
            </Label>
            <Input
              type="number"
              name="achievedCNPS"
              placeholder={title==="editOrg"?"Enter The Expected CNPS Out Of 10":"Enter The Achieved CNPS Out Of 10"}
              value={formData.achievedCNPS}
              onChange={handleChange}
              id="data-name"
            />
            <span style={{ color: "red" }}>{errors?.achievedCNPS}</span>
          </div>
          <div className="form-group creatsubmit">
            <button type="submit" onChange={handleChange} className="subbutt">
              {spinner ? "wvh" : title === "add" ? "submit" : "Update"}
            </button>
          </div>
        </form>
        {/* 
        <Formik
        enableReinitialize
          initialValues={
            {
              project: data.project || "",
              achievedRevenue: data.achievedRevenue || "" ,
              achievedProfit:  data.achievedProfit || "" ,
              achievedENPS: data.achievedENPS || "",
              achievedCNPS: data.achievedCNPS || "",
            } 
          }
          validationSchema={advancedSchema}
          // onSubmit={handleSubmit}
          // validateOnChange={false}
          // validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <div className="form-group">
                <CustomInputForm
                  label="Project Name"
                  name="project"
                  type="text"
                  placeholder="Enter Project Name"
                  labelClassName="label-class-custom"
                  />
              </div>
              <div className="form-group">
                <CustomInputForm
                  label="Achieved Revenue"
                  name="achievedRevenue"
                  type="text"
                  placeholder="Enter Achieved Revenue"
                  labelClassName="label-class-custom"
                />
              </div>
              <div className="form-group">
                <CustomInputForm
                  label="Achieved Profit"
                  name="achievedProfit"
                  type="text"
                  placeholder="Enter Achieved Profit"
                  labelClassName="label-class-custom"
                />
              </div>
              <div className="form-group">
                <CustomInputForm
                  label="Achieved ENPS"
                  name="achievedENPS"
                  type="text"
                  placeholder="Enter Achieved ENPS"
                  labelClassName="label-class-custom"
                />
              </div>
              <div className="form-group">
                <CustomInputForm
                  label="Achieved CNPS"
                  name="achievedCNPS"
                  type="text"
                  placeholder="Enter Achieved CNPS"
                  labelClassName="label-class-custom"
                />
              </div>
              <div className="form-group creatsubmit">
            <button type="submit" className="subbutt">
            {title === "add" ? "submit":"Edit"} 
            </button>
          </div>
            </Form>
          )}
        </Formik> */}
      </PerfectScrollbar>
    </div>
  );
};

export default DataListSidebar;
