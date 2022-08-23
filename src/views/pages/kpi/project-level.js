import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import Chip from "../../../components/@vuexy/chips/ChipComponent";
import ReactPaginate from "react-paginate";
import classnames from "classnames";
import "../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../assets/scss/pages/data-list.scss";
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy";
import ReactTooltip from "react-tooltip";
import editicon from "../../../assets/img/editicon.svg";
import eyeicon from "../../../assets/img/eyeicon.svg";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./project-level-sidebar";
import { UncontrolledTooltip } from "reactstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import {
  Edit,
  Trash,
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight,
} from "react-feather";
import {
  getAllProjectData,
  getOrgLevelData,
} from "../../../redux/actions/kpi/kpiApiCall";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: "rgba(115,103,240,.05)",
      color: "#7367F0 !important",
      boxShadow: "0 0 1px 0 #7367F0 !important",
      "&:hover": {
        transform: "translateY(0px) !important",
      },
    },
  },
};

const ActionsComponent = (props) => {
  return (
    <div className="data-list-action">
      <Edit
        className="cursor-pointer mr-1"
        size={20}
        onClick={() => {
          return props.currentData(props.row);
        }}
      />
      <Trash
        className="cursor-pointer"
        size={20}
        onClick={() => {
          props.toggleModal(props.row);
        }}
      />
    </div>
  );
};

const orgLevelKpiData = [
  {
    project_name: "Org-level - April 2022 ",
    EXP_achive: "Expectation:",
    project_revenue: "9510",
    project_profit: "40%",
    eNPS: "5/10",
    cNPS: "9/10",
    Project_health: "good",
  },
  {
    project_name: " ",
    EXP_achive: "Achived:",
    project_revenue: "1000",
    project_profit: "40%",
    eNPS: "8/10",
    cNPS: "7/10",
    Project_health: "good",
  },
];

