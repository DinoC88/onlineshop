import React, { Component } from "../../../node_modules/react";
import TextField from "../../../node_modules/@material-ui/core/TextField";
import SearchIcon from "../../../node_modules/@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

const styles = {
  searchPosition: {
    position: "relative",
    marginTop: 10,
    marginRight: -80
  },
  iconStyle: {
    position: "absolute",
    top: 17,
    right: 75,
    width: 40,
    height: 40,
    backgroundColor: "#96999e",
    borderRadius: "5px"
  }
};

export default class SearchBox extends Component {
  render() {
    return (
      <div>
        <div style={styles.searchPosition}>
          <TextField
            id="outlined-search"
            label="Search phone"
            type="search"
            margin="normal"
            variant="outlined"
            onChange={this.props.handleInput}
          />
          <Button>
            <SearchIcon
              onClick={this.props.handleClick}
              style={styles.iconStyle}
            />
          </Button>
        </div>
      </div>
    );
  }
}
