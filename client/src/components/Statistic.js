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
      `/stats?country=${country}`
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
    const {
      totalCases,
      newCases,
      totalDeaths,
      totalRecovered
	} = this.state.countryJSON;
	console.log('qqqqqq', this.props.stats);
	
	
	const { stats } = this.props;
    return (
      <>
        <div className="head">
          <div className="headText">Covid-19 INFO</div>
          <div className="headLink"><a href="https://github.com/ilya-mikhaylov/covid-info">Review our project on GitHub</a></div>
          <div className="wrapperSecond">
          <SearchInput className="countryName" />
          <div className="menuItemsWrapper">
			  { stats.length === 0 
			  ?
			  this.state.countryJSON && <ul className="menuItems">
              <li>
                Total cases: { totalCases }{" "}
                <span>{ newCases }</span>
              </li>
              <li>Deaths: { totalDeaths }</li>
              <li>Recovered: { totalRecovered }</li>
			</ul> 
			: 
			<ul className="menuItems">
              <li>
                Total cases: { stats.totalCases }{" "}
                <span>{ stats.newCases }</span>
              </li>
              <li>Deaths: { stats.totalDeaths }</li>
              <li>Recovered: { stats.totalRecovered }</li>
            </ul> }
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
    input: state.input,
    stats: state.stats
  };
}

export default connect(mapStateToProps)(Statistic);
