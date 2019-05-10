import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  IconButton
} from "@material-ui/core";
import checkAuth from "../common/checkAuth";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { registerSubmit } from "./auth-helper";

const styles = {
  registerStyle: {
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

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      showPassword: false
    };
  }

  componentDidMount() {
    if (checkAuth()) {
      this.props.history.push("/dashboard");
    }
  }

  onRegisterChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onRegisterSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    registerSubmit(newUser)
      .then(res => this.props.history.push("/login"))
      .catch(err => this.setState({ errors: err.response.data }));
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  render() {
    const { errors } = this.state;

    return (
      <div style={styles.registerStyle}>
        <div>
          <h3 style={styles.headerStyle}>Create new Account</h3>
          <form noValidate onSubmit={this.onRegisterSubmit}>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  name="name"
                  value={this.state.name}
                  autoComplete="name"
                  onChange={this.onRegisterChange}
                />
                {errors.name && (
                  <div style={styles.warningStyle}>{errors.name}</div>
                )}
              </FormControl>
            </div>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  value={this.state.email}
                  autoComplete="email"
                  onChange={this.onRegisterChange}
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
                  type={this.state.showPassword ? "text" : "password"}
                  value={this.state.password}
                  autoComplete="password"
                  onChange={this.onRegisterChange}
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
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                <Input
                  id="password2"
                  name="password2"
                  type={this.state.showPassword ? "text" : "password"}
                  value={this.state.password2}
                  autoComplete="password2"
                  onChange={this.onRegisterChange}
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
                {errors.password2 && (
                  <div style={styles.warningStyle}>{errors.password2}</div>
                )}
              </FormControl>
            </div>
            <div style={styles.buttonStyle}>
              <Button type="submit" variant="contained" color="primary">
                Sign up
              </Button>
              <p>
                Have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
