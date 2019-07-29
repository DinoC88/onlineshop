import React, { Component } from "react";
import Spinner from "../../utils/Spinner";
import { Snackbar, Hidden, Card, Divider, Grid } from "@material-ui/core";
import decode from "jwt-decode";
import { MobileScreenShareTwoTone } from "@material-ui/icons";
import setAuthToken from "../../utils/setAuthToken";
import { styles } from "./styles";
import ProductTable from "./producttable/ProductTable";
import { connect } from "react-redux";
import { fetchCart, addCart } from "../../actions/cartActions";
import { fetchProduct, deleteProd } from "../../actions/productAction";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import ProductHandle from "./ProductHandle/ProductHandle";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
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
    let decoded = token ? decode(token) : "";
    this.setState({
      userid: decoded.id
    });
    await this.props.fetchProduct(this.props.match.params.id);
    await this.props.fetchCart();
  }
  quantityChange = e => {
    this.setState({
      quantity: e.target.value
    });
  };
  addToCart = async e => {
    e.preventDefault();
    let cartData = {
      userid: this.state.userid,
      quantity: this.state.quantity,
      productid: this.props.productId
    };
    await this.props.addCart(cartData);
    this.setState({ snackbarOpen: true });
  };
  onDeleteProduct = async () => {
    try {
      await this.props.deleteProd(this.props.productName);
    } catch (err) {
      console.log(err);
    }
    this.props.history.push("/dashboard");
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
    const { product, isLoading } = this.props;
    const { hoverBack, hoverDelete, quantity, openDeleteConfirm } = this.state;
    let productItem;
    if (product === undefined || isLoading) {
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
            message={
              <FormattedMessage
                id="addToCartSnack"
                defaultMessage="Item added to your cart."
              />
            }
            autoHideDuration={3000}
            onClose={() => this.setState({ snackbarOpen: false })}
          />
          <ProductHandle
            product={product}
            hoverDelete={hoverDelete}
            onHoverDelete={this.onHoverDelete}
            hoverBack={hoverBack}
            onHoverBack={this.onHoverBack}
            quantity={quantity}
            quantityChange={this.quantityChange}
            addToCart={this.addToCart}
            openDeleteConfirm={openDeleteConfirm}
            handleDeleteDialog={this.handleDeleteDialog}
            onDeleteProduct={this.onDeleteProduct}
          />
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

Product.propTypes = {
  addCart: PropTypes.func.isRequired,
  fetchCart: PropTypes.func.isRequired,
  deleteProd: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product.product,
  productName: state.product.productName,
  productId: state.product.productId,
  isLoading: state.product.isLoading,
  cart: state.cart.cartItems
});

export default connect(
  mapStateToProps,
  { fetchCart, addCart, fetchProduct, deleteProd }
)(Product);
