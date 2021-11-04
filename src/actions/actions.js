import { axiosWithAuth } from "../utils/axiosWithAuth";
// import { useParams } from "react-router";

export const fetchUserGoals = () => {
  // const params = useParams();
  return (dispatch) => {
    dispatch({ type: "FETCH_START" });
    axiosWithAuth()
      .get(`https://goalmanager.herokuapp.com/api/goals/1`)
      .then((res) => {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "FETCH_FAIL", payload: err });
      });
  };
};
