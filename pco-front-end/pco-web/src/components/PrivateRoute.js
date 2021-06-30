import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import {
  AccountRequest,
  loginRequest,
  verifyRefreshToken,
} from "../redux/Authentication/action";

const PrivateRoute = ({
  loginRequest,
  verifyRefreshToken,
  isAuth,
  loaded,
  AccountRequest,
  client,
  loading,
  component: Component,
  ...rest
}) => {
  if (window.location.pathname === "/account" && client.data && !loaded) {
    AccountRequest(client.data.email);
  } else if (!loaded) {
    verifyRefreshToken();
  }

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <Route
      {...rest}
      component={(props) =>
        isAuth ? <Component {...props} /> : <Redirect exact to="/login" />
      }
    />
  );
};

const mapStatetoProps = (state) => ({
  isAuth: state.users.isAuth,
  loaded: state.users.loaded,
  client: state.users.user,
  loading: state.users.loading,
});
const mapDispatchToProps = (dispatch) => {
  return {
    verifyRefreshToken: () => dispatch(verifyRefreshToken()),
    loginRequest: () => dispatch(loginRequest()),
    AccountRequest: (data) => dispatch(AccountRequest(data)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(PrivateRoute);
