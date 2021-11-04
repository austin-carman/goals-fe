import { axiosWithAuth } from "../utils/axiosWithAuth";
export const FETCH_GOALS_START = "FETCH_GOALS_START";
export const FETCH_GOALS_SUCCESS = "FETCH_GOALS_SUCCESS";
export const FETCH_GOALS_FAIL = "FETCH_GOALS_FAIL";
export const SEND_GOAL_START = "SEND_GOAL_START";
export const SEND_GOAL_SUCCESS = "SEND_GOAL_SUCCESS";

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
    dispatch({ type: SEND_GOAL_START });
    axiosWithAuth()
      .post(
        `https://goalmanager.herokuapp.com/api/goals/new-goal/${userId}`,
        newGoal
      )
      .then((res) => {
        dispatch({ type: SEND_GOAL_SUCCESS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
