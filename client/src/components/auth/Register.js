import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  IconButton,
  Grid,
  Hidden
} from "@material-ui/core";
import checkAuth from "../../utils/checkAuth";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { registerSubmit } from "../../utils/requestManager";
import { styles } from "./styles";
import bg from "../../img/image9.jpg";

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

  onRegisterSubmit = async e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    try {
      await registerSubmit(newUser);
      await this.props.history.push("/login");
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
                    <InputLabel htmlFor="password2">
                      Confirm Password
                    </InputLabel>
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
                  <p style={styles.fontStyle}>
                    Have an account? <Link to="/login">Log in</Link>
                  </p>
                </div>
              </form>
            </div>
          </Grid>
          <Hidden smDown>
            <Grid item lg={8}>
              <div
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "18% 40%",
                  height: "100vh",
                  width: "100%",
                  zIndex: -10
                }}
              />
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}
