import goalsReducer from "./goalsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  goalsReducer: goalsReducer,
});

export default rootReducer;
