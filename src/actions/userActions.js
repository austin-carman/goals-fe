import { axiosWithAuth } from "../utils/axiosWithAuth";
export const VERIFY_USER_START = "VERIFY_USER_START";
export const VERIFY_USER_SUCCESS = "VERIFY_USER_SUCCESS";
export const VERIFY_USER_FAIL = "VERIFY_USER_FAIL";

export const userLogin = (login) => {
  return (dispatch) => {
    dispatch({ type: VERIFY_USER_START });
    axiosWithAuth()
      .post("https://goalmanager.herokuapp.com/api/user/login", login)
      .then((res) => {
        if (!res.data.token) {
          console.log("testing", res.data);
          dispatch({ type: VERIFY_USER_FAIL, payload: res });
        } else {
          dispatch({ type: VERIFY_USER_SUCCESS, payload: res.data });
        }
      })
      .catch((err) => {
        dispatch({ type: VERIFY_USER_FAIL, payload: err });
      });
  };
};
