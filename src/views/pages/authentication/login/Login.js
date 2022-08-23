import React from "react"
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap"
import { Mail, Lock, Check, Facebook, Twitter, GitHub } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import googleSvg from "../../../../assets/img/svg/google.svg"
import {loginData} from "../../../../redux/actions/login"
import { connect } from "react-redux"
import loginImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"


class Login extends React.Component {
  state = {
    activeTab: "1",
    emailId : "",
    password: ""
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  login = obj =>{

    let fetchdata={
        emailId:obj.emailId,
        password: obj.password
    }
      if(!this.state.emailId){
        this.setState({
          emailerror:"please fill the valid email."
        })
      }
      else if(!this.state.password){
            this.setState({
              passworderror:"please fill the password"
            })
      }
      else {
        this.props.loginData(fetchdata, this.props)
      }
  }

forgotPassword = () => {
 
  history.push("/forgot-password")
}


  render() {
    var errormsgshowstyle={
      color:"#ff5722",
   }
    return (     
<div class="full-layout wrapper bg-full-screen-image blank-page dark-layout">
<div class="app-content">
  <div class="content-wrapper">
    <div class="content-body">
      <div class="flexbox-container">
        <main class="main w-100">
          
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img src={loginImg} alt="loginImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                      <CardBody>
                        <h4>Login</h4>
                        <p className="login_welcome_text">Welcome back, please login to your account.</p>
                        <Form onSubmit={e => e.preventDefault()}>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Input
                              type="email"
                              placeholder="Email"
                              value={this.state.emailId}
                              onChange={e => this.setState({ emailId: e.target.value,emailerror:""})}
                            />
                            <span className="errormsgshow" style={errormsgshowstyle}>
                                  {this.state.emailerror}
                            </span>
                            <div className="form-control-position">
                              <Mail size={15} />
                            </div>
                            <Label>Email</Label>
                          </FormGroup>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Input
                              type="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={e => this.setState({ password: e.target.value,passworderror:""})}
                            />
                            <span className="errormsgshow" style={errormsgshowstyle}>
                                  {this.state.passworderror}
                            </span>
                            <div className="form-control-position">
                              <Lock size={15} />
                            </div>
                            <Label>Password</Label>
                          </FormGroup>
                          <FormGroup className="d-flex justify-content-between align-items-center">
                            {/* <Checkbox
                              color="primary"
                              icon={<Check className="vx-icon" size={16} />}
                              label="Remember me"
                            /> */}
                            <div className="float-right" onClick={() => this.forgotPassword()} style={{cursor:"pointer"}} >
                              Forgot Password?
                            </div>
                          </FormGroup>
                          <div className="d-flex justify-content-between">
                            {/* <Button.Ripple color="primary" outline>
                             Register                           
                            </Button.Ripple> */}
                            <span style={{marginRight:"auto",marginLeft: "auto"}}> 
                            <Button.Ripple color="primary" type="submit" style={{width:"221px"}}  onClick={() => this.login(this.state)}>
                                Login 
                            </Button.Ripple>
                            </span>
                          </div>
                        </Form>
                      </CardBody>
                     
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      </main>
          </div>
          </div>
          </div>
          </div>
          </div>
    )
  }
}

const mapStateToProps = state => {

  return {
   
  }
}

export default connect(mapStateToProps, {
    loginData
})(Login)

