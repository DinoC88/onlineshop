import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";

const DownloadButton = withStyles(theme => ({
  root: {
    backgroundColor: "#2b9e82",
    "&:hover": {
      backgroundColor: "#1e705c"
    },
    minWidth: 124,
    maxWidth: 124,
    borderRadius: 12,
    margin: 16,
    maxHeight: 45,
    minHeight: 45,
    color: "#ffffff"
  }
}))(Button);

export default class CustomizedButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <DownloadButton variant="contained" onClick={this.props.cvRedirect}>
          <FormattedMessage id="viewCV" defaultMessage="View CV" />
        </DownloadButton>
      </div>
    );
  }
}
