import {ADD_CITY, REMOVE_CITY} from "../actions"
import { initialState } from "../store";

const cityReducer = (state = initialState.city, action) => {
  switch (action.type) {
    case ADD_CITY: {
      return {
        ...state, 
        cities: [...state.cities, action.payload]
      }
    }
    case REMOVE_CITY: {
      return {
        ...state,
        cities: state.cities.filter((city, index) => index !== action.payload)
      }
    }
    default: 
    return state
  }
}

export default cityReducer