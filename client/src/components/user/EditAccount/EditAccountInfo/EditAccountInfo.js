import React from "react";
import { Grid, TextField } from "@material-ui/core";
import Spinner from "../../../../utils/Spinner";
import { styles } from "../styles";
import { FormattedMessage } from "react-intl";

export default function EditAccountInfo(props) {
  let editAccView;
  if (props.isLoading) {
    editAccView = <Spinner />;
  } else {
    editAccView = (
      <form noValidate onSubmit={props.onSubmit}>
        <Grid container>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              inputProps={styles.inputPropsStyle}
              style={styles.textFieldStyle}
              label={
                <FormattedMessage id="username" defaultMessage="Username" />
              }
              value={props.username}
              margin="normal"
              onChange={props.onChange}
              name="username"
            />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              inputProps={styles.inputPropsStyle}
              style={styles.textFieldStyle}
              label="Email"
              value={props.email}
              margin="normal"
              onChange={props.onChange}
              name="email"
            />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              inputProps={styles.inputPropsStyle}
              style={styles.textFieldStyle}
              label={
                <FormattedMessage id="firstName" defaultMessage="First Name" />
              }
              value={props.firstName}
              margin="normal"
              onChange={props.onChange}
              name="firstName"
            />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              inputProps={styles.inputPropsStyle}
              style={styles.textFieldStyle}
              label={
                <FormattedMessage id="lastName" defaultMessage="Last Name" />
              }
              value={props.lastName}
              margin="normal"
              onChange={props.onChange}
              name="lastName"
            />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              inputProps={styles.inputPropsStyle}
              style={styles.textFieldStyle}
              label={<FormattedMessage id="phone" defaultMessage="Phone" />}
              value={props.phone}
              margin="normal"
              onChange={props.onChange}
              name="phone"
            />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              inputProps={styles.inputPropsStyle}
              style={styles.textFieldStyle}
              label={<FormattedMessage id="city" defaultMessage="City" />}
              value={props.city}
              margin="normal"
              onChange={props.onChange}
              name="city"
            />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              inputProps={styles.inputPropsStyle}
              style={styles.textFieldStyle}
              label={<FormattedMessage id="address" defaultMessage="Address" />}
              value={props.address}
              margin="normal"
              onChange={props.onChange}
              name="address"
            />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              inputProps={styles.inputPropsStyle}
              style={styles.textFieldStyle}
              label={
                <FormattedMessage id="zipCode" defaultMessage="Zip Code" />
              }
              value={props.zipcode}
              margin="normal"
              onChange={props.onChange}
              name="zipcode"
            />
          </Grid>
        </Grid>
      </form>
    );
  }
  return <div>{editAccView}</div>;
}
