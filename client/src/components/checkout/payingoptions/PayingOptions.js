import React, { Component } from "react";
import { styles } from "../styles";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { FormattedMessage } from "react-intl";

export default class PayingOptions extends Component {
  render() {
    const { payOptionCheck, confirmInfo } = this.props;
    return (
      <div>
        <ExpansionPanel
          disabled={!confirmInfo ? true : false}
          expanded={confirmInfo ? (payOptionCheck ? false : true) : false}
        >
          <ExpansionPanelSummary
            onClick={this.props.onExpandClickPay}
            expandIcon={<ExpandMore />}
          >
            <h5 style={styles.headerStyle}>
              <FormattedMessage
                id="checkOutText2"
                defaultMessage="Step 2: Paying options"
              />
            </h5>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={styles.panelContent}>
            <div>
              <h5 style={styles.headerStyle}>
                <FormattedMessage
                  id="choosePayOpt"
                  defaultMessage="Please choose option"
                />
              </h5>
              <div style={styles.informationStyle}>
                <FormControl style={styles.formStyle} required>
                  <InputLabel>
                    <FormattedMessage
                      id="payOption"
                      defaultMessage="Pay option"
                    />
                  </InputLabel>
                  <Select
                    inputProps={{
                      name: "payOptions"
                    }}
                    value={this.props.payOptions}
                    onChange={this.props.handleDrawerChange}
                  >
                    <MenuItem value="Pay on delivery">
                      <FormattedMessage
                        id="payOnDelivery"
                        defaultMessage="Pay on delivery"
                      />
                    </MenuItem>
                    <MenuItem value="Pay on web">
                      <FormattedMessage
                        id="payOnWeb"
                        defaultMessage="Pay on web"
                      />
                    </MenuItem>
                  </Select>
                  <Drawer
                    docked={false}
                    open={this.props.drawerOpen}
                    onRequestChange={this.props.toggleDrawer}
                  />
                </FormControl>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
