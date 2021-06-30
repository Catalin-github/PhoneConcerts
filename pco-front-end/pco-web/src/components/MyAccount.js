import React, { Component } from "react";
import { Link } from "react-router-dom";
import { I18nProvider } from "../i18nProvider";
import { setLocales } from "../redux/Language/action";
import UserProfile from "./UserProfile";
import { connect } from "react-redux";
import {
  logoutUser,
  editProfile,
  loginRequest,
} from "../redux/Authentication/action";


class MyAccount extends Component {


  render() {
    if(this.props.client.data){
    return (
      <div>
        <I18nProvider locale={this.props.locales}>
          <div>
            <UserProfile />
          </div>

          <h1>
            <Link to="/dashboard">
              <button onClick={this.props.loginRequest}>
                You are in app so go back
              </button>
            </Link>
          </h1>
        </I18nProvider>
      </div>
    );
    }else{
    
    }
  }
}
const mapStateToProps = (state) => {
  return {
    locales: state.locale.lang,
    client: state.users.user,
    edit: state.users.edit,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    setLocale: (lang) => dispatch(setLocales(lang)),
    editProfile: () => dispatch(editProfile()),
    loginRequest: () => dispatch(loginRequest()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
