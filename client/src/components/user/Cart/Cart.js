import React, { Component } from "react";
import { Divider, Grid, Card, Hidden } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import setAuthToken from "../../../utils/setAuthToken";
import { styles } from "./styles";
import { connect } from "react-redux";
import { fetchCart, removeProductCart } from "../../../actions/cartActions";
import PropTypes from "prop-types";
import CartProductCard from "./CartProductCard/CartProductCard";
import decode from "jwt-decode";
class Cart extends Component {
  constructor() {
    super();
    this.state = {
      hoverCheckout: false
    };
  }

  async componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    let decoded = decode(token);
    await this.props.fetchCart(decoded._id);
  }

  removeItem = async itemId => {
    await this.props.removeProductCart({
      cartId: this.props.cartId,
      itemId: itemId
    });
  };

  onHoverCheckout = () => {
    this.setState({
      hoverCheckout: !this.state.hoverCheckout
    });
  };

  render() {
    const { cartData, isLoading } = this.props;
    let { hoverCheckout } = this.state;
    const cartExists = cartData ? cartData.length : 0;
    return (
      <div style={styles.cartContainer}>
        <Grid style={{ padding: 16 }} container>
          <Card style={styles.infoCardStyle}>
            <div style={styles.cartStyle}>
              <Hidden xsDown>
                <div style={styles.headerStyle}>
                  <Divider style={styles.dividerPosition} />
                  <AddShoppingCart style={styles.imgStyle} />
                </div>
              </Hidden>
              <CartProductCard
                cartData={cartData}
                isLoading={isLoading}
                hoverCheckout={hoverCheckout}
                cartExists={cartExists}
                removeItem={this.removeItem}
                onHoverCheckout={this.onHoverCheckout}
              />
            </div>
          </Card>
        </Grid>
      </div>
    );
  }
}

Cart.propTypes = {
  fetchCart: PropTypes.func.isRequired,
  removeProductCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cartData: state.cart.cartItems,
  isLoading: state.cart.isLoading,
  cartId: state.cart.cartId
});

export default connect(
  mapStateToProps,
  { fetchCart, removeProductCart }
)(Cart);
