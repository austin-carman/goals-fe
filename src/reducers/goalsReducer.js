import {
  FETCH_GOALS_START,
  FETCH_GOALS_SUCCESS,
  FETCH_GOALS_FAIL,
  SEND_GOAL_START,
  SEND_GOAL_SUCCESS,
  SEND_GOAL_FAIL,
  DELETE_GOAL_START,
  DELETE_GOAL_SUCCESS,
  DELETE_GOAL_FAIL,
  DELETE_GOAL_ERR,
  EDIT_GOAL_START,
  EDIT_GOAL_SUCCESS,
  EDIT_GOAL_FAIL,
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
    case DELETE_GOAL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
      };
    case DELETE_GOAL_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case DELETE_GOAL_ERR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case EDIT_GOAL_START:
      return {
        ...state,
        isFetching: true,
      };
    case EDIT_GOAL_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case EDIT_GOAL_FAIL:
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
