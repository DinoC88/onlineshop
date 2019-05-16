import React, { Component } from "react";
import Spinner from "../common/Spinner";
import * as numeral from "numeral";
import { Button, Snackbar } from "@material-ui/core";
import decode from "jwt-decode";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import {
  getProductById,
  addProductToCart,
  deleteProduct
} from "../products/product-helper";
import checkAdmin from "../common/checkAdmin";

const styles = {
  productPageContainer: {
    minHeight: "90vh"
  },
  productDetailsContainer: {
    margin: "25px 0px",
    boxShadow: "0 0 7px #b7b2b3"
  },
  productDetailsContainerHeader: {
    textAlign: "center"
  },
  productDetails: {
    display: "flex",
    justifyContent: "space-around"
  },
  productImage: {
    width: "30%",
    maxHeight: "364px"
  },
  productInfo: {
    width: "60%",
    textAlign: "center"
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
  productHandle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "30px 0px 20px 0px"
  },
  handleSpanText: {
    fontSize: "16px",
    fontWeight: "bold"
  },
  priceNum: {
    fontSize: "30px",
    fontWeight: "bold"
  },
  handleQuantityInput: {
    width: "30px",
    height: "28px",
    margin: "10px",
    fontSize: "14px"
  },
  handleButton: {
    color: "white"
  }
};

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isLoading: false,
      errors: null,
      userid: "",
      productid: "",
      name: "",
      quantity: 1,
      snackbarOpen: false,
      isAdmin: false
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
          name: result.data.name,
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

  //TODO: fix isAdmin checker in compdidmount (deleted)
  onDeleteProduct = () => {
    deleteProduct(this.state.name)
      .then(res => {
        console.log("test");
        this.props.history.push("/dashboard");
      })
      .catch(err => console.log("err"));
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
            <img
              style={styles.productImage}
              src={product.image}
              alt={product.name}
            />
            <div style={styles.productInfo}>
              <table>
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
            <div>
              <Button
                style={styles.handleButton}
                href="/dashboard"
                color="secondary"
                variant="contained"
              >
                <KeyboardArrowLeft />
                Back to catalog
              </Button>
            </div>
            <div>
              <span style={styles.handleSpanText}>Price:</span>
              <span style={styles.priceNum}>
                {numeral(product.price).format("$0,0.00")}
              </span>
            </div>
            <div>
              <span style={styles.handleSpanText}>Quantity: </span>
              <span>
                <input
                  style={styles.handleQuantityInput}
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
                style={styles.handleButton}
                variant="contained"
                onClick={this.addToCart}
                color="primary"
              >
                <AddShoppingCartIcon />
                Add to Cart
              </Button>
            </div>
            <div>
              {checkAdmin() ? (
                <Button
                  onClick={this.onDeleteProduct}
                  variant="contained"
                  color="secondary"
                >
                  Delete Product
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={styles.productPageContainer}>
        <div>{productItem}</div>
      </div>
    );
  }
}

export default Product;
