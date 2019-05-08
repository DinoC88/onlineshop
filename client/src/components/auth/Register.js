import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import classnames from "classnames";
import checkAuth from "../common/checkAuth";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { registerSubmit } from "./auth-helper";

const styles = {
  registerStyle: {
    position: "relative",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "65vh",
    marginTop: "200px",
    marginBottom: "-50px"
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
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-5 mx-auto">
              <h3 style={{ textAlign: "center" }}>Create new Account</h3>
              <form noValidate onSubmit={this.onRegisterSubmit}>
                <FormControl
                  style={{ marginTop: 25 }}
                  className={classnames("input-field col s12", {
                    "is-invalid": errors.name
                  })}
                  required
                >
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={this.state.name}
                    autoComplete="name"
                    onChange={this.onRegisterChange}
                  />
                  {errors.name && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.name}
                    </div>
                  )}
                </FormControl>
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
                    onChange={this.onRegisterChange}
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
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.password}
                    </div>
                  )}
                </FormControl>
                <FormControl
                  style={{ marginTop: 25 }}
                  className="input-field col s12"
                  required
                >
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
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.password2}
                    </div>
                  )}
                </FormControl>
                <div
                  className="row"
                  style={{ paddingTop: 25, paddingLeft: 25 }}
                >
                  <div className="form-group">
                    <Button type="submit" variant="contained" color="primary">
                      Sign up
                    </Button>
                  </div>
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <p className="grey-text text-darken-1">
                      Have an account? <Link to="/login">Log in</Link>
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
