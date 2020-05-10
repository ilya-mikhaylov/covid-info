import { CHANGE, CHANGE_INPUT, CHANGE_ASYNC } from "./actionTypes";

export const asyncGetTracks = country => {
  return async dispatch => {
    if (country) {
      if (country === "Russian Federation") {
        country = "Russia";
      } else if (country.trim() === "United States") {
        country = "USA";
      }

      const response = await fetch(
        `/news?country=${country}`
      );
      const json = await response.json();

      const responseСountriesLimit = await fetch(
        `/restrictions?country=${country}`
      );
      const jsonСountriesLimit = await responseСountriesLimit.json();
      let limit = jsonСountriesLimit.response;

      const responseStats = await fetch(
        `/stats?country=${country}`
      );
      const jsonResponseStats = await responseStats.json();

      dispatch({
        type: CHANGE_ASYNC,
        payload: { json, country, limit, jsonResponseStats }
      });
    } else {
      return;
    }
  };
};

export function changeCountry(e) {
  return {
    type: CHANGE,
    payload: e.target.getAttribute("aria-label")
  };
}

export function inputValue(value) {
  return {
    type: CHANGE_INPUT,
    payload: value
  };
}
