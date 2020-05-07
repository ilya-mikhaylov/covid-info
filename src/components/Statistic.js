import React, { Component } from "react";
import { connect } from "react-redux";

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
  render(){
    console.log("Our state",this.state)
    return<div>Statistic</div>
  }
}
function mapStateToProps(state){
  console.log("Store State",state);
  return{
    country: state.country
  };
}
export default connect(mapStateToProps)(Statistic);
