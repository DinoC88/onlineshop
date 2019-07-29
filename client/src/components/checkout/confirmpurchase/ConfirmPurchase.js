import React from "react";
import PayonWeb from "./PayonWeb";
import {
  Button,
  Snackbar,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { styles } from "../styles";
import { ExpandMore } from "@material-ui/icons";
import { FormattedMessage } from "react-intl";

export default function ConfirmPurchase(props) {
  return (
    <div>
      <ExpansionPanel
        disabled={props.payOptions === "" ? true : false}
        expanded={props.payOptions === "" ? false : true}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <h5 style={styles.headerStyle}>
            <FormattedMessage
              id="checkOutText3"
              defaultMessage="Step 3: Confirm the purchase"
            />
          </h5>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={styles.panelContent}>
          <div>
            <h5 style={styles.headerStyle}>
              <FormattedMessage
                id="confirmPurchase"
                defaultMessage="Please confirm purchase"
              />
            </h5>
            <div style={styles.informationStyle}>
              <Snackbar
                open={props.snackbarOpen}
                message={
                  <FormattedMessage
                    id="madeOrderSnack"
                    defaultMessage="You have made the order"
                  />
                }
                autoHideDuration={3000}
                onClose={props.onSnackbarClose}
              />
              <div style={styles.confirmPayStyle}>
                {props.payOptions === "Pay on web" ? (
                  <PayonWeb
                    getCartNum={props.fetchCart}
                    information={props.info}
                    toPay={props.total}
                    cart={props.cartData}
                    id={props.id}
                  />
                ) : null}
                {props.payOptions === "Pay on delivery" ? (
                  !props.buyLoading ? (
                    <Button
                      onClick={props.onDeliveryPay}
                      color="primary"
                      variant="contained"
                    >
                      <FormattedMessage
                        id="payOnDelivery"
                        defaultMessage="Pay on Delivery"
                      />
                    </Button>
                  ) : (
                    <h5 style={styles.transactionMsgStyle}>
                      <FormattedMessage
                        id="transMsg"
                        defaultMessage="Transaction Processing. Please wait!"
                      />
                    </h5>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
