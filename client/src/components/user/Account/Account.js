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
      open: false,
      hoverDelete: false
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
        isLoading: false,
        hoverBack: false
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
  onHoverDelete = () => {
    this.setState({
      hoverDelete: !this.state.hoverDelete
    });
  };
  render() {
    const {
      isLoading,
      hoverDelete,
      zipcode,
      address,
      city,
      phone,
      firstName,
      lastName,
      username,
      email
    } = this.state;
    let accView;
    if (isLoading) {
      accView = <Spinner />;
    } else {
      accView = (
        <form noValidate onSubmit={this.onSubmit}>
          <Grid container>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                disabled
                inputProps={
                  email ? styles.inputPropsStyle : styles.noInputPropsStyle
                }
                style={styles.textFieldStyle}
                label="Username"
                value={username ? username : "Information is missing"}
                margin="normal"
                name="username"
              />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                disabled
                inputProps={
                  email ? styles.inputPropsStyle : styles.noInputPropsStyle
                }
                style={styles.textFieldStyle}
                label="Email"
                value={email ? email : "Information is missing"}
                margin="normal"
                name="email"
              />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                disabled
                inputProps={
                  firstName ? styles.inputPropsStyle : styles.noInputPropsStyle
                }
                style={styles.textFieldStyle}
                label="First Name"
                value={firstName ? firstName : "Information is missing"}
                margin="normal"
                name="firstName"
              />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                disabled
                inputProps={
                  lastName ? styles.inputPropsStyle : styles.noInputPropsStyle
                }
                style={styles.textFieldStyle}
                label="Last Name"
                value={lastName ? lastName : "Information is missing"}
                margin="normal"
                name="lastName"
              />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                disabled
                inputProps={
                  phone ? styles.inputPropsStyle : styles.noInputPropsStyle
                }
                style={styles.textFieldStyle}
                label="Phone"
                value={phone ? phone : "Information is missing"}
                margin="normal"
                name="phone"
              />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                disabled
                inputProps={
                  city ? styles.inputPropsStyle : styles.noInputPropsStyle
                }
                style={styles.textFieldStyle}
                label="City"
                value={city ? city : "Information is missing"}
                margin="normal"
                name="city"
              />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                disabled
                inputProps={
                  address ? styles.inputPropsStyle : styles.noInputPropsStyle
                }
                style={styles.textFieldStyle}
                label="Address"
                value={address ? address : "Information is missing"}
                margin="normal"
                name="address"
              />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                disabled
                inputProps={
                  zipcode ? styles.inputPropsStyle : styles.noInputPropsStyle
                }
                style={styles.textFieldStyle}
                label="Zip Code"
                value={zipcode ? zipcode : "Information is missing"}
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
        <Grid style={{ padding: 16 }} container>
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
                  <Button
                    variant="contained"
                    style={
                      hoverDelete
                        ? styles.onHoverButtonStyle
                        : styles.hoverButtonStyle
                    }
                    onMouseEnter={this.onHoverDelete}
                    onMouseLeave={this.onHoverDelete}
                    onClick={this.handleClickOpen}
                  >
                    <Delete />
                  </Button>
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
                <Tooltip disableFocusListener title="Edit Account Information">
                  <Button
                    variant="contained"
                    color="primary"
                    href={`/user/${this.state.userId}`}
                    style={styles.buttonStyle}
                  >
                    <Edit />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </div>
    );
  }
}
