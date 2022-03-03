import React from "react";
import axios from "axios";
// import './InputBox.css';

class FilterBox extends React.Component {
  filter = () => {
    let startDate =
      new Date(document.querySelector("input.start-date").value) / 1000;
    let endDate =
      new Date(document.querySelector("input.end-date").value) / 1000;
    this.props.filterData(true, { startDate: startDate, endDate: endDate });
    document.querySelector("input.start-date").value = "";
    document.querySelector("input.end-date").value = "";
  };

  render() {
    return (
      <div className="form-group">
        <div className="d-flex filter-card-date mt-2">
          <div className="filter-card-date-div">
            <label className="mb-0">Start Date:</label>
            <input className="form-control start-date" type="date"></input>
          </div>
          <div className="filter-card-date-div">
            <label className="mb-0">End Date:</label>
            <input className="form-control end-date" type="date"></input>
          </div>
        </div>
        <button
          className="btn btn-secondary w-100 mt-3 btn-filter"
          onClick={this.filter}
        >
          Filter
        </button>
      </div>
    );
  }
}

export default FilterBox;
