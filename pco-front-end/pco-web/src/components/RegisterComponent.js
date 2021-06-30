import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchUsersRegister,
  resetValidation,
} from "../redux/Authentication/action";
import { I18nProvider } from "../i18nProvider";

import translate from "../i18nProvider/translate";
import { setLocales } from "../redux/Language/action";

const validEmailRegex = RegExp(
  /^(([^<>(),;:\s@]+(\.[^<>(),;:\s@"]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i
);
const validPhoneRegex = RegExp(/(1\s?)?(\d{3}|\(\d{3}\))[\s]?\d{3}[\s]?\d{4}/);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirm: "",
      firstName: "",
      lastName: "",
      phone: "",
      showPassword: false,
      submit: this.props.error,

      errors: {
        email: "",
        password: "",
        password_confirm: "",
        firstName: "",
        lastName: "",
        phone: "",
      },
    };
  }
  handleBlur = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    const { name, value } = e.target;
    let errors = this.state.errors;
    this.setState({ errors, [name]: value });
    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email isn't valid!";
        break;
      case "password": {
        errors.password =
          value.length < 6
            ? "Password must be at least 6 characters long!"
            : value !== this.state.password_confirm
            ? "Password dont match with Password Confirm!"
            : "";
        errors.password_confirm =
          value !== this.state.password_confirm
            ? "Password dont match with Password Confirm!"
            : "";
        break;
      }
      case "password_confirm": {
        errors.password_confirm =
          value !== this.state.password
            ? "Password dont match with Password Confirm!"
            : "";
        errors.password =
          this.state.password.length < 6
            ? "Password must be at least 6 characters long!"
            : value !== this.state.password
            ? "Password dont match with Password Confirm!"
            : "";
        break;
      }
      case "firstName": {
        errors.firstName =
          value.length < 1 ? "First Name must not be empty!" : "";
        break;
      }
      case "lastName": {
        errors.lastName =
          value.length < 1 ? "Last Name must not be empty!" : "";
        break;
      }
      case "phone": {
        errors.phone =
          validPhoneRegex.test(value) && value.length < 16
            ? ""
            : "Format phone is invalid";
        break;
      }

      default:
        break;
    }
  };

  keyPress = (e) => {
    if (e.key === "Enter") {
      this.handleBlur(e);
    }
  };
  
  handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm(this.state.errors)) {
      this.props.fetchUsersRegister({
        email: this.state.email,
         firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password,
      });
    } else {
      this.setState({
        submit: "Register validation failed, please try again!",
      });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <I18nProvider locale={this.props.locales}>
          <div className="poza"></div>
          <div className="mainPageDivs">
            <h3 className="pageTitle">{translate("register-")}</h3>
            <div className="error-message-validation">
              {this.props.error
                ? this.props.error
                : this.state.submit
                ? this.state.submit
                : ""}
            </div>
            <p className="reg-log-formLinks">
              <Link
                to="/login"
                className="appMainMessages"
                style={{ textDecoration: "none" }}
                onClick={this.props.resetValidation}
              >
                {translate("log-in")}
              </Link>
            </p>
       

            <div>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="Inputs"
                    onBlur={this.handleBlur}
                    required
                    onKeyPress={this.keyPress}
                    noValidate
                  />
                </div>
                {errors.email.length > 0 && (
                  <span className="validationError">{errors.email}</span>
                )}

                <div className="confirmPassDiv">
                  <input
                    type={this.state.showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    className="passwordInputs"
                    autoComplete="off"
                    onKeyPress={this.keyPress}
                    onBlur={this.handleBlur}
                    noValidate
                  />

                  <label className="container">
                    <input
                      className="container"
                      type="checkbox"
                      checked={this.state.showPassword}
                      onChange={() =>
                        this.setState({
                          showPassword: !this.state.showPassword,
                        })
                      }
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>

                <div className="confirmPassDiv">
                  <input
                    required
                    type={this.state.showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="password_confirm"
                    onChange={this.handleChange}
                    onKeyPress={this.keyPress}
                    className="passwordInputs"
                    autoComplete="off"
                    onBlur={this.handleBlur}
                    noValidate
                  />
                  <label className="container">
                    <input
                      className="container"
                      type="checkbox"
                      checked={this.state.showPassword}
                      onChange={() =>
                        this.setState({
                          showPassword: !this.state.showPassword,
                        })
                      }
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
                {errors.password.length > 0 ? (
                  <span className="validationError">{errors.password}</span>
                ) : errors.password.length > 0 ? (
                  <span className="validationError">{errors.password}</span>
                ) : (
                  ""
                )}

                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={this.handleChange}
                    className="Inputs"
                    noValidate
                    onBlur={this.handleBlur}
                    onKeyPress={this.keyPress}
                    required
                  />
                </div>
                {errors.firstName.length > 0 && (
                  <span className="validationError">{errors.firstName}</span>
                )}
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onBlur={this.handleBlur}
                    onKeyPress={this.keyPress}
                    onChange={this.handleChange}
                    className="Inputs"
                    noValidate
                    required
                  />
                </div>
                {errors.lastName.length > 0 && (
                  <span className="validationError">{errors.lastName}</span>
                )}

                <div>
                  <input
                    type="text"
                    onBlur={this.handleBlur}
                    name="phone"
                    placeholder="Phone Number"
                    onKeyPress={this.keyPress}
                    onChange={this.handleChange}
                    className="Inputs"
                    noValidate
                    required
                  />
                </div>
                {errors.phone.length > 0 && (
                  <span className="validationError">{errors.phone}</span>
                )}
                <div>
                  <input
                    type="checkbox"
                    name="newsletterConfirm"
                    className="newsletterCheckboxReg"
                  />{" "}
                  <label
                    htmlFor="newsletterConfirm"
                    className="checkboxMessages"
                  >
                    I would like to receive your newsletter and other
                    promotional information.
                  </label>
                </div>
                <button className="btn formButtons" type="submit">
                  {translate("register-")}
                </button>
              </form>
            </div>
          </div>
        </I18nProvider>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    registerSucces: state.users.feched,
    locales: state.locale.lang,
    error: state.users.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocale: (lang) => dispatch(setLocales(lang)),
    resetValidation: () => dispatch(resetValidation()),
    fetchUsersRegister: (data) => dispatch(fetchUsersRegister(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
