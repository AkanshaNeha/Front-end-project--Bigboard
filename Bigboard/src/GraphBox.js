/*
import React from 'react';
import axios from 'axios';
import './GraphBox.css';

class GrapgBox extends React.Component {
    componentidUpdate(pP) {
        if(pP.currentStockCode != this.props.currentStockCode) {
            console.log(this.props.currentStockCode);
        let startDate = Math.round(new Date().getTime() / 1000);
            let endDate = startDate - (72 * 3600);
            
            axios.get('https://finhub.io/api/v1/stock/candle', {
                params: {
                    symbol: this.props.curretStockCode,
                    resolution: 5,
                    from: endDate,
                    to: startDate,
                    token: 'bu5pnnf48v6qku34c7vg'
                }
            })
            .then((response) => {
                console.log(response);
                /* var hourly = response.data["hourly"];
                console.log(hourly); */
/*
            })

        }
    }
    render() {
        return(
            <div className>
                <h2>Graph</h2>
            </div>
        );
    };
}
 */
// export default graphbox
import React from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

// import Plot from 'react-plotly.js';
import "./GraphBox.css";
class GraphBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(pP) {
    if (pP.currentStockCode != this.props.currentStockCode) {
      console.log(this.props.currentStockCode);
      let startDate = Math.round(new Date().getTime() / 1000);
      let endDate = startDate - 72 * 3600;
      const pointerToThis = this;
      axios
        .get("https://finnhub.io/api/v1/stock/candle", {
          params: {
            symbol: this.props.currentStockCode,
            resolution: 5,
            from: endDate,
            to: startDate,
            token: "bu5pnnf48v6qku34c7vg",
          },
        })
        .then((response) => {
          // console.log({ JSON.stringify(new Date(response.data.t * 1000)).split('T')[0].replace('"', '') });
          var y = response.data.c;
          var x = response.data.t;
          // console.log(typeof(y[0]));
          this.setState({
            Data: {
              labels: x,
              datasets: [
                {
                  label: "Hourly",
                  data: y,
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "#1C4E80",
                  borderColor: "#1C4E80",
                  borderCapStyle: "butt",
                  borderJoinStyle: "miter",
                  pointBorderColor: "#1C4E80",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 2,
                  pointHitRadius: 10,
                },
              ],
            },
          });
        });
    }
  }
  render() {
    return (
      <div className="graphClass">
        <h2>Graph</h2>
        <Line
          data={this.state.Data}
          height={300}
          width={400}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  display: true,
                },
              ],
              yAxes: [
                {
                  display: true,
                },
              ],
            },
            title: {
              display: true,
              text: "24 hours",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "top",
              labels: {
                fontColor: "black",
                fontSize: 12,
              },
            },
          }}
        />
      </div>
    );
  }
}

export default GraphBox;