const Projectlevel = () => {
  const [data, setData] = useState({});
  const [sidebar, setSidebar] = useState(false);
  const [titlee, setTitlee] = useState("");
  const [tooltipData, setTooltipData] = useState({});
  const [developersAvailable, setDevelopersAvailable] = useState({});
  const [projects, setProjects] = useState([]);
  const [paginate, setPaginate] = useState([]);
  const [orgData, setOrgData] = useState([]);
  const [Updated, setUpdated] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const dispatch = useDispatch();
  const { allProjects, editedMessage, orgLevelData ,pagecount} =
    useSelector((state) => state.kpidata);

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

  useEffect(() => {
    setProjects(allProjects);
    setPageCount(pagecount)
    setOrgData(orginizationDataSort(orgLevelData));
  }, [allProjects, orgLevelData,pagecount]);

  useEffect(() => {
    setDevelopersAvailable(designationSort());
  }, [tooltipData]);

  useEffect(() => {
    dispatch(getAllProjectData(1)); // all project
    dispatch(getOrgLevelData());
  }, []);

  useEffect(() => {
    dispatch(getAllProjectData()); // all project
    dispatch(getOrgLevelData());
  }, [editedMessage]);

  // useEffect(() => {
  //   if(projects,length=>10){
  //     setPaginate(projects.splice(0,10))
  //   }else{
  //     setPaginate(projects.splice(0,2))
  //   }
  // }, [projects]);

  const handleSidebar = (value, titlename, rowInfo = {}) => {
    const {
      achievedRevenue,
      achievedProfit,
      achievedENPS,
      achievedCNPS,
      project,
      _id,
      projectRevenue,
    } = rowInfo;
    if (titlename === "edit") {
      setData({
        id: _id,
        // project: project.name,
        achievedRevenue: achievedRevenue,
        achievedProfit: achievedProfit,
        achievedENPS: achievedENPS,
        achievedCNPS: achievedCNPS,
        projectRevenue: projectRevenue,
      });
    } else if (titlename === "editOrg") {
      setData({
        id: rowInfo.id,
        achievedRevenue: rowInfo.revenue,
        achievedProfit: rowInfo.profit,
        achievedENPS: rowInfo.enps,
        achievedCNPS: rowInfo.cnps,
      });
    } else {
      setData({
        id: "",
        project: "",
        achievedRevenue: "",
        achievedProfit: "",
        achievedENPS: "",
        achievedCNPS: "",
        projectRevenue: "",
      });
    }
    // console.log(value, titlename, rowInfo);
    setSidebar(value);
    setTitlee(titlename);
  };

  const healthColorBar = (health) => {
    if (health > 0 && health <= 20) return "danger-dark";
    if (health > 20 && health <= 40) return "danger-light";
    if (health > 40 && health <= 60) return "danger-warn";
    if (health > 60 && health <= 80) return "success-light";
    if (health > 80 && health <= 100) return "success-dark";
  };

console.log(tooltipData);

  // org level columns

  const orgcolumns = [
    {
      name: "KPIs",
      selector: "Name",
      sortable: true,
      minWidth: "200px",
      cell: (row) => (
        <p className="text-truncate text-bold-700 mb-0">{row?.month}</p>
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
      minWidth: "40px",
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
      minWidth: "150px",
      sortable: true,
      cell: (row) => (
        <div className="p-0 w-100 h-75">
          <div>&nbsp;</div>
          <ProgressBar
            className="h-25"
            onMouseOver={() => {
              handleToolTip(row);
            }}
            data-tip
            data-for={row.project_name}
            variant={healthColorBar(Math.round(row?.health))}
            now={Math.round(row?.health)}
          />

          <ReactTooltip id={row.project_name} place="left" effect="solid">
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
                      <td>{tooltipData.revenue}</td>
                    </tr>
                    <tr>
                      <td>Profitability</td>
                      <td>{tooltipData.profit}</td>
                    </tr>
                    <tr>
                      <td>eNPS</td>
                      <td>{tooltipData.enps}</td>
                    </tr>
                    <tr>
                      <td>cNPS</td>
                      <td>{tooltipData.cnps}</td>
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
    {
      name: "ACTIONS",
      sortable: true,
      cell: (row) => (
        // <div className="actionsec">
        //   {" "}
        //   <img alt="eyeicon" src={eyeicon}></img>
        // </div>
        <div className="editsection">
          {row.name === "Expectation" ? (
            <img
              onClick={() => handleSidebar(true, "editOrg", row)}
              alt="editicon"
              src={editicon}
            ></img>
          ) : (
            ""
          )}
          <img alt="eyeicon" src={eyeicon}></img>
        </div>
      ),
    },
  ];

  const columns = [
    {
      maxWidth: "50px",
      minWidth: "50px",
      cell: (row, i) => (
        <p className="text-truncate text-bold-700 mb-0">{i + 1}</p>
      ),
    },

    {
      selector: "Name",
      sortable: true,
      minWidth: "140px",
      cell: (row) => (
        <p className="text-truncate text-bold-700 mb-0">{row?.project?.name}</p>
      ),
    },
    {
      // name: "Designation",
      selector: "Designation",
      sortable: true,
      minWidth: "160px",

      cell: (row) => (
        <>
          <div>
            <ul
              className="list-unstyled users-list m-0 d-flex"
              id="Designation"
              onMouseOver={() => {
                handleToolTip(row, "designation");
              }}
            >
              {row?.teamMembers?.slice(0, 4).map((individuals, index) => {
                return (
                  <li className="avatar" key={individuals?.employeeId}>
                    <img
                      src={individuals?.profilePic}
                      alt="avatar"
                      height="30"
                      width="30"
                    />
                  </li>
                );
              })}
            </ul>
            {/* designation tool tip */}
            <UncontrolledTooltip
              placement="right"
              target="Designation"
              style={{ backgroundColor: "white" }}
            >
              <table className="healthtable">
                <thead className="uncontrolled-tooltip-hr">
                  <p >{tooltipData?.project?.name}</p>
                </thead>
                <tbody className="uncontrolled-tooltip-body">
                  <tr>Developer</tr>
                  {developersAvailable?.Developer?.map((individualDev) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <img
                              src={individualDev?.profilePic}
                              alt="avatar"
                              height="30"
                              width="30"
                              className="avatar"
                            />
                          </td>
                          <td>{individualDev?.name}</td>
                        </tr>
                      </>
                    );
                  })}
                  {developersAvailable?.Tester?.length > 0 ? (
                    <tr>Q. A</tr>
                  ) : (
                    ""
                  )}
                  {developersAvailable?.Tester?.map((individualqa) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={individualqa?.profilePic}
                            alt="avatar"
                            height="30"
                            width="30"
                            className="avatar"
                          />
                        </td>
                        <td>{individualqa.name}</td>
                      </tr>
                    );
                  })}
                  {developersAvailable?.Designing?.length > 0 ? (
                    <tr>Designer</tr>
                  ) : (
                    ""
                  )}
                  {developersAvailable?.Designing?.map((individualdesg) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={individualdesg?.profilePic}
                            alt="avatar"
                            height="30"
                            width="30"
                            className="avatar"
                          />
                        </td>
                        <td>{individualdesg?.name}</td>
                      </tr>
                    );
                  })}
                  {developersAvailable?.ProjectManagement?.length > 0 ? (
                    <tr>Project Manager</tr>
                  ) : (
                    ""
                  )}
                  {developersAvailable?.ProjectManagement?.map(
                    (individualpm) => {
                      return (
                        <tr>
                          <td>
                            <img
                              src={individualpm?.profilePic}
                              alt="avatar"
                              height="30"
                              width="30"
                              className="avatar"
                            />
                          </td>
                          <td>{individualpm.name}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </UncontrolledTooltip>
          </div>
        </>
      ),
    },
    {
      selector: "Availability",
      sortable: true,
      minWidth: "160px",
      cell: (row) => (
        <p className="text-truncate text-font mb-0 pr-0 pl-0">
          {row?.achievedRevenue}/{row?.projectRevenue}
        </p>
      ),
    },
    {
      // name: "profit",
      selector: "profit",
      sortable: true,
      minWidth: "80px",
      cell: (row) => (
        <div className="contact-icon-wrap p-0 ">
          <p className="text-truncate text-font mb-0 pr-0 pl-0">
            {row?.achievedProfit} %
          </p>
        </div>
      ),
    },
    {
      //   name: "enps",
      selector: "enps",
      sortable: true,
      minWidth: "40px",
      cell: (row) => (
        <div className="contact-icon-wrap p-0 ">
          <p className="text-truncate text-font mb-0 pr-0 pl-0">
            {row?.achievedENPS}/10
          </p>
        </div>
      ),
    },
    {
      //   name: "cnps",
      selector: "cnps",
      sortable: true,
      minWidth: "40px",
      cell: (row) => (
        <div className="contact-icon-wrap p-0 ">
          <p className="text-truncate text-font mb-0 pr-0 pl-0">
            {row?.achievedCNPS}/10
          </p>
        </div>
      ),
    },
    {
      //   name: "Health",
      selector: "status",
      minWidth: "150px",
      maxWidth: "400px",
      sortable: true,
      cell: (row) => (
        <>
          <div
            data-tip
            data-for={row?.project?.name}
            className="p-0 w-100 h-75"
            onMouseOver={() => {
              handleToolTip(row);
            }}
          >
            <div>&nbsp;</div>
            <ProgressBar
              className="h-25 w-100"
              data-tip
              data-for={row.project?.name}
              variant={healthColorBar(Math.round(row?.health))}
              now={Math.round(row?.health)}
            />

            <ReactTooltip id={row?.project?.name} place="left" effect="solid">
              <div>
                <div>
                  <table className="healthtable">
                    <tbody>
                      <tr className="react-tooltip-hr">
                        <th className="orghealth">{tooltipData?.project?.name}</th> 
                        <th className="orgpercent orghealth"> %</th>
                      </tr>
                      <tr>
                        <td>Revenue</td>
                        <td>
                          {tooltipData.achievedRevenue}/
                          {tooltipData.projectRevenue}
                        </td>
                      </tr>
                      <tr>
                        <td>Profitability</td>
                        <td>{tooltipData.achievedProfit}%</td>
                      </tr>
                      <tr>
                        <td>eNPS</td>
                        <td>{tooltipData.achievedENPS}/10</td>
                      </tr>
                      <tr className="react-tooltip-hr">
                        <td>cNPS</td>
                        <td>{tooltipData.achievedCNPS}/10</td>
                      </tr>
                      <tr>
                        <td>TOTAL</td>
                      <td>
                        <span className="total">{Math.round(tooltipData.health)}</span>/100
                      </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </ReactTooltip>
          </div>
        </>
      ),
    },
    {
      name: "",
      sortable: true,
      cell: (row) => (
        <div className="editsection">
          <img
            onClick={() => handleSidebar(true, "edit", row)}
            alt="editicon"
            src={editicon}
          ></img>
          <img alt="eyeicon" src={eyeicon}></img>
        </div>
      ),
    },
  ];

  const handlePagination = ({ selected }) => {
    console.log(selected);
    dispatch(getAllProjectData(selected+1))
    // setPaginate(projects.slice(selected*2+1,selected*2+2))
  };

  const designationSort = () => {
    console.log("called");
    const hoverDesignation = {
      Developer: [],
      Designing: [],
      Tester: [],
      ProjectManagement: [],
    };
    console.log(tooltipData);
    const { teamMembers } = tooltipData;

    if (teamMembers?.length > 0) {
      teamMembers.map((val) => {
        const { role } = val.role;
        if (
          role === "Web Development" ||
          role === "Mobile Development" ||
          role === "Backend Development"
        ) {
          hoverDesignation.Developer.push(val);
        }
        if (role === "Project Management") {
          hoverDesignation.ProjectManagement.push(val);
        }
        if (role === "Quality Assurance") {
          hoverDesignation.Tester.push(val);
        }
        if (role === "Designing") {
          hoverDesignation.Designing.push(val);
        }
      });
    }
    return hoverDesignation;
  };

  const handleToolTip = (row, des = "") => {
    setTooltipData(row);
  };
  console.log(developersAvailable);
  console.log(tooltipData);

  return (
    <>
      <div className="col-sm-12 healthindicator">
        <div className="row">
          <div className="col-sm-8 col-md-7">
            <p className="orghealthtext">
              Org health indicator is a sum of Revenue, Profit, eNPS & cNPS
              equally mapped <br /> to 25% each.cumulative score indicates the
              overall health.
            </p>
          </div>
          <div className="col-sm-4 col-md-5 healthrightdiv">
            <div className="row">
              <div>
                <div className="div0 div1"></div>
                <p className="healthpercentage">0-20%</p>
              </div>
              <div>
                <div className="div0 div2"></div>
                <p className="healthpercentage">21-40%</p>
              </div>
              <div>
                <div className="div0 div3"></div>
                <p className="healthpercentage">41-60%</p>
              </div>
              <div>
                <div className="div0 div4"></div>
                <p className="healthpercentage">61-80%</p>
              </div>
              <div>
                <div className="div0 div5"></div>
                <p className="healthpercentage">81-100%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* org level KPI datatable */}

      <div className="orgleveltable">
        <DataTable
          className="avail_config"
          columns={orgcolumns}
          data={orgData}
          noHeader
          subHeader
          responsive
          pointerOnHover
          selectableRowsHighlight
          customStyles={selectedStyle}
          sortIcon={<ChevronDown />}
          selectableRowsComponent={Checkbox}
          selectableRowsComponentProps={{
            color: "primary",
            icon: <Check className="vx-icon" size={12} />,
            label: "",
            size: "sm",
          }}
        />
      </div>

      <div className="data-list projectleveltable cus_datalist">
        <div className="row plkpadding">
          <div className="col-sm-9">
            <h2 className="projectlevelhead ">Project-level KPIs</h2>
          </div>

          {/* -----------------add new kpi button-----------------  */}

          {/* <div className="col-sm-3">
            <div className="actions-left d-flex flex-wrap">
              {localStorage.getItem("adminaccess") === "level2" ||
              localStorage.getItem("adminaccess") === "level3" ? (
                <Button
                  className="add-new-btn add-sprint-button"
                  color="primary"
                  onClick={() => handleSidebar(true, "add")}
                  outline
                >
                  <Plus size={18} />
                  <span className="align-middle">Add New KPI</span>
                </Button>
              ) : (
                <Button
                  className="add-new-btn add-sprint-button"
                  color="primary"
                  onClick={() => handleSidebar(true, "add")}
                  outline
                >
                  <Plus size={18} />
                  <span className="align-middle">Add New KPI</span>
                </Button>
              )}

              {/* {localStorage.getItem("adminaccess") === "level2" ||
              localStorage.getItem("adminaccess") === "level3" ? (
                <Button
                  className="add-new-btn add-sprint-button"
                  color="primary"
                  onClick={() => handleSidebar(true, "add")}
                  outline
                >
                  <Plus size={18} />
                  <span className="align-middle">Add New KPI</span>
                </Button>
              ) : (
               ""
              // )} 
            </div> */}
          {/* </div> */}
        </div>

        <DataTable
          className="avail_config"
          columns={columns}
          data={projects}
          // data={readytoOnboard.length ? readytoOnboard : data}
          pagination
          paginationServer
          paginationComponent={() => (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={pagecount} //totalPages
              containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2 justify-content-center ml-1"
              activeClassName="active"
              onPageChange={(page) => handlePagination(page)}
            />
          )}
          noHeader
          subHeader
          // selectableRows
          responsive
          pointerOnHover
          selectableRowsHighlight
          // onSelectedRowsChange={data =>
          //   this.setState({ selected: data.selectedRows })
          // }
          customStyles={selectedStyle}
          sortIcon={<ChevronDown />}
          selectableRowsComponent={Checkbox}
          selectableRowsComponentProps={{
            color: "primary",
            icon: <Check className="vx-icon" size={12} />,
            label: "",
            size: "sm",
          }}
        />

        <div>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {/* Same as */}
          <ToastContainer />
        </div>
        <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
          <Sidebar
            show={sidebar}
            isEditAble={false}
            handleSidebar={handleSidebar}
            title={titlee}
            data={data}
            setSidebar={setSidebar}
          />
          <div
            className={classnames("data-list-overlay", {
              show: sidebar,
            })}
            onClick={() => handleSidebar(false)}
          />
        </div>
      </div>
    </>
  );
};

export default Projectlevel;
