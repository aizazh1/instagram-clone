import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { DASHBOARD } from "../constants/routes";

const IsUserLoggedIn = ({ user, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (!user) {
          return children;
        } else {
          return <Redirect to={{ pathname: DASHBOARD }} />;
        }
      }}
    />
  );
};

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};

export default IsUserLoggedIn;
