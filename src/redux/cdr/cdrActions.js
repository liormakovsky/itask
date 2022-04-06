import axios from "axios";

import {
  UPLOAD_FILE_BEGIN,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  VALIDATION_ERROR,
  RESET_CDR_STATES,
} from "./cdrTypes";

export const cdrInitialState = {
  isLoading: false,
  fileUploaded: false,
  error: "",
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
