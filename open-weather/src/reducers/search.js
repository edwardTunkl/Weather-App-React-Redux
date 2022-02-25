import { initialState } from "../store";
import { SET_LAT, SET_LONG, SET_RESULTS, SET_SEARCH } from "../actions";

export const searchReducer = (state = initialState.search, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        query: action.payload,
      };
    case SET_RESULTS:
      return {
        ...state,
        results: [action.payload],
      };
    case SET_LAT:
      return {
        ...state,
        latitude: action.payload,
      };
    case SET_LONG:
      return {
        ...state,
        longitude: action.payload,
      };

    default:
      return state;
  }
};
export default searchReducer;
