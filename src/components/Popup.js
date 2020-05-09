import React, { Component } from "react";
import classes from "./Popup.module.css";
import { connect } from "react-redux";

class Popup extends Component {
  state = {
    valueDid: ""
  };
  async componentDidMount() {
    const response = await fetch(
      `http://localhost:7000/restrictions?country=${this.props.country}`
    );
    const json = await response.json();

    this.setState({
      valueDid: json.response
    });
  }
  render() {
    return (
      <div className={classes.modal}>
        <h1 id="modalTitle">{this.props.country}</h1>
        {this.props.limit.length === 0 ? (
          this.state.valueDid && <p id="modalText">{this.state.valueDid}</p>
        ) : (
          <p id="modalText">{this.props.limit}</p>
        )}
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    country: state.country,
    limit: state.limit
  };
}

export default connect(mapStateToProps)(Popup);
