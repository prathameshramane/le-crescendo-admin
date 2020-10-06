import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import AdminIndicator from "./Admin/AdminIndicator";
import AuthRoute from "./utils/AuthRoute";

import { adminLogout, setHeaders } from "./redux";
import store from './redux/store'

const token = localStorage.AdminToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    adminLogout()
  } else {
    store.dispatch(setHeaders(token))
  }
}

function Admin() {
  return (
    <Router>
      <AdminIndicator />
      <div className="mainContent">
        <Switch>
          <AuthRoute path="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default Admin;
