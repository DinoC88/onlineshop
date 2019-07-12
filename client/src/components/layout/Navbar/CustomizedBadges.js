import React, { Component } from "react";
import { Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const StyledBadge = withStyles(theme => ({
  badge: {
    top: "10%",
    right: -3,
    color: "#ffffff",
    backgroundColor: "#2b9e82",
    opacity: 0.7
  }
}))(Badge);

export default class CustomizedBadges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  render() {
    return (
      <StyledBadge badgeContent={this.props.currentCartNum} showZero={true}>
        <ShoppingCartIcon />
      </StyledBadge>
    );
  }
}
