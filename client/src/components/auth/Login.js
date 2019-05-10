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
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  headerStyle: {
    textAlign: "center"
  },
  warningStyle: {
    color: "red",
    fontSize: "12px"
  },
  buttonStyle: {
    paddingTop: 25,
    paddingLeft: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  formStyle: {
    marginTop: 25,
    width: 350
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
        <div>
          <h3 style={styles.headerStyle}>Sign in</h3>
          <form noValidate onSubmit={this.onLoginSubmit}>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  value={this.state.email}
                  autoComplete="email"
                  onChange={this.onLoginChange}
                />
                {errors.email && (
                  <div style={styles.warningStyle}>{errors.email}</div>
                )}
              </FormControl>
            </div>
            <div>
              <FormControl style={styles.formStyle} required>
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
                  <div style={styles.warningStyle}>{errors.password}</div>
                )}
              </FormControl>
            </div>
            <div style={styles.buttonStyle}>
              <Button type="submit" variant="contained" color="primary">
                Sign in
              </Button>
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
