import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import setAuthToken from "../../../utils/setAuthToken";
import { getCurrentUser, editUserInfo } from "../../../utils/requestManager";
import { styles } from "./styles";
export default class EditAccount extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      userId: ""
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
        console.log(res.data);
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
      phone: this.state.phone,
      userid: this.state.userId
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
              <FormControl style={styles.formStyle} required>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  name="name"
                  value={this.state.name}
                  autoComplete="name"
                  onChange={this.onChange}
                  required
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
                  required
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
                  required
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
                  required
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
