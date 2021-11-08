import {
  FETCH_GOALS_START,
  FETCH_GOALS_SUCCESS,
  FETCH_GOALS_FAIL,
  NEW_GOAL_START,
  NEW_GOAL_SUCCESS,
  NEW_GOAL_FAIL,
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
    case NEW_GOAL_START:
      return {
        ...state,
        isFetching: true,
      };
    case NEW_GOAL_SUCCESS:
      return {
        ...state,
        goals: [...state.goals, action.payload],
        isFetching: false,
        error: "",
      };
    case NEW_GOAL_FAIL:
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
    case EDIT_GOAL_SUCCESS: {
      const newGoals = [...state.goals];
      const x = (element) => element.goal_id === action.payload.goal_id;
      const indexToEdit = newGoals.findIndex(x);
      newGoals.splice(indexToEdit, 1);
      newGoals.push(action.payload);
      return {
        ...state,
        goals: newGoals,
        isFetching: false,
      };
    }
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
