import {
  SEND_REGISTRATION_START,
  SEND_REGISTRATION_SUCCESSFUL,
  SEND_REGISTRATION_ERR,
  SEND_REGISTRATION_FAIL,
  VERIFY_USER_START,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAIL,
  VERIFY_USER_ERR,
  USER_LOGOUT,
} from "../actions/userActions";

const initialState = {
  isFetching: false,
  userId: null,
  message: "",
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_REGISTRATION_START:
      return {
        ...state,
        isFetching: true,
      };
    case SEND_REGISTRATION_SUCCESSFUL:
      return {
        ...state,
        isFetching: false,
      };
    case SEND_REGISTRATION_ERR:
      return {
        ...state,
        isFetching: false,
      };
    case SEND_REGISTRATION_FAIL:
      return {
        ...state,
        isFetching: false,
      };
    case VERIFY_USER_START:
      return {
        ...state,
        isFetching: true,
      };
    case VERIFY_USER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isFetching: false,
        userId: action.payload.userId,
        message: action.payload.message,
      };
    case VERIFY_USER_FAIL:
      return {
        ...state,
        isFetching: false,
      };
    case VERIFY_USER_ERR:
      return {
        ...state,
        isFetching: false,
      };
    case USER_LOGOUT:
      return {
        ...state,
        userId: null,
        error: "",
        message: "",
        isFetching: false,
      };
    default:
      return state;
  }
};

export default userReducer;
