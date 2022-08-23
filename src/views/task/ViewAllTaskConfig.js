import React, { Component } from "react";
import {
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import ReactPaginate from "react-paginate";
import { history } from "../../history";
import Avatar from "../../components/@vuexy/avatar/AvatarComponent";
import avatarImg from "../../assets/img/profile/pages/page-01.jpg";
import {
  Edit,
  Trash,
  ChevronDown,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
  Link,
  X,
} from "react-feather";
import { connect } from "react-redux";
import _ from "lodash";
import {
  getTaskData,
  deleteTask,
  sprintDetailsForAdmin,
  myToDoTask,
  othersTask,
  openTask,
  assignedToSelf,
  statusToStuck,
  uploadExcel,
  downloadExcel,
  searchTaskData,
} from "../../redux/actions/task";
import { excelUpload } from "../../redux/actions/peers";
import { toast } from "react-toastify";

import ViewAllTaskSidebar from "./ViewAllTaskSidebar";
import StatusModal from "./StatusModal";
import Chip from "../../components/@vuexy/chips/ChipComponent";
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy";
import moment from "moment";

import "../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../assets/scss/pages/data-list.scss";

var nowStatus, company;

const chipColors = {
  stuck: "warning",
  completed: "success",
  inprogress: "primary",
  notstarted: "danger",
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
  console.log(props);
  console.log(nowStatus);
  return nowStatus === "completed" || nowStatus === undefined ? (
    ""
  ) : props.row.status == "notstarted" ? (
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
          // props.deleteRow(props.row)
          props.toggleModal(props.row);
        }}
      />
    </div>
  ) : (
    ""
  );
};

