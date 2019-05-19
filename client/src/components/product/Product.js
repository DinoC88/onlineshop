import React, { Component } from "react";
import Spinner from "../../utils/Spinner";
import * as numeral from "numeral";
import { Button, Snackbar } from "@material-ui/core";
import decode from "jwt-decode";
import { AddShoppingCart, KeyboardArrowLeft } from "@material-ui/icons";
import {
  getProductById,
  addProductToCart,
  deleteProduct
} from "../../utils/requestManager";
import checkAdmin from "../../utils/checkAdmin";
import setAuthToken from "../../utils/setAuthToken";
import { styles } from "./styles";

export default class Product extends Component {
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
      snackbarOpen: false
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    this.setState({ isLoading: true });
    getProductById(this.props.match.params.id)
      .then(result => {
        let token = localStorage.getItem("jwtToken");
        let decoded = token ? decode(token) : "";
        this.setState({
          product: result.data,
          name: result.data.name,
          userid: decoded.id,
          isLoading: false
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
  onDeleteProduct = () => {
    deleteProduct(this.state.name)
      .then(res => {
        this.props.history.push("/dashboard");
      })
      .catch(err => console.log(err));
  };
  render() {
    const { product, isLoading, userid } = this.state;
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
                    <td style={styles.productInfoTh}>Model</td>
                    <td style={styles.productInfoTd}>{product.name}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td style={styles.productInfoTh}>Display Size</td>
                    <td style={styles.productInfoTd}>{product.displaySize}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td style={styles.productInfoTh}>Display Resolution</td>
                    <td style={styles.productInfoTd}>
                      {product.displayResolution}
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td style={styles.productInfoTh}>CPU</td>
                    <td style={styles.productInfoTd}>{product.cpu}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td style={styles.productInfoTh}>Internal Memory</td>
                    <td style={styles.productInfoTd}>{product.memory}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td style={styles.productInfoTh}>RAM</td>
                    <td style={styles.productInfoTd}>{product.ram}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td style={styles.productInfoTh}>Camera</td>
                    <td style={styles.productInfoTd}>{product.camera}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Snackbar
            open={this.state.snackbarOpen}
            message={"Item added to your cart."}
            autoHideDuration={3000}
            style={{ background: "#64DD17" }}
            onClose={() => this.setState({ snackbarOpen: false })}
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
              </Button>
            </div>
            <div style={styles.priceNum}>
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
                disabled={userid ? false : true}
                style={styles.handleButton}
                variant="contained"
                onClick={this.addToCart}
                color="primary"
              >
                <AddShoppingCart />
              </Button>
            </div>
            <div>
              {checkAdmin() ? (
                <Button
                  style={styles.handleButton}
                  onClick={this.onDeleteProduct}
                  variant="contained"
                  color="secondary"
                />
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
