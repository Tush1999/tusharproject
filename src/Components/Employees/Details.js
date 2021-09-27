import React, { Component } from "react";
import Airtable from "airtable";
import { NavLink } from "react-router-dom";

const base = new Airtable({ apiKey: "keyHHrGcNLiewGh05" }).base(
  "appnnQqeeXZmvVJvB"
);

export default class Conferences extends Component {
  constructor(props) {
    super(props);
    this.state = { employee: [] };
  }
  componentDidMount() {
    let pName = this.props.name.match.params.name;
    let meeting = this.props.name.match.params.meeting;
    console.log(pName, "name");
    console.log("IF(AND({Conference ID} = " +
    `'${meeting}'` +
    ", SEARCH(" +`'${pName}'`+",{Participant Identifier})), 'true')")
   
    base("Imported table")
      .select({
        view: "Grid view",
        filterByFormula:
          "IF(AND({Conference ID} = " +
          `'${meeting}'` +
          ", SEARCH(" +`'${pName}'`+",{Participant Identifier})), 'true')",
      })


      .eachPage((records, fetchNextPage) => {
        this.setState({ employee: records });
        fetchNextPage();
      });
  }

  render() {
    console.log(this.state.employee, "details");
    var empCheck = this.state.employee[0];
    if (empCheck) {
      var data = empCheck.fields;
      this.count = 1;
    } else this.count = 0;

    return (
      <>
        {this.count ? (
          <div className="rightbar">
            <h1>Meeting Details</h1>
            <p>Audio Receive Duration: {data["Audio Receive Duration"]}</p>
            <p>
              Audio Receive Packet Loss Max:{" "}
              {data["Audio Receive Packet Loss Max"]}
            </p>
            <p>
              Audio Receive Packet Loss Mean:{" "}
              {data["Audio Receive Packet Loss Mean"]}
            </p>
            <p>
              Audio Send Bitrate Mean in kbps:
              {data["Audio Send Bitrate Mean in kbps"]}
            </p>
            <p>Audio Send Duration: {data["Audio Send Duration"]}</p>
            <p>Calendar Event Id: {data["Calendar Event Id"]}</p>
            <p>City: {data["City"]}</p>
            <p>Client Type: {data["Client Type"]}</p>
            <p>
              <NavLink to={`/conference/${data["Conference ID"]}`}>
                {" "}
                Conference ID: {data["Conference ID"]}{" "}
              </NavLink>
            </p>
            <p>Country: {data.Country}</p>
            <p>Date: {data.Date}</p>
            <p>Duration: {data.Duration}</p>
            <p>Event Description:{data["Event Description"]}</p>
            <p>Event Name: {data["Event Name"]}</p>
            <p>IP Address: {data["IP Address"]}</p>
            <p>Meeting Code: {data["Meeting Code"]}</p>
            <p>Organizer Email: {data["Organizer Email"]}</p>
            <p>Participant Identifier: {data["Participant Identifier"]}</p>
          </div>
        ) : null}
      </>
    );
  }
}
