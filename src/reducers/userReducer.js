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
  SET_FORM_ERRS,
} from "../actions/userActions";

const initialState = {
  isFetching: false,
  token: null,
  userId: null,
  error: {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  },
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
        userId: action.payload.user_id,
      };
    case SEND_REGISTRATION_ERR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case SEND_REGISTRATION_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
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
        token: action.payload.token,
        userId: action.payload.userId,
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
        isFetching: false,
        token: null,
        userId: null,
        error: "",
      };
    case SET_FORM_ERRS:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

export default userReducer;
