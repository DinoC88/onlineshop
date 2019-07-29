import React from "react";
import { styles } from "../styles";
import * as numeral from "numeral";
import Spinner from "../../../../utils/Spinner";
import { Button, Divider, Grid, Card, Hidden } from "@material-ui/core";
import CustomizedButton from "../CustomizedButton";
import { FormattedMessage } from "react-intl";

export default function CartProductCard(props) {
  const { cartData, isLoading, cartExists, hoverCheckout } = props;
  let cardView;
  if (cartData === null || isLoading) {
    cardView = <Spinner />;
  } else {
    cardView = (
      <div style={styles.cartCard}>
        {cartExists > 0 ? (
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
                <Grid style={styles.cartProductCardGridStyle} container>
                  <Grid item xs={11} lg={11}>
                    <Grid container style={styles.cartProductCardStyle}>
                      <Grid item xs={9} lg={4}>
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
                          <div>
                            <FormattedMessage
                              id="quantity"
                              defaultMessage="Quantity"
                            />
                          </div>
                          <div>
                            <h5>{item.quantity}</h5>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <div style={styles.productInfoStyle}>
                          <Hidden xsDown>
                            <div>
                              <FormattedMessage
                                id="price"
                                defaultMessage="Price"
                              />
                            </div>
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
                    <CustomizedButton
                      key={item._id}
                      itemId={item._id}
                      removeItem={props.removeItem}
                    />
                  </Grid>
                </Grid>
              </Card>
            );
          })
        ) : (
          <div>
            <h1 style={styles.cartHeader}>
              <FormattedMessage
                id="noItemsCartText1"
                defaultMessage="No items in the cart"
              />
            </h1>
            <h1 style={styles.noItemMessageHeader}>
              <FormattedMessage
                id="noItemsCartText2"
                defaultMessage="You can add items to the cart from dashboard"
              />
            </h1>
          </div>
        )}
        {cartExists ? (
          <div style={styles.orderTotalPosition}>
            <div style={styles.orderHeader}>
              <Divider />
              <h5>
                <FormattedMessage
                  id="orderTotal"
                  defaultMessage="Order total"
                />
              </h5>
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
              onMouseEnter={props.onHoverCheckout}
              onMouseLeave={props.onHoverCheckout}
              variant="contained"
              href={`/checkout`}
            >
              <FormattedMessage id="checkout" defaultMessage="Checkout" />
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
  return <div>{cardView}</div>;
}
