import React, { Component } from "react";
import * as numeral from "numeral";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {
  getCartData,
  deleteCart,
  removeOneItem,
  getOrder
} from "./user-helper";

const styles = {
  cartContainer: {
    minHeight: "100vh",
    margin: "0 6px",
    marginTop: "-72px",
    border: "1px solid #ffffff00"
  },
  cartTitle: {
    marginTop: "100px",
    marginBottom: "40px"
  },
  cart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cartInfo: {
    display: "flex",
    flexDirection: "column",
    width: "25%",
    height: "100%",
    minHeight: "auto",
    background: "#f5f5f5"
  },
  cartInfoPar: {
    padding: "0 10px"
  },
  total: {
    color: "#64dd17",
    fontSize: "22px"
  },
  cartInfoBtns: {
    textAlign: "center"
  },
  cartItems: {
    width: "78%"
  },
  image: { maxWidth: "50px" },
  cartItemsTable: {
    width: "100%",
    borderSpacing: "0"
  },
  cartItemsTh: {
    padding: "5px 5px",
    backgroundColor: "#00bcd4",
    color: "white",
    textAlign: "left"
  },
  cartItemsTd: {
    padding: "12px 5px",
    textAlign: "left",
    borderBottom: "1px solid #00bcd4"
  },
  link: {
    color: "inherit",
    textDecoration: "none"
  },
  cartHeader: {
    textAlign: "center",
    marginTop: "100px"
  },
  cartItemButton: {
    padding: "1px 5px",
    background: "#ffffff00",
    color: "#f44336",
    fontWeight: "bold",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    ":hover": {
      background: "#f44336",
      color: "white"
    }
  }
};

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartData: null,
      isLoading: null,
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
          cartData: res.data,
          isLoading: false
        });
        console.log(res.data.items.length);
      })
      .catch(err => console.log(err));
  }
  // TODO: remove item not working as it should.
  //When you delete last item it doesnt return "No items in the cart."
  removeItem = itemId => {
    this.setState({ isLoading: true });
    removeOneItem({
      cartId: this.state.cartData._id,
      itemId: itemId
    }).then(res => {
      getCartData()
        .then(res => {
          this.setState({
            cartData: res.data,
            isLoading: false
          });
        })
        .catch(err => console.log(err));
    });
  };
  emptyCart = () => {
    const id = this.state.cartData._id;
    deleteCart({ params: { id } }).then(() => {
      getCartData()
        .then(res => {
          this.setState({
            cartData: res.data,
            isLoading: false
          });
        })
        .catch(err => console.log(err));
      this.setState({ openEmptyConfirm: false });
    });
  };
  makeOrder = () => {
    const order = this.state.cartData.items.map(item => {
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

  handleOrderOpen = () => {
    this.setState({ openOrderConfirm: true });
  };
  handleOrderClose = () => {
    this.setState({ openOrderConfirm: false });
  };
  handleEmptyOpen = () => {
    this.setState({ openEmptyConfirm: true });
  };
  handleEmptyClose = () => {
    this.setState({ openEmptyConfirm: false });
  };
  render() {
    let { cartData, isLoading } = this.state;
    return (
      <div style={styles.cartContainer}>
        <h1 style={styles.cartTitle}>Your Cart</h1>
        <div style={styles.cart}>
          <div style={styles.cartInfo}>
            <div>
              <p style={styles.cartInfoPar}>
                <b>Number of items: </b>
                {cartData
                  ? cartData.items.reduce(
                      (acc, item) => (acc += item.quantity),
                      0
                    )
                  : 0}
              </p>
              <p style={styles.cartInfoPar}>
                <b>Total amount: </b>

                <span style={styles.total}>
                  {cartData
                    ? numeral(
                        cartData.items.reduce(
                          (acc, item) =>
                            (acc += item.product.price * item.quantity),
                          0
                        )
                      ).format("$0,0.00")
                    : numeral(0).format("$0,0.00")}
                </span>
              </p>
            </div>
            <div style={styles.cartInfoBtns}>
              <Button
                color="primary"
                variant="contained"
                style={{ marginRight: "5px" }}
                onClick={this.handleOrderOpen}
              >
                Check out
              </Button>
              <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="sm"
                open={this.state.openOrderConfirm}
                onClose={this.handleOrderClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {
                    "Please read the list of items in your order and click `Ok` to confirm your order?"
                  }
                </DialogTitle>

                <DialogActions>
                  <Button onClick={this.handleOrderClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.makeOrder} color="secondary" autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
              <Button
                color="secondary"
                variant="contained"
                onClick={this.handleEmptyOpen}
              >
                Empty cart
              </Button>
              <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={this.state.openEmptyConfirm}
                onClose={this.handleEmptyClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {"Are you sure you want to clear shop cart?"}
                </DialogTitle>

                <DialogActions>
                  <Button onClick={this.handleEmptyClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.emptyCart} color="secondary" autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          <div style={styles.cartItems}>
            {cartData && !isLoading ? (
              <table style={styles.cartItemsTable}>
                <thead>
                  <tr>
                    <th style={styles.cartItemsTh} />
                    <th style={styles.cartItemsTh}>Product Name</th>
                    <th style={styles.cartItemsTh}>Price</th>
                    <th style={styles.cartItemsTh}>Qty</th>
                    <th style={styles.cartItemsTh}>Total</th>
                    <th style={styles.cartItemsTh} />
                  </tr>
                </thead>
                <tbody>
                  {cartData.items.map(item => {
                    return (
                      <tr style={styles.cartItemsTd} key={item.product.name}>
                        <td>
                          <img
                            style={styles.image}
                            src={item.product.image}
                            alt={item.product.name}
                          />
                        </td>
                        <td>
                          <Link
                            style={styles.link}
                            to={`/product/${item.product._id}`}
                          >
                            {item.product.name}
                          </Link>
                        </td>
                        <td>{numeral(item.product.price).format("$0,0.00")}</td>
                        <td>{item.quantity}</td>
                        <td>
                          {numeral(item.product.price * item.quantity).format(
                            "$0,0.00"
                          )}
                        </td>
                        <td>
                          <button
                            style={styles.cartItemButton}
                            title="Remove this item from the cart"
                            onClick={() => this.removeItem(item._id)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <h1 style={styles.cartHeader}>No items in the cart.</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}
