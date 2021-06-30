import React, { Component } from "react";
import translate from "../i18nProvider/translate";
import { connect } from "react-redux";
import {
  logoutUser,
  fetchUsersEditProfile,
  editProfile,
} from "../redux/Authentication/action";
class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.client.data.email,
      firstName: this.props.client.data.firstName,
      lastName: this.props.client.data.lastName,
      phone: this.props.client.data.phone,
    };
  }



  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchUsersEditProfile(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.phone
    );  };

  render() {
    return !this.props.edit ? (
      <div>
        <div>
          <form>
            <fieldset>
              <legend>
                <h2>Profile</h2>
              </legend>
              <label>First name: {this.props.client.data.firstName}</label>
              <br></br>
              <label>Last name: {this.props.client.data.lastName}</label>
              <br></br>
              <label>Email:{this.props.client.data.email}</label>
              <br></br>
              <label>Phone number: {this.props.client.data.phone}</label>
              <br></br>
              <button onClick={this.props.editProfile}>Edit Profile</button>
            </fieldset>
          </form>
        </div>
      </div>
    ) : (
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>
              <h2>Edit Profile</h2>
            </legend>
            <div>
              <label htmlFor="email">{translate("e-mail")}</label>
              <input
                value={this.state.email}
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="firstName">
                {translate("first-name", "abc")}
              </label>
              <input
                value={this.state.firstName}
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">{translate("last-name")}</label>
              <input
                value={this.state.lastName}
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone">{translate("phone-number")}</label>
              <input
                value={this.state.phone}
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button type="submit">Save</button>
              <button onClick={this.props.editProfile}>Cancel</button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    client: state.users.user,
    edit: state.users.edit,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    fetchUsersEditProfile: (data) => dispatch(fetchUsersEditProfile(data)),
    editProfile: () => dispatch(editProfile()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
