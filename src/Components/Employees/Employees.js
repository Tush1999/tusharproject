import React, { Component } from "react";
import AirTable from "./AirTable";
import SideBar from "../../SideBar";
import "./style.css";


export default class Employees extends Component {
    constructor(props) {
    super(props);
    this.state = {
      searchField: "",
    };
  }
  // console.log("AND({Conference ID} = " +
  // `'${meeting}'` +
  // ", SEARCH(" +`'${pName}'`+",{Participant Identifier}))")

  handleSearch = (e) => {
    this.setState({ searchField: e.target.value });
  };
  
  render() {
    return (
      <>
        <div className="rightbar">
          <input
            className="form-control"
            type="search"
            value={this.state.searchField}
            onChange={this.handleSearch}
            placeholder="search here"
          />
        
       
        <div>
        <AirTable
          type="employee"
          search={this.state.searchField.toLowerCase()}
          pageSize={20}
          view={"Grid-view"}
          field1="Participant Name"
          field2="Participant Identifier"
        />
        </div>
        </div>
      </>
    );
  }
}
