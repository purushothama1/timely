import React, { useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import { UncontrolledTooltip } from "reactstrap";

const ProjectDetailCard = ({
  project,
  setTooltipData,
  developersAvailable,
  tooltipData,
  index,
  setDevelopersAvailable,
  setIndividualPro,
}) => {

  const designationSort = (data) => {
    const hoverDesignation = {
      Developer: [],
      Designing: [],
      Tester: [],
      ProjectManagement: [],
    };
    const { teamMembers } = data;
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

  const designation=(hoveredData)=>{
    setDevelopersAvailable(designationSort(hoveredData));
  }


  const healthColorBar = (health) => {
    if (health > 0 && health <= 20) return "danger-dark";
    if (health > 20 && health <= 40) return "danger-light";
    if (health > 40 && health <= 60) return "danger-warn";
    if (health > 60 && health <= 80) return "success-light";
    if (health > 80 && health <= 100) return "success-dark";
  };

  return (
    <div>
      <div className="card-wrapper">
        <div className="row">
          <div className="col-1 card-content">
            <p className="text-truncate text-font mb-0 pr-0 pl-0">
              <span>{index + 1}</span>
            </p>
          </div>
          <div className="col-2 card-content">
            <p className="text-truncate text-font mb-0 pr-0 pl-0">
              {project?.project?.name}
            </p>
          </div>
          <div className="col-2">
            <ul
              className="list-unstyled users-list m-0 d-flex"
              id="designation"
              onMouseOver={() => {
                designation(project);
              }}
            >
              {project?.teamMembers?.slice(0, 4).map((individuals, ind) => {
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

            <UncontrolledTooltip
              placement="right"
              target="designation"
              //   className="designationtooltip"
              style={{
                backgroundColor: "white",
              }}
            >
              <table className="healthtable">
                <tbody>
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
                    <tr>Testers</tr>
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
                    <tr className="projectName">Project Manager</tr>
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
          <div className="col-2 card-content">
            <p className="text-truncate text-font mb-0 pr-0 pl-0">
              {project?.achievedRevenue}/{project?.projectRevenue}
            </p>
          </div>
          <div className="col-1 card-content">
            <p className="text-truncate text-font mb-0 pr-0 pl-0">
              {project?.achievedProfit} %
            </p>
          </div>
          <div className="col-1 card-content">
            <p className="text-truncate text-font mb-0 pr-0 pl-0">
              {project?.achievedENPS}/10
            </p>
          </div>
          <div className="col-1 card-content">
            <p className="text-truncate text-font mb-0 pr-0 pl-0">
              {project?.achievedCNPS}/10
            </p>
          </div>
          <div
            className="col-2"
            onMouseOver={() => {
              setTooltipData(project);
            }}
            
          >
            <ProgressBar
              className="h-25 w-75 "
              data-tip
              data-for={project.project?.name}
              variant={healthColorBar(Math.round(project?.health))}
              now={Math.round(project?.health)}
              style={{top:"15px",position:"absolute"}}
            />
            <ReactTooltip
              id={project?.project?.name}
              place="left"
              effect="solid"
              className="tooltip-wrapper"
            >
              <div>
                <div>
                  <table className="healthtable tab-padd">
                    <tbody>
                      <tr className="project-tooltip-header">
                        <th className="orghealth">{tooltipData?.project?.name}</th>
                        <th className="orgpercent orghealth"> %</th>
                      </tr>
                      <tr className="">
                        <td >Revenue</td>
                        <td >
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
                      <tr>
                        <td>cNPS</td>
                        <td>{tooltipData.achievedCNPS}/10</td>
                      </tr>
                      <tr>
                        {/* <td>TOTAL</td>
                        <td>
                          <span className="total">37</span>/100
                        </td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </ReactTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailCard;
