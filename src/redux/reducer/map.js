import { CHANGE, CHANGE_ASYNC, CHANGE_INPUT } from "../actions/actionTypes";

let initialState = {
  country: "world",
  countryJSONasync: "",
  limit: "",
  input: ""
};

export default function mapState(state = initialState, action) {
  switch (action.type) {
    case CHANGE:
      return { ...state, country: action.payload };
    case CHANGE_INPUT:
      return { ...state, input: action.payload };
    case CHANGE_ASYNC:
      return {
        ...state,
        countryJSONasync: action.payload,
        country: action.payload.country,
		limit: action.payload.limit,
		input: ""
      };
    default:
      return state;
  }
}
