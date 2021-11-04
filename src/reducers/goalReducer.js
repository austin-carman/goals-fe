const initialState = {
  goals: [],
  isFetching: false,
  error: "",
};

const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        isFetching: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        goals: action.payload,
        isFetching: false,
      };
    case "FETCH_FAIL":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default goalsReducer;
