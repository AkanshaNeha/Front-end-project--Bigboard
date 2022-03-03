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
import moment from "moment";
class GraphBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(pP) {
    if (
      pP.currentStockCode != this.props.currentStockCode ||
      pP.currentStockCode == this.props.currentStockCode
    ) {
      // console.log(this.props.currentStockCode);
      // console.log(this.props.alter_Graph);
      if (this.props.alter_Graph === false) {
        var startDate = Math.round(new Date().getTime() / 1000);
        var endDate = startDate - 72 * 3600;
      } else {
        var startDate = this.props.dates.endDate;
        var endDate = this.props.dates.startDate;
      }
      // console.log(a);
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
          var unix_time = response.data.t;
          var i;
          var x = [];
          for (i = 0; i < unix_time.length; i++) {
            var time = moment.unix(unix_time[i]).format("YYYY-MM-DD HH:mm");
            x.push(time);
          }
          // console.log(x);
          var y = response.data.c;
          // console.log(typeof(y[0]));
          var lowOrHighColor = y[0] < y[y.length - 1] ? "#81b737" : "#d54f4f";
          this.setState({
            Data: {
              labels: x,
              datasets: [
                {
                  label: "Stock Price",
                  data: y,
                  fill: true,
                  lineTension: 0.1,
                  backgroundColor: lowOrHighColor,
                  borderColor: lowOrHighColor,
                  borderCapStyle: "butt",
                  borderJoinStyle: "miter",
                  pointBorderColor: lowOrHighColor,
                  pointBackgroundColor: lowOrHighColor,
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: lowOrHighColor,
                  pointHoverBorderColor: lowOrHighColor,
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
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    display: true, //this will remove only the label
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Time",
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Stock Price",
                  },
                },
              ],
            },
            title: {
              display: true,
              text: "Market Summary of 72 hours",
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

//export default GraphBox;
