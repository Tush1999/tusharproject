import React, { Component } from "react";
import Login from "./Login"
import Home from "./Home";
import { Route, Switch, withRouter, Link, Redirect } from "react-router-dom";
import Employees from "./Components/Employees/Employees";
import Conferences from "./Components/Conference/Conferences";
import ConferenceData from "./Components/Conference/ConferenceData";
import MeetingDetail from "./Components/Employees/MeetingDetail";
import Details from "./Components/Employees/Details";
import SideBar from "./SideBar";
import Logout from "./Exit";

class App extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("auth")) this.state = { login: true };
    else this.state = { login: false };
  }
  handleLogin = (status) => {
    this.setState({ login: status });
  };

  render() {
    return (
      <>
        {this.state.login ? (
          <>
            <nav className="navbar navbar-dark bg-dark">
              <Link className="home-link" to="/home">
                Home
              </Link>
              <Link className="home-link" to="/logout">
                Logout
              </Link>
            </nav>
            <div className="wrapper">
              <SideBar />
              <Switch>
                <Route
                  exact
                  path="/logout"
                  render={() => <Logout logout={this.handleLogin} />}
                />
                <Route exact path="/employees" render={() => <Employees />} />
                <Route
                  exact
                  path="/conferences"
                  render={() => <Conferences />}
                />
                <Route
                  exact
                  path="/employee/:name"
                  render={(props) => <MeetingDetail name={props} />}
                />
                <Route
                  exact
                  path="/employee/:name/details/:meeting"
                  render={(props) => <Details name={props} />}
                />
                <Route
                  exact
                  path="/conference/:id"
                  render={(props) => <ConferenceData name={props} />}
                />
                <Route exact path="/home" render={(props) => <Home />} />
              </Switch>
            </div>
          </>
        ) : (
          <Redirect from="/" to="/login" />
        )}
        <Switch>
          <Route
            exact
            path="/login"
            render={() => <Login login={this.handleLogin} />}
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
