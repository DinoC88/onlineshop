import React, { Component } from "react";
import { BrowserRouter as Route, Router, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import checkAuth from "../common/checkAuth";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import MenuItem from "@material-ui/core/MenuItem";

const styles = {
  navbar: {
    display: "flex",
    height: "70px",
    backgroundColor: "#333333",
    marginBottom: "10px",
    color: "white"
  },
  button: {
    backgroundColor: "#333333",
    color: "white",
    borderRadius: 20
  },
  logo: {
    color: "white",
    display: "inline-block",
    fontSize: "20px",
    margin: "0 40px 0 20px"
  }
};

class Navbar extends Component {
  onLogoutClick = e => {
    //remove token from localstorage
    localStorage.removeItem("jwtToken");
    //remove auth header for future request
    setAuthToken(false);
  };

  render() {
    const {
      location: { pathname }
    } = this.props;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li>
          <MenuItem
            component={Link}
            style={styles.button}
            onMouseEnter={e => (e.target.style.backgroundColor = "gray")}
            onMouseLeave={e => (e.target.style.backgroundColor = "#333333")}
            to="/cart"
            selected={"/cart" === pathname}
          >
            <AddShoppingCartIcon />
            Cart
          </MenuItem>
        </li>
        <li>
          <MenuItem
            style={styles.button}
            onMouseEnter={e => (e.target.style.backgroundColor = "gray")}
            onMouseLeave={e => (e.target.style.backgroundColor = "#333333")}
            component={Link}
            to="/users/current"
            selected={"/users/current" === pathname}
          >
            Account
          </MenuItem>
        </li>
        <li>
          <MenuItem
            style={styles.button}
            onMouseEnter={e => (e.target.style.backgroundColor = "gray")}
            onMouseLeave={e => (e.target.style.backgroundColor = "#333333")}
            component={Link}
            to="/login"
            onClick={this.onLogoutClick}
            className="nav-link"
          >
            Logout
          </MenuItem>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li>
          <MenuItem
            style={styles.button}
            onMouseEnter={e => (e.target.style.backgroundColor = "gray")}
            onMouseLeave={e => (e.target.style.backgroundColor = "#333333")}
            component={Link}
            to="/register"
            selected={"/register" === pathname}
          >
            Sign Up
          </MenuItem>
        </li>
        <li>
          <MenuItem
            style={styles.button}
            onMouseEnter={e => (e.target.style.backgroundColor = "gray")}
            onMouseLeave={e => (e.target.style.backgroundColor = "#333333")}
            component={Link}
            to="/login"
            selected={"/login" === pathname}
          >
            Login
          </MenuItem>
        </li>
      </ul>
    );

    return (
      <nav style={styles.navbar} className="navbar  navbar-expand-sm">
        <div className="container">
          <Link style={styles.logo} to="/">
            Mobile Shop App
          </Link>
          <div>{checkAuth() ? authLinks : guestLinks}</div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
