import React from "react";
import * as api from "../api/api";
import { v4 as uuidv4 } from "uuid";

import MyButton from "./formelements/button";
import MyInput from "./formelements/input";

class SignUpPage extends React.Component {
  state = {
    campaignUuid: "",
    data: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    errors: {},
    submitted: false,
  };

  componentWillMount() {
    this.setState({
      // campaignUuid: uuidv4(),
      campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
    });
  }

  handleChange = (event) => {
    const { data } = this.state;
    data[event.target.name] = event.target.value;
    this.setState({ data });
  };

  onSubmit = async () => {
    const {
      campaignUuid,
      data: { firstname, lastname, email, password },
    } = this.state;
    const reg = /\S+@\S+\.\S+/;
    let err = {};

    let checkuser = {
      campaignUuid,
      data: { email },
    };

    if (!firstname) {
      err.firstname = "Enter your first name!";
    }
    if (!lastname) {
      err.lastname = "Enter your last name!";
    }
    if (!email) {
      err.email = "Enter your email address!";
    } else if (!reg.test(email)) {
      err.email = "Enter a valid email address!";
    }
    if (password.length < 8) {
      err.password = "Password must be at least 8 characters!";
    }
    this.setState({
      errors: err,
    });
    console.log(err, Object.getOwnPropertyNames(err).length);
    if (Object.getOwnPropertyNames(err).length === 0) {
      console.log(checkuser, "checkuser");
      await api.checkUser(checkuser).then((res) => {
        console.log(res.data.data.status, "res");
        if (res != "sorry")
          if (res.data.data.status == "EXISTS") {
            err.email = "Already exists. Please use any other email!";
            this.setState({ errors: err });
            console.log(this.state, "already exists", res);
          } else if (res.data.data.status == "OK") {
            checkuser.data.firstName = firstname;
            checkuser.data.lastName = lastname;
            checkuser.data.password = password;

            console.log(checkuser, "check");

            api.signup(checkuser).then((ress) => {
              if (ress != "sorry") alert("Thank you for applying!");
              console.log(ress);
            });

            this.setState({
              data: {
                firstname: "",
                lastname: "",
                email: "",
                password: "",
              },
              submitted: false,
              errors: {},
            });
            console.log(this.state);
          }
      });
    }
  };

  render() {
    const {
      submitted,
      errors,
      data: { firstname, lastname, email, password },
    } = this.state;
    return (
      <div className="main">
        <div className="container">
          {submitted ? (
            <span>Welcome onboard, {firstname}!</span>
          ) : (
            <>
              <h2>Sign Up</h2>
              <h6>All the fields are required</h6>
              <MyInput
                label="First Name"
                name="firstname"
                type="text"
                value={firstname}
                onChange={this.handleChange}
                placeholder="Enter firstname..."
                error={errors.firstname}
                required
                className="input"
              />
              <MyInput
                label="Last Name"
                name="lastname"
                type="text"
                value={lastname}
                onChange={this.handleChange}
                placeholder="Enter lastname..."
                error={errors.lastname}
                required
                className="input"
              />
              <MyInput
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={this.handleChange}
                placeholder="Enter email..."
                error={errors.email}
                required
                className="input"
              />

              <MyInput
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Enter password..."
                error={errors.password}
                className="input"
                required
              />

              <MyButton
                type="submit"
                label="Submit"
                className="button"
                handleClick={this.onSubmit}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default SignUpPage;
