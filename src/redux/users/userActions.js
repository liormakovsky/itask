import axios from "axios";

import {
  SIGNUP_USER_BEGIN,
  SIGNUP_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  LOGOUT_USER,
  VALIDATION_ERROR,
} from "./userTypes";

const user = localStorage.getItem("user");

export const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  error: "",
};

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

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

const addUserToLocalStorage = ({ currentUser }) => {
  localStorage.setItem("user", JSON.stringify(currentUser));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const signupUser = (user) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER_BEGIN });
    try {
      axios.get("/sanctum/csrf-cookie").then(async (response) => {
        const { name, email, password } = user;
        const { data } = await axios.post("api/v1/auth/register", {
          name,
          email,
          password,
        });
        const currentUser = data.data;
        dispatch({
          type: SIGNUP_USER_SUCCESS,
          payload: { currentUser },
        });
        addUserToLocalStorage({ currentUser });
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const loginUser = (user) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    const { email, password } = user;
    try {
      axios.get("/sanctum/csrf-cookie").then(async (response) => {
        const { data } = await axios.post(`/api/v1/auth/login`, {
          email,
          password,
        });
        const currentUser = data.data;
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: { currentUser },
        });
        addUserToLocalStorage({ currentUser });
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const updateUser = (user, dispatch) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      axios.get("/sanctum/csrf-cookie").then(async (response) => {
        const { name, email, location } = user;
        const { data } = await axios.post("api/v1/auth/updateUser", {
          name,
          email,
          location,
        });
        const currentUser = data.data;
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: { currentUser },
        });
        addUserToLocalStorage({ currentUser });
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const logoutUser = (dispatch) => {
  return (dispatch) => {
    axios
      .post("api/v1/auth/logout")
      .then(function (response) {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLocalStorage();
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  };
};
