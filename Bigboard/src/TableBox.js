import React from "react";
// import '../css/styles.css';
// import '../css/TableDataCard.css';
import "./TableBox.css";

class TableBox extends React.Component {
  state = {
    currency: "$",
  };

  // sortTable = (n) => {
  //     var table, rows, switching, i, x, y, shouldSwitch, order, switchcount = 0;
  //     table = document.getElementsByTagName("tbody")[0];
  //     switching = true;
  //     // var text = document.getElementById(thid).innerHTML;
  //     // text = text.substring(0,text.length-1);

  //     order = "asc";
  //     console.log(table.childNodes.length);
  //     console.log(table.childNodes)
  //     // var rowsRangeVal = document.getElementById("rowsrange").value;

  //     while (switching) {

  //         switching = false;
  //         rows = table.childNodes.length;

  //         for (i = 0; i < (rows - 1); i++) {

  //             shouldSwitch = false;

  //             x = rows[i].getElementsByTagName("TD")[n];
  //             console.log(x)

  //             y = rows[i + 1].getElementsByTagName("TD")[n];
  //             console.log(y)

  //             if (order == "asc") {
  //                 if ((+x.innerHTML) > (+y.innerHTML)) {

  //                     shouldSwitch= true;
  //                     break;
  //                 }
  //             } else if (order == "desc") {
  //                 if ((+x.innerHTML) < (+y.innerHTML)) {

  //                     shouldSwitch = true;
  //                     break;
  //                 }
  //             }

  //         }
  //         if (shouldSwitch) {

  //         rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
  //         switching = true;

  //         switchcount ++;
  //         } else {

  //         if (switchcount == 0 && order == "asc") {
  //             order = "desc";
  //             switching = true;
  //         }
  //         }
  //     }

  // }

  render() {
    let tableDataDOM = "";
    console.log("test");

    // @dom: show all values in the table
    tableDataDOM = this.props.table_Values.map((table, index) => {
      console.log(this.props.table_Values);
      console.log(index);

      // @condition: check if there is a viable response from the API call (e.g. AAAA doesn't exist)
      if (table !== "Symbol not supported") {
        return (
          <tr key={index}>
            <td>{table.stockcode}</td>
            <td>
              {JSON.stringify(new Date(table.t * 1000))
                .split("T")[0]
                .replace('"', "")}
            </td>

            {/* Open Price */}
            <td className="openrow">
              {this.state.currency + table.o.toFixed(2)}
            </td>

            {/* Low Price */}
            <td className="lowrow">
              {this.state.currency + table.l.toFixed(2)}
            </td>

            {/* High Price */}
            <td className="highrow">
              {this.state.currency + table.h.toFixed(2)}
            </td>

            {/* Previous Close Price */}
            <td className="pcloserow">
              {this.state.currency + table.pc.toFixed(2)}
            </td>

            {/* Close Price */}
            <td className="closerow">
              {this.state.currency + table.c.toFixed(2)}
            </td>

            {/* PC/C percentage */}
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
                {/* <th scope="col">Stock Code</th>
                <th scope="col">Last Updated Data</th>
                <th scope="col">Open Price</th>
                <th scope="col">Low Price</th>
                <th scope="col">High Price</th>
                <th scope="col">Previous Close Price</th>
                <th scope="col">Current Price</th>
                <th scope="col">% From Yesterday</th> */}
                <th>Stock Code</th>
                <th>Last Updated Data</th>
                <th onClick={() => this.sortTable(2)}>Open Price</th>
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
