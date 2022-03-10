import React from "react";
import InputBox from "./InputBox";
import TableBox from "./TableBox";
import GraphBox from "./GraphBox";
import FilterBox from "./FilterBox";
import News from "./News";
import "./App.css";
import video from "./DNA.mp4";

class App extends React.Component {
  state = {
    videoSource: video,
    tab_data: [],
    graphData: [],
    cstockcode: "",
    showFilterDOM: false,
    showFilterData: false,
    display_table: false,
    Graphdisplay: false,
    alter_Graph: false,
    dict_codes: [],
  };

  getResults = (code, data) => {
    if (data.response !== "Symbol not supported") {
      this.setState(
        {
          tab_data: this.state.tab_data.concat(data.response),
          cstockcode: data.stockcode,
          dict_codes: this.state.dict_codes.concat({
            stock_value: data.stockcode,
          }),
          showFilterDOM: true,
          display_table: true,
          Graphdisplay: true,
          alter_Graph: false,
        },
        () => {
          console.log(this.state.dict_codes);
          console.log(this.state.alter_Graph);
        }
      );
    }
  };

  filterData = (code, dates) => {
    console.log(dates);
    this.setState(
      {
        dates: dates,
        cstockcode: dates.stock_code,
        alter_Graph: true,
        display_table: true,
        Graphdisplay: true,
      },
      () => {
        console.log(this.state.cstockcode);
        console.log(this.state.dates);
      }
    );
    console.log(this.state.dates);
  };

  getGraphResults = (code, graph_data) => {
    console.log(code);
    console.log(graph_data);
    this.setState({
      graphData: graph_data,
    });
  };
  render() {
    return (
      <div>
        <video autoPlay="autoplay" loop="loop" muted>
          <source src={this.state.videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="heading-container">
          <h1 className="pageheading">Big Board</h1>
        </div>
        <div className="input-container">
          <InputBox getResults={this.getResults}></InputBox>
        </div>
        <div
          className={
            this.state.showFilterDOM
              ? "filter-container"
              : "hidden-table-container"
          }
        >
          <FilterBox
            cstockcode={this.state.cstockcode}
            filterData={this.filterData}
            dict_codes={this.state.dict_codes}
          ></FilterBox>
        </div>
        <div
          className={
            this.state.display_table
              ? "graph-container"
              : "hidden-table-container"
          }
          tabindex="0"
        >
          <GraphBox
            cstockcode={this.state.cstockcode}
            dates={this.state.dates}
            alter_Graph={this.state.alter_Graph}
          ></GraphBox>
        </div>
        <div
          className={
            this.state.display_table
              ? "table-container"
              : "hidden-table-container"
          }
          tabindex="0"
        >
          <TableBox
            display_table={this.state.display_table}
            tab_data={this.state.tab_data}
          ></TableBox>
        </div>
        <News cstockcode={this.state.cstockcode}></News>
      </div>
    );
  }
}

export default App;
