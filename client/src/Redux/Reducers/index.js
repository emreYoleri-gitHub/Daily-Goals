import { combineReducers } from "redux";
import goalReducer from "./goalReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  users: userReducer,
  goals: goalReducer,
});

export default rootReducer;
