import React, { Component } from "react";
import * as numeral from "numeral";
import { Button, Snackbar, Hidden, Tooltip, Card } from "@material-ui/core";
import { Search, AddShoppingCart } from "@material-ui/icons";
import checkAuth from "../../../utils/checkAuth";
import decode from "jwt-decode";
import setAuthToken from "../../../utils/setAuthToken";
import { styles } from "./styles";
import { connect } from "react-redux";
import { fetchCart, addCart } from "../../../actions/cartActions";
import { FormattedMessage } from "react-intl";

class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
      productid: null,
      userid: null,
      quantity: 1,
      isLoading: false,
      snackbarOpen: false,
      cartData: []
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    let decoded = token ? decode(token) : "";
    this.setState({
      userid: decoded.id
    });
  }

  onHover = () => {
    this.setState({
      hover: !this.state.hover
    });
  };

  addToCart = async productid => {
    let postData = {
      userid: this.state.userid,
      quantity: this.state.quantity,
      productid: productid
    };
    await this.props.addCart(postData);
    this.setState({ snackbarOpen: true });
  };
  render() {
    const { product } = this.props;
    return (
      <div style={{ marginRight: 5 }}>
        <Card
          onMouseEnter={this.onHover}
          onMouseLeave={this.onHover}
          style={
            this.state.hover
              ? styles.productDetailsContainerHover
              : styles.productDetailsContainer
          }
        >
          <img
            style={styles.productImage}
            src={product.image}
            alt={product.name}
          />
          <div style={styles.contentLeft}>
            <h5 style={styles.nameStyle}>{product.name}</h5>
            <h2 style={styles.priceStyle}>
              {numeral(product.price).format("$0,0.00")}
            </h2>
            <Hidden xsDown>
              <div style={styles.textOverflow}>
                <b style={styles.phoneDetails}>
                  <FormattedMessage
                    id="displaySize"
                    defaultMessage="Display Size"
                  />
                  :{" "}
                </b>
                <span>{product.displaySize}</span>
              </div>
              <div style={styles.textOverflow}>
                <b style={styles.phoneDetails}>
                  {" "}
                  <FormattedMessage
                    id="displayResolution"
                    defaultMessage="Display Resolution"
                  />
                  :{" "}
                </b>
                <span>{product.displayResolution} pixel</span>
              </div>
              <div style={styles.textOverflow}>
                <b style={styles.phoneDetails}>CPU: </b>
                <span>{product.cpu}</span>
              </div>
              <div style={styles.textOverflow}>
                <b style={styles.phoneDetails}>
                  <FormattedMessage
                    id="internalMemory"
                    defaultMessage="Internal Memory"
                  />
                  :{" "}
                </b>
                <span>{product.memory}</span>
              </div>
              <div style={styles.textOverflow}>
                <b style={styles.phoneDetails}>RAM: </b>
                <span>{product.ram}</span>
              </div>
              <div style={styles.textOverflow}>
                <b style={styles.phoneDetails}>
                  <FormattedMessage id="camera" defaultMessage="Camera" />:{" "}
                </b>
                <span>{product.camera}</span>
              </div>
            </Hidden>
          </div>
          <Snackbar
            open={this.state.snackbarOpen}
            message={
              <FormattedMessage
                id="addToCartSnack"
                defaultMessage="Item added to your cart."
              />
            }
            autoHideDuration={3000}
            onClose={() => this.setState({ snackbarOpen: false })}
          />
          <div style={styles.contentRightPosition}>
            <div style={styles.buttonPosition}>
              <Tooltip
                disableFocusListener
                title={
                  <FormattedMessage
                    id="viewProduct"
                    defaultMessage="View Product"
                  />
                }
              >
                <Button
                  style={{ color: "white" }}
                  color="primary"
                  variant="contained"
                  href={`/product/${product._id}`}
                >
                  <Search />
                </Button>
              </Tooltip>
              <Tooltip
                disableFocusListener
                title={
                  <FormattedMessage
                    id="addToCart"
                    defaultMessage="Add to cart"
                  />
                }
              >
                <div>
                  <Button
                    disabled={checkAuth() ? false : true}
                    style={{ marginLeft: 10 }}
                    color="primary"
                    variant="contained"
                    onClick={() => this.addToCart(product._id)}
                  >
                    <AddShoppingCart />
                  </Button>
                </div>
              </Tooltip>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchCart, addCart }
)(ProductCard);
