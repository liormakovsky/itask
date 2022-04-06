import { combineReducers } from "redux";
import userReducer from "./users/userReducer";
import cdrReducer from "./cdr/cdrReducer";

const rootReducer = combineReducers({
  userReducer,
  cdrReducer,
});

export default rootReducer;
