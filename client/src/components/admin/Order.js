import React, { Component } from "react";
import {
  getOrderById,
  getTransactionById,
  changeOrderStatus
} from "../../utils/requestManager";
import { styles } from "./styles";
import {
  Select,
  Button,
  FormControl,
  MenuItem,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import * as moment from "moment";
import * as numeral from "numeral";

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
      open: false
    };
  }
  componentDidMount() {
    getOrderById(this.props.match.params.id).then(res => {
      this.setState({
        order: res.data,
        products: res.data.products,
        deliveryInfo: res.data.deliveryInfo,
        orderId: res.data._id,
        orderStatus: res.data.status
      });
      this.calculateTotal(res.data.products);
      getTransactionById(res.data.transactionId).then(trans => {
        this.setState({
          transaction: trans.data[0],
          paymentDetails: trans.data[0].paymentDetails
            ? trans.data[0].paymentDetails
            : ""
        });
      });
    });
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
  handleDrawerChange = e => {
    this.setState({ orderStatus: e.target.value });
    changeOrderStatus(e.target.value, this.state.orderId);
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
      paymentDetails
    } = this.state;
    console.log(paymentDetails);
    return (
      <div style={styles.pageContainer}>
        <div style={styles.orderDetails}>
          <div>
            <h5>Order details</h5>
            <p>
              Name: {deliveryInfo.firstname} {deliveryInfo.lastname}
            </p>
            <p>Phone: {deliveryInfo.phone}</p>
            <p>Email: {deliveryInfo.email}</p>
            <p>
              Address: {deliveryInfo.address}, {deliveryInfo.city},{" "}
              {deliveryInfo.zipcode}
            </p>
            <p>Date: {moment(order.date).format("MMMM Do YYYY, h:mm:ss a")}</p>
            <div
              style={{ marginLeft: 0, display: "flex", justifyContent: "row" }}
            >
              <p>Status:</p>
              <FormControl>
                <Select
                  inputProps={{
                    name: "orderStatus"
                  }}
                  value={this.state.orderStatus}
                  onChange={this.handleDrawerChange}
                >
                  <MenuItem value="Awaiting Shipment">
                    Awaiting Shipment
                  </MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                  <MenuItem value="Declined">Declined</MenuItem>
                </Select>
                <Drawer
                  docked={false}
                  open={this.state.drawerOpen}
                  onRequestChange={this.toggleDrawer}
                />
              </FormControl>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h5>Order items</h5>
            {products.map((product, i) => {
              return (
                <div key={i}>
                  <p>Mobile: {product.name}</p>
                  <p>Price: {numeral(product.price).format("$0,0.00")}</p>
                  <p>Quantity: {product.quantity}</p>
                  <hr />
                </div>
              );
            })}
            <p>Total: {numeral(this.state.total).format("$0,0.00")}</p>
          </div>
          <div>
            <h5>Transaction details</h5>
            <p>Transaction ID: {transaction.transactionId}</p>
            <p>Amount: {numeral(transaction.amount).format("$0,0.00")}</p>
            {transaction.currency ? (
              <p>Currency: {transaction.currency}</p>
            ) : null}
            <p>
              Date: {moment(transaction.date).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p>Payment method: {transaction.paymentMethod}</p>
            <p>Status: {transaction.status}</p>
            {paymentDetails.bin || paymentDetails.payerEmail ? (
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleClickOpen}
                >
                  Payment details
                </Button>
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
                      <p>Expiration date: {paymentDetails.expirationDate}</p>
                      <p>
                        Customer location: {paymentDetails.customerLocation}
                      </p>
                      <p>Last 4: {paymentDetails.last4}</p>
                      <p>Masked number: {paymentDetails.maskedNumber}</p>
                    </DialogContent>
                  ) : (
                    <DialogContent>
                      <p>Payer ID: {paymentDetails.payerId}</p>
                      <p>Payment ID: {paymentDetails.paymentId}</p>
                      <p>Authorization ID: {paymentDetails.authorizationId}</p>
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
          </div>
        </div>
      </div>
    );
  }
}
