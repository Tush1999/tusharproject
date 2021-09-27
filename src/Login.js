import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { withRouter } from "react-router";

class Login extends Component {

  responseSuccess = (response) => {
    localStorage.setItem("auth","tushar")
    this.props.login(true)
    this.props.history.push('/home')
  };
  responseFailure=()=>{
    this.props.history.push('/login')
  }
  render() {
    return (
      <div class="container login-main">
        <div className="login">
        <GoogleLogin
          clientId="363941412135-m1qp92il1g1vulcdd540d5q9uqvat74l.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseSuccess}
          onFailure={this.responseFailure}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      </div>

    );
  }
}
export default withRouter(Login)