const CustomHeader = (props) => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap">
        {localStorage.getItem("adminaccess") == "level2" ||
        localStorage.getItem("adminaccess") == "level3" ? (
          <div>
            {nowStatus == "completed" || nowStatus == undefined ? (
              ""
            ) : (
              <div>
                <Button
                  className="add-new-btn add-sprint-button"
                  color="primary"
                  onClick={() => props.handleSidebar(true, true)}
                  outline
                >
                  <Plus size={18} />
                  <span className="align-middle">Add New Task</span>
                </Button>
                <Button
                  className="add-new-btn import-excel"
                  outline
                  onClick={props.handleBlur}
                >
                  <Plus size={18} />
                  <span className="align-middle">Excel Sheet </span>
                </Button>
              </div>
            )}
          </div>
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

const DataTableComponent = (props) => {
  return (
    <DataTable
      columns={props.columns}
      data={props.task ? props.task : []}
      pagination
      paginationServer
      paginationComponent={() => (
        <ReactPaginate
          previousLabel={<ChevronLeft size={15} />}
          nextLabel={<ChevronRight size={15} />}
          breakLabel="..."
          breakClassName=""
          pageCount={props.totalPages}
          containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
          activeClassName="active"
          forcePage={
            props.parsedFilter.page ? parseInt(props.parsedFilter.page - 1) : 0
          }
          onPageChange={(page) => props.handlePagination(page)}
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
          handleSidebar={props.handleSidebar}
          handleFilter={props.handleFilter}
          handleRowsPerPage={props.handleRowsPerPage}
          rowsPerPage={props.rowsPerPage}
          handleProfileImage={props.handleProfileImage}
          handleBlur={props.handleBlur}
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
  );
};

class ViewAllTaskConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    console.log(props);
    let propTask = [...props.tasks.tasks];
    let stateTask = [...state.task];
    let sprintInitial = { sprintId: props.sprintId };
    if (props.sprintId !== state.sprint_id) {
      sprintInitial.sprintId = props.sprintId;
    }
    if (
      _.isEqual(propTask, stateTask) === false ||
      sprintInitial.sprintId != state.sprint_id
    ) {
      return {
        sprint_id: sprintInitial.sprintId,
        // tasksArr: props.tasks.tasks,
        task: props.tasks.tasks.map((task, i) => ({
          i: i,
          task_id: task._id,
          activityType: task.taskType,
          taskFunction: task.taskFunction,
          description: task.description,
          taskLink: task.taskLink,
          estimatedTime: task.estimatedtime,
          eta: task.predictedDate,
          assignedTo: task.assignedPeerId !== null ? task.assignedPeerId : "",
          status: task.taskStatus,
          isCrossfunctional: task.isCrossfunctional,
        })),
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

  state = {
    active:
      localStorage.getItem("adminaccess") == "level1" ||
      localStorage.getItem("adminaccess") == "level2" ||
      localStorage.getItem("adminaccess") == "level3"
        ? "1"
        : "",
    modal: false,
    estTime: "",
    taskIdRow: "",
    data: [],
    totalPages: 0,
    currentPage: 0,
    task: [],
    exl: {},
    sprintTeam: [],
    deleteRowId: "",
    del: false,
    filteredTask: [],
    columns: [
      // {
      //   name: "serialNo",
      //   // maxWidth: "70px",
      //   // minWidth: "70px",
      //   cell: row => (
      //     <p className="text-truncate text-bold-700 mb-0">
      //       {row.i <= 8 ? "0"+ (row.i+1): row.i+1}
      //     </p>
      //   )
      // },
      {
        name: "Activity Type",
        selector: "activityType",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p
            title={row.activityType}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.activityType}
          </p>
        ),
      },
      {
        name: "Task Function",
        selector: "taskFunction",
        minWidth: "180px",
        sortable: true,
        cell: (row) => (
          <p
            title={row.taskFunction}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.taskFunction}
          </p>
        ),
      },
      {
        name: "Assigned To",
        selector: "eta",
        sortable: true,
        minWidth: "150px",
        center: true,
        cell: (row) =>
          row.assignedTo !== "" ? (
            <Avatar
              className="mr-1"
              img={row.assignedTo.profilePic}
              size="lg"
            />
          ) : (
            <p style={{ margin: "auto" }}>Not Assigned</p>
          ),
      },
      {
        name: "Est. Time",
        selector: "estTime",
        sortable: true,
        minWidth: "120px",
        cell: (row) => (
          <p
            title={row.estimatedTime + " " + "hours"}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.estimatedTime + " " + "hours"}
          </p>
        ),
      },
      {
        name: "ETA",
        selector: "eta",
        sortable: true,
        minWidth: "120px",
        cell: (row) =>
          this.state.active === "1" ? (
            localStorage.getItem("adminaccess") == "level1" ||
            localStorage.getItem("adminaccess") == "level2" ||
            localStorage.getItem("adminaccess") == "level3" ? (
              <p
                onClick={
                  row.eta == null
                    ? (e) =>
                        this.todoStatus(
                          "predict",
                          row.task_id,
                          row.estimatedTime
                        )
                    : ""
                }
                title={
                  row.eta !== null ? moment(row.eta).format("DD MMM YYYY") : "-"
                }
                className="text-truncate text-bold-500 mb-0 predict"
              >
                {/* {row.eta !== null ? row.eta : "-"} */}
                {row.eta !== null ? (
                  <div>
                    <span className="eta-div">
                      {moment(row.eta).format("MMM DD")}
                    </span>
                    <br />
                    PREDICTED
                  </div>
                ) : (
                  "PREDICT"
                )}
              </p>
            ) : (
              ""
            )
          ) : (
            <p
              title={
                row.eta !== null ? moment(row.eta).format("DD MMM YYYY") : "-"
              }
              className="text-truncate text-bold-500 mb-0"
            >
              {/* {row.eta !== null ? row.eta : "-"} */}
              {row.eta !== null ? moment(row.eta).format("DD MMM YYYY") : "-"}
            </p>
          ),
      },
      {
        name: "Status",
        selector: "status",
        minWidth: "180px",
        sortable: true,
        cell: (row) =>
          this.state.active === "3" &&
          localStorage.getItem("adminaccess") == "level1" ? (
            <div
              className="assigned-to-me"
              onClick={() => this.assignedToSelf(row.task_id)}
            >
              ASSIGN TO SELF
            </div>
          ) : this.state.active === "1" &&
            (localStorage.getItem("adminaccess") == "level1" ||
              localStorage.getItem("adminaccess") == "level2" ||
              localStorage.getItem("adminaccess") == "level3") ? (
            <Input
              type="select"
              name="select"
              className={
                row.status == "completed"
                  ? "exampleSelect"
                  : "exampleSelect downArrow"
              }
              value={row.status}
              disabled={row.status == "completed"}
              style={{
                backgroundColor:
                  row.status == "inprogress"
                    ? "#F1823B"
                    : row.status == "stuck"
                    ? "#ff5200fa"
                    : row.status == "notstarted"
                    ? "#969696"
                    : row.status == "completed"
                    ? "#28c76f"
                    : "",
              }}
              onChange={(e) => this.todoStatus(e.target.value, row.task_id)}
            >
              <option className="exampleSelecttt" value="notstarted">
                NOT STARTED YET
              </option>
              <option className="exampleSelecttt" value="completed">
                COMPLETED
              </option>
              <option className="exampleSelecttt" value="inprogress">
                IN PROGRESS
              </option>
              <option className="exampleSelecttt" value="stuck">
                STUCK
              </option>
            </Input>
          ) : (
            <Chip
              className="m-0"
              color={
                chipColors[
                  row.status == "inprogress"
                    ? "inprogress"
                    : row.status == "stuck"
                    ? "stuck"
                    : row.status == "notstarted"
                    ? "notstarted"
                    : row.status == "completed"
                    ? "completed"
                    : ""
                ]
              }
              text={row.status}
            />
          ),
      },
      {
        name: "Description",
        selector: "description",
        minWidth: "130px",
        sortable: true,
        cell: (row) => (
          <p
            title={row.description}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.description}
          </p>
        ),
      },
      {
        name: "Link",
        selector: "link",
        sortable: false,
        maxWidth: "70px",
        minWidth: "70px",
        cell: (row) => (
          <Link
            className="cursor-pointer"
            size={25}
            onClick={row.taskLink !== "" ? () => window.open(row.taskLink) : ""}
            style={
              row.taskLink !== ""
                ? { color: "#4839eb" }
                : { color: "rgba(39, 51, 255, 0.28)" }
            }
          />
        ),
      },

      localStorage.getItem("adminaccess") == "level2" ||
      localStorage.getItem("adminaccess") == "level3"
        ? {
            name: "Actions",
            sortable: true,
            cell: (row) => (
              // <ActionsComponent
              //   row={row}
              //   getData={this.props.getData}
              //   parsedFilter={this.props.parsedFilter}
              //   currentData={this.handleCurrentData}
              //   // deleteRow={this.handleDelete}
              //   toggleModal={this.toggleModal}
              // />
              <div>
                <ActionsComponent
                  row={row}
                  getData={this.props.getData}
                  parsedFilter={this.props.parsedFilter}
                  currentData={this.handleCurrentData}
                  // deleteRow={this.handleDelete}
                  toggleModal={this.toggleModal}
                />
                {/* <Edit
            className="cursor-pointer mr-1"
            size={20}
            onClick={() => {
              return  (row={row})
            }}
          />
          <Trash
          className="cursor-pointer"
          size={20}
          onClick={() => {
            
            return row={row}
            
          }}
        /> */}
              </div>
            ),
          }
        : "",
    ],
    allData: [],
    value: "",
    rowsPerPage: 4,
    sidebar: false,
    currentData: null,
    selected: [],
    addNew: "",
  };

  thumbView = this.props.thumbView;

  async componentDidMount() {
    //   if (localStorage.getItem('adminaccess') === "level3"){
    //   if(Object.keys(this.props.parsedFilter).length === 0){
    //    var page = {"page": 1, "size": 4}
    //   }
    //   else{
    //     var page = {"page": parseInt(this.props.parsedFilter.page), "size": parseInt(this.props.parsedFilter.perPage)}
    //   }
    // }
    //   else{
    console.log(this.props);
    company = localStorage.getItem("company");
    var page = { page: 1, size: 40 };

    let urlPrefix = this.props.thumbView
      ? "/data-list/thumb-view/"
      : "/data-list/view-all-tasks/";

    history.push(`${urlPrefix}${this.state.sprint_id}`);
    // }
    this.setState(
      {
        // sprintTeam: this.props.tasks.sprintmemebers.members
      },
      async () => {
        let obj = { sprintId: this.state.sprint_id, ...page };
        let memberTask = {
          sprint: this.state.sprint_id,
          user: localStorage.getItem("user"),
          ...page,
          token: localStorage.getItem("token"),
        };
        this.props.myToDoTask(memberTask);
        // if(localStorage.getItem('adminaccess') === "level3"){
        //   await  this.props.getTaskData(obj)
        // }
        // else{
        //   this.props.myToDoTask(memberTask)
        // }
      }
    );
    this.sprintDataFun();
  }

  async sprintDataFun() {
    let sprintId = {
      sprintId: this.state.sprint_id,
      token: localStorage.getItem("token"),
    };
    let sprintData = await this.props.sprintDetailsForAdmin(sprintId);
    console.log(sprintData);
    this.setState({
      sprintTeam: sprintData.sprintmemebers.members,
      sprintNumber: sprintData.sprintDetails.sprintNumber,
      sprintName: sprintData.sprintDetails.name,
      sprintStart: sprintData.sprintDetails.startDate,
      sprintEnd: sprintData.sprintDetails.endDate,
      sprintStatus: sprintData.sprintDetails.sprintStatus,
      project_id: sprintData.sprintDetails.project,
      projectName: sprintData.sprintDetails.project.name,
    });
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
      sprintId: this.state.sprint_id,
      ...page,
    };
    let searchValue = await this.props.searchTaskData(obj);
    if (searchValue !== undefined) {
      searchValue = searchValue.map((task, i) => ({
        i: i,
        task_id: task._id,
        activityType: task.taskType,
        taskFunction: task.taskFunction,
        description: task.description,
        taskLink: task.taskLink,
        estimatedTime: task.estimatedtime,
        eta: task.predictedDate,
        assignedTo: task.assignedPeerId !== null ? task.assignedPeerId : "",
        status: task.taskStatus,
        isCrossfunctional: task.isCrossfunctional,
      }));
    }
    console.log("searchValue", searchValue);
    this.setState({ filteredTask: searchValue });
  };

  handleRowsPerPage = async (value) => {
    let { parsedFilter, getTaskData } = this.props;
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;

    let urlPrefix = this.props.thumbView
      ? "/data-list/thumb-view/"
      : "/data-list/view-all-tasks/";
    history.push(
      `${urlPrefix}${this.state.sprint_id}?page=${page}&perPage=${value}`
    );
    this.setState({ rowsPerPage: value });
    var obj = {
      sprint: this.state.sprint_id,
      user: localStorage.getItem("user"),
      page: parseInt(page),
      size: parseInt(value),
      token: localStorage.getItem("token"),
    };
    if (this.state.active == 1) {
      await this.props.myToDoTask(obj);
    } else if (this.state.active == 2) {
      await this.props.othersTask(obj);
    } else if (this.state.active == 3) {
      await this.props.openTask(obj);
    } else {
      let data = {
        sprintId: this.state.sprint_id,
        page: parseInt(page),
        size: parseInt(value),
      };
      await getTaskData(data);
    }
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };

  toggleModal = (row) => {
    this.setState((prevState) => ({
      del: !prevState.del,
      deleteRowId: row.task_id,
    }));
  };

  //for excel upload/import
  handleProfileImage = async (e) => {
    let imageUrl = e.target.files[0];
    let obj = {
      file: imageUrl,
    };
    let profileUrl = await this.props.excelUpload(obj);

    let excel = await this.props.uploadExcel(
      profileUrl,
      this.state.sprint_id,
      this.state.project_id._id
    );

    if (excel.data.statusCode == 200) {
      toast.success(excel.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } else if (excel.data.statusCode == 204) {
      toast.error(excel.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
    this.handleBlur();
    setTimeout(function () {
      window.location.reload(false);
    }, 5000);
  };

  handleBlur = () => {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  };

  handleDownload = async (e) => {
    let excel = await this.props.downloadExcel(
      company,
      this.state.project_id._id
    );
    window.location.href = excel.data.resData.Location;
    this.handleBlur();
  };

  handleDelete = (row) => {
    let obj = {
      // "taskId": row.task_id,
      taskId: this.state.deleteRowId,
      sprintId: this.state.sprint_id,
      isDeleted: true,
    };
    this.props.deleteTask(obj);
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
      del: !prevState.del,
      deleteRowId: "",
    }));
  };

  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };

  handlePagination = async (page) => {
    let { parsedFilter, getTaskData } = this.props;
    let perPage =
      parsedFilter.perPage !== undefined ? parsedFilter.perPage : 40;
    let urlPrefix = this.props.thumbView
      ? "/data-list/thumb-view/"
      : "/data-list/view-all-tasks/";
    history.push(
      `${urlPrefix}${this.state.sprint_id}?page=${
        page.selected + 1
      }&perPage=${perPage}`
    );
    let obj = {
      sprint: this.state.sprint_id,
      user: localStorage.getItem("user"),
      page: page.selected + 1,
      size: parseInt(perPage),
      token: localStorage.getItem("token"),
    };
    if (this.state.active == 1) {
      await this.props.myToDoTask(obj);
    } else if (this.state.active == 2) {
      await this.props.othersTask(obj);
    } else if (this.state.active == 3) {
      await this.props.openTask(obj);
    } else {
      getTaskData({
        sprintId: this.state.sprint_id,
        page: page.selected + 1,
        size: parseInt(perPage),
      });
    }
    this.setState({ currentPage: page.selected });
  };

  toggle = (tab) => {
    if (this.state.active !== tab) {
      this.setState({ active: tab }, async () => {
        let urlPrefix = this.props.thumbView
          ? "/data-list/thumb-view/"
          : "/data-list/view-all-tasks/";
        history.push(`${urlPrefix}${this.state.sprint_id}`);

        var page = { page: 1, size: 40 };
        let obj = {
          sprint: this.state.sprint_id,
          user: localStorage.getItem("user"),
          ...page,
          token: localStorage.getItem("token"),
        };
        if (this.state.active == 1) {
          await this.props.myToDoTask(obj);
        } else if (this.state.active == 2) {
          await this.props.othersTask(obj);
        } else if (this.state.active == 3) {
          await this.props.openTask(obj);
        } else {
          let obj = { sprintId: this.state.sprint_id, ...page };
          await this.props.getTaskData(obj);
        }
      });
    }
  };

  todoStatus = async (e, id, estTime) => {
    if (e == "inprogress" || e == "notstarted") {
      let obj = {
        task: id,
        taskStatus: e,
        token: localStorage.getItem("token"),
      };
      let inProgressResult = await this.props.statusToStuck(obj);

      if (inProgressResult.statusCode == 200) {
        if (Object.keys(this.props.parsedFilter).length === 0) {
          var page = { page: 1, size: 40 };
        } else {
          var page = {
            page: parseInt(this.props.parsedFilter.page),
            size: parseInt(this.props.parsedFilter.perPage),
          };
        }
        let obj = {
          sprint: this.state.sprint_id,
          user: localStorage.getItem("user"),
          ...page,
          token: localStorage.getItem("token"),
        };

        await this.props.myToDoTask(obj);
      }
    } else {
      this.setState({
        status: e,
        modal: true,
        taskIdRow: id,
        estTime: estTime,
      });
    }
  };

  closeModal = (load) => {
    if (load) {
      if (Object.keys(this.props.parsedFilter).length === 0) {
        var page = { page: 1, size: 40 };
      } else {
        var page = {
          page: parseInt(this.props.parsedFilter.page),
          size: parseInt(this.props.parsedFilter.perPage),
        };
      }
      let obj = {
        sprint: this.state.sprint_id,
        user: localStorage.getItem("user"),
        ...page,
        token: localStorage.getItem("token"),
      };
      this.setState(
        {
          modal: false,
        },
        () => {
          this.props.myToDoTask(obj);
        }
      );
    } else {
      this.setState({
        modal: false,
      });
    }
  };

  async assignedToSelf(id) {
    let obj = {
      task: id,
      user: localStorage.getItem("user"),
      token: localStorage.getItem("token"),
    };
    const assignedToSelfResponse = await this.props.assignedToSelf(obj);
    if (assignedToSelfResponse.statusCode == 200) {
      var page = { page: 1, size: 40 };
      let obj = {
        sprint: this.state.sprint_id,
        user: localStorage.getItem("user"),
        ...page,
        token: localStorage.getItem("token"),
      };
      this.props.openTask(obj);
    }
  }

  render() {
    let { tasks } = this.props;

    let {
      columns,
      task,
      data,
      allData,
      totalPages,
      value,
      rowsPerPage,
      currentData,
      sidebar,
      sprintTeam,
      sprint_id,
      sprintNumber,
      sprintName,
      sprintStart,
      sprintEnd,
      sprintStatus,
      project_id,
      projectName,
      filteredTask,
    } = this.state;
    nowStatus = sprintStatus;
    console.log("task", task);
    return (
      <div>
        <div id="popup" className="modal-height-pop">
          <X size={40} className="close" id="x" onClick={this.handleBlur} />
          <center>
            <div className="sprint-name-pop">
              Sprint {sprintNumber <= 9 ? "0" + sprintNumber : sprintNumber} -{" "}
              {sprintName}
            </div>
          </center>
          {/* <br/><br/> */}
          <center>
            <p className="sprint-plan-2">
              Upload{" "}
              <span className="sprint-plan">Sprint Plan Spreadsheet</span> or
              Download
              <span className="sprint-plan"> Sample Sprint Plan Sheet</span>
            </p>
          </center>
          <center>
            <label className="import-excel" color="black" outline>
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                hidden
                onChange={(e) => this.handleProfileImage(e)}
              />
              Import Excel Sheet
            </label>
            <span className="or">or</span>
            <Button
              className="download"
              color="black"
              outline
              onClick={this.handleDownload}
            >
              <span className="align-middle">Download Sample Sheet</span>
            </Button>
          </center>
        </div>
        <div id="blur" className="blurring">
          <Row>
            <Col md="5" sm="12">
              <div className="flex-container">
                <div className="sprint-name-main">
                  Sprint {sprintNumber <= 9 ? "0" + sprintNumber : sprintNumber}{" "}
                  - {sprintName}
                </div>
                <div className="sprint-date">
                  {" "}
                  {moment(sprintStart).format("DD MMM")}
                  {sprintEnd !== null
                    ? " " + "-" + " " + moment(sprintEnd).format("DD MMM")
                    : ""}
                </div>
                <div className="chip-current-div">
                  <Chip
                    className="m-0"
                    color={
                      chipColors[
                        sprintStatus == "current"
                          ? "stuck"
                          : sprintStatus == "completed"
                          ? "completed"
                          : ""
                      ]
                    }
                    text={sprintStatus}
                  />
                </div>
              </div>
            </Col>
            <Col md="7" sm="12">
              <div
                className="flex-container"
                style={{ placeContent: "flex-end" }}
              >
                <div className="project-name">{projectName}</div>
                {sprintTeam != undefined
                  ? sprintTeam.map((team) => (
                      <div className="avatars-div-wrap">
                        <span className="avatar-div">
                          <Avatar
                            className="mr-1 team-image"
                            img={team.profilePic}
                            size="lg"
                          />
                        </span>
                      </div>
                    ))
                  : ""}
              </div>
            </Col>
          </Row>
          <div
            className={`data-list ${
              this.props.thumbView ? "thumb-view" : "list-view"
            }`}
          >
            {
              localStorage.getItem("adminaccess") == "level1" ? (
                <div>
                  <Nav
                    tabs
                    style={{
                      borderBottom: "1px solid #E0E0E0",
                      marginBottom: "2rem",
                    }}
                  >
                    <NavItem>
                      <NavLink
                        className={classnames("navTabsToDo", {
                          activeToDo: this.state.active === "1",
                          active: this.state.active === "1",
                        })}
                        onClick={() => {
                          this.toggle("1");
                        }}
                      >
                        MY TO-DO’S
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames("navTabsToDo", {
                          activeToDo: this.state.active === "2",
                          active: this.state.active === "2",
                        })}
                        onClick={() => {
                          this.toggle("2");
                        }}
                      >
                        OTHERS'
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames("navTabsToDo", {
                          activeToDo: this.state.active === "3",
                          active: this.state.active === "3",
                        })}
                        onClick={() => {
                          this.toggle("3");
                        }}
                      >
                        OPEN
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.active}>
                    <TabPane tabId="1">
                      <DataTableComponent
                        columns={columns}
                        task={task}
                        totalPages={totalPages}
                        rowsPerPage={rowsPerPage}
                        parsedFilter={this.props.parsedFilter}
                        handleSidebar={this.handleSidebar}
                        handleFilter={this.handleFilter}
                        handleRowsPerPage={this.handleRowsPerPage}
                        handlePagination={this.handlePagination}
                        handleProfileImage={this.handleProfileImage}
                        handleBlur={this.handleBlur}
                      />
                    </TabPane>
                    <TabPane tabId="2">
                      <DataTableComponent
                        columns={columns}
                        // task={task}
                        task={value ? filteredTask : task}
                        totalPages={totalPages}
                        rowsPerPage={rowsPerPage}
                        parsedFilter={this.props.parsedFilter}
                        handleSidebar={this.handleSidebar}
                        handleFilter={this.handleFilter}
                        handleRowsPerPage={this.handleRowsPerPage}
                        handlePagination={this.handlePagination}
                        handleProfileImage={this.handleProfileImage}
                        handleBlur={this.handleBlur}
                      />
                    </TabPane>
                    <TabPane tabId="3">
                      <DataTableComponent
                        columns={columns}
                        // task={task}
                        task={value ? filteredTask : task}
                        totalPages={totalPages}
                        rowsPerPage={rowsPerPage}
                        parsedFilter={this.props.parsedFilter}
                        handleSidebar={this.handleSidebar}
                        handleFilter={this.handleFilter}
                        handleRowsPerPage={this.handleRowsPerPage}
                        handlePagination={this.handlePagination}
                        handleProfileImage={this.handleProfileImage}
                        handleBlur={this.handleBlur}
                      />
                    </TabPane>
                  </TabContent>
                </div>
              ) : localStorage.getItem("adminaccess") == "level2" ||
                localStorage.getItem("adminaccess") == "level3" ? (
                <div>
                  <Nav
                    tabs
                    style={{
                      borderBottom: "1px solid #E0E0E0",
                      marginBottom: "2rem",
                    }}
                  >
                    <NavItem>
                      <NavLink
                        className={classnames("navTabsToDo", {
                          activeToDo: this.state.active === "1",
                          active: this.state.active === "1",
                        })}
                        onClick={() => {
                          this.toggle("1");
                        }}
                      >
                        MY TO-DO’S
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames("navTabsToDo", {
                          activeToDo: this.state.active === "4",
                          active: this.state.active === "4",
                        })}
                        onClick={() => {
                          this.toggle("4");
                        }}
                      >
                        ALL TASKS
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.active}>
                    <TabPane tabId="1">
                      <DataTableComponent
                        columns={columns}
                        // task={task}
                        task={value ? filteredTask : task}
                        totalPages={totalPages}
                        rowsPerPage={rowsPerPage}
                        parsedFilter={this.props.parsedFilter}
                        handleSidebar={this.handleSidebar}
                        handleFilter={this.handleFilter}
                        handleRowsPerPage={this.handleRowsPerPage}
                        handlePagination={this.handlePagination}
                        handleProfileImage={this.handleProfileImage}
                        handleBlur={this.handleBlur}
                      />
                    </TabPane>
                    <TabPane tabId="4">
                      <DataTableComponent
                        columns={columns}
                        // task={task}
                        task={value ? filteredTask : task}
                        totalPages={totalPages}
                        rowsPerPage={rowsPerPage}
                        parsedFilter={this.props.parsedFilter}
                        handleSidebar={this.handleSidebar}
                        handleFilter={this.handleFilter}
                        handleRowsPerPage={this.handleRowsPerPage}
                        handlePagination={this.handlePagination}
                        handleProfileImage={this.handleProfileImage}
                        handleBlur={this.handleBlur}
                      />
                    </TabPane>
                  </TabContent>
                  <Modal
                    isOpen={this.state.del}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered"
                  >
                    <ModalHeader toggle={this.toggleModal} className="bg-dark">
                      Warning
                    </ModalHeader>
                    <ModalBody className="modal-dialog-centered modal-height">
                      Are you sure you want to delete the Task?
                    </ModalBody>
                    <ModalFooter>
                      <Button color="dark" onClick={this.handleDelete}>
                        Delete
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              ) : (
                ""
              )
              // <DataTableComponent
              //   columns={columns}
              //   task={task}
              //   totalPages={totalPages}
              //   rowsPerPage={rowsPerPage}
              //   parsedFilter={this.props.parsedFilter}
              //   handleSidebar={this.handleSidebar}
              //   handleFilter={this.handleFilter}
              //   handleRowsPerPage= {this.handleRowsPerPage}
              //   handlePagination={this.handlePagination}
              // />
            }
            {project_id !== undefined ? (
              <ViewAllTaskSidebar
                show={sidebar}
                data={currentData}
                updateData={this.props.updateData}
                addData={this.props.addData}
                handleSidebar={this.handleSidebar}
                thumbView={this.props.thumbView}
                getData={this.props.getData}
                dataParams={this.props.parsedFilter}
                addNew={this.state.addNew}
                sprintID={sprint_id}
                projectID={project_id}
              />
            ) : (
              ""
            )}

            <div
              className={classnames("data-list-overlay", {
                show: sidebar,
              })}
              // onClick={() => this.handleSidebar(false, true)}
            />
          </div>
        </div>
        <StatusModal
          estTime={this.state.estTime}
          open={this.state.modal}
          closeModal={this.closeModal}
          status={this.state.status}
          taskIdRow={this.state.taskIdRow}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    totalPages: state.tasks.totalPages,
  };
};

export default connect(mapStateToProps, {
  getTaskData,
  deleteTask,
  sprintDetailsForAdmin,
  myToDoTask,
  othersTask,
  openTask,
  assignedToSelf,
  statusToStuck,
  excelUpload,
  uploadExcel,
  downloadExcel,
  searchTaskData,
  // getData,
  // deleteData,
  // updateData,
  // addData,
  // getInitialData,
  // filterData
})(ViewAllTaskConfig);
