import {
  FETCH_GOALS_START,
  FETCH_GOALS_SUCCESS,
  FETCH_GOALS_FAIL,
  SEND_GOAL_START,
  SEND_GOAL_SUCCESS,
  SEND_GOAL_FAIL,
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
    case SEND_GOAL_START:
      return {
        ...state,
        isFetching: true,
      };
    case SEND_GOAL_SUCCESS:
      return {
        ...state,
        goals: [...state.goals, action.payload],
        isFetching: false,
      };
    case SEND_GOAL_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default goalsReducer;
