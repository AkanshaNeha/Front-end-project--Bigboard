import "./App.css";
import React from "react";
import InputBox from "./InputBox";
import TableBox from "./TableBox";
import GraphBox from "./GraphBox";
class App extends React.Component {
  state = {
    table_Values: [],
    graphData: [],
    activeStockValue: "",
    showFilterDOM: false,
    showFilterData: false,
    show_Table: false,
    showGraphData: false,
    lsArray: [],
    option: [],
  };
  getResults = (data) => {
    if (data !== "Symbol not supported") {
      this.setState({
        table_Values: this.state.table_Values.concat(data),
        showFilterDOM: true,
        show_Table: true,
      });
      console.log(this.state.table_Values);
    }
  };
  render() {
    return (
      <div className="main-container">
        <div className="heading-container">
          <div className="item-heading">
            <h5>Stock Price Dashboard</h5>
          </div>
        </div>

        <div className="input-container">
          <div class="item-input">
            <InputBox getResults={this.getResults}></InputBox>
          </div>
        </div>
        <div className={this.state.show_Table ? "table-container" : ""}>
          <div class="grid-item item0">
            <GraphBox />
          </div>
          <div class="grid-item item1">
            <TableBox
              show_Table={this.state.show_Table}
              table_Values={this.state.table_Values}
            ></TableBox>
          </div>

          {/* <TableBox 
            show_Table = { this.state.show_Table }
            table_Values = { this.state.table_Values }>
            </TableBox> */}
        </div>
      </div>
    );
  }
}

export default App;
