import React, { Component } from "react";
import { Link } from "react-router-dom";
import checkAuth from "../common/checkAuth";

const styles = {
  landingStyle: {
    position: "relative",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "65vh",
    marginTop: "200px",
    marginBottom: "-50px"
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
        <div className="col-md-12 text-center">
          <h3 className="display-3 mb-4">Mobile shop App</h3>
          <div className="mt-6">
            <Link to="/register" className="btn btn-lg btn-info mr-2">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-lg btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
