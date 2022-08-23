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
import { Lock } from "react-feather";
import { history } from "../../../../history";
import "../../../../assets/scss/pages/authentication.scss";
import axios from "axios";
import config from "../../../../configs/properties";

class ResetPassword extends React.Component {
  state = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    displayResetPasswod: null,
    resetsuccessfull: true,
  };

  resetPassword = async () => {
    if (
      this.state.confirmPassword &&
      this.state.newPassword &&
      this.state.confirmPassword == this.state.newPassword
    ) {
      let fetchdata = {
        user: localStorage.getItem("user"),
        newPassword: this.state.newPassword,
        currentPassword: this.state.currentPassword,
        token: localStorage.getItem("token"),
      };

      console.log(fetchdata);
      const resetPassword = await axios.post(
        config.base_url + "v1/changeuserpassword",
        fetchdata
      );
      console.log(resetPassword);
      if (resetPassword.data.statusCode == 200) {
        this.setState({
          success: resetPassword.data.message,
          resetsuccessfull: false,
        });
      } else {
        this.setState({
          failure: resetPassword.data.message,
        });
      }
    } else if (this.state.currentPassword == "") {
      this.setState({
        emptypassword: "password cannot be empty.please enter the password",
      });
    } else {
      this.setState({
        displayResetPasswod: "password does not match",
      });
    }
  };
  render() {
    return (
      <div class="app-content">
        <div class="content-wrapper mt-0">
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
                      <Card className="rounded-0 mb-0 px-2">
                        <CardBody>
                          <h4>Reset-Passsword</h4>
                          {!this.state.resetsuccessfull ? (
                            <div>
                              <span className="text-success">
                                {this.state.success}
                              </span>
                              <div>
                                <Button.Ripple
                                  color="primary"
                                  type="submit"
                                  className="mt-1"
                                  onClick={() => history.push("/dashboard")}
                                >
                                  Back
                                </Button.Ripple>
                              </div>
                            </div>
                          ) : (
                            <Form onSubmit={(e) => e.preventDefault()}>
                              <FormGroup className="form-label-group position-relative has-icon-left mt-2">
                                <Input
                                  type="password"
                                  placeholder="password"
                                  value={this.state.currentPassword}
                                  onChange={(e) =>
                                    this.setState({
                                      currentPassword: e.target.value,
                                    })
                                  }
                                />
                                {this.state.currentPassword == "" ? (
                                  <span className="text-danger">
                                    {this.state.emptypassword}
                                  </span>
                                ) : (
                                  <span className="text-danger">
                                    {this.state.failure}
                                  </span>
                                )}

                                <div className="form-control-position">
                                  <Lock size={15} />
                                </div>
                                <Label>current Password</Label>
                              </FormGroup>
                              <FormGroup className="form-label-group position-relative has-icon-left">
                                <Input
                                  className="mt-2"
                                  type="password"
                                  placeholder="new-password"
                                  value={this.state.newPassword}
                                  required
                                  onChange={(e) =>
                                    this.setState({
                                      newPassword: e.target.value,
                                    })
                                  }
                                />

                                <div className="form-control-position">
                                  <Lock size={15} />
                                </div>
                                <Label>new password</Label>
                              </FormGroup>
                              {this.state.confirmPassword !==
                              this.state.newPassword ? (
                                <span className="text-danger">
                                  {this.state.displayResetPasswod}
                                </span>
                              ) : (
                                <span className="text-danger"></span>
                              )}
                              <FormGroup className="form-label-group position-relative has-icon-left">
                                <Input
                                  className="mt-2"
                                  type="password"
                                  placeholder="confirm-password"
                                  value={this.state.confirmPassword}
                                  required
                                  onChange={(e) =>
                                    this.setState({
                                      confirmPassword: e.target.value,
                                    })
                                  }
                                />

                                <div className="form-control-position">
                                  <Lock size={15} />
                                </div>
                                <Label>confirm password</Label>
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
                                    onClick={() => this.resetPassword()}
                                  >
                                    Reset
                                  </Button.Ripple>
                                </span>
                              </div>
                            </Form>
                          )}
                        </CardBody>
                      </Card>
                    </Card>
                  </Col>
                </Row>
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
