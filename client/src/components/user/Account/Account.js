import React, { Component } from "react";
import { Divider, Grid, Card, Hidden } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import setAuthToken from "../../../utils/setAuthToken";
import { styles } from "./styles";
import { connect } from "react-redux";
import { fetchCurrentUser, deleteCurrUser } from "../../../actions/userActions";
import PropTypes from "prop-types";
import AccountInfo from "./AccountInfo/AccountInfo";
import AccountHandle from "./AccountHandle/AccountHandle";

class Account extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      hoverDelete: false
    };
  }
  async componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    await this.props.fetchCurrentUser();
  }
  onDeleteClick = async () => {
    this.props.deleteCurrUser();
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isAdmin");
    setAuthToken();
    await this.props.history.push("/login");
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
    const { userInfo, isLoading } = this.props;
    const { hoverDelete } = this.state;
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
              <AccountInfo userInfo={userInfo} isLoading={isLoading} />
            </div>
            <Hidden xsDown>
              <Divider />
            </Hidden>
            <AccountHandle
              hoverDelete={hoverDelete}
              onHoverDelete={this.onHoverDelete}
              handleClickOpen={this.handleClickOpen}
              handleClose={this.handleClose}
              onDeleteClick={this.onDeleteClick}
              userId={userInfo.id}
              open={this.state.open}
            />
          </Card>
        </Grid>
      </div>
    );
  }
}

Account.propTypes = {
  fetchCurrentUser: PropTypes.func.isRequired,
  deleteCurrUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
  isLoading: state.user.isLoading
});

export default connect(
  mapStateToProps,
  { fetchCurrentUser, deleteCurrUser }
)(Account);
