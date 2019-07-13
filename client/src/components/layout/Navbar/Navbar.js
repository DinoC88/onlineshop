import React, { Component } from "react";
import { BrowserRouter as Route, Router, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import setAuthToken from "../../../utils/setAuthToken";
import checkAuth from "../../../utils/checkAuth";
import checkAdmin from "../../../utils/checkAdmin";
import { AccountCircle } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { AppBar, Menu, MenuItem, Hidden, Button } from "@material-ui/core";
import { styles } from "./styles";
import CustomizedBadges from "./CustomizedBadges";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  onLogoutClick = e => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("cartNum");
    setAuthToken(false);
  };

  onMenuClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const {
      location: { pathname }
    } = this.props;
    const mobileGuestLinks = (
      <div>
        <MenuItem
          style={styles.mobileButton}
          component={Link}
          to="/register"
          selected={"/register" === pathname}
        >
          Sign Up
        </MenuItem>
        <MenuItem
          style={styles.mobileButton}
          component={Link}
          to="/login"
          selected={"/login" === pathname}
        >
          Login
        </MenuItem>
      </div>
    );

    const mobileAuthLinks = (
      <div>
        {checkAdmin() ? (
          <MenuItem
            component={Link}
            style={styles.mobileButton}
            to="/addproduct"
            selected={"/addproduct" === pathname}
          >
            Add product
          </MenuItem>
        ) : null}
        {!checkAdmin() ? (
          <MenuItem
            component={Link}
            style={styles.mobileButton}
            to="/cart"
            selected={"/cart" === pathname}
          >
            <CustomizedBadges currentCartNum={this.props.currentCartNum} />
          </MenuItem>
        ) : null}
        {!checkAdmin() ? (
          <MenuItem
            style={styles.mobileButton}
            component={Link}
            to="/users/current"
            selected={"/users/current" === pathname}
          >
            <AccountCircle />
          </MenuItem>
        ) : null}
        {checkAdmin() ? (
          <MenuItem
            component={Link}
            style={styles.mobileButton}
            to="/orders"
            selected={"/orders" === pathname}
          >
            Orders
          </MenuItem>
        ) : (
          <MenuItem
            component={Link}
            style={styles.mobileButton}
            to="/orderhistory"
            selected={"/orderhistory" === pathname}
          >
            Orders
          </MenuItem>
        )}
        <MenuItem
          style={styles.mobileButton}
          component={Link}
          to="/login"
          onClick={this.onLogoutClick}
        >
          Logout
        </MenuItem>
      </div>
    );
    const authLinks = (
      <div style={{ display: "flex" }}>
        {" "}
        {checkAdmin() ? (
          <MenuItem
            component={Link}
            style={styles.navBarButton}
            to="/addproduct"
            selected={"/addproduct" === pathname}
          >
            Add product
          </MenuItem>
        ) : null}
        {!checkAdmin() ? (
          <MenuItem
            component={Link}
            style={styles.navBarButton}
            to="/cart"
            selected={"/cart" === pathname}
          >
            <CustomizedBadges currentCartNum={this.props.currentCartNum} />
          </MenuItem>
        ) : null}
        {!checkAdmin() ? (
          <MenuItem
            style={styles.navBarButton}
            component={Link}
            to="/users/current"
            selected={"/users/current" === pathname}
          >
            <AccountCircle />
          </MenuItem>
        ) : null}
        {!checkAdmin() ? (
          <MenuItem
            style={styles.navBarButton}
            component={Link}
            to="/orderhistory"
            selected={"/orderhistory" === pathname}
          >
            Orders
          </MenuItem>
        ) : (
          <MenuItem
            component={Link}
            style={styles.navBarButton}
            to="/orders"
            selected={"/orders" === pathname}
          >
            Orders
          </MenuItem>
        )}
        <MenuItem
          style={styles.navBarButton}
          component={Link}
          to="/login"
          onClick={this.onLogoutClick}
          className="nav-link"
        >
          Logout
        </MenuItem>
      </div>
    );
    const guestLinks = (
      <div style={{ display: "flex" }}>
        <MenuItem
          style={{ color: "#ffffff" }}
          component={Link}
          to="/register"
          selected={"/register" === pathname}
        >
          Sign Up
        </MenuItem>
        <MenuItem
          style={{ color: "#ffffff" }}
          component={Link}
          to="/login"
          selected={"/login" === pathname}
        >
          Login
        </MenuItem>
      </div>
    );
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AppBar style={styles.appBarStyle}>
          <div style={styles.appBarWidth}>
            <div style={styles.appBarLinks}>
              <Link style={styles.navBarLogo} to="/">
                Mobile Shop
              </Link>
              <Hidden xsDown>{checkAuth() ? authLinks : guestLinks}</Hidden>
              <Hidden smUp>
                <Button
                  onClick={this.onMenuClick}
                  style={{ cursor: "pointer", color: "#ffffff" }}
                >
                  <MenuIcon />
                </Button>
                <Menu
                  keepMounted
                  open={this.state.open}
                  getContentAnchorEl={null}
                  onClose={this.onMenuClick}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  {checkAuth() ? mobileAuthLinks : mobileGuestLinks}
                </Menu>
              </Hidden>
            </div>
          </div>
        </AppBar>
      </div>
    );
  }
}
export default withRouter(Navbar);
