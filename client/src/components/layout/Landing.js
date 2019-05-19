import React, { Component } from "react";
import checkAuth from "../../utils/checkAuth";
import Button from "@material-ui/core/Button";
import Logo from "../../utils/Logo";
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
  button: {
    color: "black",
    width: 120,
    height: 50
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
          <Logo />
          <div style={styles.buttonStyle}>
            <Button style={styles.button} variant="contained" href="/register">
              Sign Up
            </Button>
            <Button style={styles.button} href="/login" variant="contained">
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
