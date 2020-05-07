// import { CHANGE } from "./actionTypes";
import { CHANGE_ASYNC } from "./actionTypes";


export const asyncGetTracks = e => {
  return async dispatch => {
    let country = e.target.getAttribute("aria-label");
    const response = await fetch(
      `http://localhost:7000/news?country=${country}`
    );
	const json = await response.json();
	console.log('ACTIONS', json);
	
    dispatch({ type: CHANGE_ASYNC, payload: { json, country } });
  };
};

// export function changeCountry(e) {
// 	return {
// 		type: CHANGE,
// 		payload: e.target.getAttribute("aria-label")
// 	}
// }
