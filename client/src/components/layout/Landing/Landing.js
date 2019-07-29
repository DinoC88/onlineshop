import React, { Component } from "react";
import checkAuth from "../../../utils/checkAuth";
import { IconButton, Button, Hidden, Menu } from "@material-ui/core";
import { styles } from "./styles";
import homePicture from "../../../img/mobiles.png";
import mobileImage from "../../../img/mobileimage.png";
import mobileImage1 from "../../../img/mobileimage1.png";
import { Element, animateScroll as scroll, scroller } from "react-scroll";
import MenuIcon from "@material-ui/icons/Menu";
import CustomButton from "./CustomButton";
import { FormattedMessage } from "react-intl";
import { setLocale } from "../../../actions/locale";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Flag from "react-world-flags";
import GoogleMaps from "./GoogleMaps";
class Landing extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      googleMapInfo: false
    };
  }
  onClickMap = () => {
    this.setState({ googleMapInfo: !this.state.googleMapInfo });
  };
  componentDidMount() {
    if (checkAuth()) {
      this.props.history.push("/dashboard");
    }
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  scrollToLoc = loc => {
    scroller.scrollTo(loc, {
      duration: 500,
      smooth: true,
      offset: 0
    });
  };

  onMenuClick = () => {
    this.setState({ open: !this.state.open });
  };

  cvRedirect = () => {
    const url = "https://docdro.id/miVjofA";
    window.open(url, "_blank");
  };

  codeRedirect = () => {
    const url = "https://github.com/DinoC88/onlineshop";
    window.open(url, "_blank");
  };

  render() {
    let buttonsView = (
      <div>
        <Button
          style={styles.navbarButtonStyle}
          variant="outlined"
          onClick={this.scrollToTop}
        >
          <FormattedMessage id="home" defaultMessage="Home" />
        </Button>
        <Button
          style={styles.navbarButtonStyle}
          variant="outlined"
          onClick={() => this.scrollToLoc("about")}
        >
          <FormattedMessage id="about" defaultMessage="About" />
        </Button>
        <Button
          style={styles.navbarButtonStyle}
          variant="outlined"
          onClick={() => this.scrollToLoc("author")}
        >
          <FormattedMessage id="author" defaultMessage="Author" />
        </Button>
        <Button
          style={styles.navbarButtonStyle}
          variant="outlined"
          onClick={() => this.scrollToLoc("contact")}
        >
          <FormattedMessage id="contact" defaultMessage="Contact" />
        </Button>
        <Button
          style={styles.button}
          variant="contained"
          color="primary"
          href="/register"
        >
          <FormattedMessage id="signUp" defaultMessage="Sign up" />
        </Button>
      </div>
    );
    return (
      <div style={styles.pageContainer}>
        <div style={styles.navbarStyle}>
          <div>
            <IconButton onClick={() => this.props.setLocale("en")}>
              <Flag code="gbr" height="14" />
            </IconButton>
            <IconButton onClick={() => this.props.setLocale("de")}>
              <Flag code="de" height="14" />
            </IconButton>
          </div>
          <div style={styles.navbarButtonPosition}>
            <Hidden xsDown>{buttonsView}</Hidden>
            <Hidden smUp>
              <Button
                onClick={this.onMenuClick}
                style={{ cursor: "pointer", color: "#000000" }}
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
                {buttonsView}
              </Menu>
            </Hidden>
          </div>
        </div>
        <div style={styles.landingPage}>
          <div style={styles.leftLandingStyle}>
            <h2 style={styles.landingHeaderStyle}>
              <FormattedMessage
                id="landingHomeText1"
                defaultMessage="Buy phone!"
              />
            </h2>
            <p style={styles.textStyle}>
              <FormattedMessage
                id="landingHomeText2"
                defaultMessage="We got the newest smartphones from Apple, Samsung, LG, Huawei and more."
              />
            </p>
            <p style={styles.textStyle}>
              <FormattedMessage
                id="landingHomeText3"
                defaultMessage="Free shipping in two business days."
              />
            </p>
            <Button
              style={styles.button}
              color="primary"
              href="/dashboard"
              variant="contained"
            >
              <FormattedMessage id="seeMore" defaultMessage="See more" />
            </Button>
          </div>
          <div style={styles.rightLandingStyle}>
            <Hidden smDown>
              <img
                src={homePicture}
                style={styles.landingImgSize}
                alt="mobiles"
              />
            </Hidden>
          </div>
        </div>

        <Element name="about" id="about" style={styles.aboutStyle}>
          <div style={styles.aboutStyle}>
            <div style={styles.leftAboutStyle}>
              <Hidden smDown>
                <img
                  src={mobileImage}
                  style={{ width: 760, height: 300 }}
                  alt="mobiles"
                />
              </Hidden>
            </div>
            <div style={styles.rightAboutStyle}>
              <h1 style={styles.aboutHeader}>
                <FormattedMessage
                  id="mobileShop"
                  defaultMessage="Mobile shop"
                />
              </h1>
              <p style={styles.aboutText}>
                <FormattedMessage
                  id="aboutText1"
                  defaultMessage="This mobile shop is an example of a web application highlighting
                some of the modern technologies. The web application is based on
                MERN stack - MongoDB, Express.js, and Node.js for back-end and
                React.js  with Redux for front-end."
                />
              </p>
              <p style={styles.aboutText}>
                <FormattedMessage
                  id="aboutText2"
                  defaultMessage="Web application is contained of login system supported with
                  Passportjs authentication, product list backed with various
                  filters and pagination, cart and checkout screen with Paypal
                  paying option supported with Braintree, user account review/edit
                  screen aswell with orders history and admin options like adding
                  new products, deleting products that are listed and dealing with
                  made orders, internationalization for 
                  English and German, and GoogleMaps. The user interface is responsive and it is mainly
                  dealt with inline CSS and Material UI - React UI framework."
                />
              </p>
              <Button
                onClick={this.codeRedirect}
                style={styles.buttonView}
                variant="contained"
                color="primary"
              >
                <FormattedMessage id="viewCode" defaultMessage="View Code" />
              </Button>
            </div>
          </div>
        </Element>
        <Element name="author" id="author" style={styles.authorPage}>
          <div style={styles.authorStyle}>
            <div style={styles.authorLeftStyle}>
              <h1 style={styles.authorHeader}>
                <FormattedMessage id="author" defaultMessage="Author" />
              </h1>
              <p style={styles.authorText}>
                <FormattedMessage
                  id="authorText1"
                  defaultMessage=" My name is Dino. I am a self-taught web designer/developer from
                Bosnia with a master degree in History Science."
                />
              </p>
              <p style={styles.authorText}>
                <FormattedMessage
                  id="authorText2"
                  defaultMessage="
                How did I start to code? As a certain hobby, I had an interest
                in web development during my studies when I met the basics of
                HTML and CSS. However, with a more serious approach and
                systematic learning, I started in mid-2017. Back then, I started
                to explore more in details, mainly through online platforms like
                freeCodeCamp, Udacity, and Codeacademy as well as various video
                tutorials and documentation, with areas like jQuery, Responsive
                web design, CSS Flexbox, JavaScript and JS Algorithms, Data
                Structures, Object-Oriented and Functional Programming, JSON
                APIs, Ajax requests, ReactJS, NodeJS and ExpressJS, MongoDB, Git
                / Github, Braintree / Paypal integration, etc. On this web
                application, I started working in mid-April 2019. I'm currently
                learning Redux."
                />
              </p>
              <CustomButton variant="contained" cvRedirect={this.cvRedirect} />
            </div>
            <div style={styles.authorRightStyle}>
              <Hidden smDown>
                <img
                  src={mobileImage1}
                  style={{ width: 694, height: 358 }}
                  alt="mobiles"
                />
              </Hidden>
            </div>
          </div>
        </Element>
        <Element
          name="contact"
          id="contact"
          style={{
            minHeight: "100vh",
            maxHeight: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h1 style={{ fontFamily: "Roboto", color: "rgba(0,0,0,0.87)" }}>
            <FormattedMessage id="contact" defaultMessage="Contact" />
          </h1>
          <div style={{ display: "flex", flexDirection: "row", padding: 16 }}>
            <Flag code="bih" height="44" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 16px 0px 16px",
                fontFamily: "Roboto",
                color: "rgba(0,0,0,0.87)",
                fontWeight: "normal"
              }}
            >
              <h6>Tuzla, BiH</h6>
              <span>ZAVNOBIH-a, 11</span>
              <span>(+000) 00 - 000 - 000</span>
              <span>mobileshop@mobileshop.com</span>
            </div>
          </div>
          <div>
            <GoogleMaps
              onClickMap={this.onClickMap}
              googleMapInfo={this.state.googleMapInfo}
            />
          </div>
        </Element>
      </div>
    );
  }
}

Landing.propTypes = {
  setLocale: PropTypes.func.isRequired
};

export default connect(
  null,
  { setLocale }
)(Landing);
