import React from 'react';
import axios from 'axios';

class FilterBox extends React.Component{
    filter = () =>{
    if (document.getElementById('startdate').value && document.getElementById('enddate').value)
    {
        let stock_code = document.querySelector(".filter-select").value;
        let startDate = new Date(document.querySelector("input.start-date").value)/1000;
        let endDate = new Date(document.querySelector("input.end-date").value)/1000 + 36000;
        let currentTime = Math.round(new Date().getTime() / 1000);
        if ((currentTime>startDate) && (currentTime>endDate) 
            && (startDate<=endDate))
        {
            this.props.filterData(true, {stock_code:stock_code,
                 startDate: startDate, endDate: endDate});
        }
        else{
            document.querySelector("input.start-date").value = '';
            document.querySelector("input.end-date").value = '';
            alert('please enter valid Start and End date');
        }
    
    
    }
    else{
        alert('please enter Start and End date');
    }
}

    render(){
        let DOM = '';
        DOM = this.props.dict_codes.map((item, index) => {
            return (
                <option 
                    value={ item.stock_value } 
                    key={ index }
                    defaultValue={ item.stock_value } >
                        { item.stock_value }
                </option>
            )
        }
        );
        return (
            
                <div className="form-group">
                    <select className="custom-select filter-select" id='select' aria-label="Search">
                        { 
                        DOM 
                        }
                    </select>

                    <div className="d-flex filter-card-date mt-2">

                        <div className="filter-card-date-div">
                            <label className="mb-0">Start Date:</label>
                            <input className="form-control start-date" aria-label="Search" type="date" id='startdate' ></input>
                        </div>

                        <div className="filter-card-date-div">
                            <label className="mb-0">End Date:</label>
                            <input className="form-control end-date" aria-label="Search" type="date" id='enddate'></input>
                        </div>

                    </div>
                    <button id='filterbutton' className="btn btn-secondary w-100 mt-3 btn-filter" onClick={ this.filter }>Filter</button>
                </div>
            
        );
    }
}

export default FilterBox;