import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import setAuthToken from "../../utils/setAuthToken";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { loginSubmit } from "./auth-helper";

const styles = {
  loginStyle: {
    height: "90vh",
    display: "flex"
  }
};

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      isAuth: false,
      showPassword: false
    };
  }

  onLoginChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLoginSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    loginSubmit(user)
      .then(res => {
        this.setState({ logged: true });
        // Take token from data
        const { token } = res.data;
        // Set token to localStorage
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        //Redirect to dashboard
        this.props.history.push("/dashboard");
      })
      .catch(err => this.setState({ errors: err.response.data }));
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  render() {
    const { errors } = this.state;
    return (
      <div style={styles.loginStyle}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-5 mx-auto" style={{ paddingTop: 10 }}>
              <h3 style={{ textAlign: "center" }}>Sign in</h3>
              <form noValidate onSubmit={this.onLoginSubmit}>
                <FormControl
                  style={{ marginTop: 25 }}
                  className="input-field col s12"
                  required
                >
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    value={this.state.email}
                    autoComplete="email"
                    onChange={this.onLoginChange}
                  />
                  {errors.email && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.email}
                    </div>
                  )}
                </FormControl>
                <FormControl
                  style={{ marginTop: 25 }}
                  className="input-field col s12"
                  required
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    name="password"
                    value={this.state.password}
                    autoComplete="password"
                    type={this.state.showPassword ? "text" : "password"}
                    onChange={this.onLoginChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errors.password && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.password}
                    </div>
                  )}
                </FormControl>
                <div
                  className="row"
                  style={{ paddingTop: 25, paddingLeft: 25 }}
                >
                  <div className="form-group">
                    <Button type="submit" variant="contained" color="primary">
                      Sign in
                    </Button>
                  </div>
                  <div className="col s12" style={{ paddingLeft: 11 }}>
                    <p className="grey-text text-darken-1">
                      Don't have an account?{" "}
                      <Link to="/register">Register</Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
