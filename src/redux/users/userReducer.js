import {
  SIGNUP_USER_BEGIN,
  SIGNUP_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  VALIDATION_ERROR,
  LOGOUT_USER,
} from "./userTypes";

import { initialState } from "./userActions";

const reducer = (state, action) => {
  switch (action.type) {
    case SIGNUP_USER_BEGIN:
    case LOGIN_USER_BEGIN:
    case UPDATE_USER_BEGIN:
      return { ...state, isLoading: true };

    case SIGNUP_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.currentUser,
        isLoading: false,
        showAlert: false,
        error: "",
      };

    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
      };

    case VALIDATION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return initialState;
  }
};

export default reducer;
