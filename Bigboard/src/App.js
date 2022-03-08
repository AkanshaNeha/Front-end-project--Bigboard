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
    table_Values: [],
    graphData: [],
    currentStockCode: "",
    showFilterDOM: false,
    showFilterData: false,
    show_Table: false,
    showGraph: false,
    alter_Graph: false,
    dict_codes: [],
  };

  getResults = (code, data) => {
    if (data.response !== "Symbol not supported") {
      this.setState(
        {
          table_Values: this.state.table_Values.concat(data.response),
          currentStockCode: data.stockcode,
          dict_codes: this.state.dict_codes.concat({
            stock_value: data.stockcode,
          }),
          showFilterDOM: true,
          show_Table: true,
          showGraph: true,
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
        currentStockCode: dates.stock_code,
        alter_Graph: true,
        show_Table: true,
        showGraph: true,
      },
      () => {
        console.log(this.state.currentStockCode);
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
          <h1 className="pageheading">Stock Price Dashboard</h1>
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
            currentStockCode={this.state.currentStockCode}
            filterData={this.filterData}
            dict_codes={this.state.dict_codes}
          ></FilterBox>
        </div>
        <div
          className={
            this.state.show_Table ? "graph-container" : "hidden-table-container"
          }
          tabindex="0"
        >
          <GraphBox
            currentStockCode={this.state.currentStockCode}
            dates={this.state.dates}
            alter_Graph={this.state.alter_Graph}
          ></GraphBox>
        </div>
        <div
          className={
            this.state.show_Table ? "table-container" : "hidden-table-container"
          }
          tabindex="0"
        >
          <TableBox
            show_Table={this.state.show_Table}
            table_Values={this.state.table_Values}
          ></TableBox>
        </div>
        <News currentStockCode={this.state.currentStockCode}></News>
      </div>
    );
  }
}

export default App;
