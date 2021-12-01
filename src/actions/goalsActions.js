import { axiosWithAuth } from "../utils/axiosWithAuth";
export const FETCH_GOALS_START = "FETCH_GOALS_START";
export const FETCH_GOALS_SUCCESS = "FETCH_GOALS_SUCCESS";
export const FETCH_GOALS_FAIL = "FETCH_GOALS_FAIL";
export const NEW_GOAL_START = "NEW_GOAL_START";
export const NEW_GOAL_SUCCESS = "NEW_GOAL_SUCCESS";
export const NEW_GOAL_ERR = "NEW_GOAL_ERR";
export const DELETE_GOAL_START = "DELETE_GOAL_START";
export const DELETE_GOAL_SUCCESS = "DELETE_GOAL_SUCCESS";
export const DELETE_GOAL_FAIL = "DELETE_GOAL_FAIL";
export const EDIT_GOAL_START = "EDIT_GOAL_START";
export const EDIT_GOAL_SUCCESS = "EDIT_GOAL_SUCCESS";
export const EDIT_GOAL_FAIL = "EDIT_GOAL_FAIL";
export const DELETE_STEP_START = "DELETE_STEP_START";
export const DELETE_STEP_SUCCESS = "DELETE_STEP_SUCCESS";
export const DELETE_STEP_FAIL = "DELETE_STEP_FAIL";

export const fetchUserGoals = (userId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_GOALS_START });
    axiosWithAuth()
      .get(`https://goalmanager.herokuapp.com/api/goals/${userId}`)
      .then((res) => {
        dispatch({ type: FETCH_GOALS_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_GOALS_FAIL, payload: err });
      });
  };
};

export const sendNewGoal = (userId, newGoal) => {
  return (dispatch) => {
    dispatch({ type: NEW_GOAL_START });
    axiosWithAuth()
      .post(
        `https://goalmanager.herokuapp.com/api/goals/new-goal/${userId}`,
        newGoal
      )
      .then((res) => {
        dispatch({ type: NEW_GOAL_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: NEW_GOAL_ERR, payload: err });
      });
  };
};

export const deleteGoal = (goalId) => {
  return (dispatch) => {
    dispatch({ type: DELETE_GOAL_START });
    axiosWithAuth()
      .delete(
        `https://goalmanager.herokuapp.com/api/goals/delete-goal/${goalId}`
      )
      .then((res) => {
        dispatch({ type: DELETE_GOAL_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: DELETE_GOAL_FAIL, payload: err });
      });
  };
};

export const editUserGoal = (goalId, editedGoal) => {
  return (dispatch) => {
    dispatch({ type: EDIT_GOAL_START });
    axiosWithAuth()
      .put(
        `https://goalmanager.herokuapp.com/api/goals/edit/${goalId}`,
        editedGoal
      )
      .then((res) => {
        dispatch({ type: EDIT_GOAL_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: EDIT_GOAL_FAIL, payload: err });
      });
  };
};

export const deleteStep = (stepId) => {
  return (dispatch) => {
    dispatch({ type: DELETE_STEP_START });
    axiosWithAuth()
      .delete(
        `https://goalmanager.herokuapp.com/api/goals/delete-step/${stepId}`
      )
      .then((res) => {
        dispatch({ type: DELETE_STEP_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ DELETE_STEP_FAIL, payload: err });
      });
  };
};
