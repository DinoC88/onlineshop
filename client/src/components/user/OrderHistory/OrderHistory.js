import React, { Component } from "react";
import { Divider, Grid, Card, Hidden } from "@material-ui/core";
import { Assignment } from "@material-ui/icons";
import setAuthToken from "../../../utils/setAuthToken";
import { styles } from "./styles";
import { connect } from "react-redux";
import { fetchOrders, fetchAdminOrders } from "../../../actions/orderAction";
import { fetchCart } from "../../../actions/cartActions";
import PropTypes from "prop-types";
import decode from "jwt-decode";
import OrderHistoryTable from "./OrderHistoryTable/OrderHistoryTable";
import checkAdmin from "../../../utils/checkAdmin";
class OrderHistory extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1
    };
  }
  async componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    let decoded = token ? decode(token) : "";
    if (!checkAdmin()) {
      await this.props.fetchOrders(decoded.id);
    } else {
      await this.props.fetchAdminOrders();
    }
    await this.props.fetchCart(decoded._id);
  }

  newPage = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { isLoading, orders } = this.props;
    let totalPages = orders.length / 10;
    const { currentPage } = this.state;

    return (
      <div style={styles.pageContainer}>
        <Grid style={{ padding: 16 }} container>
          <Card style={styles.ordersCardStyle}>
            <div style={styles.ordersStyle}>
              <Hidden xsDown>
                <div style={styles.headerStyle}>
                  <Divider style={styles.dividerPosition} />
                  <Assignment style={styles.imgStyle} />
                </div>
              </Hidden>
              <OrderHistoryTable
                orders={orders}
                isLoading={isLoading}
                totalPages={totalPages}
                currentPage={currentPage}
                newPage={this.newPage}
              />
            </div>
          </Card>
        </Grid>
      </div>
    );
  }
}

OrderHistory.propTypes = {
  fetchOrders: PropTypes.func.isRequired,
  fetchAdminOrders: PropTypes.func.isRequired,
  fetchCart: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
  isLoading: state.order.isLoading,
  orders: state.order.orders,
  userId: state.user.userId
});

export default connect(
  mapStateToProps,
  { fetchCart, fetchOrders, fetchAdminOrders }
)(OrderHistory);
