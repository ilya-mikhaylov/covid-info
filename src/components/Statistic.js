import React, { Component } from "react";
import { connect } from "react-redux";
import "./Statistic.css"
class Statistic extends Component {
  state = {
    countryJSON: ""
  };
  async getDataRest(country) {
    const response = await fetch(
      `http://localhost:7000/stats?country=${country}`
    );
    const json = await response.json();
    return json
  }
  async componentDidMount() {
    const json = await this.getDataRest(this.props.country);
    this.setState(({ countryJSON }) => {
      return { countryJSON: json };
    })
  }
  render() {
    console.log("Our state", this.state)

    return <>
      <div className="head">
        <img src="img/logo.png" className="logo"></img>
        <p className="headText">Naruto team Project - “Covid-19 INFO” for Elbrus Hackaton</p>
        <div className="selectedCountry">
          <div className="countryImg"></div>
          <p className="countryName">Wordwide</p>
          <div className="stats">
            <p>totalCases {this.state.countryJSON.totalCases} &nbsp; newCases {this.state.countryJSON.newCases}</p>
            <p>totalDeaths {this.state.countryJSON.totalDeaths} &nbsp; totalRecovered {this.state.countryJSON.totalRecovered}</p>
          </div>
        </div>
      </div>
    </>
  }
}
function mapStateToProps(state) {
  console.log("Store State", state);
  return {
    country: state.country
  };
}
export default connect(mapStateToProps)(Statistic);
