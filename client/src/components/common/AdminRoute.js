import React from "react";
import { Route, Redirect } from "react-router-dom";
import checkAdmin from "./checkAdmin";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAdmin() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/dashboard" }} />
      )
    }
  />
);

export default AdminRoute;
