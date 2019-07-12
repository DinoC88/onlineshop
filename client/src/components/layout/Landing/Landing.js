import React, { Component } from "react";
import checkAuth from "../../../utils/checkAuth";
import { Button, Hidden, Menu } from "@material-ui/core";
import { styles } from "./styles";
import homePicture from "../../../img/mobiles.png";
import mobileImage from "../../../img/mobileimage.png";
import mobileImage1 from "../../../img/mobileimage1.png";
import { Element, animateScroll as scroll, scroller } from "react-scroll";
import MenuIcon from "@material-ui/icons/Menu";
import CustomButton from "./CustomButton";
export default class Landing extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    if (checkAuth()) {
      this.props.history.push("/dashboard");
    }
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  scrollToAuthor = () => {
    scroller.scrollTo("author", {
      duration: 500,
      smooth: true,
      offset: 0
    });
  };

  scrollToAbout = () => {
    scroller.scrollTo("about", {
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
          Home
        </Button>
        <Button
          style={styles.navbarButtonStyle}
          variant="outlined"
          onClick={this.scrollToAbout}
        >
          About
        </Button>
        <Button
          style={styles.navbarButtonStyle}
          variant="outlined"
          onClick={this.scrollToAuthor}
        >
          Author
        </Button>
        <Button
          style={styles.button}
          variant="contained"
          color="primary"
          href="/register"
        >
          Sign Up
        </Button>
      </div>
    );
    return (
      <div style={styles.pageContainer}>
        <div style={styles.navbarStyle}>
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
            <h2 style={styles.landingHeaderStyle}>Buy phone today</h2>
            <p style={styles.textStyle}>
              We got the newest smartphones from Apple, Samsung, LG, Huawei and
              more.
            </p>
            <p style={styles.textStyle}>Free shipping in two business days.</p>
            <Button
              style={styles.button}
              color="primary"
              href="/dashboard"
              variant="contained"
            >
              See More
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
              <h1 style={styles.aboutHeader}>Mobile Shop</h1>
              <p style={styles.aboutText}>
                This mobile shop is an example of a web application highlighting
                some of the modern technologies. The web application is based on
                MERN stack - MongoDB, Express.js, and Node.js for back-end and
                React.js for front-end.
              </p>
              <p style={styles.aboutText}>
                Web application is contained of login system supported with
                Passportjs authentication, product list backed with various
                filters and pagination, cart and checkout screen with Paypal
                paying option supported with Braintree, user account review/edit
                screen aswell with orders history and admin options like adding
                new products, deleting products that are listed and dealing with
                made orders. The user interface is responsive and it is mainly
                dealt with inline CSS and Material UI - React UI framework.
              </p>
              <Button
                onClick={this.codeRedirect}
                style={styles.button}
                variant="contained"
                color="primary"
              >
                View Code
              </Button>
            </div>
          </div>
        </Element>
        <Element name="author" id="author" style={styles.authorPage}>
          <div style={styles.authorStyle}>
            <div style={styles.authorLeftStyle}>
              <h1 style={styles.authorHeader}>Author</h1>
              <p style={styles.authorText}>
                My name is Dino. I am a self-taught web designer/developer from
                Bosnia with a master degree in History Science.
              </p>
              <p style={styles.authorText}>
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
                learning Redux.
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
      </div>
    );
  }
}
