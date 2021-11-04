import {
  FETCH_GOALS_START,
  FETCH_GOALS_SUCCESS,
  FETCH_GOALS_FAIL,
  SEND_GOALS_START,
} from "../actions/actions";

const initialState = {
  goals: [],
  isFetching: false,
  error: "",
};

const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GOALS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_GOALS_SUCCESS:
      return {
        ...state,
        goals: action.payload,
        isFetching: false,
      };
    case FETCH_GOALS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case SEND_GOALS_START:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default goalsReducer;
