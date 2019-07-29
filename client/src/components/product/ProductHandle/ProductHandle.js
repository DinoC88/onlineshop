import React from "react";
import { styles } from "../styles";
import * as numeral from "numeral";
import {
  Button,
  DialogTitle,
  DialogActions,
  Dialog,
  Hidden,
  Tooltip
} from "@material-ui/core";
import { AddShoppingCart, KeyboardArrowLeft, Delete } from "@material-ui/icons";
import checkAdmin from "../../../utils/checkAdmin";
import checkAuth from "../../../utils/checkAuth";
import { FormattedMessage } from "react-intl";

export default function ProductHandle(props) {
  let { product, hoverBack, hoverDelete, quantity } = props;
  return (
    <div style={styles.productHandle}>
      <Tooltip
        disableFocusListener
        title={
          <FormattedMessage
            id="backToCatalog"
            defaultMessage="Back to catalog"
          />
        }
      >
        <Button
          style={
            hoverBack ? styles.onHoverButtonStyle : styles.hoverButtonStyle
          }
          onMouseEnter={props.onHoverBack}
          onMouseLeave={props.onHoverBack}
          href="/dashboard"
          color="secondary"
          variant="contained"
        >
          <KeyboardArrowLeft />
        </Button>
      </Tooltip>
      <Hidden smDown>
        {!checkAdmin() ? (
          <span style={styles.priceNum}>
            {numeral(product.price).format("$0,0.00")}
          </span>
        ) : null}
      </Hidden>
      {!checkAdmin() ? (
        <div style={{ marginTop: 8 }}>
          <span>
            <FormattedMessage id="quantity" defaultMessage="Quantity:" />
            <input
              style={styles.handleQuantityInput}
              value={quantity}
              onChange={props.quantityChange}
              type="number"
              min="1"
              max="5"
            />
          </span>
        </div>
      ) : null}
      {!checkAdmin() ? (
        <Tooltip
          disableFocusListener
          title={
            <FormattedMessage id="addToCart" defaultMessage="Add to cart" />
          }
        >
          <Button
            disabled={checkAuth() ? false : true}
            style={styles.buttonStyle}
            variant="contained"
            onClick={props.addToCart}
            color="primary"
          >
            <AddShoppingCart />
          </Button>
        </Tooltip>
      ) : null}
      {checkAdmin() ? (
        <div>
          <Tooltip
            disableFocusListener
            title={
              <FormattedMessage
                id="deleteProduct"
                defaultMessage="Delete product"
              />
            }
          >
            <Button
              style={
                hoverDelete
                  ? styles.onHoverButtonStyle
                  : styles.hoverButtonStyle
              }
              onMouseEnter={props.onHoverDelete}
              onMouseLeave={props.onHoverDelete}
              onClick={props.handleDeleteDialog}
              variant="contained"
              color="secondary"
            >
              <Delete />
            </Button>
          </Tooltip>
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="sm"
            open={props.openDeleteConfirm}
            onClose={props.handleDeleteDialog}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {
                <FormattedMessage
                  id="productDeleteDialog"
                  defaultMessage="Are you sure you want to delete this product?"
                />
              }
            </DialogTitle>
            <DialogActions>
              <Button onClick={props.handleDeleteDialog} color="primary">
                <FormattedMessage id="cancel" defaultMessage="Cancel" />
              </Button>
              <Button
                onClick={props.onDeleteProduct}
                color="secondary"
                autoFocus
              >
                <FormattedMessage id="confirm" defaultMessage="Confirm" />
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : null}
    </div>
  );
}
