import axios from "axios";

import {
  UPLOAD_FILE_BEGIN,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  VALIDATION_ERROR,
  RESET_CDR_STATES,
  GET_CDR_BEGIN,
  GET_CDR_SUCCESS,
  GET_CDR_ERROR,
} from "./cdrTypes";

export const cdrInitialState = {
  isLoading: false,
  fileUploaded: false,
  error: "",
  cdr: [],
};

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    return (dispatch) => {
      if (error.response.status === 403) {
        dispatch({
          type: VALIDATION_ERROR,
          payload: { error: error.response.data.message },
        });
      }
      return Promise.reject(error);
    };
  }
);

export const uploadFile = (file) => {
  return async (dispatch) => {
    dispatch({ type: UPLOAD_FILE_BEGIN });
    try {
      let formData = new FormData();
      formData.append("file", file);
      const { data } = await axios({
        method: "post",
        url: "http://localhost:8000/api/v1/uploadFile",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success === true) {
        dispatch({ type: UPLOAD_FILE_SUCCESS });
      } else {
        dispatch({ type: UPLOAD_FILE_ERROR, payload: data.message });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const setInitialState = () => {
  return async (dispatch) => {
    dispatch({ type: RESET_CDR_STATES });
  };
};

export const getCdrCalls = () => {
  return async (dispatch) => {
    dispatch({ type: GET_CDR_BEGIN });
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:8000/api/v1/getCdrCalls",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (data.success === true) {
        dispatch({ type: GET_CDR_SUCCESS, payload: data.data });
      } else {
        dispatch({ type: GET_CDR_ERROR, payload: data.message });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};
