import React, { Component } from "react";
import { Grid, Card, Hidden, Divider } from "@material-ui/core";
import { styles } from "./styles";
import { ShoppingCartTwoTone } from "@material-ui/icons";
import setAuthToken from "../../utils/setAuthToken";
import { validatePaymentInput } from "../../utils/payValidator";
import { initialInfo } from "./helper";
import Spinner from "../../utils/Spinner";
import DeliveryInfo from "./deliveryinfo/DeliveryInfo";
import PayingOptions from "./payingoptions/PayingOptions";
import { connect } from "react-redux";
import { fetchCart, delCart } from "../../actions/cartActions";
import { fetchCurrentUser } from "../../actions/userActions";
import { fetchDeliveryPurchase } from "../../actions/orderAction";
import PropTypes from "prop-types";
import decode from "jwt-decode";
import ConfirmPurchase from "./confirmpurchase/ConfirmPurchase";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: [],
      errors: {},
      id: null,
      info: initialInfo,
      payOptions: "",
      confirmPayOpt: false,
      drawerOpen: false,
      confirmInfo: false,
      total: 0,
      isLoading: false,
      snackbarOpen: false,
      buyLoading: false
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    let decoded = decode(token);
    this.setState({
      payOptions: "",
      payOptionCheck: false,
      isLoading: false,
      confirmInfo: false
    });
    await this.props.fetchCurrentUser();
    await this.props.fetchCart(decoded._id);
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo) {
      const userInfo = nextProps.userInfo;
      initialInfo.email = userInfo.email;
      initialInfo.address = userInfo.address;
      initialInfo.phone = userInfo.phone;
      initialInfo.firstName = userInfo.firstName;
      initialInfo.lastName = userInfo.lastName;
      initialInfo.zipcode = userInfo.zipcode;
      initialInfo.city = userInfo.city;
    }
    if (nextProps.cart) {
      const cart = nextProps.cart;
      this.setState({
        cartData: cart.items,
        id: cart._id,
        info: initialInfo
      });
    }
    if (nextProps.total) {
      this.setState({ total: nextProps.total });
    }
  }

  onInfoChange = e => {
    const inputChange = { ...this.state.info };
    inputChange[e.target.name] = e.target.value;
    this.setState({ info: inputChange });
  };

  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleDrawerChange = e => {
    this.setState({ [e.target.name]: e.target.value, payOptionCheck: true });
  };

  onExpandClickInfo = () => {
    this.setState({
      confirmInfo: !this.state.confirmInfo
    });
  };

  onExpandClickPay = () => {
    this.setState({
      payOptionCheck: !this.state.payOptionCheck
    });
  };

  onDeliveryPay = async e => {
    const { id } = this.state;
    e.preventDefault();
    await this.props.fetchDeliveryPurchase(
      this.state.info,
      this.state.total,
      this.state.cartData
    );
    this.setState({
      snackbarOpen: true,
      buyLoading: true
    });
    await this.props.delCart({ params: { id } });
  };

  onInfoSubmit = e => {
    e.preventDefault();
    const info = {
      firstName: this.state.info.firstName,
      lastName: this.state.info.lastName,
      email: this.state.info.email,
      phone: this.state.info.phone,
      address: this.state.info.address,
      city: this.state.info.city,
      zipcode: this.state.info.zipcode
    };
    const { errors, isValid } = validatePaymentInput(info);
    if (!isValid) {
      this.setState({ errors });
    } else {
      this.setState({ info, confirmInfo: true });
    }
  };

  onSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
    this.props.history.push(`/order/${this.props.orderId}`);
  };
  render() {
    const {
      info,
      cartData,
      confirmInfo,
      errors,
      total,
      isLoading,
      buyLoading
    } = this.state;
    let checkoutView;
    if (isLoading) {
      checkoutView = <Spinner />;
    } else {
      checkoutView = (
        <div>
          <DeliveryInfo
            onExpandClickInfo={this.onExpandClickInfo}
            confirmInfo={confirmInfo}
            info={info}
            errors={errors}
            onInfoSubmit={this.onInfoSubmit}
            onInfoChange={this.onInfoChange}
          />
          <PayingOptions
            onExpandClickPay={this.onExpandClickPay}
            confirmInfo={confirmInfo}
            payOptionCheck={this.state.payOptionCheck}
            payOptions={this.state.payOptions}
            handleDrawerChange={this.handleDrawerChange}
            drawerOpen={this.state.drawerOpen}
            toggleDrawer={this.toggleDrawer}
          />
          <ConfirmPurchase
            payOptions={this.state.payOptions}
            snackbarOpen={this.state.snackbarOpen}
            onSnackbarClose={this.onSnackbarClose}
            info={info}
            id={this.state.id}
            cartData={cartData}
            total={total}
            fetchCart={this.props.fetchCart}
            onDeliveryPay={this.onDeliveryPay}
            buyLoading={buyLoading}
            orderId={this.props.orderId}
          />
        </div>
      );
    }
    return (
      <div style={styles.pageContainer}>
        <div style={styles.pageMarginTop}>
          <Grid container>
            <Card style={styles.checkoutCardStyle}>
              <div style={styles.checkoutStyle}>
                <Hidden xsDown>
                  <div style={styles.headerStyle}>
                    <Divider style={{ marginTop: 50 }} />
                    <ShoppingCartTwoTone style={styles.imgStyle} />
                  </div>
                </Hidden>
                {checkoutView}
              </div>
            </Card>
          </Grid>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  fetchCurrentUser: PropTypes.func.isRequired,
  delCart: PropTypes.func.isRequired,
  fetchCart: PropTypes.func.isRequired,
  fetchDeliveryPurchase: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  userInfo: state.user.userInfo,
  cartItems: state.cart.cartItems,
  cart: state.cart.cart,
  total: state.cart.total,
  userId: state.user.userId,
  orderId: state.order.orderId
});

export default connect(
  mapStateToProps,
  { fetchCart, fetchCurrentUser, fetchDeliveryPurchase, delCart }
)(Checkout);
