import React, { Component } from "react";
import Spinner from "../../utils/Spinner";
import * as numeral from "numeral";
import {
  Button,
  Snackbar,
  DialogTitle,
  DialogActions,
  Dialog,
  Hidden,
  Tooltip,
  Card,
  Divider,
  Grid
} from "@material-ui/core";
import decode from "jwt-decode";
import {
  AddShoppingCart,
  KeyboardArrowLeft,
  Delete,
  MobileScreenShareTwoTone
} from "@material-ui/icons";
import {
  getProductById,
  addProductToCart,
  deleteProduct
} from "../../utils/requestManager";
import checkAdmin from "../../utils/checkAdmin";
import setAuthToken from "../../utils/setAuthToken";
import { styles } from "./styles";
import checkAuth from "../../utils/checkAuth";
import ProductTable from "./producttable/ProductTable";
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
      snackbarOpen: false,
      openDeleteConfirm: false,
      hoverBack: false,
      hoverDelete: false
    };
  }
  async componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    this.setState({ isLoading: true });
    try {
      const product = await getProductById(this.props.match.params.id);
      let token = localStorage.getItem("jwtToken");
      let decoded = token ? decode(token) : "";
      this.setState({
        product: product.data,
        name: product.data.name,
        userid: decoded.id,
        isLoading: false
      });
    } catch (errors) {
      this.setState({
        errors,
        isLoading: false
      });
    }
  }
  quantityChange = e => {
    this.setState({
      quantity: e.target.value
    });
  };
  addToCart = async () => {
    let postData = {
      userid: this.state.userid,
      quantity: this.state.quantity,
      productid: this.state.product._id
    };
    await addProductToCart(postData);
    await this.props.getCartNum();
    this.setState({ snackbarOpen: true });
  };
  onDeleteProduct = async () => {
    try {
      await deleteProduct(this.state.name);
      await this.props.history.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  handleDeleteDialog = () => {
    this.setState({ openDeleteConfirm: !this.state.openDeleteConfirm });
  };
  onHoverBack = () => {
    this.setState({
      hoverBack: !this.state.hoverBack
    });
  };
  onHoverDelete = () => {
    this.setState({
      hoverDelete: !this.state.hoverDelete
    });
  };
  render() {
    const { product, isLoading, hoverBack, hoverDelete } = this.state;
    let productItem;
    if (product === null || isLoading) {
      productItem = <Spinner />;
    } else {
      productItem = (
        <div style={styles.productDetailsContainer}>
          <h3 style={styles.productDetailsHeader}>{product.name}</h3>
          <div style={styles.productDetails}>
            <Hidden smDown>
              <img
                style={styles.productImage}
                src={product.image}
                alt={product.name}
              />
            </Hidden>
            <ProductTable product={product} />
          </div>
          <Snackbar
            open={this.state.snackbarOpen}
            message={"Item added to your cart."}
            autoHideDuration={3000}
            style={{ background: "#64DD17" }}
            onClose={() => this.setState({ snackbarOpen: false })}
          />
          <div style={styles.productHandle}>
            <Tooltip disableFocusListener title="Back to catalog">
              <Button
                style={
                  hoverBack
                    ? styles.onHoverButtonStyle
                    : styles.hoverButtonStyle
                }
                onMouseEnter={this.onHoverBack}
                onMouseLeave={this.onHoverBack}
                href="/dashboard"
                color="secondary"
                variant="contained"
              >
                <KeyboardArrowLeft />
              </Button>
            </Tooltip>
            <Hidden smDown>
              {!checkAdmin() ? (
                <span style={styles.priceNum}>
                  {numeral(product.price).format("$0,0.00")}
                </span>
              ) : null}
            </Hidden>
            {!checkAdmin() ? (
              <div style={{ marginTop: 8 }}>
                <span>
                  Quantity:
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
            ) : null}
            {!checkAdmin() ? (
              <Tooltip disableFocusListener title="Add to cart">
                <Button
                  disabled={checkAuth() ? false : true}
                  style={styles.buttonStyle}
                  variant="contained"
                  onClick={this.addToCart}
                  color="primary"
                >
                  <AddShoppingCart />
                </Button>
              </Tooltip>
            ) : null}
            {checkAdmin() ? (
              <div>
                <Tooltip disableFocusListener title="Delete product">
                  <Button
                    style={
                      hoverDelete
                        ? styles.onHoverButtonStyle
                        : styles.hoverButtonStyle
                    }
                    onMouseEnter={this.onHoverDelete}
                    onMouseLeave={this.onHoverDelete}
                    onClick={this.handleDeleteDialog}
                    variant="contained"
                    color="secondary"
                  >
                    <Delete />
                  </Button>
                </Tooltip>
                <Dialog
                  disableBackdropClick
                  disableEscapeKeyDown
                  maxWidth="sm"
                  open={this.state.openDeleteConfirm}
                  onClose={this.handleDeleteDialog}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                    {"Are you sure you want to delete this product?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={this.handleDeleteDialog} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={this.onDeleteProduct}
                      color="secondary"
                      autoFocus
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            ) : null}
          </div>
        </div>
      );
    }
    return (
      <div style={styles.pageContainer}>
        <Grid style={{ padding: 8 }} container>
          <Card style={styles.infoCardStyle}>
            <div style={styles.infoStyle}>
              <Hidden xsDown>
                <div style={styles.headerStyle}>
                  <Divider style={{ marginTop: 50 }} />
                  <MobileScreenShareTwoTone style={styles.imgStyle} />
                </div>
              </Hidden>
              {productItem}
            </div>
            <Divider />
          </Card>
        </Grid>
      </div>
    );
  }
}
