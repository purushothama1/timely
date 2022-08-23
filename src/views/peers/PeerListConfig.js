import React, { Component } from "react"
import {
  Button,
  Progress,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Modal,
	ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap"
import DataTable from "react-data-table-component"
import classnames from "classnames"
import ReactPaginate from "react-paginate"
import { history } from "../../history"
import {
  Edit,
  Trash,
  ChevronDown,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight
} from "react-feather"
import { connect } from "react-redux"
import {
  getData,
  getInitialData,
  deleteData,
  updateData,
  addData,
  filterData
} from "../../redux/actions/data-list/"
import {getPeerData,deletePeerRow, searchPeersData} from "../../redux/actions/peers"
import Sidebar from "./PeerListSidebar"
import Chip from "../../components/@vuexy/chips/ChipComponent"
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy"

import "../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../assets/scss/pages/data-list.scss"

const chipColors = {
  "on hold": "warning",
  delivered: "success",
  pending: "primary",
  canceled: "danger"
}

const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: "rgba(115,103,240,.05)",
      color: "#7367F0 !important",
      boxShadow: "0 0 1px 0 #7367F0 !important",
      "&:hover": {
        transform: "translateY(0px) !important"
      }
    }
  }
}

const ActionsComponent = props => {
  return (
    <div className="data-list-action">
      <Edit
        className="cursor-pointer mr-1"
        size={20}
        onClick={() => {
          return props.currentData(props.row)
        }}
      />
      <Trash
        className="cursor-pointer"
        size={20}
        onClick={() => {
          // props.deleteRow(props.row)
          props.toggleModal(props.row)
        }}
      />
    </div>
  )
}

const CustomHeader = props => {
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
        {
          localStorage.getItem('adminaccess') == "level3"?
        <Button
          className="add-new-btn add-sprint-button"
          color="primary"
          onClick={() => props.handleSidebar(true, true)}
          outline>
          <Plus size={15} />
          <span className="align-middle">Add New</span>
        </Button>
        :""
        }
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
          <Input type="text" onChange={e => props.handleFilter(e)} />
        </div>
      </div>
    </div>
  )
}

class PeerListConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        peers:props.peers.map(peer=>({
          id: peer._id,
          name: peer.name,
          id:peer._id,
           employeeId:peer.employeeId,
          profilePic: peer.profilePic,
          role:peer.role,
          designation:peer.designation,
          currentStatus:peer.currentStatus,
          // collabToolId:peer.collabToolId,
          collabToolIdSkype: peer.collabServices.map(collab => (collab.serviceName == "skype" ? collab.serviceId : "")),
          collabToolIdSlack: peer.collabServices.map(collab => (collab.serviceName == "slack" ? collab.serviceId : "")),
          collabToolIdZoom: peer.collabServices.map(collab => (collab.serviceName == "zoom" ? collab.serviceId : "")),
          countryCode:peer.countryCode,
          adminAccess:peer.adminAccess,
          timeZoneId:peer.timeZoneId,
          // projects:peer.projects
          // availability:peer.availability,
          // workMode:peer.workMode,
          emailId:peer.emailId,
          phoneNumber:peer.phoneNumber,
          location:peer.location,
          block:peer.block
        })),
        data: props.dataList.data,
        allData: props.dataList.filteredData,
        totalPages: props.totalPages,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage: Object.keys(props.parsedFilter).length === 0 ? 40 : parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataList.totalRecords,
        sortIndex: props.dataList.sortIndex
      }
    }

    // Return null if the state hasn't changed
    return null
  }

  state = {
    data: [],
    totalPages: 0,
    currentPage: 0,
    allData: [],
    value: "",
    rowsPerPage: 40,
    sidebar: false,
    currentData: null,
    selected: [],
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
    deleteRowId: '',
    del:false,
    filteredPeers:[],
    collabServices:{}
  }

  thumbView = this.props.thumbView

  async componentDidMount() {
      if(Object.keys(this.props.parsedFilter).length === 0){
        var page = {"page": 1, "perPage": 40}
       }
       else{
         var page = {"page": parseInt(this.props.parsedFilter.page), "perPage": parseInt(this.props.parsedFilter.perPage)}
       }
         let obj = { 
           "company": localStorage.getItem('company'), 
           "level": localStorage.getItem("adminaccess"),
           "user": localStorage.getItem("user"),
           "token":localStorage.getItem('token'),
            ...page
          }
         await this.props.getPeerData(obj)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.thumbView) {
      this.thumbView = false
      let columns = [
        {
          name: "Image",
          selector: "img",
          // minWidth: "150px",
          minWidth: "200px",
          cell: row => <img src={row.profilePic} onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} height="100" alt={row.name} />
        },
        {
          name: "EmployeeID",
          selector: "employeeID",
          sortable: true,
          minWidth: "130px",
          cell: row => <p title={row.EmployeeID} className="text-truncate text-bold-500 mb-0">
          {row.employeeId}
        </p>
        },

        
        {
          name: "Name",
          selector: "name",
          sortable: true,
          minWidth: "200px",
          cell: row => (
            <p title={row.name} className="text-truncate text-bold-500 mb-0">
            {row.name}
          </p>
          )
          },

          {
            name: "Role",
            selector: "role",
            sortable: true,
            minWidth: "200px",
            cell: row => (<p title={row.role.role} className="text-truncate text-bold-500 mb-0">
            {row.role.role}
          </p>
            
            )
            },
            
            {
              name: "Designation",
              selector: "designation",
              sortable: true,
              minWidth: "150px",
              cell: row => (
                <p >{row.designation.designation}
                </p>
              )
              },

                {
                  name: "Default Status",
                  selector: "currentStatus",
                  sortable: true,
                  minWidth: "165px",
                  cell: row => (
                    <p >{row.currentStatus}
                    </p>
                  )
                  },

                  {
                    name: "Collab-Tool-Id-Skype",
                    selector: "collabToolIdSkype",
                    sortable: false,
                    minWidth: "200px",
                    cell: row => (
                      <p >
                        {row.collabToolIdSkype[0] !== null ? row.collabToolIdSkype[0] : "-"}
                      </p>
                    )
                    },
                    {
                      name: "Collab-Tool-Id-Slack",
                      selector: "collabToolIdSlack",
                      sortable: false,
                      minWidth: "200px",
                      cell: row => (
                        <p >
                        {row.collabToolIdSlack[1] !== null ? row.collabToolIdSlack[1] : "-"}
                        </p>
                      )
                      },
                      {
                        name: "Collab-Tool-Id-Zoom",
                        selector: "collabToolIdZoom",
                        sortable: false,
                        minWidth: "200px",
                        cell: row => (
                          <p >
                          {row.collabToolIdZoom[2] !== null ? row.collabToolIdZoom[2] : "-"}
                          </p>
                        )
                        },
                      {
                        name: "AdminAccess",
                        selector: "adminAccess",
                        sortable: true,
                        minWidth: "130px",
                        cell: row => (
                          <p >{row.adminAccess.userType}
                          </p>
                        )
                        },
                        {
                          name: "TimeZoneId",
                          selector: "timeZoneId",
                          sortable: true,
                          minWidth: "150px",
                          cell: row => (
                            <p >{row.timeZoneId}
                            </p>
                          )
                          },

                          // {
                          //   name: "TimeZoneId",
                          //   selector: "timeZoneId",
                          //   sortable: true,
                          //   minWidth: "250px",
                          //   cell: row => (
                          //     <p >{row.timeZoneId}
                          //     </p>
                          //   )
                          //   },


                    {
                      name: "Email",
                      selector: "emailId",
                      sortable: true,
                      minWidth: "250px",
                      cell: row => (
                        <p >{row.emailId}
                        </p>
                      )
                      },

                      {
                        name: "Mob",
                        selector: "phoneNumber",
                        sortable: true,
                        minWidth: "150px",
                        cell: row => (
                          <p >{"+" + row.phoneNumber}
                          </p>
                        )
                        },
                        {
                          name: "Location",
                          selector: "location",
                          sortable: true,
                          minWidth: "200px",
                          cell: row => (
                            <p>{row.location.location}
                            </p>
                          )
                          },

                          {
                            name: "Block",
                            selector: "block",
                            sortable: true,
                            minWidth: "130px",
                            cell: row => (
                              <p >{row.block.block}
                              </p>
                            )
                            },
                          
               localStorage.getItem('adminaccess') == "level3"?
              {
            name: "Actions",
            sortable: true,
            minWidth: "150px",
            cell: row => (
              <ActionsComponent
                row={row}
                getData={this.props.getData}
                parsedFilter={this.props.parsedFilter}
                currentData={this.handleCurrentData}
                // deleteRow={this.handleDelete}
                toggleModal={this.toggleModal}
              />
            )
          }
          :""
      ]
      this.setState({ columns })
    }
  }

  // handleFilter = e => {
  //   this.setState({ value: e.target.value })
  //   this.props.filterData(e.target.value)
  // }
  handleFilter = async e => {
    let { parsedFilter } = this.props
    this.setState({ value: e.target.value })
    let val=e.target.value
    if(Object.keys(parsedFilter).length === 0){
      var page = {"page": 1, "size": 40}
     }
     else{
       var page = {"page": parseInt(parsedFilter.page), "size": parseInt(parsedFilter.perPage)}
     }
    let obj = {"searchText":val,
                "companyId":localStorage.getItem('company'),
               ...page}
    let searchValue = await this.props.searchPeersData(obj)
    //console.log("searchValue",searchValue)
    if(searchValue !== undefined){
          searchValue = searchValue.map(peer=>({
            id: peer._id,
            name: peer.name,
            id:peer._id,
            employeeId:peer.employeeId,
            profilePic: peer.profilePic,
            role:peer.role,
            designation:peer.designation,
            currentStatus:peer.currentStatus,
            // collabToolId:peer.collabToolId,
            collabToolIdSkype: peer.collabServices.map(collab => (collab.serviceName == "skype" ? collab.serviceId : "")),
            collabToolIdSlack: peer.collabServices.map(collab => (collab.serviceName == "slack" ? collab.serviceId : "")),
            collabToolIdZoom: peer.collabServices.map(collab => (collab.serviceName == "zoom" ? collab.serviceId : "")),
            countryCode:peer.countryCode,
            adminAccess:peer.adminAccess,
            timeZoneId:peer.timeZoneId,
            // projects:peer.projects
            // availability:peer.availability,
            // workMode:peer.workMode,
            emailId:peer.emailId,
            phoneNumber:peer.phoneNumber,
            location:peer.location,
            block:peer.block
          }))
      }
    this.setState({filteredPeers: searchValue})
  }

  handleRowsPerPage = value => {
    let { parsedFilter, getPeerData } = this.props
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
     let urlPrefix = this.props.thumbView
      ? "/data-list/manage-peer-view"
      : "/data-list/list-view/"
    history.push(
      `${urlPrefix}?page=${page}&perPage=${value}`
    )
    getPeerData({ 
      "company": localStorage.getItem('company'),
       page: parseInt(page),
       perPage: parseInt(value) 
       })
    this.setState({ rowsPerPage: value })
  }

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean })
    if (addNew === true) this.setState({ currentData: null, addNew: true })
  }

  toggleModal = row => {
    this.setState(prevState => ({
      del: !prevState.del,
      deleteRowId: row.id 
    }))
  }

  handleDelete = row => {
    // let obj={"user": row.id}
    let obj={
      "user": this.state.deleteRowId,
      "token":localStorage.getItem('token'),
    }

    this.props.deletePeerRow(obj)
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
    this.setState(prevState => ({
      del: !prevState.del,
      deleteRowId: "" 
    }))
  }

  handleCurrentData = obj => {
    this.setState({ currentData: obj })
    this.handleSidebar(true)
  }

  handlePagination = page => {
    let { parsedFilter, getPeerData } = this.props
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 40
    let urlPrefix = this.props.thumbView
      ? "/data-list/manage-peer-view"
      : "/data-list/list-view"
    history.push(
      `${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`
    )
    getPeerData({ 
      "company": localStorage.getItem('company'),
      page: page.selected + 1,
       perPage: perPage
       })
    this.setState({ currentPage: page.selected })
  }

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
      peers,
      filteredPeers
    } = this.state
    return (
      <div
        className={`data-list ${
          this.props.thumbView ? "thumb-view" : "list-view"
        }`}>
        <DataTable
          columns={columns}
          data={peers.length ? value? filteredPeers : peers : []}
          pagination
          paginationServer
          paginationComponent={() => (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={totalPages}
              containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
              activeClassName="active"
              forcePage={
                this.props.parsedFilter.page
                  ? parseInt(this.props.parsedFilter.page - 1)
                  : 0
              }
              onPageChange={page => this.handlePagination(page)}
            />
          )}
          noHeader
          subHeader
          // selectableRows
          responsive
          pointerOnHover
          selectableRowsHighlight
          onSelectedRowsChange={data =>
            this.setState({ selected: data.selectedRows })
          }
          customStyles={selectedStyle}
          subHeaderComponent={
            <CustomHeader
              handleSidebar={this.handleSidebar}
              handleFilter={this.handleFilter}
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
            size: "sm"
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
             Are you sure you want to delete this Peer?
        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={this.handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>

        <div
          className={classnames("data-list-overlay", {
            show: sidebar
          })}
          // onClick={() => this.handleSidebar(false, true)}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataList: state.dataList, 
    peers:state.peers.peers,
    totalPages: state.peers.totalPages
  }
}

export default connect(mapStateToProps, {
  getData,
  deleteData,
  updateData,
  addData,
  getInitialData,
  filterData,
  getPeerData,
  deletePeerRow,
  searchPeersData
})(PeerListConfig)
