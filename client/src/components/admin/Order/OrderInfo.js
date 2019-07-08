import React, { Component } from "react";
import {
  Select,
  FormControl,
  MenuItem,
  Drawer,
  Grid,
  Divider,
  InputLabel
} from "@material-ui/core";
import * as moment from "moment";
import * as numeral from "numeral";
import { styles } from "./styles";
export default class OrderInfo extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12} lg={4}>
          <div style={styles.textPosition}>
            <h5>Order details</h5>
            <p>
              Name: {this.props.deliveryInfo.firstname}{" "}
              {this.props.deliveryInfo.lastname}
            </p>
            <p>Phone: {this.props.deliveryInfo.phone}</p>
            <p>Email: {this.props.deliveryInfo.email}</p>
            <p>
              Address: {this.props.deliveryInfo.address},{" "}
              {this.props.deliveryInfo.city}, {this.props.deliveryInfo.zipcode}
            </p>
            <p>
              Date:{" "}
              {moment(this.props.order.date).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <div
              style={{
                marginLeft: 0,
                display: "flex",
                justifyContent: "row"
              }}
            >
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
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                  <MenuItem value="Declined">Declined</MenuItem>
                </Select>
                <Drawer
                  docked={false}
                  open={this.props.drawerOpen}
                  onRequestChange={this.props.toggleDrawer}
                />
              </FormControl>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={4}>
          <div style={styles.textPosition}>
            <h5>Order items</h5>
            {this.props.products.map((product, i) => {
              return (
                <div key={i}>
                  <p>Mobile: {product.name}</p>
                  <p>Price: {numeral(product.price).format("$0,0.00")}</p>
                  <p>Quantity: {product.quantity}</p>
                  <Divider />
                </div>
              );
            })}
            <p>Total: {numeral(this.props.total).format("$0,0.00")}</p>
          </div>
        </Grid>
        <Grid item xs={12} lg={4}>
          <div style={styles.textPosition}>
            <h5>Transaction details</h5>
            <p>Transaction ID: {this.props.transaction.transactionId}</p>
            <p>
              Amount: {numeral(this.props.transaction.amount).format("$0,0.00")}
            </p>
            {this.props.transaction.currency ? (
              <p>Currency: {this.props.transaction.currency}</p>
            ) : null}
            <p>
              Date:{" "}
              {moment(this.props.transaction.date).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </p>
            <p>Payment method: {this.props.transaction.paymentMethod}</p>
            <p>Status: {this.props.transaction.status}</p>
          </div>
        </Grid>
      </Grid>
    );
  }
}
