import { axiosWithAuth } from "../utils/axiosWithAuth";
export const FETCH_GOALS_START = "FETCH_GOALS_START";
export const FETCH_GOALS_SUCCESS = "FETCH_GOALS_SUCCESS";
export const FETCH_GOALS_FAIL = "FETCH_GOALS_FAIL";
export const SEND_GOALS_START = "SEND_GOALS_START";

export const fetchUserGoals = (userId) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_GOALS_START" });
    axiosWithAuth()
      .get(`https://goalmanager.herokuapp.com/api/goals/${userId}`)
      .then((res) => {
        dispatch({ type: "FETCH_GOALS_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_GOALS_FAIL", payload: err });
      });
  };
};

export const sendNewGoal = () => {
  return (dispatch) => {
    dispatch({ type: "SEND_GOALS_START" });
  };
};
