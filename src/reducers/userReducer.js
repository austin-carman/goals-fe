import {
  SEND_REGISTRATION_START,
  SEND_REGISTRATION_SUCCESSFUL,
  SEND_REGISTRATION_ERR,
  VERIFY_USER_START,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAIL,
  VERIFY_USER_ERR,
  USER_LOGOUT,
} from "../actions/userActions";

const initialState = {
  isFetching: false,
  token: false,
  userId: null,
  errors: "",
  serverValidationMessage: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_REGISTRATION_START:
      return {
        ...state,
        isFetching: true,
      };
    case SEND_REGISTRATION_SUCCESSFUL: {
      if (action.payload.user_id) {
        return {
          ...state,
          isFetching: false,
          userId: action.payload.user_id,
          errors: "",
        };
      } else {
        return {
          ...state,
          isFetching: false,
          errors: "",
          serverValidationMessage: action.payload.message,
        };
      }
    }
    case SEND_REGISTRATION_ERR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
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
        errors: "",
      };
    case VERIFY_USER_FAIL:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
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
        errors: initialState.errors,
      };
    default:
      return state;
  }
};

export default userReducer;
