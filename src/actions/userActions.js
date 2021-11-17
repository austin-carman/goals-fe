import { axiosWithAuth } from "../utils/axiosWithAuth";

export const SEND_REGISTRATION_START = "SEND_REGISTRATION_START";
export const SEND_REGISTRATION_SUCCESSFUL = "SEND_REGISTRATION_SUCCESSFUL";
export const SEND_REGISTRATION_ERR = "SEND_REGISTRATION_ERR";
export const VERIFY_USER_START = "VERIFY_USER_START";
export const VERIFY_USER_SUCCESS = "VERIFY_USER_SUCCESS";
export const VERIFY_USER_FAIL = "VERIFY_USER_FAIL";
export const VERIFY_USER_ERR = "VERIFY_USER_ERR";
export const USER_LOGOUT = "USER_LOGOUT";

export const userRegister = (registerForm) => {
  return (dispatch) => {
    dispatch({ type: SEND_REGISTRATION_START });
    axiosWithAuth()
      .post("https://goalmanager.herokuapp.com/api/user/register", registerForm)
      .then((res) => {
        dispatch({ type: SEND_REGISTRATION_SUCCESSFUL, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: SEND_REGISTRATION_ERR, payload: err });
      });
  };
};

export const userLogin = (login) => {
  return (dispatch) => {
    dispatch({ type: VERIFY_USER_START });
    axiosWithAuth()
      .post("https://goalmanager.herokuapp.com/api/user/login", login)
      .then((res) => {
        if (!res.data.token) {
          dispatch({ type: VERIFY_USER_FAIL, payload: res.data.message });
        } else {
          dispatch({ type: VERIFY_USER_SUCCESS, payload: res.data });
        }
      })
      .catch((err) => {
        dispatch({ type: VERIFY_USER_ERR, payload: err });
      });
  };
};

export const userLogout = () => {
  return (dispatch) => {
    dispatch({ type: USER_LOGOUT });
  };
};
