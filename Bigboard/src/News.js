import React from "react";
import axios from "axios";
import moment from "moment";
import "./News.css";
class News extends React.Component {
 
  state = {
    Data: "*Provide a company stock ticker for latest news*",
  };

  componentDidUpdate(pP) {
    if (pP.cstockcode !== this.props.cstockcode) {
      console.log(this.props.cstockcode);
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
            symbol: this.props.cstockcode,
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
          <p className="news-scroll" behavior="scroll" direction="left">
            <a href="sad/"> {this.state.Data}</a>
          </p>
        </div>
      </div>
    );
  }
}

export default News;
