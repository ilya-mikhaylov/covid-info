// import { CHANGE } from "../actions/actionTypes";
import { CHANGE, CHANGE_ASYNC } from "../actions/actionTypes";

let initialState = {
  country: "world",
  countryJSONasync: ""
};


export default function mapState(state = initialState, action) {
  switch (action.type) {
    case CHANGE:
      return { ...state, country: action.payload };
    case CHANGE_ASYNC:
		// console.log('LLLL', action.payload);
		
      return {
        ...state,
        countryJSONasync: action.payload,
        country: action.payload.country
      };
    default:
      return state;
  }
}
