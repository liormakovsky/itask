import {
  UPLOAD_FILE_BEGIN,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  VALIDATION_ERROR,
  RESET_CDR_STATES,
} from "./cdrTypes";

import { cdrInitialState } from "./cdrActions";

const reducer = (state, action) => {
  switch (action.type) {
    case UPLOAD_FILE_BEGIN:
      return { ...state, isLoading: true };

    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        fileUploaded: true,
        isLoading: false,
      };

    case UPLOAD_FILE_ERROR:
      return {
        ...state,
        fileUploaded: false,
        isLoading: false,
        error: action.payload,
      };

    case VALIDATION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case RESET_CDR_STATES:
      return {
        ...state,
        isLoading: false,
        fileUploaded: false,
      };

    default:
      if (!state) {
        return cdrInitialState;
      }
      return state;
  }
};

export default reducer;
