import {
  SEND_REGISTRATION_START,
  SEND_REGISTRATION_SUCCESSFUL,
  SEND_REGISTRATION_ERR,
  VERIFY_USER_START,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_ERR,
  USER_LOGOUT,
  PROFILE_BACKGROUND,
} from "../actions/userActions";
import oceanMountains from "../images/ocean-mountains.jpg";

const initialState = {
  isFetching: false,
  token: false,
  firstName: "",
  lastName: "",
  userId: sessionStorage.getItem("user"),
  errors: "",
  serverValidationMessage: "",
  backgroundImage: localStorage.getItem("goals background") || oceanMountains,
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
        sessionStorage.setItem("user", action.payload.user_id);
        return {
          ...state,
          isFetching: false,
          userId: action.payload.user_id,
          errors: "",
          serverValidationMessage: "",
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
    case VERIFY_USER_SUCCESS: {
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
        sessionStorage.setItem("user", action.payload.userId);
        return {
          ...state,
          isFetching: false,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          userId: sessionStorage.getItem("user"),
          token: true,
          errors: "",
          serverValidationMessage: "",
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
    case VERIFY_USER_ERR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
      };
    case USER_LOGOUT:
      sessionStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        isFetching: false,
        userId: null,
        token: null,
        errors: initialState.errors,
      };
    case PROFILE_BACKGROUND:
      localStorage.setItem("goals background", `${action.payload}`);
      return {
        ...state,
        backgroundImage: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
