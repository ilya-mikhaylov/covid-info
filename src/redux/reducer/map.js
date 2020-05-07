import { CHANGE } from "../actions/actionTypes";

let initialState = {
  country: "world"
};

export default function mapState(state = initialState, action) {
  switch (action.type) {
    case CHANGE:	  
      return { ...state, country: action.payload };
    default:
      return state;
  }
}
