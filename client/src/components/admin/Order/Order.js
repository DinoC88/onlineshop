import React, { Component } from "react";
import {
  getOrderById,
  getTransactionById,
  changeOrderStatus
} from "../../../utils/requestManager";
import { styles } from "./styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  Hidden,
  Divider,
  Tooltip
} from "@material-ui/core";
import OrderInfo from "./OrderInfo";
import { KeyboardArrowLeft, Payment } from "@material-ui/icons";
import Spinner from "../../../utils/Spinner";

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      deliveryInfo: {},
      transaction: [],
      products: [],
      paymentDetails: [],
      orderId: "",
      orderStatus: "",
      drawerOpen: false,
      total: 0,
      open: false,
      isLoading: false
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const orderData = await getOrderById(this.props.match.params.id);
      this.setState({
        order: orderData.data,
        products: orderData.data.products,
        deliveryInfo: orderData.data.deliveryInfo,
        orderId: orderData.data._id,
        orderStatus: orderData.data.status
      });
      await this.calculateTotal(orderData.data.products);
      const trans = await getTransactionById(orderData.data.transactionId);
      this.setState({
        transaction: trans.data[0],
        paymentDetails: trans.data[0].paymentDetails
          ? trans.data[0].paymentDetails
          : "",
        isLoading: false
      });
    } catch (err) {
      console.log(err);
    }
  }
  calculateTotal = calc => {
    let total = calc.reduce(
      (acc, item) => (acc += item.price * item.quantity),
      0
    );
    this.setState({ total });
  };

  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };
  handleDrawerChange = async e => {
    this.setState({ orderStatus: e.target.value });
    await changeOrderStatus(e.target.value, this.state.orderId);
  };
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      deliveryInfo,
      order,
      products,
      transaction,
      paymentDetails,
      isLoading
    } = this.state;
    let orderInfo;
    if (isLoading) {
      orderInfo = <Spinner />;
    } else {
      orderInfo = (
        <OrderInfo
          deliveryInfo={deliveryInfo}
          orderStatus={this.state.orderStatus}
          handleDrawerChange={this.handleDrawerChange}
          drawerOpen={this.state.drawerOpen}
          toggleDrawer={this.toggleDrawer}
          products={products}
          transaction={transaction}
          order={order}
        />
      );
    }
    return (
      <div style={styles.pageContainer}>
        <div style={styles.pageMarginTop}>
          <Grid container>
            <Card style={styles.orderCardStyle}>
              <div style={styles.orderStyle}>
                <Hidden xsDown>
                  <div style={styles.headerStyle}>
                    <Divider style={{ marginTop: 50 }} />
                    <Payment style={styles.imgStyle} />
                  </div>
                </Hidden>
                {orderInfo}
              </div>
              <Hidden xsDown>
                <Divider />
              </Hidden>
              <Grid container style={{ textAlign: "center" }}>
                <Grid item xs={12} lg={6} sm={6}>
                  <Tooltip disableFocusListener title="Go back">
                    <span>
                      <Button
                        onClick={() => {
                          this.props.history.push("/orders");
                        }}
                        style={styles.buttonStyle}
                        variant="contained"
                        color="secondary"
                      >
                        <KeyboardArrowLeft />
                      </Button>
                    </span>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} lg={6} sm={6}>
                  {paymentDetails.bin || paymentDetails.payerEmail ? (
                    <div>
                      <Tooltip disableFocusListener title="Payment details">
                        <span>
                          <Button
                            style={styles.buttonStyle}
                            variant="contained"
                            color="primary"
                            onClick={this.handleClickOpen}
                          >
                            <Payment />
                          </Button>
                        </span>
                      </Tooltip>
                      <Dialog
                        onClose={this.handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={this.state.open}
                      >
                        <DialogTitle>Payment Details</DialogTitle>
                        {paymentDetails.bin ? (
                          <DialogContent>
                            <p>Bin: {paymentDetails.bin}</p>
                            <p>Card type: {paymentDetails.cardType}</p>
                            <p>
                              Expiration date: {paymentDetails.expirationDate}
                            </p>
                            <p>
                              Customer location:{" "}
                              {paymentDetails.customerLocation}
                            </p>
                            <p>Last 4: {paymentDetails.last4}</p>
                            <p>Masked number: {paymentDetails.maskedNumber}</p>
                          </DialogContent>
                        ) : (
                          <DialogContent>
                            <p>Payer ID: {paymentDetails.payerId}</p>
                            <p>Payment ID: {paymentDetails.paymentId}</p>
                            <p>
                              Authorization ID: {paymentDetails.authorizationId}
                            </p>
                            <p>Payer email: {paymentDetails.payerEmail}</p>
                            <p>
                              Payer name:{" "}
                              {paymentDetails.payerFirstName +
                                " " +
                                paymentDetails.payerLastName}
                            </p>
                            <p>Payer status: {paymentDetails.payerStatus}</p>
                            <p>
                              Transaction fee: {paymentDetails.transactionFee}
                              {paymentDetails.transactionFeeCurrency}
                            </p>
                          </DialogContent>
                        )}
                        <DialogActions>
                          <Button onClick={this.handleClose} color="primary">
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  ) : null}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </div>
      </div>
    );
  }
}
