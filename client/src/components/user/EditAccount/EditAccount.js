import React, { Component } from "react";
import { Grid, Divider, Card, Hidden } from "@material-ui/core";
import setAuthToken from "../../../utils/setAuthToken";
import { styles } from "./styles";
import { AccountCircle } from "@material-ui/icons";
import { connect } from "react-redux";
import { fetchCart } from "../../../actions/cartActions";
import { fetchCurrentUser, changeUserInfo } from "../../../actions/userActions";
import PropTypes from "prop-types";
import EditAccountInfo from "./EditAccountInfo/EditAccountInfo";
import EditAccountHandle from "./EditAccountHandle/EditAccountHandle";

class EditAccount extends Component {
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
      userId: "",
      errors: ""
    };
  }

  async componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    await this.props.fetchCurrentUser();
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.userInfo) {
      const userInfo = nextProps.userInfo;
      this.setState({
        email: userInfo.email,
        userId: userInfo.id,
        username: userInfo.name,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        city: userInfo.city,
        zipcode: userInfo.zipcode,
        address: userInfo.address,
        phone: userInfo.phone,
        hoverBack: false
      });
    }
  };
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
    await this.props.changeUserInfo(newUserInfo, this.props.history);
  };
  onHoverBack = () => {
    this.setState({
      hoverBack: !this.state.hoverBack
    });
  };
  onBackClick = () => {
    this.props.history.push("/users/current");
  };
  render() {
    const { isLoading } = this.props;
    const {
      hoverBack,
      username,
      email,
      firstName,
      lastName,
      phone,
      address,
      city,
      zipcode
    } = this.state;

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
              <EditAccountInfo
                isLoading={isLoading}
                username={username}
                email={email}
                firstName={firstName}
                lastName={lastName}
                phone={phone}
                address={address}
                city={city}
                zipcode={zipcode}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
              />
            </div>
            <Hidden xsDown>
              <Divider />
            </Hidden>
            <EditAccountHandle
              hoverBack={hoverBack}
              onHoverBack={this.onHoverBack}
              onSubmit={this.onSubmit}
              onBackClick={this.onBackClick}
            />
          </Card>
        </Grid>
      </div>
    );
  }
}

EditAccount.propTypes = {
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchCart: PropTypes.func.isRequired,
  changeUserInfo: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
  isLoading: state.user.isLoading
});

export default connect(
  mapStateToProps,
  { fetchCart, fetchCurrentUser, changeUserInfo }
)(EditAccount);
