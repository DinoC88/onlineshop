import React, { Component } from "react";
import * as numeral from "numeral";
import { Button, Snackbar, Hidden, Tooltip, Card } from "@material-ui/core";
import { Search, AddShoppingCart } from "@material-ui/icons";
import checkAuth from "../../../utils/checkAuth";
import { addProductToCart } from "../../../utils/requestManager";
import decode from "jwt-decode";
import setAuthToken from "../../../utils/setAuthToken";
import { styles } from "./styles";
export default class Productitem extends Component {
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
    await addProductToCart(postData);
    await this.props.getCartNum();
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
            <h5 style={{ fontSize: 22 }}>{product.name}</h5>
            <h2 style={styles.priceStyle}>
              {numeral(product.price).format("$0,0.00")}
            </h2>
            <Hidden xsDown>
              <div>
                <b>Display size: </b>
                <span>{product.displaySize}</span>
              </div>
              <div>
                <b>Display resolution: </b>
                <span>{product.displayResolution} pixels</span>
              </div>
              <div style={styles.textOverflow}>
                <b>CPU: </b>
                <span>{product.cpu}</span>
              </div>
              <div>
                <b>Internal memory: </b>
                <span>{product.memory}</span>
              </div>
              <div>
                <b>RAM: </b>
                <span>{product.ram}</span>
              </div>
              <div style={styles.textOverflow}>
                <b>Camera: </b>
                <span>{product.camera}</span>
              </div>
            </Hidden>
          </div>
          <Snackbar
            open={this.state.snackbarOpen}
            message={"Item added to your cart."}
            autoHideDuration={3000}
            style={{ background: "#64DD17" }}
            onClose={() => this.setState({ snackbarOpen: false })}
          />
          <div style={styles.contentRightPosition}>
            <div style={styles.buttonPosition}>
              <Tooltip disableFocusListener title="View Product">
                <Button
                  style={{ color: "white" }}
                  color="primary"
                  variant="contained"
                  href={`/product/${product._id}`}
                >
                  <Search />
                </Button>
              </Tooltip>
              <Tooltip disableFocusListener title="Add to cart">
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
