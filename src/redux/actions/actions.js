import { CHANGE, CHANGE_INPUT, CHANGE_ASYNC } from "./actionTypes";


export const asyncGetTracks = country => {
  return async dispatch => {
	// let country = e.target.getAttribute("aria-label");
	if (country === 'Russian Federation') {
		country = 'Russia';
	}
	
    const response = await fetch(
      `http://localhost:7000/news?country=${country}`
    );
    const json = await response.json();

    const responseСountriesLimit = await fetch(
      `http://localhost:7000/restrictions?country=${country}`
    );
    const jsonСountriesLimit = await responseСountriesLimit.json();
    let limit = jsonСountriesLimit.response;

    dispatch({
      type: CHANGE_ASYNC,
      payload: { json, country, limit }
    });
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
	}
}


