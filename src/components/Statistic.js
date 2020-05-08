import React, { Component } from "react";
import { connect } from "react-redux";
import SearchInput from "./SearchInput";
import "./Statistic.css";

class Statistic extends Component {
  state = {
    countryJSON: ""
  };
  async getDataRest(country) {
    const response = await fetch(
      `http://localhost:7000/stats?country=${country}`
    );
    const json = await response.json();
    return json;
  }
  async componentDidMount() {
    const json = await this.getDataRest(this.props.country);
    this.setState(({ countryJSON }) => {
      return { countryJSON: json };
    });
  }
  render() {
    console.log("Our state", this.state);

    return (
      <>
        <div className="head">
          <img src="./img/logo.png" className="logo"></img>
          <p className="headText">
            Covid-19 INFO
          </p>
          <div className="selectedCountry">
            <div className="countryImg"></div>
            {/* <p className="">Wordwide</p> */}

            <div className="stats">
              <React.Fragment>
                {/* <p id='currentCases'>
                Total cases {this.state.countryJSON.totalCases} &nbsp; {" "}
                  {this.state.countryJSON.newCases}
                </p>
                <p>
                  Deaths {this.state.countryJSON.totalDeaths} &nbsp;
                  Recovered {this.state.countryJSON.totalRecovered}
				</p> */}

                <div id="stats">
                  <p id="currentCases">
                    Total cases: {this.state.countryJSON.totalCases}
                  </p>

                  <p id="newCases">{this.state.countryJSON.newCases}</p>
                  <p id="deaths">Deaths: {this.state.countryJSON.totalDeaths}</p>

                  <p id="recovered">
                    Recovered: {this.state.countryJSON.totalRecovered}
                  </p>
                </div>
                <SearchInput className="countryName" />
              </React.Fragment>
            </div>
          </div>
        </div>
      </>
    );
  }
}
function mapStateToProps(state) {
  console.log("Store State", state);
  return {
    country: state.country,
    input: state.input
  };
}

export default connect(mapStateToProps)(Statistic);
