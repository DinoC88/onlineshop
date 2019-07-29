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
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { styles } from "./styles";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { logginUser } from "../../actions/authAction";
import PropTypes from "prop-types";
import checkAuth from "../../utils/checkAuth";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      showPassword: false
    };
  }

  componentDidMount() {
    if (checkAuth()) {
      this.props.history.push("/dashboard");
    }
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
    await this.props.logginUser(user, this.props.history);
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
              <FormattedMessage id="signIn" defaultMessage="Sign in" />
            </h3>
            <form noValidate onSubmit={this.onLoginSubmit}>
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
                    onChange={this.onLoginChange}
                  />
                  {errors.email && (
                    <div style={styles.warningStyle}>{errors.email}</div>
                  )}
                </FormControl>
              </div>
              <div>
                <FormControl style={styles.formStyle}>
                  <InputLabel htmlFor="password">
                    <FormattedMessage id="password" defaultMessage="Password" />
                  </InputLabel>
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
                  <FormattedMessage id="signIn" defaultMessage="Sign in" />{" "}
                </Button>
                <span style={styles.fontStyle}>
                  <FormattedMessage
                    id="dontHaveAnAccount"
                    defaultMessage="Don't have an account?"
                  />{" "}
                  <Link to="/register">
                    <FormattedMessage id="register" defaultMessage="Register" />
                  </Link>
                </span>
              </div>
            </form>
          </Grid>
          <Hidden smDown>
            <Grid item lg={8}>
              <div style={styles.logginBackgroundStyle} />
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  logginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logginUser }
)(Login);
