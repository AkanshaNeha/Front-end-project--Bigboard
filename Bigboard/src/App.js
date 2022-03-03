import React from "react";
import InputBox from "./InputBox";
import TableBox from "./TableBox";
import FilterBox from "./FilterBox";
import GraphBox from "./GraphBox";
import News from "./News";
import "./App.css";

class App extends React.Component {
  state = {
    table_Values: [],
    graphData: [],
    currentStockCode: "",
    showFilterDOM: false,
    showFilterData: false,
    show_Table: false,
    showGraphData: false,
    lsArray: ["AAPL"],
    alter_Graph: false,
    list_codes: [],
  };

  getResults = (code, data) => {
    if (data.response !== "Symbol not supported") {
      this.setState(
        {
          table_Values: this.state.table_Values.concat(data.response),
          currentStockCode: data.stockcode,
          list_codes: this.state.list_codes.concat(data.stockcode),
          showFilterDOM: true,
          show_Table: true,
          alter_Graph: false,
        },
        () => {
          console.log(this.state.list_codes);
          console.log(this.state.alter_Graph);
        }
      );
    }
  };
  filterData = (code, dates) => {
    this.setState(
      {
        dates: dates,
        alter_Graph: true,
        show_Table: true,
      },
      () => {
        console.log(this.state.alter_Graph);
        console.log(this.state.dates);
      }
    );
  };

  //getGraphResults = (code, graph_data) => {
  //console.log(code);
  //console.log(graph_data);
  render() {
    return (
      <div className="main-container">
        <div className="heading-container">
          <h1 className="pageheading">BigBoard Dashboard</h1>
        </div>

        <div className="input-container">
          <InputBox getResults={this.getResults}></InputBox>
        </div>
        <div
          className={
            this.state.show_Table ? "graph-container" : "hidden-table-container"
          }
        >
          <FilterBox
            currentStockCode={this.state.currentStockCode}
            filterData={this.filterData}
          ></FilterBox>
        </div>
        <div
          className={
            this.state.show_Table ? "graph-container" : "hidden-table-container"
          }
        >
          {/* {this.state.alter_Graph ? */}
          <GraphBox currentStockCode={this.state.currentStockCode}>
            currentStockCode = {this.state.currentStockCode}
            dates = {this.state.dates}
            alter_Graph={this.state.alter_Graph}>
          </GraphBox>
        </div>
        <div
          className={
            this.state.show_Table ? "table-container" : "hidden-table-container"
          }
        >
          <TableBox
            show_Table={this.state.show_Table}
            table_Values={this.state.table_Values}
          ></TableBox>
        </div>
        <div>
          <News currentStockCode={this.state.currentStockCode}></News>
        </div>

        {/* <div className={ this.state.show_Table ? "table-container" : "" } >

          <div class="grid-item item0">
          <GraphBox />
          
             
          </div>
          <div class="grid-item item1">
                <TableBox 
                show_Table = { this.state.show_Table }
                table_Values = { this.state.table_Values }>
                </TableBox>
          </div>  */}

        {/* <TableBox 
            show_Table = { this.state.show_Table }
            table_Values = { this.state.table_Values }>
            </TableBox> */}
      </div>
    );
  }
}

export default App;
