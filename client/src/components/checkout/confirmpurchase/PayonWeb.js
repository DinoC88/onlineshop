import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "braintree-web";
import { Button, Snackbar } from "@material-ui/core";
import DropIn from "braintree-web-drop-in-react";
import {
  getToken,
  productPurchaseOnline,
  deleteCart
} from "../../../utils/requestManager";
import { FormattedMessage } from "react-intl";

class PayonWeb extends Component {
  instance;
  state = {
    clientToken: null,
    snackbarOpen: false,
    nonce: "",
    orderId: ""
  };

  async componentDidMount() {
    try {
      // Get a client token for authorization from your server
      const response = await getToken();
      const clientToken = response.data.clientToken;
      this.setState({ clientToken });
    } catch (err) {
      console.error(err);
    }
  }

  buy = async () => {
    try {
      const id = this.props.id;
      // Send the nonce to your server
      const { nonce } = await this.instance.requestPaymentMethod();

      this.setState({
        nonce
      });
      const response = await productPurchaseOnline({
        paymentMethodNonce: nonce,
        total: this.props.toPay,
        info: this.props.information,
        product: this.props.cart
      });
      await deleteCart({ params: { id } });
      this.setState({ snackbarOpen: true, orderId: response.data.orderId });
      await this.props.getCartNum();
    } catch (err) {
      console.error(err.response);
    }
  };

  render() {
    if (!this.state.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div>
          <DropIn
            options={{
              authorization: this.state.clientToken,
              paypal: {
                button: {
                  type: "checkout"
                },
                flow: "checkout",
                amount: 5,
                currency: "USD",
                singleUse: true,
                buttonStyle: {
                  color: "blue",
                  shape: "rect",
                  size: "medium"
                }
              }
            }}
            onInstance={instance => (this.instance = instance)}
          />
          <Snackbar
            open={this.state.snackbarOpen}
            message={
              <FormattedMessage
                id="madeOrderSnack"
                defaultMessage="You have made the order"
              />
            }
            autoHideDuration={3000}
            onClose={() => {
              this.setState({ snackbarOpen: false });
              this.props.history.push(`/order/${this.state.orderId}`);
            }}
          />
          {this.state.nonce === "" ? (
            <div>
              <Button color="primary" variant="contained" onClick={this.buy}>
                <FormattedMessage id="confirm" defaultMessage="Confirm" />
              </Button>
            </div>
          ) : (
            <h5
              style={{
                fontFamily: "Roboto",
                color: "rgba(0,0,0,0.87)",
                fontSize: 28,
                fontWeight: "normal"
              }}
            >
              <FormattedMessage
                id="transMsg"
                defaultMessage="Transaction Processing. Please wait!"
              />
            </h5>
          )}
        </div>
      );
    }
  }
}

export default withRouter(PayonWeb);
