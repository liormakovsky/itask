import {
  GET_TASKS_BEGIN,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  CREATE_TASK_BEGIN,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  UPDATE_TASK_BEGIN,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  DELETE_TASK_BEGIN,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
} from "./tasksTypes";

import { tasksInitialState } from "./tasksActions";

const reducer = (state = tasksInitialState, action) => {
  switch (action.type) {
    case GET_TASKS_BEGIN:
      return { ...state, isLoading: true };

    case GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
      };

    case GET_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload, // Assuming you want to store the error message
      };

    case CREATE_TASK_BEGIN:
      return { ...state, isLoading: true };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload], // Assuming payload is the new task
        isLoading: false,
      };

    case CREATE_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case UPDATE_TASK_BEGIN:
      return { ...state, isLoading: true };

    case UPDATE_TASK_SUCCESS:
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      return {
        ...state,
        tasks: updatedTasks,
        isLoading: false,
      };

    case UPDATE_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case DELETE_TASK_BEGIN:
      return { ...state, isLoading: true };

    case DELETE_TASK_SUCCESS:
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return {
        ...state,
        tasks: filteredTasks,
        isLoading: false,
      };

    case DELETE_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
