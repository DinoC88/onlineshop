import React from "react";
import Spinner from "../../../../utils/Spinner";
import { Grid, TextField } from "@material-ui/core";
import { styles } from "../styles";
import { FormattedMessage } from "react-intl";

export default function AccountInfo(props) {
  const { userInfo, isLoading } = props;
  let accView;
  if (isLoading) {
    accView = <Spinner />;
  } else {
    accView = (
      <form noValidate>
        <Grid container>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              disabled
              inputProps={
                userInfo.name
                  ? styles.inputPropsStyle
                  : styles.noInputPropsStyle
              }
              style={styles.textFieldStyle}
              label={
                <FormattedMessage id="username" defaultMessage="Username" />
              }
              value={userInfo.name ? userInfo.name : "Information is missing"}
              margin="normal"
              name="username"
            />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              disabled
              inputProps={
                userInfo.email
                  ? styles.inputPropsStyle
                  : styles.noInputPropsStyle
              }
              style={styles.textFieldStyle}
              label="Email"
              value={userInfo.email ? userInfo.email : "Information is missing"}
              margin="normal"
              name="email"
            />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              disabled
              inputProps={
                userInfo.firstName
                  ? styles.inputPropsStyle
                  : styles.noInputPropsStyle
              }
              style={styles.textFieldStyle}
              label={
                <FormattedMessage id="firstName" defaultMessage="First Name" />
              }
              value={
                userInfo.firstName
                  ? userInfo.firstName
                  : "Information is missing"
              }
              margin="normal"
              name="firstName"
            />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              disabled
              inputProps={
                userInfo.lastName
                  ? styles.inputPropsStyle
                  : styles.noInputPropsStyle
              }
              style={styles.textFieldStyle}
              label={
                <FormattedMessage id="lastName" defaultMessage="Last Name" />
              }
              value={
                userInfo.lastName ? userInfo.lastName : "Information is missing"
              }
              margin="normal"
              name="lastName"
            />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              disabled
              inputProps={
                userInfo.phone
                  ? styles.inputPropsStyle
                  : styles.noInputPropsStyle
              }
              style={styles.textFieldStyle}
              label={<FormattedMessage id="phone" defaultMessage="Phone" />}
              value={userInfo.phone ? userInfo.phone : "Information is missing"}
              margin="normal"
              name="phone"
            />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              disabled
              inputProps={
                userInfo.city
                  ? styles.inputPropsStyle
                  : styles.noInputPropsStyle
              }
              style={styles.textFieldStyle}
              label={<FormattedMessage id="city" defaultMessage="City" />}
              value={userInfo.city ? userInfo.city : "Information is missing"}
              margin="normal"
              name="city"
            />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              disabled
              inputProps={
                userInfo.address
                  ? styles.inputPropsStyle
                  : styles.noInputPropsStyle
              }
              style={styles.textFieldStyle}
              label={<FormattedMessage id="address" defaultMessage="Address" />}
              value={
                userInfo.address ? userInfo.address : "Information is missing"
              }
              margin="normal"
              name="address"
            />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <TextField
              disabled
              inputProps={
                userInfo.zipcode
                  ? styles.inputPropsStyle
                  : styles.noInputPropsStyle
              }
              style={styles.textFieldStyle}
              label={
                <FormattedMessage id="zipCode" defaultMessage="Zip Code" />
              }
              value={
                userInfo.zipcode ? userInfo.zipcode : "Information is missing"
              }
              margin="normal"
              name="zipcode"
            />
          </Grid>
        </Grid>
      </form>
    );
  }
  return <div>{accView}</div>;
}
