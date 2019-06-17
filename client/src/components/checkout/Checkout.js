import React, { Component } from "react";
import Paypal from "../../utils/Paypal";
import {
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  Button,
  Snackbar,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { styles } from "./styles";
import {
  getCartData,
  deleteCart,
  productPurchaseDelivery,
  getCurrentUser
} from "../../utils/requestManager";
import ExpandMore from "@material-ui/icons/ExpandMore";
import setAuthToken from "../../utils/setAuthToken";
import { validatePaymentInput } from "../../utils/payValidator";
import { initialInfo, personalFields, addressFields } from "./helper";

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
      snackbarOpen: false
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    this.setState({ isLoading: true });
    getCurrentUser()
      .then(res => {
        initialInfo.email = res.data.email;
        initialInfo.address = res.data.address;
        initialInfo.phone = res.data.phone;
        getCartData().then(res => {
          this.setState({
            cartData: res.data ? res.data.items : [],
            id: res.data ? res.data._id : null,
            confirmInfo: false,
            info: initialInfo,
            payOptions: ""
          });
          this.calculateTotal(res.data.items);
        });
      })
      .catch(err => this.setState({ error: err }));
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
    this.setState({ [e.target.name]: e.target.value });
  };
  onDeliveryPay = e => {
    const { id } = this.state;
    e.preventDefault();
    productPurchaseDelivery(
      this.state.info,
      this.state.total,
      this.state.cartData
    )
      .then(res => {
        this.setState({ snackbarOpen: true });
        deleteCart({ params: { id } });
      })
      .catch(err => console.log(err));
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
    const { info, cartData, confirmInfo, errors, total } = this.state;
    console.log(total);
    return (
      <div style={styles.checkout}>
        <h1 style={styles.headerStyle}>Checkout</h1>
        <ExpansionPanel
          defaultExpanded={true}
          expanded={!confirmInfo ? true : false}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <h5>Step 1: Delivery information</h5>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={styles.inputColumn}>
            <div style={styles.inputColumn}>
              <form
                noValidate
                onSubmit={this.onInfoSubmit}
                style={styles.informationStyle}
              >
                <div style={styles.inputColumn}>
                  <h4>Personal details</h4>
                  {personalFields.map(i => (
                    <FormControl
                      key={i.keyName}
                      style={styles.formStyle}
                      required
                    >
                      <InputLabel htmlFor={i.keyName}>{i.label}</InputLabel>
                      <Input
                        id={i.keyName}
                        name={i.keyName}
                        value={info[i.keyName]}
                        autoComplete={i.keyName}
                        onChange={this.onInfoChange}
                      />
                      {errors[i.keyName] && (
                        <div style={styles.warningStyle}>
                          {errors[i.keyName]}
                        </div>
                      )}
                    </FormControl>
                  ))}
                </div>
                <div style={styles.inputColumn}>
                  <h4>Your address</h4>
                  {addressFields.map(i => (
                    <FormControl
                      key={i.keyName}
                      style={styles.formStyle}
                      required
                    >
                      <InputLabel htmlFor={i.keyName}>{i.label}</InputLabel>
                      <Input
                        id={i.keyName}
                        name={i.keyName}
                        value={info[i.keyName]}
                        autoComplete={i.keyName}
                        onChange={this.onInfoChange}
                      />
                      {errors[i.keyName] && (
                        <div style={styles.warningStyle}>
                          {errors[i.keyName]}
                        </div>
                      )}
                    </FormControl>
                  ))}
                  <div>
                    <Button
                      style={{ margin: 32 }}
                      type="submit"
                      color="primary"
                      variant="contained"
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          disabled={!confirmInfo ? true : false}
          expanded={!confirmInfo ? false : true}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <h5>Step 2: Paying options</h5>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={styles.inputColumn}>
            <div>
              <h5 style={styles.headerStyle}>Please choose paying option</h5>
              <div style={styles.informationStyle}>
                <FormControl style={styles.formStyle} required>
                  <InputLabel>Pay option</InputLabel>
                  <Select
                    inputProps={{
                      name: "payOptions"
                    }}
                    value={this.state.payOptions}
                    onChange={this.handleDrawerChange}
                  >
                    <MenuItem value="Pay on delivery">Pay on delivery</MenuItem>
                    <MenuItem value="Pay on web">Pay on web</MenuItem>
                  </Select>
                  <Drawer
                    docked={false}
                    open={this.state.drawerOpen}
                    onRequestChange={this.toggleDrawer}
                  />
                </FormControl>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          disabled={this.state.payOptions === "" ? true : false}
          expanded={this.state.payOptions === "" ? false : true}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <h5>Step 3: Confirm purchase</h5>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={styles.informationStyle}>
            <div>
              <h5 style={styles.headerStyle}>Please confirm purchase</h5>
              <div style={styles.informationStyle}>
                <Snackbar
                  open={this.state.snackbarOpen}
                  message={"You have made order!"}
                  autoHideDuration={3000}
                  style={{ background: "#64DD17" }}
                  onClose={() => {
                    this.setState({ snackbarOpen: false });
                    this.props.history.push("/cart");
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: 32
                  }}
                >
                  {this.state.payOptions === "Pay on web" ? (
                    <Paypal
                      information={info}
                      toPay={total}
                      cart={cartData}
                      id={this.state.id}
                    />
                  ) : null}
                  {this.state.payOptions === "Pay on delivery" ? (
                    <Button
                      onClick={this.onDeliveryPay}
                      color="primary"
                      variant="contained"
                    >
                      Pay on Delivery
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
