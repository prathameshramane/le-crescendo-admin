import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  UNAUTHENTICATE,
} from "./adminActionTypes";

const initialState = {
  authenticated: false,
  error: {},
  loading: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        error: {},
      };

    case ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UNAUTHENTICATE:
      return { ...initialState };

    default:
      return { ...state };
  }
};

export default adminReducer;
