import {
  VERIFY_USER_START,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAIL,
  VERIFY_USER_ERR,
} from "../actions/userActions";

const initialState = {
  isFetching: false,
  userId: null,
  message: "",
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default userReducer;
