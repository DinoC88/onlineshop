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
import { connect } from "react-redux";
import { fetchCart } from "../../../actions/cartActions";
import PropTypes from "prop-types";
import { setLocale } from "../../../actions/locale";
import { FormattedMessage } from "react-intl";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      langMenu: false,
      showLang: "EN"
    };
  }
  componentDidMount() {
    this.props.fetchCart();
    if (localStorage.hubLang === "en") {
      this.setState({ showLang: "EN" });
    } else {
      this.setState({ showLang: "DE" });
    }
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
  onMenuLangClick = e => {
    this.setState({ langMenu: !this.state.langMenu });
  };
  onChangeLangClick = async (showLang, lang) => {
    await this.props.setLocale(lang);
    await this.setState({ showLang, langMenu: !this.state.langMenu });
  };

  render() {
    const {
      cart,
      location: { pathname }
    } = this.props;
    let cartNum = cart
      ? cart.reduce((acc, item) => (acc += item.quantity), 0)
      : 0;
    const mobileGuestLinks = (
      <div>
        <MenuItem
          style={styles.mobileButton}
          component={Link}
          to="/register"
          selected={"/register" === pathname}
        >
          <FormattedMessage id="signUp" defaultMessage="Sign up" />
        </MenuItem>
        <MenuItem
          style={styles.mobileButton}
          component={Link}
          to="/login"
          selected={"/login" === pathname}
        >
          <FormattedMessage id="login" defaultMessage="Login" />
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
            <FormattedMessage id="addProduct" defaultMessage="Add product" />
          </MenuItem>
        ) : null}
        {!checkAdmin() ? (
          <MenuItem
            component={Link}
            style={styles.mobileButton}
            to="/cart"
            selected={"/cart" === pathname}
          >
            <CustomizedBadges currentCartNum={cartNum} />
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
        <MenuItem
          component={Link}
          style={styles.mobileButton}
          to="/orderhistory"
          selected={"/orderhistory" === pathname}
        >
          <FormattedMessage id="orders" defaultMessage="Orders" />
        </MenuItem>
        <MenuItem
          style={styles.mobileButton}
          component={Link}
          to="/login"
          onClick={this.onLogoutClick}
        >
          <FormattedMessage id="logout" defaultMessage="Logout" />
        </MenuItem>
      </div>
    );
    const authLinks = (
      <div style={{ display: "flex" }}>
        {checkAdmin() ? (
          <MenuItem
            component={Link}
            style={styles.navBarButton}
            to="/addproduct"
            selected={"/addproduct" === pathname}
          >
            <FormattedMessage id="addProduct" defaultMessage="Add product" />
          </MenuItem>
        ) : null}
        {!checkAdmin() ? (
          <MenuItem
            component={Link}
            style={styles.navBarButton}
            to="/cart"
            selected={"/cart" === pathname}
          >
            <CustomizedBadges currentCartNum={cartNum} />
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
        <MenuItem
          style={styles.navBarButton}
          component={Link}
          to="/orderhistory"
          selected={"/orderhistory" === pathname}
        >
          <FormattedMessage id="orders" defaultMessage="Orders" />
        </MenuItem>

        <MenuItem
          style={styles.navBarButton}
          component={Link}
          to="/login"
          onClick={this.onLogoutClick}
          className="nav-link"
        >
          <FormattedMessage id="logout" defaultMessage="Logout" />
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
          <FormattedMessage id="signUp" defaultMessage="Sign up" />
        </MenuItem>
        <MenuItem
          style={{ color: "#ffffff" }}
          component={Link}
          to="/login"
          selected={"/login" === pathname}
        >
          <FormattedMessage id="login" defaultMessage="Login" />
        </MenuItem>
      </div>
    );
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AppBar style={styles.appBarStyle}>
          <div style={styles.appBarWidth}>
            <div style={styles.appBarLinks}>
              <Link style={styles.navBarLogo} to="/">
                <FormattedMessage
                  id="mobileShop"
                  defaultMessage="Mobile Shop"
                />
              </Link>
              <div style={{ display: "flex" }}>
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
                <Button
                  onClick={this.onMenuLangClick}
                  style={{ cursor: "pointer", color: "#ffffff" }}
                >
                  {this.state.showLang}
                </Button>
                <Menu
                  keepMounted
                  open={this.state.langMenu}
                  getContentAnchorEl={null}
                  onClose={this.onMenuLangClick}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Button
                      onClick={() => this.onChangeLangClick("EN", "en")}
                      href={checkAuth() ? "/dashboard" : "/login"}
                    >
                      EN-English
                    </Button>
                    <Button
                      onClick={() => this.onChangeLangClick("DE", "de")}
                      href={checkAuth() ? "/dashboard" : "/login"}
                    >
                      DE-Deutsch
                    </Button>
                  </div>
                </Menu>
              </div>
            </div>
          </div>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  setLocale: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart.cartItems
});

export default connect(
  mapStateToProps,
  { fetchCart, setLocale }
)(withRouter(Navbar));
