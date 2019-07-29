import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Tooltip
} from "@material-ui/core";
import { KeyboardArrowLeft, Payment } from "@material-ui/icons";
import { FormattedMessage } from "react-intl";
import { styles } from "../styles";
export default function OrderHandle(props) {
  const { paymentDetails, open } = props;
  return (
    <Grid container style={{ textAlign: "center" }}>
      <Grid item xs={12} lg={6} sm={6}>
        <Tooltip
          disableFocusListener
          title={<FormattedMessage id="goBack" defaultMessage="Go back" />}
        >
          <span>
            <Button
              onClick={props.onBackClick}
              style={styles.buttonStyle}
              variant="contained"
              color="secondary"
            >
              <KeyboardArrowLeft />
            </Button>
          </span>
        </Tooltip>
      </Grid>
      <Grid item xs={12} lg={6} sm={6}>
        {paymentDetails.bin || paymentDetails.payerEmail ? (
          <div>
            <Tooltip
              disableFocusListener
              title={
                <FormattedMessage
                  id="paymentDetails"
                  defaultMessage="Payment Details"
                />
              }
            >
              <span>
                <Button
                  style={styles.buttonStyle}
                  variant="contained"
                  color="primary"
                  onClick={props.handleClickOpen}
                >
                  <Payment />
                </Button>
              </span>
            </Tooltip>
            <Dialog
              onClose={props.handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <DialogTitle>
                <FormattedMessage
                  id="paymentDetails"
                  defaultMessage="Payment Details"
                />
              </DialogTitle>
              {paymentDetails.bin ? (
                <DialogContent>
                  <p>Bin: {paymentDetails.bin}</p>
                  <p>
                    <FormattedMessage
                      id="cardType"
                      defaultMessage="Card Type"
                    />
                    : {paymentDetails.cardType}
                  </p>
                  <p>
                    <FormattedMessage
                      id="expDate"
                      defaultMessage="Expiration date"
                    />
                    : {paymentDetails.expirationDate}
                  </p>
                  <p>
                    <FormattedMessage
                      id="customerLoc"
                      defaultMessage="Customer location"
                    />
                    : {paymentDetails.customerLocation}
                  </p>
                  <p>
                    <FormattedMessage id="last4" defaultMessage="Last 4" />:{" "}
                    {paymentDetails.last4}
                  </p>
                  <p>
                    <FormattedMessage
                      id="maskNum"
                      defaultMessage="Masked Number"
                    />
                    : {paymentDetails.maskedNumber}
                  </p>
                </DialogContent>
              ) : (
                <DialogContent>
                  <p>
                    <FormattedMessage id="payerId" defaultMessage="Payer ID" />:{" "}
                    {paymentDetails.payerId}
                  </p>
                  <p>
                    <FormattedMessage
                      id="paymentId"
                      defaultMessage="Payment ID"
                    />{" "}
                    : {paymentDetails.paymentId}
                  </p>
                  <p>
                    <FormattedMessage
                      id="authId"
                      defaultMessage="Authorization ID"
                    />{" "}
                    : {paymentDetails.authorizationId}
                  </p>
                  <p>
                    <FormattedMessage
                      id="payerEmail"
                      defaultMessage="Payer email"
                    />{" "}
                    : {paymentDetails.payerEmail}
                  </p>
                  <p>
                    <FormattedMessage
                      id="payerName"
                      defaultMessage="Payer name"
                    />{" "}
                    :{" "}
                    {paymentDetails.payerFirstName +
                      " " +
                      paymentDetails.payerLastName}
                  </p>
                  <p>
                    <FormattedMessage
                      id="payerStatus"
                      defaultMessage="Payer status"
                    />{" "}
                    : {paymentDetails.payerStatus}
                  </p>
                  <p>
                    <FormattedMessage
                      id="transFee"
                      defaultMessage="Transaction fee"
                    />{" "}
                    : {paymentDetails.transactionFee}
                    {paymentDetails.transactionFeeCurrency}
                  </p>
                </DialogContent>
              )}
              <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                  <FormattedMessage id="close" defaultMessage="Close" />
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : null}
      </Grid>
    </Grid>
  );
}
