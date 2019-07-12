import React, { Component } from "react";
import Paypal from "../../utils/Paypal";
import {
  Button,
  Snackbar,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Card,
  Hidden,
  Divider
} from "@material-ui/core";
import { styles } from "./styles";
import {
  getCartData,
  deleteCart,
  productPurchaseDelivery,
  getCurrentUser
} from "../../utils/requestManager";
import { ExpandMore, ShoppingCartTwoTone } from "@material-ui/icons";
import setAuthToken from "../../utils/setAuthToken";
import { validatePaymentInput } from "../../utils/payValidator";
import { initialInfo } from "./helper";
import Spinner from "../../utils/Spinner";
import DeliveryInfo from "./deliveryinfo/DeliveryInfo";
import PayingOptions from "./payingoptions/PayingOptions";
export default class Checkout extends Component {
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
      buyLoading: false,
      orderId: ""
    };
  }

  async componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    this.setState({ isLoading: true });
    try {
      const info = await getCurrentUser();
      initialInfo.email = info.data.email;
      initialInfo.address = info.data.address;
      initialInfo.phone = info.data.phone;
      initialInfo.firstName = info.data.firstName;
      initialInfo.lastName = info.data.lastName;
      initialInfo.zipcode = info.data.zipcode;
      initialInfo.city = info.data.city;
      const cartData = await getCartData();
      this.setState({
        cartData: cartData.data ? cartData.data.items : [],
        id: cartData.data ? cartData.data._id : null,
        confirmInfo: false,
        info: initialInfo,
        payOptions: "",
        payOptionCheck: false,
        isLoading: false
      });
      await this.calculateTotal(cartData.data.items);
    } catch (err) {
      this.setState({ error: err });
    }
  }

  calculateTotal = calc => {
    let total = calc.reduce(
      (acc, item) => (acc += item.product.price * item.quantity),
      0
    );
    this.setState({ total });
  };

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
    try {
      let response = await productPurchaseDelivery(
        this.state.info,
        this.state.total,
        this.state.cartData
      );
      this.setState({
        snackbarOpen: true,
        buyLoading: true,
        orderId: response.data.orderId
      });
      await deleteCart({ params: { id } });
      await this.props.getCartNum();
    } catch (err) {
      console.log(err);
    }
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
  render() {
    const {
      info,
      cartData,
      confirmInfo,
      errors,
      total,
      orders,
      isLoading,
      buyLoading,
      orderId
    } = this.state;
    let checkoutView;
    if (orders === null || isLoading) {
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
          <ExpansionPanel
            disabled={this.state.payOptions === "" ? true : false}
            expanded={this.state.payOptions === "" ? false : true}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <h5>Step 3: Confirm purchase</h5>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={styles.panelContent}>
              <div>
                <h5 style={styles.headerStyle}>Please confirm purchase</h5>
                <div style={styles.informationStyle}>
                  <Snackbar
                    open={this.state.snackbarOpen}
                    message={"You have made order!"}
                    autoHideDuration={3000}
                    onClose={() => {
                      this.setState({ snackbarOpen: false });
                      this.props.history.push(`/order/${orderId}`);
                    }}
                  />
                  <div style={styles.confirmPayStyle}>
                    {this.state.payOptions === "Pay on web" ? (
                      <Paypal
                        getCartNum={this.props.getCartNum}
                        information={info}
                        toPay={total}
                        cart={cartData}
                        id={this.state.id}
                      />
                    ) : null}
                    {this.state.payOptions === "Pay on delivery" ? (
                      !buyLoading ? (
                        <Button
                          onClick={this.onDeliveryPay}
                          color="primary"
                          variant="contained"
                        >
                          Pay on Delivery
                        </Button>
                      ) : (
                        <h5 style={styles.transactionMsgStyle}>
                          Transaction Processing. Please wait!
                        </h5>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
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
