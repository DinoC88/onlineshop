import React from "react";
import {
  Button,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  Hidden,
  Tooltip
} from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { styles } from "../styles";
import Spinner from "../../../../utils/Spinner";
import { FormattedMessage } from "react-intl";
import * as moment from "moment";

export default function OrderHistoryTable(props) {
  const { orders, currentPage, totalPages, isLoading } = props;
  let ordersView;
  if (orders === null || isLoading) {
    ordersView = <Spinner />;
  } else {
    ordersView = (
      <div>
        {orders.length ? (
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <FormattedMessage
                      id="orderDetails"
                      defaultMessage="Order Details"
                    />
                  </TableCell>
                  <TableCell>
                    <FormattedMessage id="date" defaultMessage="Date" />
                  </TableCell>
                  <Hidden xsDown>
                    <TableCell>Name</TableCell>
                    <TableCell>
                      <FormattedMessage id="phone" defaultMessage="Phone" />
                    </TableCell>
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
                        <TableCell>
                          <a href={`/order/${order._id}`}>
                            <FormattedMessage id="view" defaultMessage="View" />
                          </a>
                        </TableCell>
                        <TableCell>{moment(order.date).format("ll")}</TableCell>
                        <Hidden xsDown>
                          <TableCell>
                            {order.deliveryInfo.firstname +
                              " " +
                              order.deliveryInfo.lastname}
                          </TableCell>
                          <TableCell>{order.deliveryInfo.phone}</TableCell>
                          <TableCell>{order.status}</TableCell>
                        </Hidden>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <Tooltip
              disableFocusListener
              title={
                <FormattedMessage id="backPage" defaultMessage="Back page" />
              }
            >
              <span>
                <Button
                  disabled={currentPage === 1 ? true : false}
                  onClick={() => props.newPage(currentPage - 1)}
                >
                  <KeyboardArrowLeft />
                </Button>
              </span>
            </Tooltip>
            <Tooltip
              disableFocusListener
              title={
                <FormattedMessage id="nextPage" defaultMessage="Next page" />
              }
            >
              <span>
                <Button
                  disabled={
                    currentPage === Math.ceil(totalPages) ? true : false
                  }
                  onClick={() => props.newPage(currentPage + 1)}
                >
                  <KeyboardArrowRight />
                </Button>
              </span>
            </Tooltip>
          </div>
        ) : (
          <h1 style={styles.noOrdersHeader}>
            <FormattedMessage id="noOrderMade" defaultMessage="No order made" />
          </h1>
        )}
      </div>
    );
  }
  return <div>{ordersView}</div>;
}
