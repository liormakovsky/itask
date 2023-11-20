import axios from "axios";

import {
  SIGNUP_USER_BEGIN,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_USER,
} from "./userTypes";

const user = localStorage.getItem("user");

export const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  error: "",
};

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

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
        const { name, email, role, password } = user;
        const { data } = await axios.post("api/v1/auth/register", {
          name,
          email,
          role,
          password,
        });
        if (data !== undefined) {
          const currentUser = data.data;
          dispatch({
            type: SIGNUP_USER_SUCCESS,
            payload: { currentUser },
          });
          addUserToLocalStorage({ currentUser });
        } else {
          dispatch({
            type: SIGNUP_USER_ERROR,
          });
        }
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
        if (data !== undefined) {
          const currentUser = data.data;
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: { currentUser },
          });
          addUserToLocalStorage({ currentUser });
        } else {
          dispatch({
            type: LOGIN_USER_ERROR,
          });
        }
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
        const { name, email, role } = user;
        const { data } = await axios.post("api/v1/auth/updateUser", {
          name,
          email,
          role,
        });
        if (data !== undefined) {
          const { user: updatedUser } = data;
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: { currentUser: updatedUser },
          });
          addUserToLocalStorage({ currentUser: updatedUser });
        } else {
          dispatch({
            type: UPDATE_USER_ERROR,
          });
        }
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const logoutUser = (dispatch) => {
  return (dispatch) => {

    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
};
