import { axiosWithAuth } from "../utils/axiosWithAuth";

export const fetchUserGoals = (userId) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_START" });
    axiosWithAuth()
      .get(`https://goalmanager.herokuapp.com/api/goals/${userId}`)
      .then((res) => {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_FAIL", payload: err });
      });
  };
};
