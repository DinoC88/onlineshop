import React from "react";
import { Route, Redirect } from "react-router-dom";
import checkAuth from "./checkAuth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

export default PrivateRoute;
