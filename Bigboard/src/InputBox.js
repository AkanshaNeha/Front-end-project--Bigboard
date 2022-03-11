import React from "react";
import axios from "axios";
import "./InputBox.css";

class InputBox extends React.Component {
  state = {
    inputArray: [],
  };

  getResults = async (s, v) => {
    console.log("123");
    var stockcode;

    stockcode = document.getElementById("stockcode").value;

   // let startDate = Math.round(new Date().getTime() / 1000);
    //let endDate = startDate - (72 * 3600);

    if (this.state.inputArray.includes(stockcode)) {
      alert("Already Exists");
      document.getElementById("stockcode").value = "";
    } else {
      var val = document.getElementById("stockcode").value;
      if (val === "" || val.length > 4) {
        alert("Please enter correct code");
      } else {
        var resp_data_table = await axios.get(
          "https://finnhub.io/api/v1/quote",
          {
            params: {
              symbol: stockcode,
              token: "bu5pnnf48v6qku34c7vg",
            },
          }
        );

        this.setState(
          { inputArray: this.state.inputArray.concat(stockcode) },
          () => {
            if (
              resp_data_table.data.c === 0 &&
              resp_data_table.data.h === 0 &&
              resp_data_table.data.l === 0 &&
              resp_data_table.data.o === 0 &&
              resp_data_table.data.pc === 0 &&
              resp_data_table.data.t === 0
            ) {
              this.props.getGraphResults("no_data", "");
            } else {
              resp_data_table.data.stockcode = stockcode;
              this.props.getResults(true, {
                stockcode: stockcode,
                response: resp_data_table.data,
              });
              console.log(resp_data_table.data);
            }
            document.getElementById("stockcode").value = "";
          }
        );
      }
    }
  };

  convertToUppercase() {
    var val = document.getElementById("stockcode");
    val.value = val.value.toUpperCase();
  }
  render() {
    return (
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          id="stockcode"
          aria-label="Search"
          placeholder="Enter Stock Code (e.g. AAPL)"
          onKeyUp={this.convertToUppercase}
        ></input>
        <button
          className="btn btn-dark inputbutton"
          aria-label="Search"
          type="submit"
          onClick={() => this.getResults(true, "")}
        >
          <i className="fa fa-search"></i>
        </button>
      </div>
    );
  }
}

export default InputBox;
