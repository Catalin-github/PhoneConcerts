import React, { Component } from "react";
import { connect } from "react-redux";
import { setLocales } from "../redux/Language/action";
import { I18nProvider } from "../i18nProvider";
// import { Link } from "react-router-dom";
//import translate from "../i18nProvider/translate";
import {
  logoutUser,
  loginRequest,
  AccountRequest,
} from "../redux/Authentication/action";

import ConcertsList from "./ConcertsList";

class Dashboard extends Component {
  render() {
    return (
      <I18nProvider locale={this.props.locales}>
        <div className="poza"></div>
        <div className="mainPageDivs">
          <div className="dashCMainDiv">
            <div className="dashCTitleDiv">
              <p className="appMainMessages">
                Hi, {this.props.client.data.firstName}
              </p>
              <h3 className="pageTitle pageTitleDashC">Concerts</h3>
              <button
                onClick={this.props.logoutUser}
                className="logoutButtonDashC"
              >
                {" "}
                Logout
              </button>
            </div>
            <ConcertsList />
          </div>
        </div>
      </I18nProvider>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    locales: state.locale.lang,
    client: state.users.user,
    concerts: state.users.items,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLocale: (lang) => dispatch(setLocales(lang)),
    logoutUser: () => dispatch(logoutUser()),
    loginRequest: () => dispatch(loginRequest()),

    AccountRequest: () => dispatch(AccountRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
