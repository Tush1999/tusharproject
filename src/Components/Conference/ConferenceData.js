import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Airtable from "airtable";
import "./style.css";

const base = new Airtable({ apiKey: "keyHHrGcNLiewGh05" }).base(
  "appnnQqeeXZmvVJvB"
);

export default class Conferences extends Component {
  constructor(props) {
    super(props);
    this.state = { conference: [] };
  }
  componentDidMount() {
    this.name = this.props.name.match.params.id;
    let conferenceId = `'${this.name}'`;
    base("Imported table")
      .select({
        view: "Grid view",
        filterByFormula: "SEARCH(" + conferenceId + ",{Conference ID})",
      })
      .eachPage((records, fetchNextPage) => {
        this.setState({ conference: records });
        fetchNextPage();
      });
  }
  render() {
    return (
      <div className="rightbar">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="row">Participants Name</th>
              <th scope="row">Email Id</th>
              <th scope="row">Organizer Email</th>
              <th scope="row">Date</th>
              <th scopr="row">Audio Send Duration</th>
            </tr>
          </thead>
          <tbody>
            {this.state.conference.map((value,index) => (
              <tr key={index}>
                <td>
                  <NavLink
                    to={`/employee/${value.fields["Participant Identifier"]}`}
                    className="link-conference"
                  >
                    {value.fields["Participant Name"]}
                  </NavLink>
                </td>
                <td>{value.fields["Participant Identifier"]}</td>
                <td>{value.fields["Organizer Email"]}</td>
                <td>{value.fields["Date"]}</td>
                <td>{value.fields["Audio Send Duration"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
