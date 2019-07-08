import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "braintree-web";
import { Button, Snackbar } from "@material-ui/core";
import DropIn from "braintree-web-drop-in-react";
import { getToken, productPurchaseOnline, deleteCart } from "./requestManager";
class Paypal extends Component {
  instance;
  state = {
    clientToken: null,
    snackbarOpen: false
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

  async buy() {
    try {
      const id = this.props.id;
      // Send the nonce to your server
      const { nonce } = await this.instance.requestPaymentMethod();
      const response = await productPurchaseOnline({
        paymentMethodNonce: nonce,
        total: this.props.toPay,
        info: this.props.information,
        product: this.props.cart
      });
      await deleteCart({ params: { id } });
      this.setState({ snackbarOpen: true });
      await this.props.getCartNum();
      console.log(response);
    } catch (err) {
      console.error(err.response);
    }
  }

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
            message={"You have made order!"}
            autoHideDuration={3000}
            style={{ background: "#64DD17" }}
            onClose={() => {
              this.setState({ snackbarOpen: false });
              this.props.history.push("/cart");
            }}
          />
          <div>
            <Button
              color="primary"
              variant="contained"
              onClick={this.buy.bind(this)}
            >
              Buy
            </Button>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Paypal);
