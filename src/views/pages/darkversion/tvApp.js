import React, { useState, useEffect } from "react";
import DataTable, { createTheme }  from "react-data-table-component";
import classnames from "classnames";
import "../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../assets/scss/pages/data-list.scss";
import ReactTooltip from "react-tooltip";
import IndividualProjects from "./IndividualProjects";
import { color } from "./helperDatas";
import { ChevronDown } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProjectData,
  getOrgLevelData,
} from "../../../redux/actions/kpi/kpiApiCall";
import ProgressBar from "react-bootstrap/ProgressBar";
import Slider from "react-slick";
import ProjectDetailCard from "./ProjectDetailCard";
// this file is used to over write default behaviour of the the app.js
import "../darkversion/tvapp-bg.scss"

const Tvapp = () => {
  const { allProjects, orgLevelData } = useSelector((state) => state.kpidata);
  const dispatch = useDispatch();
  const [orgData, setOrgData] = useState({});
  const [tooltipData, setTooltipData] = useState({});
  const [developersAvailable, setDevelopersAvailable] = useState({});
  const [projects, setProjects] = useState([]);
  const [individualPro, setIndividualPro] = useState({});

  useEffect(() => {
    setProjects(allProjects);
    setOrgData(orginizationDataSort(orgLevelData));
    setIndividualPro(allProjects[0])
  }, [allProjects, orgLevelData]);

  useEffect(() => {
    dispatch(getAllProjectData(1,100));
    dispatch(getOrgLevelData());
  }, []);

  const verticalSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    vertical: true,
    autoplay: true,
    verticalSwiping: false,
    swipeToSlide: false,
    afterChange: (index) => {
      if(index>0){
        setIndividualPro(projects[index-1])
      }else {
        setIndividualPro(projects[projects?.length-1])
      }
    },
  };

  const handleToolTip = (row, des = "") => {
    setTooltipData(row);
  };

  const orginizationDataSort = (payload) => {
    const monthData = new Date(payload.createdAt).toLocaleString("en", {
      month: "long",
      year: "numeric",
    });

    let orgLevelProjects = [
      {
        id: payload._id,
        month: monthData,
        name: "Expectation",
        revenue: payload.expectedRevenue,
        profit: payload.expectedProfit,
        enps: payload.expectedENPS,
        cnps: payload.expectedCNPS,
        health: payload.health,
      },
      {
        id: payload._id,
        name: "Achieved",
        revenue: payload.achievedRevenue,
        profit: payload.achievedProfit,
        enps: payload.achievedENPS,
        cnps: payload.achievedCNPS,
        health: payload.health,
      },
    ];
    return orgLevelProjects;
  };

  const healthColorBar = (health) => {
    if (health > 0 && health <= 20) return "danger-dark";
    if (health > 20 && health <= 40) return "danger-light";
    if (health > 40 && health <= 60) return "danger-warn";
    if (health > 60 && health <= 80) return "success-light";
    if (health > 80 && health <= 100) return "success-dark";
  };

  const orgcolumns = [
    {
      name: "Org-level KPIs",
      selector: "Name",
      sortable: true,
      minWidth: "200px",
      cell: (row) => (
        <p className="text-truncate text-bold-700 mb-0">
          {row?.month ? <span>{row?.month}</span> : ""}
        </p>
      ),
    },
    {
      name: "",
      selector: "Designation",
      sortable: true,
      minWidth: "160px",
      cell: (row) => (
        <p title="" className="text-truncate text-bold-700 mb-0 pr-0 pl-0">
          {row.name}
        </p>
      ),
    },
    {
      name: "REVENUE",
      selector: "Availability",
      sortable: true,
      minWidth: "160px",
      cell: (row) => (
        <p className="text-truncate text-font mb-0 pr-0 pl-0">
          {row.revenue}
        </p>
      ),
    },
    {
      name: "PROFIT",
      selector: "profit",
      sortable: true,
      minWidth: "80px",
      cell: (row) => (
        <div className="contact-icon-wrap p-0 ">
          <p className="text-truncate text-font mb-0 pr-0 pl-0">
            {row.profit}
          </p>
        </div>
      ),
    },
    {
      name: "ENPS",
      selector: "enps",
      sortable: true,
      minWidth: "40px",
      cell: (row) => (
        <div className="contact-icon-wrap p-0 ">
          <p className="text-truncate text-font mb-0 pr-0 pl-0">
            {row.enps}/10
          </p>
        </div>
      ),
    },
    {
      name: "CNPS",
      selector: "cnps",
      sortable: true,
      minWidth: "180px",
      // width:"40px",
      cell: (row) => (
        <div className="contact-icon-wrap p-0 ">
          <p className="text-truncate text-font mb-0 pr-0 pl-0">
            {row.cnps}/10
          </p>
        </div>
      ),
    },
    {
      name: "HEALTH",
      selector: "status",
      minWidth: "120px",
      sortable: true,
      cell: (row) => (
        <div className="p-0 w-100 h-75" style={{margin:"-30px"}}>
          <div>&nbsp;</div>
          <ProgressBar
            className="h-25"
            onMouseOver={() => {
              handleToolTip(row);
            }}
            data-tip
            data-for={row?.project_name}
            variant={healthColorBar(Math.round(row?.health))}
            now={Math.round(row?.health)}
          />

          <ReactTooltip id={row?.project_name} place="left" effect="solid">
            <div>
              <div>
                <table className="healthtable tooltiptable">
                  <tbody>
                    <tr className="tooltiptabletr">
                      <th className="orghealth">ORG HEALTH</th>
                      <th className="orgpercent orghealth">
                        %
                      </th>
                    </tr>
                    <tr>
                      <td>Revenue</td>
                      <td>{tooltipData?.revenue}</td>
                    </tr>
                    <tr>
                      <td>Profitability</td>
                      <td>{tooltipData?.profit}</td>
                    </tr>
                    <tr>
                      <td>eNPS</td>
                      <td>{tooltipData?.enps}</td>
                    </tr>
                    <tr>
                      <td>cNPS</td>
                      <td>{tooltipData?.cnps}</td>
                    </tr>
                    <tr>
                      <td>TOTAL</td>
                      <td>
                        <span className="total">
                          {Math.round(tooltipData?.health)}
                        </span>
                        /100
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ReactTooltip>
        </div>
      ),
    },
    // {
    //   name: "ACTIONS",
    //   sortable: true,
    //   cell: (row) => (
    //     // <div className="actionsec">
    //     //   {" "}
    //     //   <img alt="eyeicon" src={eyeicon}></img>
    //     // </div>
    //     <div className="editsection">
    //       {row.name === "Expectation" ? (
    //         <img
    //           onClick={() => handleSidebar(true, "editOrg", row)}
    //           alt="editicon"
    //           src={editicon}
    //         ></img>
    //       ) : (
    //         ""
    //       )}
    //       <img alt="eyeicon" src={eyeicon}></img>
    //     </div>
    //   ),
    // },
  ];
