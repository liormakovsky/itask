import axios from "axios";

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

export const tasksInitialState = {
  isLoading: false,
  error: "",
  tasks: [],
};

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

// Get tasks
export const getTasks = () => {
  return async (dispatch) => {
    dispatch({ type: GET_TASKS_BEGIN });
    try {
      await axios.get("/sanctum/csrf-cookie");
      const { data } = await axios.get("/api/v1/tasks");
      if (data.success === true) {
        dispatch({ type: GET_TASKS_SUCCESS, payload: data.data });
      } else {
        dispatch({ type: GET_TASKS_ERROR, payload: data.message });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

// Create task
export const createTask = (user_id, taskData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_TASK_BEGIN });
    try {
      await axios.get("/sanctum/csrf-cookie");

      // Include user_id in the taskData
      const dataWithUserId = {
        ...taskData,
        user_id
      };

      const { data } = await axios.post("/api/v1/tasks", dataWithUserId);

      if (data.success === true) {
        dispatch({ type: CREATE_TASK_SUCCESS, payload: data.data });
        dispatch(getTasks());
      } else {
        dispatch({ type: CREATE_TASK_ERROR, payload: data.message });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

// Update task
export const updateTask = (taskId, taskData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_TASK_BEGIN });
    try {
      await axios.get("/sanctum/csrf-cookie");
      const { data } = await axios.put(`/api/v1/tasks/${taskId}`, taskData);
      if (data.success === true) {
        dispatch({ type: UPDATE_TASK_SUCCESS, payload: data.data });
      } else {
        dispatch({ type: UPDATE_TASK_ERROR, payload: data.message });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

// Delete task
export const deleteTask = (taskId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_TASK_BEGIN });
    try {
      await axios.get("/sanctum/csrf-cookie");
      const { data } = await axios.delete(`/api/v1/tasks/${taskId}`);
      if (data.success === true) {
        dispatch({ type: DELETE_TASK_SUCCESS, payload: taskId });
      } else {
        dispatch({ type: DELETE_TASK_ERROR, payload: data.message });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
