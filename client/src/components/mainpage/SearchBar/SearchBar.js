import React from "react";
import { styles } from "../styles";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { Close } from "@material-ui/icons";

export default function SearchBar(props) {
  return (
    <div style={styles.searchStyle}>
      <TextField
        style={{ width: "100%" }}
        inputstyle={{ width: "100%" }}
        label={
          <FormattedMessage id="searchPhone" defaultMessage="Search phone" />
        }
        value={props.searchProduct}
        type="search"
        variant="standard"
        onChange={props.handleSearchInput}
        onKeyDown={props.enterKey}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle remove search visibility"
                onClick={props.removeSearch}
              >
                {props.searchProduct ? <Close /> : null}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </div>
  );
}
