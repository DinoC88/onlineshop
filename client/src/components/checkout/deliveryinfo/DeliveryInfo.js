import React, { Component } from "react";
import { personalFields, addressFields } from "../helper";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { styles } from "../styles";
import { FormattedMessage } from "react-intl";

export default class DeliveryInfo extends Component {
  render() {
    return (
      <div>
        <ExpansionPanel
          defaultExpanded={true}
          disabled={this.props.confirmInfo ? true : false}
          expanded={!this.props.confirmInfo ? true : false}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <h5 style={styles.headerStyle}>
              <FormattedMessage
                id="checkOutText1"
                defaultMessage="Step 1: Delivery information"
              />
            </h5>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={styles.panelContent}>
            <form noValidate onSubmit={this.props.onInfoSubmit}>
              <Grid container>
                <Grid item xs={12} lg={6}>
                  <div style={styles.inputColumn}>
                    <h4 style={styles.headerStyle}>
                      <FormattedMessage
                        id="personalDetails"
                        defaultMessage="Personal details"
                      />
                    </h4>
                    {personalFields.map(i => (
                      <FormControl
                        key={i.keyName}
                        style={styles.formStyle}
                        required
                      >
                        <InputLabel htmlFor={i.keyName}>
                          {
                            <FormattedMessage
                              id={i.keyName}
                              defaultMessage={i.label}
                            />
                          }
                        </InputLabel>
                        <Input
                          id={i.keyName}
                          name={i.keyName}
                          value={this.props.info[i.keyName]}
                          autoComplete={i.keyName}
                          onChange={this.props.onInfoChange}
                        />
                        {this.props.errors[i.keyName] && (
                          <div style={styles.warningStyle}>
                            {this.props.errors[i.keyName]}
                          </div>
                        )}
                      </FormControl>
                    ))}
                  </div>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <div style={styles.inputColumn}>
                    <h4 style={styles.headerStyle}>
                      <FormattedMessage
                        id="yourAddress"
                        defaultMessage="Your address"
                      />
                    </h4>
                    {addressFields.map(i => (
                      <FormControl
                        key={i.keyName}
                        style={styles.formStyle}
                        required
                      >
                        <InputLabel htmlFor={i.keyName}>
                          {
                            <FormattedMessage
                              id={i.keyName}
                              defaultMessage={i.label}
                            />
                          }
                        </InputLabel>
                        <Input
                          id={i.keyName}
                          name={i.keyName}
                          value={this.props.info[i.keyName]}
                          autoComplete={i.keyName}
                          onChange={this.props.onInfoChange}
                        />
                        {this.props.errors[i.keyName] && (
                          <div style={styles.warningStyle}>
                            {this.props.errors[i.keyName]}
                          </div>
                        )}
                      </FormControl>
                    ))}
                    <div>
                      <Button
                        style={{ margin: 32 }}
                        type="submit"
                        color="primary"
                        variant="contained"
                      >
                        <FormattedMessage
                          id="confirm"
                          defaultMessage="Confirm"
                        />
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
