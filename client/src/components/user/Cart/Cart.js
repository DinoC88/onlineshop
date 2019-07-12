import React, { Component } from "react";
import * as numeral from "numeral";
import Spinner from "../../../utils/Spinner";
import {
  Button,
  Divider,
  Tooltip,
  Grid,
  Card,
  Hidden
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import setAuthToken from "../../../utils/setAuthToken";
import { getCartData, removeOneItem } from "../../../utils/requestManager";
import { styles } from "./styles";
import CustomizedButton from "./CustomizedButton";
export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartData: [],
      id: null,
      isLoading: false,
      isLoaded: false,
      error: null,
      hoverCheckout: false
    };
  }
  async componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    this.setState({ isLoading: true });
    try {
      const cartData = await getCartData();
      this.setState({
        cartData: cartData.data.items ? cartData.data.items : [],
        id: cartData.data ? cartData.data._id : null,
        isLoading: false,
        isLoaded: true,
        error: null
      });
    } catch (err) {
      this.setState({ error: err });
    }
  }
  removeItem = async itemId => {
    this.setState({ isLoading: true });
    await removeOneItem({
      cartId: this.state.id,
      itemId: itemId
    });
    const cartData = await getCartData();
    this.setState({
      cartData: cartData.data ? cartData.data.items : [],
      id: cartData.data ? cartData.data._id : null,
      isLoading: false
    });
    await this.props.getCartNum();
  };
  onHoverCheckout = () => {
    this.setState({
      hoverCheckout: !this.state.hoverCheckout
    });
  };

  render() {
    let { cartData, isLoaded, isLoading, error, hoverCheckout } = this.state;
    const cartExists = isLoaded && !error && cartData.length;
    let cartView;
    if (cartData === null || isLoading) {
      cartView = <Spinner />;
    } else {
      cartView = (
        <div style={styles.cartCard}>
          {cartExists ? (
            cartData.map(item => {
              return (
                <Card key={item.product._id} style={styles.cartProductCard}>
                  <Hidden xsDown>
                    <img
                      style={styles.cartProductImg}
                      src={item.product.image}
                      alt={item.product.name}
                    />
                  </Hidden>
                  <Grid
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                    container
                  >
                    <Grid item xs={11} lg={11}>
                      <Grid
                        container
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Grid item xs={12} lg={4}>
                          <div style={styles.productInfoStyle}>
                            <Hidden xsDown>
                              <div>Mobile</div>
                            </Hidden>
                            <div>
                              <h5>{item.product.name}</h5>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                          <div style={styles.productInfoStyle}>
                            <div>Quantity</div>
                            <div>
                              <h5>{item.quantity}</h5>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                          <div style={styles.productInfoStyle}>
                            <Hidden xsDown>
                              <div>Price</div>
                            </Hidden>
                            <div>
                              <h5>
                                {numeral(item.product.price).format("$0,0.00")}
                              </h5>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      style={{ display: "flex", justifyContent: "flex-end" }}
                      item
                      xs={1}
                      lg={1}
                    >
                      <Tooltip disableFocusListener title="Remove product">
                        <CustomizedButton
                          key={item._id}
                          itemId={item._id}
                          removeItem={this.removeItem}
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Card>
              );
            })
          ) : (
            <div>
              <h1 style={styles.cartHeader}>No items in the cart</h1>
              <h1 style={styles.noItemMessageHeader}>
                You can add items to the cart from dashboard
              </h1>
            </div>
          )}
          {cartExists ? (
            <div style={styles.orderTotalPosition}>
              <div style={styles.orderHeader}>
                <Divider />
                <h5>Order Total</h5>
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
              <Button
                disabled={!cartExists}
                style={
                  hoverCheckout
                    ? styles.onHoverCheckoutButtonStyle
                    : styles.checkoutButtonStyle
                }
                onMouseEnter={this.onHoverCheckout}
                onMouseLeave={this.onHoverCheckout}
                variant="contained"
                href={`/checkout`}
              >
                Checkout
              </Button>
            </div>
          ) : null}
        </div>
      );
    }
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
              {cartView}
            </div>
          </Card>
        </Grid>
      </div>
    );
  }
}
