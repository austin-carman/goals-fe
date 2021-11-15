import {
  VERIFY_USER_START,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAIL,
} from "../actions/userActions";

const initialState = {
  isFetching: false,
  userIsVerified: true,
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
      return {
        ...state,
        isFetching: false,
      };
    case VERIFY_USER_FAIL:
      return {
        ...state,
        isFetching: false,
      };
  }
};

export default userReducer;
