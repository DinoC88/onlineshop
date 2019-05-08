import React, { Component } from "react";
import Spinner from "../common/Spinner";
import * as numeral from "numeral";
import { Button, Snackbar } from "@material-ui/core";
import decode from "jwt-decode";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { getProductById, addProductToCart } from "./product-helper";

const styles = {
  productPage: {
    position: "relative",
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginTop: "-24px",
    marginBottom: "-50px",
    minHeight: "90vh",
    maxHeight: "100%"
  },
  productDetailsContainer: {
    minHeight: "50px",
    margin: "0 6px",
    marginTop: "25px",
    border: "5px solid #ffffff00",
    position: "relative",
    backgroundPosition: "center"
  },
  productDetailsContainerHeader: {
    marginTop: "20px",
    marginBottom: "20px"
  },
  productDetails: {
    display: "flex",
    flexDirection: "row"
  },
  productImage: {
    width: "30%"
  },
  productImagePos: {
    width: "100%",
    maxHeight: "364px",
    margin: "20px 0"
  },
  productInfo: {
    width: "60%",
    textAlign: "center"
  },
  productInfoTable: {
    width: "100%",
    margin: "20px 0 0 50px"
  },
  productInfoTh: {
    backgroundColor: "#00bcd4",
    color: "white",
    padding: "3px",
    textAlign: "left",
    border: "1px solid #80deea"
  },
  productInfoTd: {
    padding: "3px",
    textAlign: "left",
    border: "1px solid #80deea"
  },
  priceText: {
    fontSize: "16px",
    fontWeight: "bold"
  },
  priceNum: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#64dd17"
  },
  productHandle: {
    display: "flex",
    flexDirection: "row",
    margin: "20px 0 20px 100px"
  },
  productHandleLeft: {
    width: "40%"
  },
  leftBtn: {
    margin: "10px auto"
  },
  productHandleRight: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "60%"
  },
  rightPrice: {
    width: "200px",
    margin: "10px 0"
  },
  rightQuantity: {
    width: "130px",
    textAlign: "center",
    margin: "10px 0"
  },
  rightQuantityInput: {
    width: "30px",
    height: "28px",
    margin: "10px",
    fontSize: "14px"
  },
  rightBtn: {
    margin: "10px 0",
    textAlign: "center"
  }
};

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      product: null,
      isLoading: false,
      errors: null,
      userid: "",
      productid: "",
      quantity: 1,
      snackbarOpen: false
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    getProductById(this.props.match.params.id)
      .then(result => {
        let token = localStorage.getItem("jwtToken");
        let decoded = decode(token);
        this.setState({
          product: result.data,
          isLoading: false,
          userid: decoded.id
        });
      })
      .catch(errors =>
        this.setState({
          errors,
          isLoading: false
        })
      );
  }
  quantityChange = e => {
    this.setState({
      quantity: e.target.value
    });
  };
  addToCart = () => {
    let postData = {
      userid: this.state.userid,
      quantity: this.state.quantity,
      productid: this.state.product._id
    };
    addProductToCart(postData);
    this.setState({ snackbarOpen: true });
  };

  render() {
    const { product, isLoading } = this.state;
    let productItem;
    if (product === null || isLoading) {
      productItem = <Spinner />;
    } else {
      productItem = (
        <div style={styles.productDetailsContainer}>
          <h1 style={styles.productDetailsContainerHeader}>{product.name}</h1>
          <div style={styles.productDetails}>
            <div style={styles.productImage}>
              <img
                style={styles.productImagePos}
                src={product.image}
                alt={product.name}
              />
            </div>
            <div style={styles.productInfo}>
              <table style={styles.productInfoTable}>
                <tbody>
                  <tr>
                    <th style={styles.productInfoTh}>Model</th>
                    <td style={styles.productInfoTd}>{product.name}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <th style={styles.productInfoTh}>Display Size</th>
                    <td style={styles.productInfoTd}>{product.displaySize}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <th style={styles.productInfoTh}>Display Resolution</th>
                    <td style={styles.productInfoTd}>
                      {product.displayResolution}
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <th style={styles.productInfoTh}>CPU</th>
                    <td style={styles.productInfoTd}>{product.cpu}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <th style={styles.productInfoTh}>Internal Memory</th>
                    <td style={styles.productInfoTd}>{product.memory}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <th style={styles.productInfoTh}>RAM</th>
                    <td style={styles.productInfoTd}>{product.ram}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <th style={styles.productInfoTh}>Camera</th>
                    <td style={styles.productInfoTd}>{product.camera}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Snackbar
            open={this.state.snackbarOpen}
            message={"Item added to your cart."}
            autoHideDuration={100}
            style={{ background: "#64DD17" }}
          />
          <div style={styles.productHandle}>
            <div style={styles.productHandleLeft}>
              <Button
                style={styles.leftBtn}
                href="/dashboard"
                color="secondary"
                variant="contained"
              >
                <KeyboardArrowLeft />
                Back to catalog
              </Button>
            </div>
            <div style={styles.productHandleRight}>
              <div style={styles.rightPrice}>
                <span style={styles.priceText}>Price:</span>
                <span style={styles.priceNum}>
                  {numeral(product.price).format("$0,0.00")}
                </span>
              </div>
              <div style={styles.rightQuantity}>
                <span style={styles.priceText}>Quantity: </span>
                <span>
                  <input
                    style={styles.rightQuantityInput}
                    value={this.state.quantity}
                    onChange={this.quantityChange}
                    type="number"
                    min="1"
                    max="5"
                  />
                </span>
              </div>
              <div>
                <Button
                  style={styles.rightBtn}
                  variant="contained"
                  onClick={this.addToCart}
                  color="primary"
                >
                  <AddShoppingCartIcon />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={styles.productPage}>
        <div>{productItem}</div>
        <div className="comment section">
          <div>Comments1</div>
          <input type="text" />
          <textarea />
        </div>
      </div>
    );
  }
}
