import React, { Component } from "react";
import checkAuth from "../common/checkAuth";
import Button from "@material-ui/core/Button";
const styles = {
  landingStyle: {
    height: "90vh",
    textAlign: "center",
    justifyContent: "center"
  },
  header: {
    marginTop: 50,
    fontSize: "60px"
  },
  registerButton: {
    color: "white",
    width: 120,
    height: 50,
    marginTop: 50
  },
  loginButton: {
    width: 120,
    height: 50,
    marginLeft: 15,
    marginTop: 50
  }
};

export default class Landing extends Component {
  componentDidMount() {
    if (checkAuth()) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div style={styles.landingStyle}>
        <h3 style={styles.header}>Mobile shop App</h3>
        <div>
          <Button
            style={styles.registerButton}
            variant="contained"
            color="primary"
            href="/register"
          >
            Sign Up
          </Button>
          <Button
            style={styles.loginButton}
            href="/login"
            variant="contained"
            color="white"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}
