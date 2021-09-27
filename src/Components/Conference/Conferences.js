import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Airtable from "airtable";
import AirTable from "../Employees/AirTable";
import "./style.css";

const base = new Airtable({ apiKey: "keyHHrGcNLiewGh05" }).base(
  "appnnQqeeXZmvVJvB"
);

class Conferences extends Component {
  constructor(props) {
    super(props);
    this.state = { conference: [] };
  }
  // componentDidMount() {
  //   base("Imported table")
  //     .select({
  //       view: "Grid view",
  //     })
  //     .eachPage((records, fetchNextPage) => {
  //       let arr1 = records.map((record) => ({
  //         id: record.fields["Conference ID"],
  //         date: record.fields["Date"],
  //       }));
  //       const result = [];
  //       const map = new Map();
  //       for (const item of arr1) {
  //         if (!map.has(item.id)) {
  //           map.set(item.id, true); 
  //           result.push({
  //             id: item.id,
  //             date: item.date,
  //           });
  //         }
  //       }
  //       this.setState({ conference: result });
  //       fetchNextPage();
  //     });
  // }

  render() {
    return (
      <>
      {/* <div className="conference-div">
        {this.state.conference.map((value,index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <NavLink to={`/conference/${value.id}`} className="link-conference">
                Conference ID- {value.id} <b>{value.date}</b>
              </NavLink>
            </div>
          </div>
        ))}
      </div> */}
      <AirTable
          type="conference"
          search=""
          pageSize={20}
          view={"Grid-view"}
          field1="Conference ID"
          field2="Date"
        />
     </>
    );
  }
}
export default withRouter(Conferences);
