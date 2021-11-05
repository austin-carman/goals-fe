import {
  FETCH_GOALS_START,
  FETCH_GOALS_SUCCESS,
  FETCH_GOALS_FAIL,
  SEND_GOAL_START,
  SEND_GOAL_SUCCESS,
  SEND_GOAL_FAIL,
  DELETE_GOAL_START,
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
        error: "",
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
        error: "",
      };
    case SEND_GOAL_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case DELETE_GOAL_START:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default goalsReducer;
