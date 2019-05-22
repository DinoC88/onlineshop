import React, { Component } from "react";
import * as numeral from "numeral";
import { Button, DialogTitle, DialogActions, Dialog } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import setAuthToken from "../../../utils/setAuthToken";
import {
  getCartData,
  deleteCart,
  removeOneItem,
  getOrder
} from "../../../utils/requestManager";
import { styles } from "./styles";
export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartData: [],
      id: null,
      isLoading: false,
      isLoaded: false,
      error: null,
      openOrderConfirm: false,
      openEmptyConfirm: false
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    this.setState({ isLoading: true });
    getCartData()
      .then(res => {
        this.setState({
          cartData: res.data ? res.data.items : [],
          id: res.data ? res.data._id : null,
          isLoading: false,
          isLoaded: true,
          error: null
        });
        console.log(res.data);
      })
      .catch(err => this.setState({ error: err }));
  }
  removeItem = itemId => {
    this.setState({ isLoading: true });
    removeOneItem({
      cartId: this.state.id,
      itemId: itemId
    }).then(res => {
      getCartData()
        .then(res => {
          this.setState({
            cartData: res.data ? res.data.items : [],
            id: res.data ? res.data._id : null,
            isLoading: false
          });
        })
        .catch(err => console.log(err));
    });
  };
  emptyCart = () => {
    const id = this.state.id;
    deleteCart({ params: { id } }).then(() => {
      getCartData()
        .then(res => {
          this.setState({
            cartData: res.data ? res.data.items : [],
            id: res.data ? res.data._id : null,
            isLoading: false
          });
        })
        .catch(err => console.log(err));
      this.setState({ openEmptyConfirm: false });
    });
  };
  makeOrder = () => {
    const order = this.state.cartData.map(item => {
      let order = {
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        dateCreated: Date.now()
      };
      return order;
    });
    getOrder({ order: order }).then(res => {
      this.emptyCart();
      this.setState({ openOrderConfirm: false });
    });
  };
  handleOrderDialog = () => {
    this.setState({ openOrderConfirm: !this.state.openOrderConfirm });
  };
  handleEmptyDialog = () => {
    this.setState({ openEmptyConfirm: !this.state.openEmptyConfirm });
  };
  render() {
    let { cartData, isLoaded, error } = this.state;
    const cartExists = isLoaded && !error && cartData.length > 0;
    return (
      <div style={styles.cartContainer}>
        <h2 style={styles.cartTitle}>
          Your Cart (
          {cartExists
            ? cartData.reduce((acc, item) => (acc += item.quantity), 0) +
              " item"
            : ""}
          )
        </h2>
        <div style={styles.cart}>
          <div style={styles.cartOrder}>
            <div style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <h2>Order Summary</h2>
              </div>
              <div style={styles.orderInfo}>
                <div style={styles.cartOrderInfo}>
                  <p>Item cost</p>
                  <span style={styles.total}>
                    {cartExists
                      ? numeral(
                          cartData.reduce(
                            (acc, item) =>
                              (acc += item.product.price * item.quantity),
                            0
                          )
                        ).format("$0,0.00")
                      : numeral(0).format("$0,0.00")}
                  </span>
                </div>
                <div style={styles.cartOrderInfo}>
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div style={styles.cartOrderInfo}>
                  <p>Tax</p>
                  <p>estimate</p>
                </div>
                <div style={styles.cartOrderInfo}>
                  <b>Estimated total</b>
                  <span style={styles.total}>
                    {cartExists
                      ? numeral(
                          cartData.reduce(
                            (acc, item) =>
                              (acc += item.product.price * item.quantity),
                            0
                          )
                        ).format("$0,0.00")
                      : numeral(0).format("$0,0.00")}
                  </span>
                </div>
              </div>
              <div style={styles.cartInfoBtns}>
                <div>
                  <Button
                    disabled={!cartExists}
                    color="secondary"
                    variant="contained"
                    style={styles.buttonStyle}
                    onClick={this.handleOrderDialog}
                  >
                    Proceed to Checkout
                  </Button>
                  <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth="sm"
                    open={this.state.openOrderConfirm}
                    onClose={this.handleOrderDialog}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {
                        "Please read the list of items in your order and click `Ok` to confirm your order?"
                      }
                    </DialogTitle>

                    <DialogActions>
                      <Button onClick={this.handleOrderDialog} color="primary">
                        Cancel
                      </Button>
                      <Button
                        onClick={this.makeOrder}
                        color="secondary"
                        autoFocus
                      >
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <div>
                  <Button
                    disabled={!cartExists}
                    variant="contained"
                    style={styles.buttonStyle}
                  >
                    Check out with PayPal
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.cartItems}>
            {cartExists ? (
              cartData.map(item => {
                return (
                  <div style={styles.cartProductCard}>
                    <img
                      style={styles.cartProductImg}
                      src={item.product.image}
                      alt={item.product.name}
                    />
                    <div style={styles.cartProductRight}>
                      <div>
                        <h5 style={styles.cartProductHeader}>
                          {item.product.name}
                        </h5>
                      </div>
                      <div style={styles.cartProductInfo}>
                        <h6>Price</h6>
                        <h6>Quantity</h6>
                      </div>
                      <div style={styles.productCardDetails}>
                        <p>{numeral(item.product.price).format("$0,0.00")}</p>
                        <p>{item.quantity}</p>
                      </div>
                    </div>
                    <div style={styles.productCardDelete}>
                      <Button
                        onClick={() => this.removeItem(item._id)}
                        color="secondary"
                        variant="contained"
                      >
                        <Delete />
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 style={styles.cartHeader}>No items in the cart.</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}
