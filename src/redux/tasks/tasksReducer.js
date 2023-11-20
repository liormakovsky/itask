import {
  GET_TASKS_BEGIN,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
} from "./tasksTypes";

import { tasksInitialState } from "./tasksActions";

const reducer = (state, action) => {
  switch (action.type) {

    case GET_TASKS_BEGIN:
      return { ...state, isLoading: true };

    case GET_TASKS_SUCCESS:
      return {
        ...state,
        TASKS: action.payload,
        isLoading: false,
      };

    case GET_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default:
      if (!state) {
        return tasksInitialState;
      }
      return state;
  }
};

export default reducer;
