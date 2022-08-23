import React, { Component } from "react"
import { Label, Input, FormGroup, Button } from "reactstrap"
import { X, GitHub } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import Select from "react-select"
import classnames from "classnames"
import { connect } from "react-redux"
import Avatar from "../../components/@vuexy/avatar/AvatarComponent"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
// import ReactCrop from 'react-image-crop'
// import 'react-image-crop/lib/ReactCrop.scss'
import {getPeerUserOptions, addPeer, updatePeerData, getBlocksInlocation, profileImageUpload } from "../../redux/actions/peers"

class DataListSidebar extends Component {
  state = {
    img: [],
    id: "",
    name: "",
    category: "",
    employeeId: "",
    role: "",
    designation: "",
    availability: "",
    workmode: "",
    emailId: "",
    mob: "",
    location: "",
    block: "",
    currentStatus: "",
    collabToolIdSkype: "",
    collabToolIdSlack: "",
    collabToolIdZoom: "",
    countryCode: "",
    adminAccess: "",
    timeZoneId: "Asia/Kolkata",
    userOptions: {},
    // crop:{
    //   aspect: 1/1
    // },
  }
  //imagePreviewCanvasRef = React.createRef()
  addNew = false

  async componentDidMount(){
   
    let obj = {
      "company": localStorage.getItem('company'),
      "token":localStorage.getItem('token'),
    }
    const userOptions = await this.props.getPeerUserOptions(obj)
    // const adminAccessData =  [...userOptions.data.adminAccess.map(adminOptions => (adminOptions.adminRoles.map(adminLabel => ({"label": adminLabel, "value": adminLabel}))))]
   
    this.setState({
      roleOptions: [...userOptions.data.roles.map(options => ({"label": options.role,"value":options._id}))],
      designationOptions: [...userOptions.data.designations.map(options => ({"label": options.designation,"value":options._id}))],
      locationOptions: [...userOptions.data.locations.map(options => ({"label": options.location,"value":options._id}))],
      currentStatusOptions: [...userOptions.data.statusModes.map(options => ({"label": options.mode,"value":options.mode}))],
      // adminAccessOptions: adminAccessData.map(options => ({options})),
      adminAccessOptions: [...userOptions.data.adminAccess.map(options => ({"label": options.userType,"value":options._id}))],
      // blockOptions: [...userOptions.data.blocks.map(options => ({"label": options.block,"value":options._id}))]
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props,"abb")
   
    if (this.props.data !== null && prevProps.data === null) {
      if (this.props.data.id !== prevState.id) {  
        this.setState({ id: this.props.data.id })
      }
      if (this.props.data.img !== prevState.img) {  
        this.setState({ img: this.props.data.profilePic})
      }
      if (this.props.data.name !== prevState.name) {  
        this.setState({ name: this.props.data.name })
      }
      if (this.props.data.category !== prevState.category) {
        this.setState({ category: this.props.data.category })
      }
      if (this.props.data.employeeId !== prevState.employeeId) {
        this.setState({ employeeId: this.props.data.employeeId })
      }
      if (this.props.data.role !== prevState.role) {
        this.setState({ role: this.props.data.role})
      }
      
      if (this.props.data.designation !== prevState.designation) {
        this.setState({ designation: this.props.data.designation })
      }
      
      if (this.props.data.availability !== prevState.availability) {
        this.setState({ availability: this.props.data.availability })
      }
      if (this.props.data.workmode !== prevState.workmode) {
        this.setState({ workmode: this.props.data.workmode })
      }
      if (this.props.data.emailId !== prevState.emailId) {
        this.setState({ emailId: this.props.data.emailId })
      }
      if (this.props.data.mob !== prevState.mob) {
        this.setState({ mob: this.props.data.phoneNumber })
      }
      if (this.props.data.location !== prevState.location) {
        this.setState({ location: this.props.data.location })
      }
      if (this.props.data.block !== prevState.block) {
        this.setState({ block: this.props.data.block })
      }
      if (this.props.data.currentStatus !== prevState.currentStatus) {
        this.setState({ currentStatus: this.props.data.currentStatus })
      }
      // if (this.props.data.collabToolId !== prevState.collabToolId) {
      //   this.setState({ collabToolId: this.props.data.collabToolId   })
      // }
      if (this.props.data.collabToolIdSkype !== prevState.collabToolIdSkype) {
        this.setState({ collabToolIdSkype: this.props.data.collabToolIdSkype[0]   })
      }
      if (this.props.data.collabToolIdSlack !== prevState.collabToolIdSlack) {
        this.setState({ collabToolIdSlack: this.props.data.collabToolIdSlack[1]  })
      }
      if (this.props.data.collabToolIdZoom !== prevState.collabToolIdZoom) {
        this.setState({ collabToolIdZoom: this.props.data.collabToolIdZoom[2] })
      }

      if (this.props.data.countryCode !== prevState.countryCode) {
        this.setState({ countryCode: this.props.data.countryCode })
      }
      if (this.props.data.adminAccess !== prevState.adminAccess) {
        // this.setState({ adminAccess: this.props.data.adminAccess })
        this.setState({adminAccess: {label: this.props.data.adminAccess.userType, value: this.props.data.adminAccess._id}})
      }
      if (this.props.data.timeZoneId !== prevState.timeZoneId) {
        this.setState({ timeZoneId: this.props.data.timeZoneId })
      }

    }

    if (this.props.data === null && prevProps.data !== null) {
      this.setState({
        img: [],
        name: "",
        category: "",
        id: "",
        employeeId: "",
        role: "",
        designation: "",
        availability: "",
        workmode: "",
        emailId: "",
        mob: "",
        location: "",
        block: "",
        currentStatus: "",
        collabToolIdSkype: "",
        collabToolIdSlack: "",
        collabToolIdZoom: "",
        countryCode: "",
        adminAccess: "",
        timeZoneId: "Asia/Kolkata",
      })
    }
    if (this.addNew) {
      this.setState({
        img: [],
        id: "",
        name: "",
        category: "",
        employeeId: "",
        role: "",
        designation: "",
        availability: "",
        workmode: "",
        emailId: "",
        mob: "",
        location: "",
        block: "",
        currentStatus: "",
        collabToolIdSkype: "",
        collabToolIdSlack: "",
        collabToolIdZoom: "",
        countryCode: "",
        adminAccess: "",
        timeZoneId: "Asia/Kolkata",
        errorProfilePic: "",
        errorProfileName: "",
        errorEmployeeId: "",
        errorRole: "",
        errorDesignation: "",
        errorEmailId: "",
        errorMobile: "",
        errorLocation: "",
        errorBlock: "",
        errorWorkMode: "",
        errorAdminAcess: ""

      })
    }
    this.addNew = false
  }

  handleSubmit = obj => {
      console.log(obj);
    let submitData = {
      "name": obj.name,
      "profilePic": obj.img,
      "employeeId": obj.employeeId,
      "currentStatus": obj.currentStatus,
      // "countryCode": "+91",
      "designation": obj.designation._id,
      "role": obj.role._id,
      "emailId": obj.emailId,
      "timeZoneId": "Asia/Kolkata",
      "collabServices":[{"serviceName":"skype","serviceId":obj.collabToolIdSkype !== "" ? obj.collabToolIdSkype : null},{"serviceName":"slack","serviceId":obj.collabToolIdSlack !== "" ? obj.collabToolIdSlack : null},{"serviceName":"zoom","serviceId":obj.collabToolIdZoom !== "" ? obj.collabToolIdZoom : null}],
      // "collabToolId": obj.collabToolId,
      "phoneNumber": obj.mob,
      "company": localStorage.getItem('company'),
      "location": obj.location._id,
      "block": obj.block._id,
      "adminAccess": obj.adminAccess.value,
      "token":localStorage.getItem('token'),
    }
    if (this.props.data !== null) {
     let peerUpdateSubmit = {...submitData, "user": obj.id}

     if(!this.state.name){
      this.setState({
        errorProfileName:"Please fill the name",
      })
      return this.props.show
    }
    else if(this.state.img.length == 0){
        this.setState({
          errorProfilePic:"Please upload profile image",
        })
        return this.props.show
    }
    else if(!this.state.employeeId){
      this.setState({
        errorEmployeeId:"Please enter employee ID",
      })
      return this.props.show
    }
    else if(!this.state.currentStatus){
      this.setState({
        errorWorkMode:"Please select default work mode",
      })
      return this.props.show
    }
    else if(!this.state.designation){
      this.setState({
        errorDesignation:"Please select designation",
      })
      return this.props.show
    }
    else if(!this.state.role){
      this.setState({
        errorRole:"Please select default work mode",
      })
      return this.props.show
    }
    else if(!this.state.emailId){
      this.setState({
        errorEmailId:"Please enter email ID",
      })
      return this.props.show
    }
    else if(!this.state.mob){
      this.setState({
        errorMobile:"Please enter mobile number",
      })
      return this.props.show
    }

    else if(!this.state.location){
      this.setState({
        errorLocation:"Please select location",
      })
      return this.props.show
    }
    else if(!this.state.block){
      this.setState({
        errorBlock:"Please select block",
      })
      return this.props.show
    }
    else if(!this.state.adminAccess){
      this.setState({
        errorAdminAcess:"Please select location",
      })
      return this.props.show
    }
    else
    {
      this.props.updatePeerData(peerUpdateSubmit)
    }
    } 
    else {
      if(this.state.img.length == 0){
        this.setState({
          errorProfilePic:"Please upload profile image",
        })
        return this.props.show
    }
    else if(!this.state.name){
        this.setState({
          errorProfileName:"Please fill the name",
        })
        return this.props.show
      }
      else if(!this.state.employeeId){
        this.setState({
          errorEmployeeId:"Please enter employee ID",
        })
        return this.props.show
      }
      else if(!this.state.role){
        this.setState({
          errorRole:"Please select role",
        })
        return this.props.show
      }
      else if(!this.state.designation){
        this.setState({
          errorDesignation:"Please select designation",
        })
        return this.props.show
      }
      else if(!this.state.emailId){
        this.setState({
          errorEmailId:"Please enter email ID",
        })
        return this.props.show
      }
      else if(!this.state.mob){
        this.setState({
          errorMobile:"Please enter mobile number",
        })
        return this.props.show
      }
  
      else if(!this.state.location){
        this.setState({
          errorLocation:"Please select location",
        })
        return this.props.show
      }
      else if(!this.state.block){
        this.setState({
          errorBlock:"Please select block",
        })
        return this.props.show
      }
      else if(!this.state.currentStatus){
        this.setState({
          errorWorkMode:"Please select default work mode",
        })
        return this.props.show
      }
      else if(!this.state.adminAccess){
        this.setState({
          errorAdminAcess:"Please select location",
        })
        return this.props.show
      }
      else{
      this.addNew = true
      console.log(submitData)
      this.props.addPeer(submitData)
      // setTimeout(function(){  window.location.reload(false) }, 4000);
    }
    }
    // let params = Object.keys(this.props.dataParams).length
    
    //   ? this.props.dataParams
    //   : { page: 1, perPage: 4 }
    this.props.handleSidebar(false, true)
  }

  handleChangeRole = selectedOption => {
    this.setState({ role:  {role: selectedOption.label, _id: selectedOption.value}, errorRole: ""});
  };

  handleChangeDesignation = selectedOption => {
      this.setState({ designation:  {designation: selectedOption.label, _id: selectedOption.value}, errorDesignation: ""});
  }

  handleChangeLocation =selectedOption =>{
    this.setState({ location: {location: selectedOption.label, _id: selectedOption.value}, errorLocation:""},async ()=>{
      let obj ={
        "location": this.state.location._id,
        "company": localStorage.getItem('company'),
        "token":localStorage.getItem('token'),
      }
      const blockOptionsResult = await this.props.getBlocksInlocation(obj)
      this.setState({
        block:"",
        blockOptions: [...blockOptionsResult.data.blocks.map(options => ({"label": options.block,"value":options._id}))]
      })
    });
  }

  handleChangeStatus =selectedOption =>{
    this.setState({ currentStatus:  selectedOption.value, errorWorkMode:""});
  }

  handleChangeAdminAccess= selectedOption =>{
    this.setState({ adminAccess:  selectedOption, errorAdminAcess:""});
  }

  handleChangeBlock = selectedOption =>{
    this.setState({ block: {block: selectedOption.label, _id: selectedOption.value}, errorBlock: ""});
  }

  clearDataOnCancel(){
    this.addNew = true
  }

   handleProfileImage = async(e) =>{
    let imageUrl = e.target.files[0]
    let obj = {
      "file":imageUrl
    }
    let profileUrl = await this.props.profileImageUpload(obj)
    this.setState({
      img: profileUrl,
      errorProfilePic: ""
    })    
  }

   // Base64 Image to Canvas with a Crop
  // image64toCanvasRef (canvasRef, image64, pixelCrop) {
  //   const canvas = canvasRef // document.createElement('canvas');
  //   canvas.width = pixelCrop.width
  //   canvas.height = pixelCrop.height
  //   const ctx = canvas.getContext('2d')
  //   const image = new Image()
  //   image.src = image64
  //   image.onload = function () {
  //     ctx.drawImage(
  //       image,
  //       pixelCrop.x,
  //       pixelCrop.y,
  //       pixelCrop.width,
  //       pixelCrop.height,
  //       0,
  //       0,
  //       pixelCrop.width,
  //       pixelCrop.height
  //     )
  //   }
  // }
 
  // // Extract an Base64 Image's File Extension
  // extractImageFileExtensionFromBase64 (base64Data) {
  //  // console.log("base64data",base64Data.substring('data:image/'.length, base64Data.indexOf(';base64')))
  //   return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'))
  // }

  // // Convert a Base64-encoded string to a File object
  // base64StringtoFile (base64String, filename) {
  //   //console.log("base64String",base64String,"filename", filename)
  //   var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)
  //   var enc= window.btoa(arr[1]), bstr = window.atob(enc), n = bstr.length, u8arr = new Uint8Array(n)
  //     if(mime){
  //       while (n--) {
  //         u8arr[n] = bstr.charCodeAt(n)
  //       }
        
  //     }
  //     return new File([u8arr], filename, {type: mime})
  // }

  // // Download a Base64-encoded file
  // downloadBase64File (base64Data, filename) {
  //   var element = document.createElement('a')
  //   element.setAttribute('href', base64Data)
  //   element.setAttribute('download', filename)
  //   element.style.display = 'none'
  //   document.body.appendChild(element)
  //   element.click()
  //   document.body.removeChild(element)
  // }

  // handleImageLoaded = (image) => {
  //   // console.log('image',image)
  // }

  // handleOnCropChange = (crop) => {
  //   // console.log(crop)
  //   this.setState({crop:crop})
  //   // console.log(this.state)
  // }

  // handleOnCropComplete = (crop, pixelCrop) => {
  //   //console.log('crop ',crop,'pixel', pixelCrop)
  //   const canvasRef = this.imagePreviewCanvasRef.current
  //   const {img} = this.state
  //   this.image64toCanvasRef(canvasRef, img, crop)

  // }

  // handleDownloadClick = (e) => {
  //   e.preventDefault()
  //   const canvasRef =this.imagePreviewCanvasRef.current
  //   const {img} = this.state
  //   canvasRef.crossOrigin ='anonymous'
  //   const fileExtension = this.extractImageFileExtensionFromBase64(img)
  //   this.setState({fileExtension})
  //   const myFilename = "previewFile." + fileExtension
     
  //     // console.log("canvasref",canvasRef)
  //     const imageData64 = canvasRef.toDataURL('image/' + fileExtension)
  //     //file to be uploaded
  //  const myNewCroppedFile = this.base64StringtoFile(imageData64,myFilename)
  //  console.log("mycroppedfile",myNewCroppedFile)
  //  //download file
  //  this.downloadBase64File(imageData64, myFilename)
  // }

  // handleDownload= ()=>{
  //   const canvasRef =this.imagePreviewCanvasRef.current
  //   canvasRef.crossOrigin ='anonymous'
  //   var btn = document.getElementById('down');
  //   btn.addEventListener('click', function (e) {
  //       var dataURL = canvasRef.toDataURL('image/png');
  //       btn.href = dataURL;
  //   });
  // }

  render() {
    var errorMessageStyle={
      color:"red",
   }
   console.log(this.props,"abc");
    let { show, handleSidebar, data } = this.props
    let { blockOptions, currentStatus, roleOptions, name,employeeId, role,designationOptions, designation, location, adminAccess, currentStatusOptions,countryCode,collabToolIdSkype, collabToolIdSlack , collabToolIdZoom ,timeZoneId,adminAccessOptions, emailId,mob,locationOptions,block, img } = this.state
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show
        })}>
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "UPDATE DATA" : "ADD NEW DATA"}</h4>
          <X size={20} onClick={() => {handleSidebar(false, true); this.clearDataOnCancel()}} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}>
          {this.props.thumbView  ? (
            <FormGroup className="text-center">
              {/* <img className="img-fluid" src={img} alt={name} /> */}
              <Avatar color="primary" className="mr-1" icon={<GitHub />} size="xl"/>
              <div className="d-flex flex-wrap justify-content-between mt-2 upload-image-div">
                <label
                  className="btn btn-flat-primary"
                  htmlFor="update-image"
                  color="primary">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*" 
                    id="update-image"
                    hidden
                    onChange={e => this.handleProfileImage(e)}
                  />
                </label>
              </div>
              <span style={errorMessageStyle}>
                  {this.state.errorProfilePic}
            </span>
            </FormGroup>
          ) : 

          <FormGroup className="text-center">
              <img className="img-fluid" src={img} alt={name} />
              
              {/* <ReactCrop 
              src={img} 
              crop={this.state.crop} 
              onImageLoaded={this.handleImageLoaded}
              onComplete={this.handleOnCropComplete}
              onChange= {this.handleOnCropChange}/>
              <br/>
              <p> Preview Crop Image</p>
              <canvas ref={this.imagePreviewCanvasRef}></canvas>
              <br/>
              <Button color="flat-danger" id="down" onClick={this.handleDownloadClick}>Download</Button> */}
              
              {/* <Avatar color="primary" className="mr-1" icon={<GitHub />} /> */}
              <div className="d-flex flex-wrap justify-content-between mt-2">
                <label
                  className="btn btn-flat-primary"
                  htmlFor="update-image"
                  color="primary">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*" 
                    id="update-image"
                    hidden
                    onChange={e => this.handleProfileImage(e)}
                  />
                </label>
                <Button
                  color="flat-danger"
                  onClick={() => this.setState({ img: "" })}>
                  Remove Image
                </Button>
              </div>
            </FormGroup>
          }
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              value={name}
              placeholder=""
              onChange={e => this.setState({ name: e.target.value, errorProfileName: "" })}
              id="name"
            />
             <span style={errorMessageStyle}>
                  {this.state.errorProfileName}
            </span>
          </FormGroup>

          <FormGroup>
            <Label for="employee">Employee Id</Label>
            <Input
              type="text"
              value={employeeId}
              placeholder=""
              
              onChange={e => this.setState({ employeeId: e.target.value, errorEmployeeId: "" })}
              id="employee"
            />
             <span style={errorMessageStyle}>
                  {this.state.errorEmployeeId}
            </span>
          </FormGroup>

          <FormGroup>
            <Label >Role</Label>
            <Select
               className="React"
               classNamePrefix="select"
               id="role"
               value= {{"label": role.role ,"value": role._id}}
               name="role"
               onChange={this.handleChangeRole}
               options={roleOptions}/>
              <span style={errorMessageStyle}>
                {this.state.errorRole}
              </span>
          </FormGroup>


          <FormGroup>
            <Label>Designation</Label>
            <Select
                className="React"
                classNamePrefix="select"
                value= {{"label": designation.designation ,"value": designation._id}}
                onChange={this.handleChangeDesignation}
                id="designation"
                options={designationOptions}/>
                <span style={errorMessageStyle}>
                {this.state.errorDesignation}
              </span>
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email "
              value={emailId}
              placeholder=""
              onChange={e => this.setState({ emailId: e.target.value, errorEmailId: "" })}
              id="email"
            />
            <span style={errorMessageStyle}>
              {this.state.errorEmailId}
            </span>
          </FormGroup>

          <FormGroup>
            <Label>Mobile number</Label>
            {/* <Input
              // type="number"
              value={mob}
              placeholder=""
              onChange={e => this.setState({ mob: e.target.value })}
              id="mobile"
            /> */}
            <PhoneInput
              country={'in'}
              countryCodeEditable={false}
              value={this.state.mob}
              enableSearch={true}
              disableSearchIcon={true}
              onChange={mob => this.setState({ mob, errorMobile: ""})}
            />
            <span style={errorMessageStyle}>
              {this.state.errorMobile}
            </span>
          </FormGroup>

          <FormGroup>
            <Label>Location</Label>
            <Select
                className="React"
                classNamePrefix="select"
                value= {{"label": location.location ,"value": location._id}}
                onChange={this.handleChangeLocation}
                id="location"
                options={locationOptions}/>
                <span style={errorMessageStyle}>
                  {this.state.errorLocation}
              </span>
          </FormGroup>

          <FormGroup>
            <Label>Block/Floor</Label>
            <Select
                className="React"
                classNamePrefix="select"
                value= {{"label": block.block ,"value": block._id}}
                onChange={this.handleChangeBlock}
                id="block"
                options={blockOptions}/>
                <span style={errorMessageStyle}>
                  {this.state.errorBlock}
              </span>
        </FormGroup>
        
        <FormGroup>
          <Label>Default Work Mode</Label>
          <Select
                className="React"
                classNamePrefix="select"
                value= {{"label": currentStatus ,"value": currentStatus}}
                onChange={this.handleChangeStatus}
                id="currentStatus"
                options={currentStatusOptions}/>
                <span style={errorMessageStyle}>
                  {this.state.errorWorkMode}
              </span>
        </FormGroup>

      
        <FormGroup>
          <Label>collab-Tool-Id</Label>
          <Input
            type="text"
            value={collabToolIdSkype}
            style={{marginBottom: "1rem"}}
            placeholder="skype-id"
            onChange={e => this.setState({ collabToolIdSkype: e.target.value })}
            id="skype"
          />
           <Input
            type="text"
            value={collabToolIdSlack}
            style={{marginBottom: "1rem"}}
            placeholder="slack-id"
            onChange={e => this.setState({ collabToolIdSlack: e.target.value })}
            id="slack"
          />
           <Input
            type="text"
            value={collabToolIdZoom}
            style={{marginBottom: "1rem"}}
            placeholder="zoom-id"
            onChange={e => this.setState({ collabToolIdZoom: e.target.value })}
            id="zoom"
          />
        </FormGroup>
        {/* <FormGroup>
          <Label>countryCode</Label>
          <Input
            type="number"
            // value= {countryCode}
            disabled
            placeholder="+91"
            onChange={e => this.setState({ countryCode: "+91" })}
            id="countryCode"
          />
        </FormGroup> */}

        <FormGroup>
          <Label>timeZoneId</Label>
          <Input
            type="text"
            value= {timeZoneId}
            disabled
            // placeholder={timeZoneId}
            onChange={e => this.setState({ timeZoneId: "Asia/Kolkata"})}
            id="timeZoneId"
          />
        </FormGroup>
        

        <FormGroup>
            <Label>Admin Access</Label>
            <Select
               className="React"
               classNamePrefix="select"
               id="adminAccess"
               value= {{"label": adminAccess.label ,"value": adminAccess.value}}
               onChange={this.handleChangeAdminAccess}
              //  menuIsOpen={true}
               styles={{ menu: styles => ({ ...styles, position: "relative" }) }}
               options={adminAccessOptions}/>
              <span style={errorMessageStyle}>
                  {this.state.errorAdminAcess}
              </span>
        </FormGroup>

      {/* {this.props.thumbView && img.length <= 0 ? (
            <label
              className="btn btn-primary"
              htmlFor="upload-image"
              color="primary">
              Upload Image
              <input
                type="file"
                id="upload-image"
                hidden
                onChange={e =>
                  this.setState({ 
                    // img: URL.createObjectURL(e.target.files[0]) 
                        img: "https://codewave-image-bucket.s3.ap-south-1.amazonaws.com/emp-images/Ganeshchandan.png"
                  })
                }
              />
            </label>
          ) : null} */}
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button color="primary" onClick={() => this.handleSubmit(this.state)}>
            {data !== null ? "Update" : "Submit"}
          </Button>
          <Button
            className="ml-1"
            color="danger"
            outline
            onClick={() => {handleSidebar(false, true); this.clearDataOnCancel()}}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect( mapStateToProps,
 { 
  getPeerUserOptions,
  addPeer,
  updatePeerData,
  getBlocksInlocation,
  profileImageUpload
})(DataListSidebar)
// export default DataListSidebar;