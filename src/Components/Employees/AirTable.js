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
  componentDidUpdate() {
    if (this.props.search !== this.state.search) {
      this.setState({ search: this.props.search, data: [] });
      this.fetchData();
    }
  }
  fetchData = () => {
    var field2=`${this.props.field2}`
    //console.log(field)
    var pIdentifier = `'${this.props.search}'`;
    console.log(pIdentifier,"search")
    base("Imported table")
      .select({
        view: "Grid view",
        filterByFormula: "SEARCH(" + pIdentifier + ",{"+field2+"})",
        pageSize: this.props.pageSize,
      })
      .eachPage((records, fetchNextPage) => {
        console.log(records)
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
    
    this.state.nextList();
  };


  render() {
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
            loader={<h4>Loading...</h4>}
          >
            <ShowData data={filteredData} type={this.props.type}/>
          </InfiniteScroll>
      </>
    );
  }
}
