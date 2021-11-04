import goalReducer from "./goalReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  goal: goalReducer,
});

export default rootReducer;
