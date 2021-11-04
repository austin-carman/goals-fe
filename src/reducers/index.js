import goalsReducer from "./goalReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  goalsReducer: goalsReducer,
});

export default rootReducer;
