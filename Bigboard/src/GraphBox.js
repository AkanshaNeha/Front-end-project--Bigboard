import React from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./GraphBox.css";
import moment from "moment";
class GraphBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {},
    };
  }
  componentDidUpdate(pP) {
    
    if (pP.cstockcode !== this.props.cstockcode) {
      if (this.props.alter_Graph === false) {
        var startDate = Math.round(new Date().getTime() / 1000);
        var endDate = startDate - 72 * 3600;
      } else {
         startDate = this.props.dates.endDate;
         endDate = this.props.dates.startDate;
      }
      
      axios
        .get("https://finnhub.io/api/v1/stock/candle", {
          params: {
            symbol: this.props.cstockcode,
            resolution: 5,
            from: endDate,
            to: startDate,
            token: "bu5pnnf48v6qku34c7vg",
          },
        })
        .then((response) => {
          console.log(response);
          var unix_time = response.data.t;
          var i;
          var x = [];
          for (i = 0; i < unix_time.length; i++) {
            var time = moment.unix(unix_time[i]).format("YYYY-MM-DD HH:mm");
            x.push(time);
          }
          var y = response.data.c;
          var lowOrHighColor = y[0] < y[y.length - 1] ? "#81b737" : "#d54f4f";
          this.setState({
            symbol: this.props.cstockcode,
            text: "in the last 72 Hours",
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
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else if (pP.dates !== this.props.dates) {
      if (this.props.alter_Graph === false) {
         startDate = Math.round(new Date().getTime() / 1000);
         endDate = startDate - 72 * 3600;
      } else {
         startDate = this.props.dates.endDate;
         endDate = this.props.dates.startDate;
      }
     
      axios
        .get("https://finnhub.io/api/v1/stock/candle", {
          params: {
            symbol: this.props.cstockcode,
            resolution: 5,
            from: endDate,
            to: startDate,
            token: "bu5pnnf48v6qku34c7vg",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.s === "no_data") {
            alert(
              "No Data Currently Available. Markets are closed during weekends and public holidays. Please filter by previous date."
            );
          } else {
            var unix_time = response.data.t;
            var i;
            var x = [];
            for (i = 0; i < unix_time.length; i++) {
              var time = moment.unix(unix_time[i]).format("YYYY-MM-DD HH:mm");
              x.push(time);
            }
            var text =
              "between " +
              String(x[0]).slice(0, 10) +
              " to " +
              String(x[x.length - 1].slice(0, 10));
            var y = response.data.c;
            var lowOrHighColor = y[0] < y[y.length - 1] ? "#81b737" : "#d54f4f";
            this.setState({
              text: text,
              symbol: this.props.cstockcode,
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
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }

  render() {
    return (
      <div className="graphClass">
        <h5>
          Price per share of {this.state.symbol} {this.state.text}{" "}
        </h5>
        <Line
          data={this.state.Data}
          height={300}
          width={400}
          options={{
            layout: {
              padding: {
                right: 10,
              },
            },
            responsive: true,
            maintainAspectRatio: false,

            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    display: false, //this will remove only the label
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Time",
                    fontColor: "rgb(0, 35, 80)",
                    fontfamily:
                      "New Century Schoolbook, TeX Gyre Schola, serif",
                    fontSize: 12,
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
                    labelString: "Stock Price ($)",
                    fontColor: "rgb(0, 35, 80)",
                    fontfamily:
                      "New Century Schoolbook, TeX Gyre Schola, serif",
                    fontSize: 12,
                  },
                  ticks: {
                    display: true,
                    fontColor: "black",
                  },
                },
              ],
            },
            legend: {
              display: true,
              position: "top",
              labels: {
                fontColor: "rgb(0, 35, 80)",
                fontSize: 12,
                fontfamily: "New Century Schoolbook, TeX Gyre Schola, serif",
              },
            },
          }}
        />
      </div>
    );
  }
}
export default GraphBox;
