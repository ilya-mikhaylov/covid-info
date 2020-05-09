import React, { Component } from "react";
import { connect } from "react-redux";
import Article from './Article';
import "./Articles.css";
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
          <div className="articals">
            {articleDid.length > 0 &&
              articleDid.map((elem, index) => {
                return <Article key={index} article={elem} />;
              })}
          </div>
        ) : (
          <div className="articals">
            {countryJSONasync.json.news.length > 0 &&
              countryJSONasync.json.news.map((elem, index) => {
                return <Article key={index} article={elem} />;
              })}
          </div>
          
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    country: state.country,
    countryJSONasync: state.countryJSONasync,
    limit: state.limit
  };
}

export default connect(mapStateToProps)(Articles);
