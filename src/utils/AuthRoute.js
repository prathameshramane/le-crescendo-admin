import React from "react";
import { Route } from "react-router-dom";

import AdminLogin from "../Admin/AdminLogin";
import AdminMain from "../Admin/AdminMain";

//Redux
import { connect } from "react-redux";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === false ? <AdminLogin /> : <AdminMain />
    }
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.admin.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
