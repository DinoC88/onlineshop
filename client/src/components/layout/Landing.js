import React, { Component } from "react";
import checkAuth from "../common/checkAuth";
import Button from "@material-ui/core/Button";
const styles = {
  landingStyle: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  headerStyle: {
    textAlign: "center",
    fontSize: "50px"
  },
  buttonStyle: {
    paddingTop: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  registerButton: {
    color: "white",
    width: 120,
    height: 50
  },
  loginButton: {
    width: 120,
    height: 50,
    color: "#333333"
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
        <div>
          <h3 style={styles.headerStyle}>Mobile shop App</h3>
          <div style={styles.buttonStyle}>
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
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
