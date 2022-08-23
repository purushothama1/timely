import React from "react";
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Mail } from "react-feather";
import { history } from "../../../../history";
import loginImg from "../../../../assets/img/pages/login.png";
import "../../../../assets/scss/pages/authentication.scss";
import axios from "axios";
import config from "../../../../configs/properties";

class ForgotPassword extends React.Component {
  state = {
    emailId: "",
    checkEmail: true,
  };

  forgotPassword = async (email) => {
    let obj = {
      emailId: email,
    };
    const resetPassword = await axios.post(
      config.base_url + "v1/resetuserpassword",
      obj
    );

    console.log(resetPassword, "email");

    if (!this.state.emailId) {
      this.setState({
        emailerror: resetPassword.data.message[0].msg,
      });
    } else if (resetPassword.data.statusCode == 200) {
      this.setState({
        sucess: resetPassword.data.message,
        checkEmail: false,
      });
    } else {
      this.setState({
        failure: resetPassword.data.message,
      });
    }
  };

  render() {
    var errormsgshowstyle = {
      color: "#ff5722",
    };

    var sucessgShowStyle = {
      color: "#008000",
    };
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
                                <h4>Forgot Password</h4>
                                <p className="login_welcome_text">
                                  Enter your email and we'll send you
                                  instructions to reset your password
                                </p>
                                {!this.state.checkEmail ? (
                                  <div>
                                    <div>
                                      <span
                                        className="sucessgShowStyle"
                                        style={sucessgShowStyle}
                                      >
                                        {this.state.sucess}
                                      </span>
                                    </div>

                                    <Button.Ripple
                                      color="primary"
                                      type="submit"
                                      className="mt-3"
                                      onClick={() => history.push("/")}
                                    >
                                      Back to Login
                                    </Button.Ripple>
                                  </div>
                                ) : (
                                  <Form onSubmit={(e) => e.preventDefault()}>
                                    <FormGroup className="form-label-group position-relative has-icon-left">
                                      <Input
                                        type="email"
                                        placeholder="Email"
                                        value={this.state.emailId}
                                        onChange={(e) =>
                                          this.setState({
                                            emailId: e.target.value,
                                            emailerror: "",
                                            sucess: "",
                                            failure: "",
                                          })
                                        }
                                      />
                                      <span
                                        className="errormsgshow"
                                        style={errormsgshowstyle}
                                      >
                                        {this.state.emailerror}
                                      </span>

                                      <span
                                        className="errormsgshow"
                                        style={errormsgshowstyle}
                                      >
                                        {this.state.failure}
                                      </span>

                                      <div className="form-control-position">
                                        <Mail size={15} />
                                      </div>
                                      <Label>Email</Label>
                                    </FormGroup>

                                    <FormGroup className="d-flex justify-content-between align-items-center"></FormGroup>
                                    <div className="d-flex justify-content-between">
                                      <span
                                        style={{
                                          marginRight: "auto",
                                          marginLeft: "auto",
                                        }}
                                      >
                                        <Button.Ripple
                                          color="primary"
                                          type="submit"
                                          style={{ width: "221px" }}
                                          onClick={() =>
                                            this.forgotPassword(
                                              this.state.emailId
                                            )
                                          }
                                        >
                                          Send reset link
                                        </Button.Ripple>
                                      </span>
                                    </div>
                                  </Form>
                                )}
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
    );
  }
}

export default ForgotPassword;
