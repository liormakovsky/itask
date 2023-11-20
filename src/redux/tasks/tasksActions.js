import axios from "axios";

import {
  GET_TASKS_BEGIN,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
} from "./tasksTypes";

export const tasksInitialState = {
  isLoading: false,
  error: "",
  tasks: [],
};


export const getTasks = () => {
  return async (dispatch) => {
    dispatch({ type: GET_TASKS_BEGIN });
    try {
      const { data } = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/v1/getTasks",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
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