console.log(tooltipData,"tooltip");

  return (
    <>
      <div className="col-sm-12 healthindicator fullscreen-healthindicator">
        <div className="row">
          <div className="col-sm-5 col-md-8">
            <p className="orghealthtext">
              Org health indicator is a sum of Revenue, Profit, eNPS & cNPS
              equally mapped to 25% each.cumulative score indicates the overall
              health.
            </p>
          </div>
          <div className="col-sm-5 col-md-4 healthrightdiv">
            <div className="row">
              {color &&
                color.map((val) => {
                  return (
                    <div key={val.id}>
                      <div className={val.divClass}></div>
                      <p className="healthpercentage">{val.healthPercentage}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div className="orgleveltable orglevel-padding mb-1">
        <DataTable
          className="avail_config"
          columns={orgcolumns}
          data={orgData}
          theme="dark"
          noHeader={true}
          subHeader
          responsive
          pointerOnHover
          // theme="solarized"
          // customStyles={selectedStyle}
          sortIcon={<ChevronDown />}
        />
      </div>

      <div>
        <IndividualProjects singleProjects={individualPro} />
      </div>

      <div className="data-list projectleveltable cus_datalist">
        {/* <div className="row plkpadding">
          <div className="col-sm-9">
            <h2 className="projectlevel-head ">Project-level KPIs</h2>
          </div>
        </div> */}

        <Slider {...verticalSettings}>
          {projects.map((indiviualProject, index) => {
            return (
              <ProjectDetailCard
                project={indiviualProject}
                key={index}
                setTooltipData={setTooltipData}
                tooltipData={tooltipData}
                developersAvailable={developersAvailable}
                index={index}
                setDevelopersAvailable={setDevelopersAvailable}
                setIndividualPro={setIndividualPro}
              />
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default Tvapp;
