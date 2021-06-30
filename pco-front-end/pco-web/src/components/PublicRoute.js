

import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import {  verifyRefreshToken } from "../redux/Authentication/action";

const PublicRoute = ({
  isAuth,
  loaded,
  loading,
  client,
  verifyRefreshToken,
  component: Component,
  ...rest
}) => {
  if (!loaded) {
      verifyRefreshToken();    
  }
    return loading? <h1>Loading </h1> : 
      <Route
        {...rest}
        component={(props) =>
          !isAuth ? <Component {...props} /> : <Redirect to="/dashboard" />
        }
      />
  
  
};

const mapStatetoProps = (state) => ({
  isAuth: state.users.isAuth,
  client: state.users.user,
  loaded: state.users.loaded,
  loading: state.users.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    verifyRefreshToken: () => dispatch(verifyRefreshToken()),

  
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(PublicRoute);
