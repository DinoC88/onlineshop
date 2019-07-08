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
import { Delete, AddShoppingCart } from "@material-ui/icons";
import setAuthToken from "../../../utils/setAuthToken";
import { getCartData, removeOneItem } from "../../../utils/requestManager";
import { styles } from "./styles";
export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartData: [],
      id: null,
      isLoading: false,
      isLoaded: false,
      error: null
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

  render() {
    let { cartData, isLoaded, isLoading, error } = this.state;
    const cartExists = isLoaded && !error && cartData.length;
    let cartView;
    if (cartData === null || isLoading) {
      cartView = <Spinner />;
    } else {
      cartView = (
        <div style={styles.cartItemsPosition}>
          <div style={styles.cartElementsStyle}>
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
                    <Grid container>
                      <Grid item xs={12} lg={4}>
                        <div style={styles.productInfoStyle}>
                          <div>Mobile</div>
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
                          <div>Price</div>
                          <div>
                            <h5>
                              {numeral(item.product.price).format("$0,0.00")}
                            </h5>
                            <Tooltip
                              disableFocusListener
                              title="Remove product"
                            >
                              <div>
                                <Button
                                  onClick={() => this.removeItem(item._id)}
                                  color="secondary"
                                  variant="contained"
                                >
                                  <Delete />
                                </Button>
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                );
              })
            ) : (
              <h1 style={styles.cartHeader}>No items in the cart.</h1>
            )}
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
                color="secondary"
                variant="contained"
                style={styles.buttonStyle}
                href={`/checkout`}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={styles.cartContainer}>
        <div style={styles.pageMarginTop}>
          <Grid container>
            <Card style={styles.infoCardStyle}>
              <div style={styles.infoStyle}>
                <Hidden xsDown>
                  <div style={styles.headerStyle}>
                    <Divider style={styles.dividerPosition} />
                    <AddShoppingCart style={styles.imgStyle} />
                  </div>
                </Hidden>
                {cartView}
              </div>

              <Divider />
            </Card>
          </Grid>
        </div>
      </div>
    );
  }
}
