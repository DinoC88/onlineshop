import React from "react";
import {
  Button,
  DialogTitle,
  DialogActions,
  Dialog,
  Grid,
  Tooltip
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { FormattedMessage } from "react-intl";
import { styles } from "../styles";

export default function AccountHandle(props) {
  const { hoverDelete } = props;
  return (
    <Grid container style={{ textAlign: "center" }}>
      <Grid item xs={12} lg={6} sm={6}>
        <Tooltip
          disableFocusListener
          title={
            <FormattedMessage id="deleteAcc" defaultMessage="Delete Account" />
          }
        >
          <Button
            variant="contained"
            style={
              hoverDelete ? styles.onHoverButtonStyle : styles.hoverButtonStyle
            }
            onMouseEnter={props.onHoverDelete}
            onMouseLeave={props.onHoverDelete}
            onClick={props.handleClickOpen}
          >
            <Delete />
          </Button>
        </Tooltip>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {
              <FormattedMessage
                id="deleteAccDialog"
                defaultMessage="Delete Account?"
              />
            }
          </DialogTitle>

          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              <FormattedMessage id="cancel" defaultMessage="Cancel" />
            </Button>
            <Button onClick={props.onDeleteClick} color="secondary" autoFocus>
              <FormattedMessage id="confirm" defaultMessage="Confirm" />
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid item xs={12} lg={6} sm={6}>
        <Tooltip
          disableFocusListener
          title={
            <FormattedMessage
              id="editAccInfo"
              defaultMessage="Edit Account Information"
            />
          }
        >
          <Button
            variant="contained"
            color="primary"
            href={`/user/${props.userId}`}
            style={styles.buttonStyle}
          >
            <Edit />
          </Button>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
