import React, { Component } from "react";
import * as numeral from "numeral";
import { Button, Snackbar } from "@material-ui/core";
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
      snackbarOpen: false
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

  addToCart = productid => {
    let postData = {
      userid: this.state.userid,
      quantity: this.state.quantity,
      productid: productid
    };
    addProductToCart(postData);
    this.setState({ snackbarOpen: true });
  };
  render() {
    const { product } = this.props;
    return (
      <div>
        <div
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
            <div>
              <h5 style={{ fontSize: 22 }}>{product.name}</h5>
            </div>
            <div>
              <h2 style={styles.priceStyle}>
                {numeral(product.price).format("$0,0.00")}
              </h2>
              <div>
                <b>Display size: </b>
                <span>{product.displaySize}</span>
              </div>
              <div>
                <b>Display resolution: </b>
                <span>{product.displayResolution} pixels</span>
              </div>
              <div>
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
              <div>
                <b>Camera: </b>
                <span>
                  {product.camera < 50
                    ? product.camera
                    : product.camera.slice(0, 50) + "..."}
                </span>
              </div>
            </div>
          </div>
          <Snackbar
            open={this.state.snackbarOpen}
            message={"Item added to your cart."}
            autoHideDuration={3000}
            style={{ background: "#64DD17" }}
            onClose={() => this.setState({ snackbarOpen: false })}
          />
          <div style={styles.contentRightPosition}>
            <div style={styles.hoverButtons}>
              <Button
                style={{ color: "white" }}
                color="primary"
                variant="contained"
                href={`/product/${product._id}`}
              >
                <Search />
              </Button>
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
          </div>
        </div>
      </div>
    );
  }
}
