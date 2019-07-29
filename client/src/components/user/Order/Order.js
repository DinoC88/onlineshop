import React, { Component } from "react";
import { changeOrderStatus } from "../../../utils/requestManager";
import { styles } from "./styles";
import { Grid, Card, Hidden, Divider } from "@material-ui/core";
import OrderInfo from "./OrderInfo";
import { Payment } from "@material-ui/icons";
import Spinner from "../../../utils/Spinner";
import { fetchOrder, fetchTransaction } from "../../../actions/orderAction";
import { fetchCart } from "../../../actions/cartActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OrderHandle from "./OrderHandle/OrderHandle";
import decode from "jwt-decode";
import setAuthToken from "../../../utils/setAuthToken";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      open: false
    };
  }

  async componentWillMount() {
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    let decoded = token ? decode(token) : "";
    await this.props.fetchCart(decoded._id);

    await this.props.fetchOrder(this.props.match.params.id);
    setTimeout(() => {
      this.props.fetchTransaction(this.props.transactionId);
    }, 500);
  }

  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleDrawerChange = e => {
    changeOrderStatus(e.target.value, this.props.order._id);
    this.props.history.push("/orderhistory");
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onBackClick = () => {
    this.props.history.push("/orderhistory");
  };

  render() {
    const { order, isLoading, transaction, paymentDetails } = this.props;
    let orderInfo;
    if (isLoading) {
      orderInfo = <Spinner />;
    } else {
      orderInfo = (
        <OrderInfo
          deliveryInfo={order.deliveryInfo}
          orderStatus={order.status}
          handleDrawerChange={this.handleDrawerChange}
          drawerOpen={this.state.drawerOpen}
          toggleDrawer={this.toggleDrawer}
          products={order.products}
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
              <OrderHandle
                open={this.state.open}
                paymentDetails={paymentDetails ? paymentDetails : "Empty"}
                handleClickOpen={this.handleClickOpen}
                handleClose={this.handleClose}
                onBackClick={this.onBackClick}
              />
            </Card>
          </Grid>
        </div>
      </div>
    );
  }
}

Order.propTypes = {
  fetchOrder: PropTypes.func.isRequired,
  fetchCart: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.order.isLoading,
  order: state.order.order,
  transaction: state.order.transaction,
  transactionId: state.order.transactionId,
  paymentDetails: state.order.paymentDetails
});

export default connect(
  mapStateToProps,
  { fetchCart, fetchOrder, fetchTransaction }
)(Order);
