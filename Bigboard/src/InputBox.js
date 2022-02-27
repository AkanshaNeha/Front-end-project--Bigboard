import React from "react";
import axios from "axios";

class InputBox extends React.Component {
  state = {
    inputArray: [],
  };

  getResults = async (s, v) => {
    var stockcode;

    stockcode = document.getElementById("stockcode").value;

    let startDate = Math.round(new Date().getTime() / 1000);
    let endDate = startDate - 72 * 3600;

    if (this.state.inputArray.includes(stockcode)) {
      alert("Already Exists");
      document.getElementById("stockcode").value = "";
    } else {
      var val = document.getElementById("stockcode").value;
      if (val === "" || val.length > 4) {
        alert("Please enter correct code");
      }
    }

    var resp_data_table = await axios.get("https://finnhub.io/api/v1/quote", {
      params: {
        symbol: stockcode,
        token: "bu5pnnf48v6qku34c7vg",
      },
    });

    var resp_data_graph = await axios.get(
      "https://finnhub.io/api/v1/quote/stock/candle",
      {
        params: {
          symbol: stockcode,
          resolution: 5,
          from: endDate,
          to: startDate,
          token: "bu5pnnf48v6qku34c7vg",
        },
      }
    );

    this.setState(
      { inputArray: this.state.inputArray.concat(stockcode) },
      () => {
        if (
          resp_data_table.data.c == 0 &&
          resp_data_table.data.h == 0 &&
          resp_data_table.data.l == 0 &&
          resp_data_table.data.o == 0 &&
          resp_data_table.data.pc == 0 &&
          resp_data_table.data.t == 0
        ) {
          console.log("no data");
        } else {
          this.props.getResults(resp_data_table.data);
          console.log(resp_data_table.data);
        }
        document.getElementById("stockcode").value = "";
      }
    );
  };

  convertToUppercase() {
    var val = document.getElementById("stockcode");
    val.value = val.value.toUpperCase();
    // var val = React.findDOMNode(this.ref.stockcode);
    // val.value = val.value.toUpperCase();
  }
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title">Enter Stock Code</div>
          <input
            type="text"
            id="stockcode"
            onKeyUp={this.convertToUppercase}
          ></input>
          <br />
          <button
            className="btn btn-dark inputbutton"
            onClick={() => this.getResults(true, "")}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default InputBox;
