import {
  FETCH_GOALS_START,
  FETCH_GOALS_SUCCESS,
  FETCH_GOALS_FAIL,
  NEW_GOAL_START,
  NEW_GOAL_SUCCESS,
  NEW_GOAL_ERR,
  DELETE_GOAL_START,
  DELETE_GOAL_SUCCESS,
  DELETE_GOAL_FAIL,
  EDIT_GOAL_START,
  EDIT_GOAL_SUCCESS,
  EDIT_GOAL_FAIL,
  DELETE_STEP_START,
  DELETE_STEP_SUCCESS,
  DELETE_STEP_FAIL,
} from "../actions/goalsActions";

const initialState = {
  goals: [],
  isFetching: false,
  error: "",
  serverValidationMessage: "",
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
    case NEW_GOAL_SUCCESS: {
      if (action.payload.goal_id) {
        return {
          ...state,
          goals: [...state.goals, action.payload],
          isFetching: false,
          error: "",
          serverValidationMessage: "",
        };
      } else {
        return {
          ...state,
          isFetching: false,
          error: "",
          serverValidationMessage: action.payload.message,
        };
      }
    }
    case NEW_GOAL_ERR:
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
    case EDIT_GOAL_START:
      return {
        ...state,
        isFetching: true,
      };
    case EDIT_GOAL_SUCCESS: {
      const userGoals = [...state.goals];
      userGoals.map((goal, index) => {
        if (goal.goal_id === action.payload.goal_id) {
          userGoals.splice(index, 1, action.payload);
        }
      });
      return {
        ...state,
        goals: userGoals,
        isFetching: false,
        error: "",
      };
    }
    case EDIT_GOAL_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case DELETE_STEP_START:
      return {
        ...state,
        isFetching: true,
      };
    case DELETE_STEP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
      };
    case DELETE_STEP_FAIL:
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
