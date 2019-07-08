import React, { Component } from "react";
import {
  Divider,
  Button,
  Grid,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  Card,
  Hidden
} from "@material-ui/core";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Assignment
} from "@material-ui/icons";
import setAuthToken from "../../../utils/setAuthToken";
import * as numeral from "numeral";
import * as moment from "moment";
import { getCurrentUser } from "../../../utils/requestManager";
import { styles } from "./styles";
import Spinner from "../../../utils/Spinner";

export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      orders: "",
      isLoading: false,
      errors: null,
      currentPage: 1,
      totalPages: 1
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    try {
      const orders = await getCurrentUser();
      this.setState({
        orders: orders.data.orderHistory,
        isLoading: false,
        totalPages: orders.data.orderHistory.length / 10
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        errors: err
      });
    }
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
              <Table style={styles.tableStyle}>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Product Name</TableCell>
                    <Hidden xsDown>
                      <TableCell>Price</TableCell>
                      <TableCell>Qty</TableCell>
                      <TableCell>Total</TableCell>
                    </Hidden>
                  </TableRow>
                </TableHead>
                <TableBody style={styles.tableBodyWidth}>
                  {this.state.orders
                    .slice((currentPage - 1) * 10, currentPage * 10)
                    .map((order, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            {moment(order.dateCreated).format("ll")}
                          </TableCell>
                          <TableCell>{order.name}</TableCell>
                          <Hidden xsDown>
                            <TableCell>
                              {numeral(order.price).format("$0,0.00")}
                            </TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>
                              {numeral(
                                parseInt(order.price) * parseInt(order.quantity)
                              ).format("$0,0.00")}
                            </TableCell>
                          </Hidden>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
              <div>
                <Button
                  disabled={currentPage === 1 ? true : false}
                  onClick={this.onLeftClick}
                >
                  <KeyboardArrowLeft />
                </Button>
                <Button
                  disabled={
                    currentPage === Math.ceil(totalPages) ? true : false
                  }
                  onClick={this.onRightClick}
                >
                  <KeyboardArrowRight />
                </Button>
              </div>
            </div>
          ) : (
            <h1>No order history</h1>
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
                    <Divider style={styles.dividerPosition} />
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
