import React, { Component } from "react";
import { styles } from "./styles";
import { getOrders } from "../../../utils/requestManager";
import {
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  Hidden,
  Button,
  Card,
  Grid,
  Divider,
  Tooltip
} from "@material-ui/core";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Assignment
} from "@material-ui/icons";
import * as moment from "moment";
import Spinner from "../../../utils/Spinner";

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isLoading: false,
      totalPages: 0,
      currentPage: 1
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    const orderList = await getOrders();
    this.setState({
      orders: orderList.data.orders,
      isLoading: false,
      totalPages: orderList.data.orders.length / 10
    });
  }
  onLeftClick = () => {
    this.setState({ currentPage: this.state.currentPage - 1 });
  };
  onRightClick = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };
  render() {
    const { orders, isLoading, currentPage, totalPages } = this.state;
    let ordersView;
    if (orders === null || isLoading) {
      ordersView = <Spinner />;
    } else {
      ordersView = (
        <div>
          {this.state.orders.length ? (
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <Hidden xsDown>
                      <TableCell>Order ID</TableCell>
                    </Hidden>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <Hidden xsDown>
                      <TableCell>Phone</TableCell>
                      <TableCell>Status</TableCell>
                    </Hidden>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders
                    .slice((currentPage - 1) * 10, currentPage * 10)
                    .map((order, index) => {
                      return (
                        <TableRow key={index}>
                          <Hidden xsDown>
                            <TableCell>
                              <a href={`/order/${order._id}`}>
                                Order #{index + 1}
                              </a>
                            </TableCell>
                          </Hidden>
                          <TableCell>
                            {moment(order.date).format("ll")}
                          </TableCell>
                          <TableCell>
                            {order.deliveryInfo.firstname +
                              " " +
                              order.deliveryInfo.lastname}
                          </TableCell>
                          <Hidden xsDown>
                            <TableCell>{order.deliveryInfo.phone}</TableCell>

                            <TableCell>{order.status}</TableCell>
                          </Hidden>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
              <Tooltip disableFocusListener title="Go back">
                <span>
                  <Button
                    disabled={currentPage === 1 ? true : false}
                    onClick={this.onLeftClick}
                  >
                    <KeyboardArrowLeft />
                  </Button>
                </span>
              </Tooltip>
              <Tooltip disableFocusListener title="Go next">
                <span>
                  <Button
                    disabled={
                      currentPage === Math.ceil(totalPages) ? true : false
                    }
                    onClick={this.onRightClick}
                  >
                    <KeyboardArrowRight />
                  </Button>
                </span>
              </Tooltip>
            </div>
          ) : (
            <h1>No order made</h1>
          )}
        </div>
      );
    }
    return (
      <div style={styles.pageContainer}>
        <div style={styles.pageMarginTop}>
          <Grid container>
            <Card style={styles.ordersCardStyle}>
              <div style={styles.ordersStyle}>
                <Hidden xsDown>
                  <div style={styles.headerStyle}>
                    <Divider style={{ marginTop: 50 }} />
                    <Assignment style={styles.imgStyle} />
                  </div>
                </Hidden>
                {ordersView}
              </div>
            </Card>
          </Grid>
        </div>
      </div>
    );
  }
}
