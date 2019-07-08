import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import {
  Grid,
  Divider,
  Card,
  TextField,
  Tooltip,
  Hidden
} from "@material-ui/core";
import setAuthToken from "../../../utils/setAuthToken";
import { getCurrentUser, editUserInfo } from "../../../utils/requestManager";
import { styles } from "./styles";
import Spinner from "../../../utils/Spinner";
import { KeyboardArrowLeft, AccountCircle } from "@material-ui/icons";
export default class ConteditAccountContainer extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      city: "",
      address: "",
      zipcode: "",
      phone: "",
      password: "",
      userId: ""
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = async e => {
    e.preventDefault();
    const newUserInfo = {
      name: this.state.username,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      city: this.state.city,
      zipcode: this.state.zipcode,
      address: this.state.address,
      phone: this.state.phone,
      userid: this.state.userId
    };
    try {
      await editUserInfo(newUserInfo);
      await this.props.history.push("/users/current");
    } catch (err) {
      this.setState({ errors: err.response.data });
    }
  };
  render() {
    const { isLoading } = this.state;
    let editAccView;
    if (isLoading) {
      editAccView = <Spinner />;
    } else {
      editAccView = (
        <form noValidate onSubmit={this.onSubmit}>
          <Grid container>
            <Grid item xs={12} lg={6} sm={6}>
              <TextField
                inputProps={styles.inputPropsStyle}
                style={styles.textFieldStyle}
                label="USERNAME"
                value={this.state.username}
                margin="normal"
                onChange={this.onChange}
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
                onChange={this.onChange}
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
                onChange={this.onChange}
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
                onChange={this.onChange}
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
                onChange={this.onChange}
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
                onChange={this.onChange}
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
                onChange={this.onChange}
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
                onChange={this.onChange}
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
                {editAccView}
              </div>
              <Hidden xsDown>
                <Divider />
              </Hidden>
              <Grid container style={{ textAlign: "center" }}>
                <Grid item xs={12} lg={6} sm={6}>
                  <Tooltip disableFocusListener title="Go back">
                    <div>
                      <Button
                        onClick={() => {
                          this.props.history.push("/users/current");
                        }}
                        style={styles.buttonStyle}
                        variant="contained"
                        color="secondary"
                      >
                        <KeyboardArrowLeft />
                      </Button>
                    </div>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} lg={6} sm={6}>
                  <Button
                    style={styles.buttonStyle}
                    onClick={this.onSubmit}
                    variant="contained"
                    color="primary"
                  >
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </div>
      </div>
    );
  }
}
