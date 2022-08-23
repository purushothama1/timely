import React, { Component } from "react";
import {
  Button,
  Progress,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
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
  Link,
} from "react-feather";
import { connect } from "react-redux";
import {
  dashboard_availablity,
  getOngoingProjects,
  redyto_Onboard,
} from "../../redux/actions/dashboard";
import {
  getData,
  getInitialData,
  deleteData,
  updateData,
  addData,
  filterData,
} from "../../redux/actions/data-list";
import { getProjectData, deleteProjectRow } from "../../redux/actions/projects";
//import Sidebar from "./ViewAllProjectsSidebar"
import Chip from "../../components/@vuexy/chips/ChipComponent";
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy";
import "../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../assets/scss/pages/data-list.scss";
import "../../assets/scss/pages/projectdata.scss";
import moment from "moment";
import PhoneIcon from "../../../src/assets/img/phone-receiver.png";
import SkypeIcon from "../../../src/assets/img/skype.png";
import userProf from "../../../src/assets/img/user-03.jpg";

const chipColors = {
  "on hold": "warning",
  "Ready to On-Board": "success",
  "In Progress": "primary",
  canceled: "danger",
};

let expdata;

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
          props.deleteRow(props.row);
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
        <span className="align-middle brk_time">
          Time for a break /{" "}
          <span style={{ color: "#4caf50" }}>Ready to on-board</span>
        </span>
      </div>
      <div className="actions-left d-flex flex-wrap mt-sm-0 mt-2">
        {/* <UncontrolledDropdown className="data-list-rows-dropdown mr-1 d-md-block d-none">
          <DropdownToggle color="" className="sort-dropdown">
            <span className="align-middle mx-50">
            {console.log(props)}
              {`${props.index[0]} - ${props.index[1]} of ${props.total}`}
            </span>
            {console.log(props)}
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
          </DropdownMenu>
        </UncontrolledDropdown> */}
      </div>
    </div>
  );
};

class AvailablePeersConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      function tConvert(time) {
        var timeString = time;
        var H = +timeString.substr(0, 2);
        var h = H % 12 || 12;
        var ampm = H < 12 || H === 24 ? "AM" : "PM";
        timeString = h + timeString.substr(2, 3) + ampm;
        return timeString;
      }
      return {
        readytoOnboard: props.readytoOnboard.map((a) => ({
          name: a.name,
          designation: a._id,
          status: a.status,
          profilePic: a.profilePic,
          designation: a.designation,
          avilStartTime: tConvert(a.avaliablityStartTime),
          avilEndTime: tConvert(a.avaliablityEndTime),
        })),

        data: props.dataList.data,
        allData: props.dataList.filteredData,
        totalPages: props.totalPages,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage:
          Object.keys(props.parsedFilter).length === 0
            ? 10
            : parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataList.totalRecords,
        sortIndex: props.dataList.sortIndex,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  state = {
    data: [],
    projects: [],
    readytoOnboard: [],
    expstate: [],
    totalPages: 0,
    currentPage: 0,
    name: "",
    columns: [
      // {
      //   name: "",
      //   maxWidth: "40px",
      //   minWidth: "40px",
      //   cell: row => (
      //     <p className="text-truncate text-bold-700 mb-0">
      //       {row.name}
      //     </p>
      //   )
      // },
      {
        // name: "Tasks",
        // selector: "tasks",
        // sortable: true,
        minWidth: "100px",
        cell: (row) => (
          <div className="contact-icon-wrap">
            <img
              src={row.profilePic}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
              }}
              height="60"
              className="contact-iconprof"
            />
            <span class="avatar-status-online"></span>
          </div>
        ),
      },
      {
        name: "Name",
        selector: "Name",
        sortable: true,
        minWidth: "140px",
        cell: (row) => (
          <p className="text-truncate text-bold-700 mb-0">{row.name}</p>
        ),
      },
      {
        name: "Designation",
        selector: "Designation",
        sortable: true,
        minWidth: "120px",

        cell: (row) => (
          <p title="" className="text-truncate text-bold-700 mb-0 pr-0 pl-0">
            {row.designation}
          </p>
        ),
      },
      {
        name: "Availability",
        selector: "Availability",
        sortable: true,
        minWidth: "120px",
        cell: (row) => (
          <p
            title="09 Apr"
            className="text-truncate text-bold-700 mb-0 pr-0 pl-0"
          >
            {row.avilStartTime} - {row.avilEndTime}
          </p>
        ),
      },
      {
        name: "Contact",
        selector: "Contact",
        sortable: true,
        minWidth: "120px",
        cell: (row) => (
          <div className="contact-icon-wrap p-0 ">
            <img src={PhoneIcon} className="contact-icon1" />
            <img src={SkypeIcon} className="contact-icon1" />
          </div>
        ),
      },
      {
        name: "Status",
        selector: "status",
        minWidth: "20px",
        sortable: true,
        cell: (row) => (
          <div className="p-0" style={{ margin: "-30px" }}>
            <Chip
              className=""
              style={{}}
              color={chipColors[row.status]}
              text={row.status}
            />
          </div>
        ),
      },
    ],
    allData: [],
    value: "",
    rowsPerPage: 10,
    sidebar: false,
    currentData: null,
    selected: [],
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
  };

  thumbView = this.props.thumbView;

  async componentDidMount() {
    console.log(this.props);
    if (Object.keys(this.props.parsedFilter).length === 0) {
      var page = { page: 1, size: 10 };
    } else {
      var page = {
        page: parseInt(this.props.parsedFilter.page),
        size: parseInt(this.props.parsedFilter.perPage),
      };
    }

    let projectfordash = await this.props.getOngoingProjects();
    console.log(projectfordash.data.result);
    if (projectfordash.data.statusCode == 200) {
      this.setState({
        projectids: projectfordash.data.result.map((b) => b._id),
        projectdata: projectfordash.data.result.map((b) => b.project),
      });
    }

    console.log(this.state.projectids);

    let data = {
      startDate: "2020-08-01",
      endDate: "2020-09-31",
      projectIds: this.state.projectids,
      roleIds: [],
      ...page,
    };
    await this.props.redyto_Onboard(data);

    function tConvert(time) {
      var timeString = time;
      var H = +timeString.substr(0, 2);
      var h = H % 12 || 12;
      var ampm = H < 12 || H === 24 ? "AM" : "PM";
      timeString = h + timeString.substr(2, 3) + ampm;
      return timeString;
    }
    // this.setState({
    //   readytoOnboard: this.props.readytoOnboard.map(a => ({
    //     name: a.name,
    //     designation: a._id,
    //     status: a.status,
    //     profilePic: a.profilePic,
    //     designation: a.designation,
    //     avilStartTime: tConvert(a.avaliablityStartTime),
    //     avilEndTime: tConvert(a.avaliablityEndTime)

    //   })),
    //   data: this.props.dataList.data,
    //   allData: this.props.dataList.filteredData,
    //   totalPages: this.props.totalPages,
    //   currentPage: parseInt(this.props.parsedFilter.page) - 1,
    //   rowsPerPage: Object.keys(this.props.parsedFilter).length === 0 ? 10 : parseInt(this.props.parsedFilter.perPage),
    //   totalRecords: this.props.dataList.totalRecords,
    //   sortIndex: this.props.dataList.sortIndex
    // })
    //   console.log(this.state.profilePic)
    this.props.getInitialData();
  }

  // componentDidUpdate(prevProps,prevState){
  //   if(this.state.expstate!= prevState.expstate){

  //           this.setState({
  //             data: prevProps.dataList.data,
  //             allData: prevProps.dataList.filteredData,
  //             totalPages: prevProps.totalPages,
  //             currentPage: parseInt(prevProps.parsedFilter.page) - 1,
  //             rowsPerPage: Object.keys(prevProps.parsedFilter).length === 0 ? 10 : parseInt(prevProps.parsedFilter.perPage),
  //             totalRecords: prevProps.dataList.totalRecords,
  //             sortIndex: prevProps.dataList.sortIndex
  //           })
  //     }

  // }

  handleRowsPerPage = (value) => {
    let { parsedFilter, redyto_Onboard } = this.props;
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/dashboard?page=${page}&perPage=${value}`);
    this.setState({ rowsPerPage: value });

    redyto_Onboard({
      startDate: "2020-08-01",
      endDate: "2020-09-31",
      projectIds: this.state.projectids,
      roleIds: [],
      page: parseInt(page),
      size: parseInt(value),
    });

    this.setState({ rowsPerPage: value });
  };

  filterDatabyStatus = (data) => {
    if (data === "Ready to On-Board") {
      expdata = this.props.readytoOnboard
        .filter((a) => a.status == "Ready to On-Board")
        .map((a) => ({
          name: a.name,
          designation: a._id,
          status: a.status,
          profilePic: a.profilePic,
          designation: a.designation,
          avilStartTime: a.avaliablityStartTime,
          avilEndTime: a.avaliablityEndTime,
        }));
      console.log(expdata);

      this.setState({
        readytoOnboard: expdata,
        expstate: expdata,
        //     data: this.props.dataList.data,
        // allData: this.props.dataList.filteredData,
        // totalPages: this.props.totalPages,
        // currentPage: parseInt(this.props.parsedFilter.page) - 1,
        // rowsPerPage: Object.keys(this.props.parsedFilter).length === 0 ? 10 : parseInt(this.props.parsedFilter.perPage),
        // totalRecords: this.props.dataList.totalRecords,
        // sortIndex: this.props.dataList.sortIndex
      });
    }
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };

  handleDelete = (row) => {
    let obj = {
      project: row.id,
      token: localStorage.getItem("token"),
    };
    this.props.deleteProjectRow(obj);
  };

  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };

  handlePagination = (page) => {
    console.log(this.props.parsedFilter);
    let { parsedFilter, redyto_Onboard } = this.props;
    let perPage =
      parsedFilter.perPage !== undefined ? parsedFilter.perPage : 10;
    let urlPrefix = this.props.thumbView ? "/dashboard" : "/dashboard/";
    history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`);

    redyto_Onboard({
      startDate: "2020-08-01",
      endDate: "2020-09-31",
      projectIds: this.state.projectids,
      roleIds: [],
      page: page.selected + 1,
      size: perPage,
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
      totalRecords,
      sortIndex,
      readytoOnboard,
      projects,
    } = this.state;

    console.log(this.state.totalPages);
    return (
      <div
        className={`data-list cus_datalist ${
          this.props.thumbView ? "thumb-view" : "list-view"
        }`}
      >
        {/* <UncontrolledDropdown style={{ left: "47vw" }}>
          <DropdownToggle tag="small" className=" cursor-pointer">

            <ChevronDown size={10} />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => this.filterDatabyStatus("Ready to On-Board")}>Ready to On-Board</DropdownItem>
            <DropdownItem onClick={() => this.getStartdateEnddate("month")}>In Progress</DropdownItem>
            <DropdownItem onClick={() => this.getStartdateEnddate("year")}>on Hold</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
        {/* {console.log(this.state.readytoOnboard)} */}
        <DataTable
          className="avail_config"
          columns={columns}
          data={readytoOnboard.length ? readytoOnboard : data}
          pagination
          paginationServer
          paginationComponent={() => (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={totalPages}
              containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2 ml-1"
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
              handleRowsPerPage={this.handleRowsPerPage}
              rowsPerPage={rowsPerPage}
              total={totalRecords}
              index={sortIndex}
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
        {/* <Sidebar
          show={sidebar}
          data={currentData}
          updateData={this.props.updateData}
          addData={this.props.addData}
          handleSidebar={this.handleSidebar}
          thumbView={this.props.thumbView}
          getData={this.props.getData}
          dataParams={this.props.parsedFilter}
          addNew={this.state.addNew}
        /> */}
        <div
          className={classnames("data-list-overlay", {
            show: sidebar,
          })}
          onClick={() => this.handleSidebar(false, true)}
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
    readytoOnboard: state.readytoOnboard.result,
    totalPages: state.readytoOnboard.totalPages,
  };
};

export default connect(mapStateToProps, {
  getData,
  deleteData,
  updateData,
  addData,
  getInitialData,
  getProjectData,
  deleteProjectRow,
  filterData,
  redyto_Onboard,
  dashboard_availablity,
  getOngoingProjects,
})(AvailablePeersConfig);
