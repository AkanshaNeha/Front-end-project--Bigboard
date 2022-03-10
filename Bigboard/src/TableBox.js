import React from "react";
import "./TableBox.css";
class TableBox extends React.Component {
  state = {
    currency: "$",
  };
  render() {
    let tableDataDOM = "";
    tableDataDOM = this.props.table_Values.map((table, index) => {
      console.log(this.props.table_Values);
      console.log(index);

      if (table !== "Symbol not supported") {
        return (
          <tr key={index}>
            <td>{table.stockcode}</td>
            <td>
              {JSON.stringify(new Date(table.t * 1000))
                .split("T")[0]
                .replace('"', "")}
            </td>

            <td className="openrow">
              {this.state.currency + table.o.toFixed(2)}
            </td>
            <td className="lowrow">
              {this.state.currency + table.l.toFixed(2)}
            </td>
            <td className="highrow">
              {this.state.currency + table.h.toFixed(2)}
            </td>
            <td className="pcloserow">
              {this.state.currency + table.pc.toFixed(2)}
            </td>
            <td className="closerow">
              {this.state.currency + table.c.toFixed(2)}
            </td>

            <td className="lastrow">
              {(100 - (table.pc.toFixed(2) / table.c.toFixed(2)) * 100).toFixed(
                2
              ) + "%"}
            </td>
          </tr>
        );
      }
    });
    return (
      <div className="item-table">
        <h5 className="table-heading">Your Companies Latest Stock values:</h5>
        {this.props.show_Table ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Stock Code</th>
                <th>Last Updated Date</th>
                <th>Open Price</th>
                <th>Low Price</th>
                <th>High Price</th>
                <th>Previous Close Price</th>
                <th>Current Price</th>
                <th>% From Yesterday</th>
              </tr>
            </thead>
            <tbody>{tableDataDOM}</tbody>
          </table>
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}

export default TableBox;
