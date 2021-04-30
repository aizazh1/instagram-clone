import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";

const ProtectedRoute = ({ user, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (user) {
          return cloneElement(children, { user });
        } else {
          return <Redirect to={{ pathname: ROUTES.LOGIN }} />;
        }
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};

export default ProtectedRoute;
