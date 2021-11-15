import goalsReducer from "./goalsReducer";
import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  goalsReducer: goalsReducer,
  userReducer: userReducer,
});

export default rootReducer;
