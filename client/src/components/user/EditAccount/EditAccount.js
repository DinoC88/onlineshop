import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import setAuthToken from "../../../utils/setAuthToken";
import { getCurrentUser, editUserInfo } from "../user-helper";

const styles = {
  editAccount: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  headerStyle: {
    textAlign: "center"
  },
  buttonStyle: {
    display: "flex",
    justifyContent: "space-around",
    paddingTop: 25
  },
  formStyle: {
    marginTop: 25,
    width: 350
  }
};
export default class EditAccount extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      address: "",
      phone: "",
      password: ""
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
          phone: res.data.phone
        });
      })
      .catch(err =>
        this.setState({
          isLoading: false,
          errors: err
        })
      );
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUserInfo = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      phone: this.state.phone
    };
    editUserInfo(newUserInfo)
      .then(res => this.props.history.push("/users/current"))
      .catch(err => this.setState({ errors: err.response.data }));
  };
  render() {
    return (
      <div style={styles.editAccount}>
        <div>
          <h3 style={styles.headerStyle}>Edit Account Info</h3>
          <form noValidate onSubmit={this.onSubmit}>
            <div>
              <FormControl style={styles.formStyle}>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  name="name"
                  value={this.state.name}
                  autoComplete="name"
                  onChange={this.onChange}
                />
              </FormControl>
            </div>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  name="email"
                  value={this.state.email}
                  autoComplete="email"
                  onChange={this.onChange}
                />
              </FormControl>
            </div>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel htmlFor="address">Address</InputLabel>
                <Input
                  id="address"
                  name="address"
                  value={this.state.address}
                  autoComplete="address"
                  onChange={this.onChange}
                />
              </FormControl>
            </div>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <Input
                  id="phone"
                  name="phone"
                  value={this.state.phone}
                  autoComplete="phone"
                  onChange={this.onChange}
                />
              </FormControl>
            </div>

            <div style={styles.buttonStyle}>
              <Button type="submit" variant="contained" color="primary">
                Confirm changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
