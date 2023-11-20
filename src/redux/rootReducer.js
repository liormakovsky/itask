import { combineReducers } from "redux";
import userReducer from "./users/userReducer";
import tasksReducer from "./tasks/tasksReducer";

const rootReducer = combineReducers({
  userReducer,
  tasksReducer,
});

export default rootReducer;
