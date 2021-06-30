import React, { Component } from "react";
import { I18nProvider } from "../i18nProvider";
import translate from "../i18nProvider/translate";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchUsersLogin,
  resetValidation,
  fetchLoginGoogle,
  fetchLoginFacebook,
} from "../redux/Authentication/action";
import { setLocales } from "../redux/Language/action";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

const validEmailRegex = RegExp(
  /^(([^<>(),;:\s@]+(\.[^<>(),;:\s@"]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      submit: this.props.error,
      errors: {
        email: "",
        password: "",
        login: "",
      },
    };
  }

  handleBlur = (e) => {
  
  };


  loginWithFacebook = () => {
    console.log("gooogle")
     this.props.fetchLoginFacebook();
  };
  loginWithGoogle = (res) => {
    console.log("gooogle333333333333333333333333")
    console.log(res)
    console.log(res.email)

//  this.props.fetchLoginGoogle();
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm(this.state.errors)) {
      this.props.fetchUsersLogin(
          this.state.email ,
          this.state.password
      );
    } else {
      this.setState({
        submit: "Login validation failed, please try again!",
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
            <h3 className="pageTitle">{translate("log-in")} </h3>
            <div className="error-message-validation">
              {this.props.error
                ? this.props.error
                : this.state.submit
                ? this.state.submit
                : ""}
            </div>
            <p>
            
              <Link
                to="/register"
                className="appMainMessages"
                style={{ textDecoration: "none" }}
                onClick={this.props.resetValidation}
              >
                {translate("register-")}
              </Link>
            </p>
          
            <div className="formDiv">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onKeyPress={this.keyPress}
                    onBlur={this.handleBlur}
                    className="Inputs"
                     
                     
                  />
                </div>
                {errors.email.length > 0 && (
                  <span className="validationError">{errors.email}</span>
                )}
                <div className="confirmPassDiv">
                  <input
                    type={this.state.showPassword ? "text" : "password"}
                    placeholder="Password"
                    onBlur={this.handleBlur}
                    autoComplete="off"
                    name="password"
                    className="passwordInputs"
                    onKeyPress={this.keyPress}
                    noValidate
                    required
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

                {errors.password.length > 0 && (
                  <span className="validationError">{errors.password}</span>
                )}
                <div className="routesLinks">
                
                </div>
                <br />
                <button className="btn formButtons" type="submit">
                  {translate("log-in")}
                </button>
              </form>
            </div>

            <div className="routesLinks">
              <Link
                to="/ChangePassword"
                className="reg-log-formLinks"
                style={{ textDecoration: "none" }}
              >
              </Link>
            </div>
            <button onClick={this.loginWithGoogle} class="loginBtn loginBtn--google">
      Login with Google
      </button>
             <div>
              <GoogleLogin
                clientId={"758308718543-ul5iedaagp769un45v1ruo47jcen0fvc.apps.googleusercontent.com"}
                buttonText={"Login"}
                scope={false}
                onSuccess={this.loginWithGoogle}
                 cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className="facebook-login-button">``
              <FacebookLogin
                appId={"135140541763001"}
                fields="name"
                callback={this.loginWithFacebook}
                icon="fa-facebook"
              />
            </div>
            <Link to="http:localhost:8443/oauth2/authorization/google">GOOOOOOGLE</Link>

          </div>
        </I18nProvider>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    locales: state.locale.lang,
    error: state.users.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersLogin: (data) => dispatch(fetchUsersLogin(data)),
    setLocale: (lang) => dispatch(setLocales(lang)),
    resetValidation: () => dispatch(resetValidation()),
    fetchLoginGoogle: (token) => dispatch(fetchLoginGoogle(token)),
    fetchLoginFacebook: (token) => dispatch(fetchLoginFacebook(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
