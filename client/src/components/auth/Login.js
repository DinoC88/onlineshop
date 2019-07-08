import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  Grid,
  Hidden
} from "@material-ui/core";
import setAuthToken from "../../utils/setAuthToken";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { loginSubmit } from "../../utils/requestManager";
import { styles } from "./styles";
import bg1 from "../../img/image6.jpg";

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

  onLoginSubmit = async e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    try {
      let login = await loginSubmit(user);
      this.setState({ logged: true });
      localStorage.setItem("isAdmin", login.data.userInfo.isAdmin);
      // Take token from data
      const { token } = login.data;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      //Redirect to dashboard
      this.props.history.push("/dashboard");
    } catch (err) {
      this.setState({ errors: err.response.data });
    }
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  render() {
    const { errors } = this.state;
    return (
      <div style={styles.pageContainer}>
        <Grid container>
          <Grid item xs={12} lg={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "50%"
              }}
            >
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
                  <p style={styles.fontStyle}>
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                </div>
              </form>
            </div>
          </Grid>
          <Hidden smDown>
            <Grid item lg={8}>
              <div
                style={{
                  backgroundImage: `url(${bg1})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "40% 40%",
                  height: "100vh",
                  width: "100%"
                }}
              />
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}
