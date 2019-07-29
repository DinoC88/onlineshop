import React from "react";
import { Grid, Tooltip, Button } from "@material-ui/core";
import { styles } from "../styles";
import { KeyboardArrowLeft } from "@material-ui/icons";
import { FormattedMessage } from "react-intl";

export default function EditAccountHandle(props) {
  return (
    <Grid container style={{ textAlign: "center" }}>
      <Grid item xs={12} lg={6} sm={6}>
        <Tooltip
          disableFocusListener
          title={<FormattedMessage id="goBack" defaultMessage="Go back" />}
        >
          <Button
            onClick={props.onBackClick}
            style={
              props.hoverBack
                ? styles.onHoverButtonStyle
                : styles.hoverButtonStyle
            }
            onMouseEnter={props.onHoverBack}
            onMouseLeave={props.onHoverBack}
            variant="contained"
          >
            <KeyboardArrowLeft />
          </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={12} lg={6} sm={6}>
        <Button
          style={styles.buttonStyle}
          onClick={props.onSubmit}
          variant="contained"
          color="primary"
        >
          <FormattedMessage id="confirm" defaultMessage="Confirm" />
        </Button>
      </Grid>
    </Grid>
  );
}
