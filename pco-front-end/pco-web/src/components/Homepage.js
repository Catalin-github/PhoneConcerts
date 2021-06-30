import React, { Component } from "react";
import { connect } from "react-redux";
import { setLocales } from "../redux/Language/action";
import { I18nProvider } from "../i18nProvider";
import { Link } from "react-router-dom";
import translate from "../i18nProvider/translate";
import { resetValidation } from "../redux/Authentication/action";

class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <I18nProvider locale={this.props.locales}>
          <div className="poza"></div>
          <div>
            <h3>{translate("home-pageMessage")}</h3>
            <div>
              <Link to="/login" onClick={this.props.resetValidation}>
                Login
              </Link>{" "}
              <br />
              <Link to="/register" onClick={this.props.resetValidation}>
                Register
              </Link>{" "}
            </div>
          </div>
        </I18nProvider>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    locales: state.locale.lang,
    client: state.users.user,
    loaded: state.users.loaded,
    isAuth: state.users.isAuth,
    loading: state.users.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocale: (lang) => dispatch(setLocales(lang)),
    resetValidation: () => dispatch(resetValidation()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
