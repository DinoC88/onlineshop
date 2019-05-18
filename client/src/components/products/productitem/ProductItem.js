import React, { Component } from "react";
import * as numeral from "numeral";
import Button from "@material-ui/core/Button";
import { Search, AddShoppingCart } from "@material-ui/icons";
import checkAuth from "../../common/checkAuth";
import { addProductToCart } from "../product-helper";
import decode from "jwt-decode";
import setAuthToken from "../../../utils/setAuthToken";

const styles = {
  productDetailsContainer: {
    maxHeight: "250px",
    display: "flex",
    margin: "10px 0",
    boxShadow: "0 0 7px #b7b2b3",
    padding: "8px"
  },
  productDetailsContainerHover: {
    maxHeight: "250px",
    display: "flex",
    margin: "10px 0",
    boxShadow: "0 0 14px #d1d3d6",
    padding: "8px",
    cursor: "pointer"
  },
  productImage: {
    width: "200px",
    margin: "15px",
    objectFit: "contain"
  },
  contentLeft: {
    width: "80%",
    justifyContent: "flex-start",
    alignSelf: "center"
  },
  contentRightPosition: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  priceStyle: {
    fontSize: "30px"
  },
  hoverButtons: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  linkStyle: {
    textDecoration: "none",
    color: "#474a4f"
  }
};

export default class Productitem extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
      productid: null,
      userid: null,
      quantity: 1,
      isLoading: false
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    let decoded = token ? decode(token) : "";
    this.setState({
      userid: decoded.id
    });
    console.log(this.state.productid);
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{product.name}</h3>
              <h2 style={styles.priceStyle}>
                {numeral(product.price).format("$0,0.00")}
              </h2>
            </div>
            <div>
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
                <span>{product.camera}</span>
              </div>
            </div>
          </div>
          <div style={styles.contentRightPosition}>
            {this.state.hover ? (
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
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
