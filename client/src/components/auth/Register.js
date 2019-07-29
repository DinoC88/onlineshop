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
import { registerUser } from "../../actions/authAction";
import { styles } from "./styles";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
    await this.props.registerUser(newUser, this.props.history);
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  render() {
    const { errors } = this.props;

    return (
      <div style={styles.pageContainer}>
        <Grid container>
          <Grid style={styles.inputStyle} item xs={12} lg={4}>
            <h3 style={styles.headerStyle}>
              <FormattedMessage
                id="createNewAcc"
                defaultMessage="Create new account"
              />
            </h3>
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
                  <InputLabel htmlFor="email">
                    <FormattedMessage
                      id="emailAddress"
                      defaultMessage="Email Address"
                    />
                  </InputLabel>
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
                  <InputLabel htmlFor="password">
                    <FormattedMessage id="password" defaultMessage="Password" />
                  </InputLabel>
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
                    <FormattedMessage
                      id="confirmPassword"
                      defaultMessage="Confirm Password"
                    />
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
                  <FormattedMessage id="signUp" defaultMessage="Sign up" />
                </Button>
                <span style={styles.fontStyle}>
                  <FormattedMessage
                    id="haveAnAcc"
                    defaultMessage="Have an account?"
                  />{" "}
                  <Link to="/login">
                    <FormattedMessage id="login" defaultMessage="Login" />
                  </Link>
                </span>
              </div>
            </form>
          </Grid>
          <Hidden smDown>
            <Grid item lg={8}>
              <div style={styles.registerBackgroundStyle} />
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
