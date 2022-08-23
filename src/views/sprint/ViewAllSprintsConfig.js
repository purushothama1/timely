import React, { Component } from "react";
import {
  Button,
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import ReactPaginate from "react-paginate";
import { history } from "../../history";
import Chart from "react-apexcharts";
import _ from "lodash";
import {
  Edit,
  Trash,
  ChevronDown,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
  Link,
} from "react-feather";
import { connect } from "react-redux";
import moment from "moment";
// import {
//   getData,
//   getInitialData,
//   deleteData,
//   updateData,
//   addData,
//   filterData
// } from "../../redux/actions/data-list"
import {
  getSprintData,
  deleteSprint,
  searchSprintData,
} from "../../redux/actions/sprint";
import Sidebar from "./ViewAllSprintsSidebar";
import Chip from "../../components/@vuexy/chips/ChipComponent";
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy";

import "../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../assets/scss/pages/data-list.scss";

const chipColors = {
  current: "warning",
  completed: "success",
  // pending: "primary",
  // canceled: "danger"
};

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

const CustomHeader = (props) => {
  return (
    <div
      className="data-list-header  d-flex justify-content-between flex-wrap mt-0 mx-0"
      style={{ width: "100%" }}
    >
      <div className="actions-left d-flex flex-wrap ml-0">
        {localStorage.getItem("adminaccess") == "level2" ||
        localStorage.getItem("adminaccess") == "level3" ? (
          <Button
            className="add-new-btn add-sprint-button"
            color="primary"
            onClick={() => props.handleSidebar(true, true)}
            outline
          >
            <Plus size={15} />
            <span className="align-middle">Add New Sprint</span>
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className="actions-right d-flex flex-wrap mt-sm-0 mt-2">
        <UncontrolledDropdown className="data-list-rows-dropdown mr-1 d-md-block d-none">
          <DropdownToggle color="" className="sort-dropdown">
            <span className="align-middle mx-50">
              {/* {`${props.index[0]} - ${props.index[1]} of ${props.total}`} */}
              {`${props.rowsPerPage}`} per page
            </span>
            <ChevronDown size={15} />
          </DropdownToggle>
          <DropdownMenu tag="div" right>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(4)}>
              4
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(10)}>
              10
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(15)}>
              15
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(20)}>
              20
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(40)}>
              40
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div className="filter-section">
          <Input type="text" onChange={(e) => props.handleFilter(e)} />
        </div>
      </div>
    </div>
  );
};

class ViewAllSprintsConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    let propSprint = [...props.sprints];
    let stateSprint = [...state.sprints];

    let projectInitial = { projectId: props.projectId };

    if (props.projectId !== state.project_id) {
      projectInitial.projectId = props.projectId;
    }
    if (
      _.isEqual(propSprint, stateSprint) === false ||
      projectInitial.projectId != state.project_id
    ) {
      return {
        project_id: projectInitial.projectId,
        sprints: props.sprints.map((sprintData, i) => ({
          sprintNumber: sprintData.sprintNumber,
          name: sprintData.name,
          _id: sprintData._id,
          isRecurring: sprintData.isRecurring,
          recurringPeriod: sprintData.recurringPeriod,
          sprintStatus: sprintData.sprintStatus,
          startDate: sprintData.startDate,
          endDate: sprintData.endDate,
          task: sprintData.task,
        })),
        sprintTotalScore: props.sprintScore,
        projectName: props.projectName,
        allData: [],
        totalPages: props.totalPages,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage:
          Object.keys(props.parsedFilter).length === 0
            ? 40
            : parseInt(props.parsedFilter.perPage),
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.projectId !== prevProps.projectId) {
      let obj = {
        projectId: this.props.projectId,
        page: 1,
        size: 40,
        token: localStorage.getItem("token"),
      };
      this.props.getSprintData(obj);
    }
  }

  toggleModal = (row) => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
      deleteRowId: row._id,
    }));
  };

  handleDelete = () => {
    let obj = {
      sprintId: this.state.deleteRowId,
      isDeleted: true,
    };
    this.props.deleteSprint(obj);
    // this.props.getData(this.props.parsedFilter)
    if (this.state.data.length - 1 === 0) {
      let urlPrefix = this.props.thumbView
        ? "/data-list/thumb-view/"
        : "/data-list/list-view/";
      history.push(
        `${urlPrefix}list-view?page=${parseInt(
          this.props.parsedFilter.page - 1
        )}&perPage=${this.props.parsedFilter.perPage}`
      );
      this.props.getData({
        page: this.props.parsedFilter.page - 1,
        perPage: this.props.parsedFilter.perPage,
      });
    }
    this.setState((prevState) => ({
      modal: !prevState.modal,
      deleteRowId: "",
    }));
  };

  state = {
    deleteRowId: "",
    modal: false,
    data: [],
    sprints: [],
    project_id: "",
    totalPages: 0,
    currentPage: 0,
    filteredSprint: [],
    columns: [
      {
        name: "Sprint No",
        // maxWidth: "70px",
        // minWidth: "70px",
        cell: (row) => (
          <p className="text-truncate text-bold-700 mb-0">
            {row.sprintNumber <= 9 ? "0" + row.sprintNumber : row.sprintNumber}
          </p>
        ),
      },
      {
        name: "Sprint Name",
        selector: "sprintName",
        sortable: true,
        minWidth: "250px",
        cell: (row) => (
          <p
            onClick={this.onCloumnClick.bind(this, row._id)}
            title={row.name}
            className="text-truncate text-bold-700 mb-0"
          >
            {row.name}
          </p>
        ),
      },
      {
        name: "Tasks",
        selector: "tasks",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <span
            onClick={this.onCloumnClick.bind(this, row._id)}
            style={{ width: "100%" }}
          >
            <div className="text-left progress-status-div">
              {this.completedTask(row.task)} Completed
            </div>
            <div
              className="text-right progress-status-div"
              style={{ color: "rgba(0, 0, 0, 0.37)" }}
            >
              {row.task.length}
            </div>
            <Progress
              className="w-100 mb-0 progress-md"
              color={
                this.calculatePercentile(
                  row.task.length,
                  this.completedTask(row.task)
                ) <= 35
                  ? "danger"
                  : this.calculatePercentile(
                      row.task.length,
                      this.completedTask(row.task)
                    ) <= 70
                  ? "warning"
                  : "success"
              }
              value={this.calculatePercentile(
                row.task.length,
                this.completedTask(row.task)
              )}
            />
          </span>
        ),
      },
      {
        name: "Start Date",
        selector: "startDate",
        sortable: true,
        minWidth: "150px",
        cell: (row) => (
          <p
            onClick={this.onCloumnClick.bind(this, row._id)}
            title="09 Apr"
            className="text-truncate text-bold-700 mb-0"
          >
            {moment(row.startDate).format("DD MMM")}
          </p>
        ),
      },
      {
        name: "End Date",
        selector: "endDate",
        sortable: true,
        minWidth: "120px",
        cell: (row) => (
          <p
            onClick={this.onCloumnClick.bind(this, row._id)}
            title="15 Apr"
            className="text-truncate text-bold-700 mb-0"
          >
            {row.endDate !== null ? moment(row.endDate).format("DD MMM") : "-"}
          </p>
        ),
      },
      {
        name: "Recurring",
        selector: "recurring",
        sortable: true,
        // minWidth: "80px",
        cell: (row) => (
          <p
            onClick={this.onCloumnClick.bind(this, row._id)}
            title={
              row.isRecurring
                ? "Yes" + ", " + row.recurringPeriod + "weeks"
                : "No"
            }
            className="text-truncate text-bold-700 mb-0"
          >
            {row.isRecurring
              ? "Yes" + ", " + row.recurringPeriod + "weeks"
              : "No"}
          </p>
        ),
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
        cell: (row) => (
          <div style={{ margin: "-30px" }}>
            <Chip
              onClick={this.onCloumnClick.bind(this, row._id)}
              className="m-0"
              color={chipColors[row.sprintStatus]}
              text={row.sprintStatus}
            />
          </div>
        ),
      },
      localStorage.getItem("adminaccess") === "level2" ||
      localStorage.getItem("adminaccess") === "level3"
        ? {
            name: "Actions",
            sortable: true,
            cell: (row) => (
              <ActionsComponent
                row={row}
                getData={this.props.getData}
                parsedFilter={this.props.parsedFilter}
                currentData={this.handleCurrentData}
                toggleModal={this.toggleModal}
              />
            ),
          }
        : "",
    ],
    allData: [],
    value: "",
    rowsPerPage: 40,
    sidebar: false,
    currentData: null,
    selected: [],
    addNew: "",
    options: {
      labels: ["Score"],
      chart: {
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1,
        },
      },
      colors: ["#28c76f"],
      plotOptions: {
        radialBar: {
          size: 210,
          startAngle: -140,
          endAngle: 150,
          hollow: {
            size: "60%",
          },
          track: {
            background: "#b9c3cd",
            strokeWidth: "100%",
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: "14px",
              color: "#000",
            },
            value: {
              offsetY: 3,
              color: "#000",
              fontSize: "20px",
              fontWeight: "600",
              formatter: function (val) {
                return parseInt(val);
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ea5455"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
    },
    series: [],
  };

  thumbView = this.props.thumbView;

  async componentDidMount() {
    if (Object.keys(this.props.parsedFilter).length === 0) {
      var page = { page: 1, size: 40 };
    } else {
      var page = {
        page: parseInt(this.props.parsedFilter.page),
        size: parseInt(this.props.parsedFilter.perPage),
      };
    }
    this.setState(
      {
        project_id: this.props.projectId,
      },
      async () => {
        let obj = {
          projectId: this.state.project_id,
          ...page,
          token: localStorage.getItem("token"),
        };
        await this.props.getSprintData(obj);
      }
    );
  }

  // handleFilter = e => {
  //   this.setState({ value: e.target.value })
  //   this.props.filterData(e.target.value)
  // }
  handleFilter = async (e) => {
    let { parsedFilter } = this.props;
    this.setState({ value: e.target.value });
    if (Object.keys(parsedFilter).length === 0) {
      var page = { page: 1, size: 40 };
    } else {
      var page = {
        page: parseInt(parsedFilter.page),
        size: parseInt(parsedFilter.perPage),
      };
    }
    let obj = {
      searchText: e.target.value,
      projectId: this.state.project_id,
      ...page,
    };
    let searchValue = await this.props.searchSprintData(obj);
    this.setState({ filteredSprint: searchValue });
  };

  handleRowsPerPage = (value) => {
    let { parsedFilter, getSprintData } = this.props;
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;

    let urlPrefix = this.props.thumbView
      ? "/data-list/thumb-view/"
      : "/data-list/view-all-sprints/";
    history.push(
      `${urlPrefix}${this.state.project_id}?page=${page}&perPage=${value}`
    );
    this.setState({ rowsPerPage: value });
    getSprintData({
      projectId:
        this.state.project_id !== undefined ? this.state.project_id : "",
      page: parseInt(page),
      size: parseInt(value),
      token: localStorage.getItem("token"),
    });
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };

  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };

  handlePagination = (page) => {
    let { parsedFilter, getSprintData } = this.props;
    let perPage =
      parsedFilter.perPage !== undefined ? parsedFilter.perPage : 40;
    let urlPrefix = this.props.thumbView
      ? "/data-list/thumb-view/"
      : "/data-list/view-all-sprints/";
    history.push(
      `${urlPrefix}${this.state.project_id}?page=${
        page.selected + 1
      }&perPage=${perPage}`
    );
    getSprintData({
      projectId:
        this.state.project_id !== undefined ? this.state.project_id : "",
      page: page.selected + 1,
      size: parseInt(perPage),
      token: localStorage.getItem("token"),
    });
    this.setState({ currentPage: page.selected });
  };

  completedTask(tasks) {
    let completed = [];
    completed = tasks.length
      ? tasks.filter((com) => com.taskStatus == "completed")
      : [];
    return completed.length;
  }

  calculatePercentile(totalTask, taskCompleted) {
    let percentile = (taskCompleted / totalTask) * 100;
    return percentile;
  }

  onCloumnClick = (id) => {
    history.push(`/data-list/view-all-tasks/${id}`);
  };

  render() {
    let {
      columns,
      sprints,
      data,
      allData,
      totalPages,
      value,
      rowsPerPage,
      currentData,
      sidebar,
      options,
      projectName,
      filteredSprint,
    } = this.state;
    return (
      <div>
        <div className="sprint-chart-class">
          <Chart
            options={options}
            series={this.props.sprintScore ? [this.props.sprintScore] : [0]}
            type="radialBar"
            height={100}
            width={100}
          />
        </div>
        <div className="sprint-name">{projectName} - All Sprints</div>
        <div
          className={`data-list ${
            this.props.thumbView ? "thumb-view" : "list-view"
          }`}
        >
          <DataTable
            columns={columns}
            data={value ? filteredSprint : sprints}
            pagination
            onRowClicked={(rowData) =>
              history.push(`/data-list/view-all-tasks/${rowData._id}`)
            }
            paginationServer
            paginationComponent={() => (
              <ReactPaginate
                previousLabel={<ChevronLeft size={15} />}
                nextLabel={<ChevronRight size={15} />}
                breakLabel="..."
                breakClassName=""
                pageCount={totalPages}
                containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
                activeClassName="active"
                forcePage={
                  this.props.parsedFilter.page
                    ? parseInt(this.props.parsedFilter.page - 1)
                    : 0
                }
                onPageChange={(page) => this.handlePagination(page)}
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
            subHeaderComponent={
              <CustomHeader
                handleSidebar={this.handleSidebar}
                handleFilter={this.handleFilter}
                handleRowsPerPage={this.handleRowsPerPage}
                rowsPerPage={rowsPerPage}
              />
            }
            sortIcon={<ChevronDown />}
            selectableRowsComponent={Checkbox}
            selectableRowsComponentProps={{
              color: "primary",
              icon: <Check className="vx-icon" size={12} />,
              label: "",
              size: "sm",
            }}
          />
          <Sidebar
            show={sidebar}
            data={currentData}
            updateData={this.props.updateData}
            addData={this.props.addData}
            handleSidebar={this.handleSidebar}
            thumbView={this.props.thumbView}
            getData={this.props.getData}
            dataParams={this.props.parsedFilter}
            addNew={this.state.addNew}
            projectId={this.state.project_id}
          />
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            className="modal-dialog-centered"
          >
            <ModalHeader toggle={this.toggleModal} className="bg-dark">
              Warning
            </ModalHeader>
            <ModalBody className="modal-dialog-centered modal-height">
              Incomplete tasks maybe present, are you sure you want to delete
              the sprint?
            </ModalBody>
            <ModalFooter>
              <Button color="dark" onClick={this.handleDelete}>
                Delete
              </Button>
            </ModalFooter>
          </Modal>
          <div
            className={classnames("data-list-overlay", {
              show: sidebar,
            })}
            // onClick={() => this.handleSidebar(false, true)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sprints: state.sprints.sprints,
    sprintScore: state.sprints.sprintScore,
    totalPages: state.sprints.totalPages,
    projectName: state.sprints.projectName,
  };
};

export default connect(mapStateToProps, {
  getSprintData,
  deleteSprint,
  searchSprintData,
  // getData,
  // deleteData,
  // updateData,
  // addData,
  // getInitialData,
  // filterData
})(ViewAllSprintsConfig);
