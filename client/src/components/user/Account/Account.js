import React, { Component } from "react";
import {
  Divider,
  Button,
  DialogTitle,
  DialogActions,
  Dialog,
  Grid,
  Tooltip,
  TextField,
  Card,
  Hidden
} from "@material-ui/core";
import { Edit, Delete, AccountCircle } from "@material-ui/icons";
import Spinner from "../../../utils/Spinner";
import setAuthToken from "../../../utils/setAuthToken";
import {
  getCurrentUser,
  deleteCurrentUser
} from "../../../utils/requestManager";
import { styles } from "./styles";

export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      userid: "",
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      city: "",
      zipcode: "",
      address: "",
      phone: "",
      errors: null,
      open: false
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    try {
      const user = await getCurrentUser();
      this.setState({
        email: user.data.email,
        userId: user.data.id,
        username: user.data.name,
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        city: user.data.city,
        zipcode: user.data.zipcode,
        address: user.data.address,
        phone: user.data.phone,
        isLoading: false
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        errors: err
      });
    }
  }
  onDeleteClick = async () => {
    try {
      deleteCurrentUser();
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("isAdmin");
      setAuthToken();
      await this.props.history.push("/login");
    } catch (err) {
      this.setState({ errors: err });
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  onLeftClick = () => {
    this.setState({ currentPage: this.state.currentPage - 1 });
  };
  onRightClick = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };
  render() {
    const { isLoading } = this.state;
    let accView;
    if (isLoading) {
      accView = <Spinner />;
    } else {
      accView = (
        <form noValidate onSubmit={this.onSubmit}>
          <Grid container>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                inputProps={styles.inputPropsStyle}
                style={styles.textFieldStyle}
                label="USERNAME"
                value={this.state.username}
                margin="normal"
                name="username"
              />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                inputProps={styles.inputPropsStyle}
                style={styles.textFieldStyle}
                label="EMAIL"
                value={this.state.email}
                margin="normal"
                name="email"
              />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                inputProps={styles.inputPropsStyle}
                style={styles.textFieldStyle}
                label="FIRST NAME"
                value={this.state.firstName}
                margin="normal"
                name="firstName"
              />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                inputProps={styles.inputPropsStyle}
                style={styles.textFieldStyle}
                label="LAST NAME"
                value={this.state.lastName}
                margin="normal"
                name="lastName"
              />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                inputProps={styles.inputPropsStyle}
                style={styles.textFieldStyle}
                label="PHONE"
                value={this.state.phone}
                margin="normal"
                name="phone"
              />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                inputProps={styles.inputPropsStyle}
                style={styles.textFieldStyle}
                label="CITY"
                value={this.state.city}
                margin="normal"
                name="city"
              />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                inputProps={styles.inputPropsStyle}
                style={styles.textFieldStyle}
                label="ADDRESS"
                value={this.state.address}
                margin="normal"
                name="address"
              />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                inputProps={styles.inputPropsStyle}
                style={styles.textFieldStyle}
                label="ZIP CODE"
                value={this.state.zipcode}
                margin="normal"
                name="zipcode"
              />
            </Grid>
          </Grid>
        </form>
      );
    }
    return (
      <div style={styles.accountContainer}>
        <div style={styles.accountMarginTop}>
          <Grid container>
            <Card style={styles.infoCardStyle}>
              <div style={styles.infoStyle}>
                <Hidden xsDown>
                  <div style={styles.headerStyle}>
                    <Divider style={styles.dividerPosition} />
                    <AccountCircle style={styles.imgStyle} />
                  </div>
                </Hidden>
                {accView}
              </div>
              <Hidden xsDown>
                <Divider />
              </Hidden>
              <Grid container style={{ textAlign: "center" }}>
                <Grid item xs={12} lg={6} sm={6}>
                  <Tooltip disableFocusListener title="Delete Account">
                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleClickOpen}
                        style={styles.buttonStyle}
                      >
                        <Delete />
                      </Button>
                    </div>
                  </Tooltip>
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
                </Grid>
                <Grid item xs={12} lg={6} sm={6}>
                  <Tooltip
                    disableFocusListener
                    title="Edit Account Information"
                  >
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        href={`/user/${this.state.userId}`}
                        style={styles.buttonStyle}
                      >
                        <Edit />
                      </Button>
                    </div>
                  </Tooltip>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </div>
      </div>
    );
  }
}
