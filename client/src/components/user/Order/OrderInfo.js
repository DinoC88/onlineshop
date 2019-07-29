import React, { Component } from "react";
import {
  Select,
  FormControl,
  MenuItem,
  Drawer,
  Grid,
  Divider,
  InputLabel,
  TextField
} from "@material-ui/core";
import * as moment from "moment";
import * as numeral from "numeral";
import { styles } from "./styles";
import checkAdmin from "../../../utils/checkAdmin";
import { FormattedMessage } from "react-intl";

export default class OrderInfo extends Component {
  render() {
    const total = this.props.products.reduce(
      (acc, item) => (acc += item.price * item.quantity),
      0
    );
    return (
      <Grid container>
        <Grid item xs={12} lg={4}>
          <div style={styles.textPosition}>
            <h5 style={{ marginBottom: 16 }}>
              <FormattedMessage
                id="orderDetails"
                defaultMessage="Order details"
              />
            </h5>
            <p>
              Name: {this.props.deliveryInfo.firstname}{" "}
              {this.props.deliveryInfo.lastname}
            </p>
            <p>
              <FormattedMessage id="phone" defaultMessage="Phone" />:{" "}
              {this.props.deliveryInfo.phone}
            </p>
            <p>Email: {this.props.deliveryInfo.email}</p>
            <p>
              <FormattedMessage id="address" defaultMessage="Address" />:{" "}
              {this.props.deliveryInfo.address}, {this.props.deliveryInfo.city},{" "}
              {this.props.deliveryInfo.zipcode}
            </p>
            <p>
              <FormattedMessage id="date" defaultMessage="Date" />:{" "}
              {moment(this.props.order.date).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <div
              style={{
                marginLeft: 0,
                display: "flex",
                justifyContent: "row"
              }}
            >
              {checkAdmin() ? (
                <FormControl>
                  <InputLabel>Status</InputLabel>
                  <Select
                    inputProps={{
                      name: "orderStatus"
                    }}
                    value={this.props.orderStatus}
                    onChange={this.props.handleDrawerChange}
                  >
                    <MenuItem value="Awaiting Shipment">
                      Awaiting Shipment
                    </MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Cancelled">Canceled</MenuItem>
                    <MenuItem value="Declined">Declined</MenuItem>
                  </Select>
                  <Drawer
                    docked={false}
                    open={this.props.drawerOpen}
                    onRequestChange={this.props.toggleDrawer}
                  />
                </FormControl>
              ) : (
                <TextField
                  inputProps={styles.disabledInputPropsStyle}
                  disabled
                  label="Status"
                  value={this.props.orderStatus}
                  margin="normal"
                  style={{ width: 150 }}
                />
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={4}>
          <div style={styles.textPosition}>
            <h5 style={{ marginBottom: 16 }}>
              <FormattedMessage id="orderItems" defaultMessage="Order items" />
            </h5>
            {this.props.products.map((product, i) => {
              return (
                <div key={i}>
                  <p>Mobile: {product.name}</p>
                  <p>
                    <FormattedMessage id="price" defaultMessage="Price" />:{" "}
                    {numeral(product.price).format("$0,0.00")}
                  </p>
                  <p>
                    <FormattedMessage id="quantity" defaultMessage="Quantity" />
                    : {product.quantity}
                  </p>
                  <Divider />
                </div>
              );
            })}
            <p>
              <FormattedMessage id="total" defaultMessage="Total" />:{" "}
              {numeral(total).format("$0,0.00")}
            </p>
          </div>
        </Grid>
        <Grid item xs={12} lg={4}>
          <div style={styles.textPosition}>
            <h5 style={{ marginBottom: 16 }}>
              <FormattedMessage
                id="transDetails"
                defaultMessage="Transaction details"
              />
            </h5>
            <p>
              <FormattedMessage id="transId" defaultMessage="Transaction ID" />:{" "}
              {this.props.transaction.transactionId}
            </p>
            <p>
              <FormattedMessage id="amount" defaultMessage="Amount" />:{" "}
              {numeral(this.props.transaction.amount).format("$0,0.00")}
            </p>
            {this.props.transaction.currency ? (
              <p>
                <FormattedMessage id="currency" defaultMessage="Currency" />:{" "}
                {this.props.transaction.currency}
              </p>
            ) : null}
            <p>
              <FormattedMessage id="date" defaultMessage="Date" />:{" "}
              {moment(this.props.transaction.date).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </p>
            <p>
              <FormattedMessage
                id="paymentMethod"
                defaultMessage="Payment method"
              />
              : {this.props.transaction.paymentMethod}
            </p>
            <p>Status: {this.props.transaction.status}</p>
          </div>
        </Grid>
      </Grid>
    );
  }
}
