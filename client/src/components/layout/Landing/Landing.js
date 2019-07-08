import React, { Component } from "react";
import checkAuth from "../../../utils/checkAuth";
import Button from "@material-ui/core/Button";
import { styles } from "./styles";
export default class Landing extends Component {
  constructor() {
    super();
    this.state = {
      hoverLogin: false,
      hoverRegister: false
    };
  }
  componentDidMount() {
    if (checkAuth()) {
      this.props.history.push("/dashboard");
    }
  }
  onHoverLogin = () => {
    this.setState({
      hoverLogin: !this.state.hoverLogin
    });
  };
  onHoverRegister = () => {
    this.setState({
      hoverRegister: !this.state.hoverRegister
    });
  };
  render() {
    const { hoverRegister, hoverLogin } = this.state;
    return (
      <div style={styles.pageContainer}>
        <div style={styles.landingStyle}>
          <h2 style={styles.headerStyle}>Buy your smart phone</h2>
          <div style={styles.buttonStyle}>
            <Button
              style={hoverRegister ? styles.buttonHover : styles.button}
              onMouseEnter={this.onHoverRegister}
              onMouseLeave={this.onHoverRegister}
              variant="contained"
              color="primary"
              href="/register"
            >
              Sign Up
            </Button>
            <Button
              style={hoverLogin ? styles.buttonHover : styles.button}
              onMouseEnter={this.onHoverLogin}
              onMouseLeave={this.onHoverLogin}
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
