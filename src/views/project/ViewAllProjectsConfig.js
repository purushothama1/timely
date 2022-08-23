import React, { Component } from "react";
import {
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import ReactPaginate from "react-paginate";
import { history } from "../../history";
import {
  Edit,
  Trash,
  ChevronDown,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
} from "react-feather";
import { connect } from "react-redux";
import {
  getData,
  getInitialData,
  deleteData,
  updateData,
  addData,
  filterData,
} from "../../redux/actions/data-list";
import {
  getProjectData,
  deleteProjectRow,
  searchProjectData,
} from "../../redux/actions/projects";
import { fetchAllProjects } from "../../redux/actions/sidemenu";
import Sidebar from "./ViewAllProjectsSidebar";
import Chip from "../../components/@vuexy/chips/ChipComponent";
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy";
import "../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../assets/scss/pages/data-list.scss";
import moment from "moment";

const chipColors = {
  "On Hold": "danger",
  Delivered: "success",
  Pending: "warning",
  "In Progress": "primary",
  Cancelled: "danger",
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

let companyid = {
  company: localStorage.getItem("company"),
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
          // props.deleteRow(props.row)
          props.toggleModal(props.row);
        }}
      />
    </div>
  );
};

const CustomHeader = (props) => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap">
        {/* <UncontrolledDropdown className="data-list-dropdown mr-1">
          <DropdownToggle className="p-1" color="primary">
            <span className="align-middle mr-1">Actions</span>
            <ChevronDown size={15} />
          </DropdownToggle>
          <DropdownMenu tag="div" right>
            <DropdownItem tag="a">Delete</DropdownItem>
            <DropdownItem tag="a">Archive</DropdownItem>
            <DropdownItem tag="a">Print</DropdownItem>
            <DropdownItem tag="a">Export</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
        {localStorage.getItem("adminaccess") === "level2" ||
        localStorage.getItem("adminaccess") === "level3" ? (
          <Button
            className="add-new-btn add-sprint-button"
            color="primary"
            onClick={() => props.handleSidebar(true, true)}
            outline
          >
            <Plus size={18} />
            <span className="align-middle">Add New Project</span>
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

class ViewAllProjectsConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        projects: props.projects.map((proj, i) => ({
          i: i,
          id: proj._id,
          name: proj.name,
          description: proj.description,
          projectStatus: proj.projectStatus,
          platform: proj.platforms,
          startDate: proj.startDate,
          endDate: proj.endDate,
          recurring: proj.isRecurring,
          recurringperiod: proj.recurringPeriod,
          manager: proj.manager,
          members: proj.members,
        })),
        data: props.dataList.data,
        allData: props.dataList.filteredData,
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
    data: [],
    projects: [],
    totalPages: 0,
    currentPage: 0,
    deleteRowId: "",
    del: false,
    filteredProjects: [],
    columns: [
      // {
      //   name: "serialNo",
      //   // maxWidth: "40px",
      //   // minWidth: "40px",
      //   cell: row => (
      //     <p className="text-truncate text-bold-700 mb-0">
      //       {row.i <= 8 ? "0"+ (row.i+1): row.i+1}
      //     </p>
      //   )
      // },
      {
        name: "Project Name",
        selector: "projectName",
        sortable: true,
        minWidth: "220px",
        cell: (row) => (
          <p title={row.name} className="text-truncate text-bold-700 mb-0">
            {row.name}
          </p>
        ),
      },
      // {
      //   name: "Tasks",
      //   selector: "tasks",
      //   sortable: true,
      //   minWidth: "200px",
      //   cell: row => (
      //     <span style={{width: "100%"}}>
      //     <div className="text-left progress-status-div">9 Completed</div>
      //     <div className="text-right progress-status-div" style={{color: "rgba(0, 0, 0, 0.37)"}}>12</div>
      //     <Progress
      //       className="w-100 mb-0 progress-md"
      //       color="primary"
      //       value="65"
      //     />
      //     </span>
      //   )
      // },
      {
        name: "Start Date",
        selector: "startDate",
        sortable: true,
        minWidth: "140px",
        cell: (row) => (
          <p title="09 Apr" className="text-truncate text-bold-700 mb-0">
            {moment(row.startDate).format("DD-MM-YYYY")}
          </p>
        ),
      },
      {
        name: "End Date",
        selector: "endDate",
        sortable: true,
        minWidth: "10px",
        cell: (row) => (
          <p title="15 Apr" className="text-truncate text-bold-700 mb-0">
            {row.endDate !== null
              ? moment(row.endDate).format("DD-MM-YYYY")
              : "-"}
          </p>
        ),
      },
      {
        name: "Recurring",
        selector: "recurring",
        sortable: true,
        minWidth: "60px",
        marginRight: "46px",
        cell: (row) => (
          <p
            title={
              row.recurring
                ? "Yes" + ", " + row.recurringperiod + "months"
                : "No"
            }
            className="text-truncate text-bold-700 mb-0"
          >
            {row.recurring
              ? "Yes" + ", " + row.recurringperiod + "months"
              : "No"}
          </p>
        ),
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
        cell: (row) => (
          <div style={{ margin: "-27px" }}>
            <Chip
              className="pr-1"
              color={chipColors[row.projectStatus]}
              text={row.projectStatus}
            />
          </div>
        ),
      },
      // {
      //   name: "Price",
      //   selector: "price",
      //   sortable: true,
      //   cell: row => `$${row.price}`
      // },
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
                // deleteRow={this.handleDelete}
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
  };

  thumbView = this.props.thumbView;

  async componentDidMount() {
    if (Object.keys(this.props.parsedFilter).length === 0) {
      var page = { page: 1, perPage: 40 };
    } else {
      var page = {
        page: parseInt(this.props.parsedFilter.page),
        perPage: parseInt(this.props.parsedFilter.perPage),
      };
    }
    let obj = {
      company: localStorage.getItem("company"),
      ...page,
      token: localStorage.getItem("token"),
    };
    await this.props.getProjectData(obj);
  }

  // handleFilter = e => {
  //   this.setState({ value: e.target.value })
  //   this.props.filterData(e.target.value)
  // }
  handleFilter = async (e) => {
    let { parsedFilter } = this.props;
    this.setState({ value: e.target.value });
    let val = e.target.value;
    if (Object.keys(parsedFilter).length === 0) {
      var page = { page: 1, size: 40 };
    } else {
      var page = {
        page: parseInt(parsedFilter.page),
        size: parseInt(parsedFilter.perPage),
      };
    }
    let obj = {
      searchText: val,
      companyId: localStorage.getItem("company"),
      ...page,
    };
    let searchValue = await this.props.searchProjectData(obj);
    this.setState({ filteredProjects: searchValue });
  };

  handleRowsPerPage = (value) => {
    let { parsedFilter, getProjectData } = this.props;

    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;

    let urlPrefix = this.props.thumbView
      ? "/data-list/thumb-view"
      : "/data-list/view-all-projects";
    history.push(`${urlPrefix}?page=${page}&perPage=${value}`);
    getProjectData({
      company: localStorage.getItem("company"),
      page: parseInt(page),
      perPage: parseInt(value),
      token: localStorage.getItem("token"),
    });
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };

  toggleModal = (row) => {
    this.setState((prevState) => ({
      del: !prevState.del,
      deleteRowId: row.id,
    }));
  };

  handleDelete = async (row) => {
    // let obj={"project": row.id}
    let obj = { project: this.state.deleteRowId };
    await this.props.deleteProjectRow(obj);
    await this.props.fetchAllProjects();
    // this.props.deleteData(row)
    // this.props.getData(this.props.parsedFilter)
    // if (this.state.data.length - 1 === 0) {
    //   let urlPrefix = this.props.thumbView
    //     ? "/data-list/thumb-view/"
    //     : "/data-list/list-view/"
    //   history.push(
    //     `${urlPrefix}list-view?page=${parseInt(
    //       this.props.parsedFilter.page - 1
    //     )}&perPage=${this.props.parsedFilter.perPage}`
    //   )
    //   this.props.getData({
    //     page: this.props.parsedFilter.page - 1,
    //     perPage: this.props.parsedFilter.perPage
    //   })
    // }
    this.setState((prevState) => ({
      del: !prevState.del,
      deleteRowId: "",
    }));
    setTimeout(function () {
      window.location.reload(false);
    }, 4000);
  };

  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };

  handlePagination = (page) => {
    let { parsedFilter, getProjectData } = this.props;
    let perPage =
      parsedFilter.perPage !== undefined ? parsedFilter.perPage : 40;
    let urlPrefix = this.props.thumbView
      ? "/data-list/thumb-view"
      : "/data-list/view-all-projects";
    history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`);
    getProjectData({
      company: localStorage.getItem("company"),
      page: page.selected + 1,
      perPage: parseInt(perPage),
      token: localStorage.getItem("token"),
    });
    this.setState({ currentPage: page.selected });
  };

  render() {
    let {
      columns,
      data,
      allData,
      totalPages,
      value,
      rowsPerPage,
      currentData,
      sidebar,
      projects,
      filteredProjects,
    } = this.state;
    return (
      <div
        className={`data-list ${
          this.props.thumbView ? "thumb-view" : "list-view"
        }`}
      >
        <DataTable
          className="viewproject"
          columns={columns}
          // data={projects.length ? projects : data}
          data={projects.length ? (value ? filteredProjects : projects) : data}
          pagination
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
        />

        <Modal
          isOpen={this.state.del}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal} className="bg-dark">
            Warning
          </ModalHeader>
          <ModalBody className="modal-dialog-centered modal-height">
            Incomplete Sprints maybe present, are you sure you want to delete
            the Project?
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
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.dataList,
    projects: state.projects.projects,
    totalPages: state.projects.totalPages,
  };
};

export default connect(mapStateToProps, {
  fetchAllProjects,
  getData,
  deleteData,
  updateData,
  addData,
  getInitialData,
  getProjectData,
  deleteProjectRow,
  filterData,
  searchProjectData,
})(ViewAllProjectsConfig);
