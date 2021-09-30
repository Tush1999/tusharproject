import React, { Component } from "react";
import Airtable from "airtable";
import ShowData from "./ShowData";
import "./style.css";
import InfiniteScroll from "react-infinite-scroll-component";

const base = new Airtable({ apiKey: `key${process.env.REACT_APP_UNSPLASH_KEY}` }).base(
  `${process.env.REACT_APP_BASE}`)
export default class AirTable extends Component {
  constructor() {
    super();
    this.state = { data: [], nextList: "", search: ""};
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(nextProp,nextState) {
    if (this.props.search !== this.state.search) {
      this.setState({ search: this.props.search, data: [] });
      this.fetchData();
    }
    console.log(nextState,"next state")
    console.log(this.state,"prev state")
  }
  fetchData = () => {
    //var f="Participant Name"
    //var field2=`${f}`
    //console.log(field)
    var pIdentifier = `'${this.props.search}'`;
    //console.log(pIdentifier,"search")
    base("Imported table")
      .select({
        view: "Grid view",
        filterByFormula: "SEARCH(" + pIdentifier + ",{Participant Name})",
        pageSize: this.props.pageSize,
      })
      .eachPage((records, fetchNextPage) => {
        let array = records.map((record) => ({
          pField1: record.fields[this.props.field1],
          pField2: record.fields[this.props.field2],
        }));
        this.setState({
          data: [...array, ...this.state.data],
          nextList: fetchNextPage,
        });
      });
  };
  handleNext = () => {
    if(typeof this.state.nextList!="string")
    this.state.nextList();
  };
   shouldComponentUpdate=(prevProp,prevState)=>{
    
     return true;
   }

  render() {
    console.log(this.props.search,"search bar")
    const result = [];
    const map = new Map();
    for (const item of this.state.data) {
      if (!map.has(item.pField1)) {  
        map.set(item.pField1, true);
        result.push({
          pField1: item.pField1,
          pField2: item.pField2,
        });
      }
    }

    let filteredData=result.sort((a, b) => a.pField1.localeCompare(b.pField2))
    return (
    
      <>
          <InfiniteScroll
            dataLength={this.state.data.length}
            next={this.handleNext}
            hasMore={true}
            loader={<div className="text-center">
            <div className="spinner-grow text-danger text-center"  role="status">
            <span className="sr-only">Loading...</span>
          </div>
          </div>
          }
          >
            <ShowData data={filteredData} type={this.props.type}/>
          </InfiniteScroll>
      </>
    );
  }
}
