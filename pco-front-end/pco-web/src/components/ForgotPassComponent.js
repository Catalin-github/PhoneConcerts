import React, { Component } from "react";
import { connect } from "react-redux";
import { setLocales } from "../redux/Language/action";
import { I18nProvider } from "../i18nProvider";
import { Link } from "react-router-dom";
import translate from "../i18nProvider/translate";
import {
  changePassword,
  resetValidation,
} from "../redux/Authentication/action";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      last_password: "",
      new_password: "",
      confirm_new_password: "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.changePassword(
      this.state.email,
      this.state.last_password,
      this.state.new_password,
      this.state.confirm_new_password
    );
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <I18nProvider locale={this.props.locales}>
          <div className="mainPageDivs">
            <h3 className="pageTitle">Change password:</h3>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input
                  value={this.state.email}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={this.handleChange}
                  className="Inputs"
                />
              </div>

              <label className="formLabel">
                Please provide your email and you will receive a password reset
                link in seconds.
              </label>
              <div>
                <button type="submit" className="btn formButtons">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <Link to="/">Back to the Homepage</Link>
          <br />
          <Link to="/login" onClick={this.props.resetValidation}>
            {translate("log-in")}
          </Link>
        </I18nProvider>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    locales: state.locale.lang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocale: (lang) => dispatch(setLocales(lang)),
    changePassword: (data) => dispatch(changePassword(data)),
    resetValidation: () => dispatch(resetValidation()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
