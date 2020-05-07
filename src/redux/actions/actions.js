import { CHANGE } from "./actionTypes";

// export function asyncMouseHandler(country){
// 	return async (dispatch) => {
// 		const response = await fetch(
// 			`http://localhost:7000/news?country=${country}`
// 		  );
// 		  const json = await response.json();
// 		  return json;
// 	}
// }


export function changeCountry(e) {
	return {
		type: CHANGE,
		payload: e.target.getAttribute("aria-label")
	}
}
