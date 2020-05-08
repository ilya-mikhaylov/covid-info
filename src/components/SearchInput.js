import React, { Component } from "react";
import { connect } from "react-redux";
import { asyncGetTracks } from "../redux/actions/actions";
import classes from "./SearchInput.module.css";
const { getCodeList } = require("country-list");

class SearchInput extends Component {
  state = {
    data: null,
    search: "",
    country: ""
  };

  componentDidMount() {
    let data = Object.values(getCodeList());
    this.setState({ data });
  }
  onInput = e => this.setState({ [e.target.id]: e.target.value });
  onFocus = e => e.target.parentNode.parentNode.classList.add("focus");
  onBlur = e => e.target.parentNode.parentNode.classList.remove("focus");

  onClickItem = item => {
    this.setState({
      search: "",
      country: item
    });
    console.log("55565656555656", item);
  };

  render() {
    let { data, search, country } = this.state;
    let { input } = this.props;
    if (!data) {
      return <p>Loading</p>;
    }
    let filtered = data.filter(item =>
      item.toLowerCase().includes(search.toLowerCase())
    );

    

    return (
      <div>
        <div className={classes.wrapper}>
          <div className={classes.search}>
            <input
              id="search"
              type="search"
              value={search}
              placeholder="Search a country..."
              onChange={this.onInput}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              autoComplete="off"
            />
          </div>
          {search.length > 1 && filtered.length > 0 && (
            <ul className={classes.list}>
              {filtered.map(item => (
                <li
                  //   onClick={this.props.onGetTracks}
                  //   onClick={() => this.onClickItem(item)}
                  onClick={() => this.props.onGetTracks(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    country: state.country,
    input: state.input
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     // inputHandler: e => dispatch(inputValue(e.target.value)),
//     // InputCountry: country => dispatch(asyncGetTracks(country))
//   };
// }

function mapDispatchToProps(dispatch) {
	return {
	  onGetTracks: country => {
		dispatch(asyncGetTracks(country));
	  },
	};
  }

export default connect(mapStateToProps,mapDispatchToProps)(SearchInput);
