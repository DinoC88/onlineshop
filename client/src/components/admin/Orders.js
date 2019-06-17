import React, { Component } from "react";
import { styles } from "./styles";
import { getOrders } from "../../utils/requestManager";
import {
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell
} from "@material-ui/core";
import * as moment from "moment";

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }
  componentDidMount() {
    getOrders().then(res => {
      this.setState({
        orders: res.data.orders
      });
    });
  }

  render() {
    return (
      <div style={styles.pageContainer}>
        <h2 style={styles.headerStyle}>Orders</h2>
        <hr />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.orders.map((order, index) => {
              console.log(order);
              return (
                <TableRow key={index}>
                  <TableCell>
                    <a href={`/order/${order._id}`}>Order #{index + 1}</a>
                  </TableCell>
                  <TableCell>{moment(order.date).format("ll")}</TableCell>
                  <TableCell>
                    {order.deliveryInfo.firstname +
                      " " +
                      order.deliveryInfo.lastname}
                  </TableCell>
                  <TableCell>{order.deliveryInfo.phone}</TableCell>

                  <TableCell>{order.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}
