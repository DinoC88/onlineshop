import React, { Component } from "react";
import {
  Divider,
  Button,
  DialogTitle,
  DialogActions,
  Dialog
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import setAuthToken from "../../../utils/setAuthToken";
import * as numeral from "numeral";
import * as moment from "moment";
import { getCurrentUser, deleteCurrentUser } from "../user-helper";

const styles = {
  accountContainer: {
    minHeight: "100vh",
    margin: "0 6px",
    marginTop: "20px",
    border: "1px solid #ffffff00"
  },
  account: {
    display: "flex",
    flexDirection: "row",
    marginTop: "20px"
  },
  accountInfo: {
    width: "50%",
    marginBottom: "30px",
    marginTop: "20px"
  },
  accountContainerTop: {
    display: "flex",
    justifyContent: "space-between"
  },
  userInfo: {
    marginTop: "20px"
  },
  editButton: {
    marginRight: "20px",
    color: "white"
  },
  deleteButton: {
    color: "white"
  },
  addButton: {
    color: "white",
    marginRight: 20,
    marginTop: 20
  },
  accountHistory: {
    width: "50%",
    marginBottom: "50px",
    marginTop: "20px"
  },
  orders: {
    width: "100%",
    margin: "10px auto",
    borderSpacing: "0"
  },
  th: {
    padding: "5px 5px",
    backgroundColor: "#00bcd4",
    color: "white",
    textAlign: "left"
  },
  td: {
    paddingBottom: "12px 5px",
    textAlign: "left",
    borderBottom: "1px solid #00bcd4"
  }
};

export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      email: "",
      name: "",
      address: "",
      phone: "",
      orders: "",
      isLoading: false,
      data: null,
      errors: null,
      open: false
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    getCurrentUser()
      .then(res => {
        this.setState({
          email: res.data.email,
          userId: res.data.id,
          name: res.data.name,
          address: res.data.address,
          phone: res.data.phone,
          orders: res.data.orders
        });
      })
      .catch(err =>
        this.setState({
          isLoading: false,
          errors: err
        })
      );
  }
  onDeleteClick = () => {
    deleteCurrentUser()
      .then(res => {
        localStorage.removeItem("jwtToken");
        setAuthToken();
        this.props.history.push("/login");
      })
      .catch(err => this.setState({ errors: err }));
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div style={styles.accountContainer}>
        <h1>Your Account</h1>
        <div style={styles.account}>
          <div style={styles.accountInfo}>
            <div style={styles.accountContainerTop}>
              <h2>Info</h2>
            </div>
            <Divider />
            <div style={styles.userInfo}>
              <p>
                <b>Username: </b>
                {this.state.name}
              </p>
              <p>
                <b>E-mail: </b>
                {this.state.email}
              </p>
              <p>
                <b>Address: </b>
                {this.state.address}
              </p>
              <p>
                <b>Phone: </b>
                {this.state.phone}
              </p>
              <Button
                style={styles.editButton}
                variant="contained"
                color="primary"
                href={`/user/${this.state.userId}`}
              >
                Edit Info
                <EditIcon />
              </Button>
              <Button
                style={styles.deleteButton}
                variant="contained"
                color="secondary"
                onClick={this.handleClickOpen}
              >
                Delete
                <DeleteIcon />
              </Button>
              <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {"Delete Account?"}
                </DialogTitle>

                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={this.onDeleteClick}
                    color="secondary"
                    autoFocus
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          <div className="account-history" style={styles.accountHistory}>
            <h2>Order History</h2>
            <Divider />
            <div className="orders">
              {this.state.orders.length ? (
                <table style={styles.orders}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Date Created</th>
                      <th style={styles.th}>Product Name</th>
                      <th style={styles.th}>Price</th>
                      <th style={styles.th}>Qty</th>
                      <th style={styles.th}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.orders.map((order, index) => {
                      return (
                        <tr style={styles.td} key={index}>
                          <td>{moment(order.dateCreated).format("ll")}</td>
                          <td>{order.name}</td>
                          <td>{numeral(order.price).format("$0,0.00")}</td>
                          <td>{order.quantity}</td>
                          <td>
                            {numeral(
                              parseInt(order.price) * parseInt(order.quantity)
                            ).format("$0,0.00")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <h1>No order history</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
