/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-distracting-elements */
/* eslint-disable no-useless-constructor */
import React from "react";
import axios from "axios";
import moment from "moment";
import "./News.css";
class News extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    Data: "*Provide a company stock ticker for latest news*",
  };

  componentDidUpdate(pP) {
    if (pP.currentStockCode !== this.props.currentStockCode) {
      console.log(this.props.currentStockCode);
      let startDate = Math.round(new Date().getTime() / 1000);
      let endDate = startDate - 72 * 3600;
      startDate = moment.unix(startDate).format("YYYY MMM DD");
      var arr1 = startDate.split(" ");
      var startmm = moment().month(arr1[1]).format("MM");

      startDate = arr1[0] + "-" + startmm + "-" + arr1[2];

      endDate = moment.unix(endDate).format("YYYY MMM DD");
      var arr2 = endDate.split(" ");

      var endmm = moment().month(arr2[1]).format("MM");

      endDate = arr2[0] + "-" + endmm + "-" + arr2[2];

      axios
        .get("https://finnhub.io/api/v1/company-news", {
          params: {
            symbol: this.props.currentStockCode,
            from: endDate,
            to: startDate,
            token: "bu5pnnf48v6qku34c7vg",
          },
        })
        .then((response) => {
          var headlines = "";
          for (var i = 0; i < response.data.length; i++) {
            headlines += response.data[i].headline + ".";
          }

          this.setState({ Data: headlines }, () => {});
        });
    }
  }

  render() {
    return (
      <div className="container footer">
        <div className="d-flex breaking-news">
          <div id="ticker" className="ticker d-flex news">
            <span className="d-flex align-items-center">&nbsp;NEWS</span>
          </div>
          <marquee className="news-scroll" behavior="scroll" direction="left">
            <a href="#"> {this.state.Data}</a>
          </marquee>
        </div>
      </div>
    );
  }
}

export default News;
