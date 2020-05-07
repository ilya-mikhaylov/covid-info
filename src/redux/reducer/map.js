// import { CHANGE } from "../actions/actionTypes";
import { CHANGE, CHANGE_ASYNC } from "../actions/actionTypes";

let initialState = {
  country: "world",
  countryJSONasync: "",
  limit: ""
};


export default function mapState(state = initialState, action) {
  switch (action.type) {
    case CHANGE:
      return { ...state, country: action.payload };
    case CHANGE_ASYNC:

		console.log('88880000', action.payload.limit );
		
      return {
        ...state,
        countryJSONasync: action.payload,
		country: action.payload.country,
		limit: action.payload.limit
      };
    default:
      return state;
  }
}
