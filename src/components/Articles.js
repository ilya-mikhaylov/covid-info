import React, { Component } from "react";
import { connect } from "react-redux";

class Articles extends Component {
  state = {
    countryJSON: [],
    articleDid: []
  };

  async getDataRest(country) {
    const response = await fetch(
      `http://localhost:7000/news?country=${country}`
    );
    const json = await response.json();
    return json;
  }

  async componentDidMount() {
    const json = await this.getDataRest(this.props.country);

    this.setState({
      articleDid: json.news
    });
  }

  render() {
   
    const { articleDid } = this.state;
    const { countryJSONasync } = this.props;
    

    return (
      <React.Fragment>
        {countryJSONasync.length === 0 ? (
          <ul>
            {articleDid.length > 0 &&
              articleDid.map((elem, index) => {
                return <li key={index}>{elem.title}</li>;
              })}
          </ul>
        ) : (
          <ul>
            {countryJSONasync.json.news.length > 0 &&
              countryJSONasync.json.news.map((elem, index) => {
                return <li key={index}>{elem.title}</li>;
              })}
          </ul>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    country: state.country,
    countryJSONasync: state.countryJSONasync
  };
}

export default connect(mapStateToProps)(Articles);
