import React from "react";
// import '../css/styles.css';
// import '../css/TableDataCard.css';

class TableBox extends React.Component {
  state = {
    currency: "$",
  };

  render() {
    let tableDataDOM = "";

    // @dom: show all values in the table
    tableDataDOM = this.props.table_Values.map((table, index) => {
      // @condition: check if there is a viable response from the API call (e.g. AAAA doesn't exist)
      if (table !== "Symbol not supported") {
        return (
          <tr key={index}>
            <td scope="row">AAPL</td>
            <td>
              {JSON.stringify(new Date(table.t * 1000))
                .split("T")[0]
                .replace('"', "")}
            </td>

            {/* Open Price */}
            <td
              className={
                this.state.currency + table.o.toFixed(2) >
                this.state.currency + table.pc.toFixed(2)
                  ? "green-text font-weight-bold"
                  : "red-text font-weight-bold"
              }
            >
              {this.state.currency + table.o.toFixed(2)}
            </td>

            {/* Low Price */}
            <td
              className={
                this.state.currency + table.l.toFixed(2) >
                this.state.currency + table.pc.toFixed(2)
                  ? "green-text font-weight-bold"
                  : "red-text font-weight-bold"
              }
            >
              {this.state.currency + table.l.toFixed(2)}
            </td>

            {/* High Price */}
            <td
              className={
                this.state.currency + table.h.toFixed(2) >
                this.state.currency + table.pc.toFixed(2)
                  ? "green-text font-weight-bold"
                  : "red-text font-weight-bold"
              }
            >
              {this.state.currency + table.h.toFixed(2)}
            </td>

            {/* Previous Close Price */}
            <td
              className={
                this.state.currency + table.c.toFixed(2) <
                this.state.currency + table.pc.toFixed(2)
                  ? "green-text font-weight-bold"
                  : "red-text font-weight-bold"
              }
            >
              {this.state.currency + table.pc.toFixed(2)}
            </td>

            {/* Close Price */}
            <td
              className={
                this.state.currency + table.c.toFixed(2) >
                this.state.currency + table.pc.toFixed(2)
                  ? "green-text font-weight-bold"
                  : "red-text font-weight-bold"
              }
            >
              {this.state.currency + table.c.toFixed(2)}
            </td>

            {/* PC/C percentage */}
            <td
              className={
                this.state.currency + table.c.toFixed(2) >
                this.state.currency + table.pc.toFixed(2)
                  ? "green-text font-weight-bold"
                  : "red-text font-weight-bold"
              }
            >
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
        {/* <h2 className="h6 mb-3">Latest available data:</h2> */}
        {this.props.show_Table ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Stock Code</th>
                <th scope="col">Last Updated Data</th>
                <th scope="col">Open Price</th>
                <th scope="col">Low Price</th>
                <th scope="col">High Price</th>
                <th scope="col">Previous Close Price</th>
                <th scope="col">Current Price</th>
                <th scope="col">% From Yesterday</th>
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
