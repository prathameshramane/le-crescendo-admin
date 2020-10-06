import axios from "axios";

import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  UNAUTHENTICATE,
} from "./adminActionTypes";

export const adminLogin = (loginCredentials) => (dispatch) => {
  dispatch({ type: ADMIN_LOGIN_REQUEST });
  axios
    .post("/admin/login", loginCredentials)
    .then((res) => {
      const token = `Bearer ${res.data.token}`;
      dispatch(setHeaders(token));
    })
    .catch((err) => {
      console.log("Executing");
      console.log(err.response.data);
      dispatch({ type: ADMIN_LOGIN_FAILURE, payload: err.response.data });
    });
};

export const adminLogout = () => (dispatch) => {
  delete localStorage.AdminToken;
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: UNAUTHENTICATE });
};

export const setHeaders = (token) => (dispatch) => {
  localStorage.setItem("AdminToken", token);
  axios.defaults.headers.common["Authorization"] = token;
  dispatch({ type: ADMIN_LOGIN_SUCCESS });
};
