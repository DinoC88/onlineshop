import React, { Component } from "react";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import {
  Collapse,
  ListItemText,
  ListItem,
  List,
  RadioGroup,
  Radio,
  FormControlLabel
} from "@material-ui/core";

const styles = {
  listItem: {
    borderTop: "1px solid #dcdcdc",
    paddingRight: 10,
    cursor: "pointer"
  },
  checkbox: {
    marginLeft: "40px"
  }
};

export default class CheckBoxPrice extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      value: "0"
    };
  }

  // handleClick function
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleChange = event => {
    this.props.handleFilters(event.target.value);
    this.setState({ value: event.target.value });
  };

  renderList = () =>
    this.props.list
      ? this.props.list.map(value => (
          <FormControlLabel
            style={styles.checkbox}
            value={`${value._id}`}
            key={value._id}
            control={<Radio color="primary" />}
            label={value.name}
          />
        ))
      : null;

  render() {
    return (
      <div>
        <List style={styles.listItem}>
          <ListItem onClick={this.handleClick}>
            <ListItemText
              style={{ marginLeft: 40 }}
              primary={this.props.title}
            />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List disablePadding>
              <RadioGroup
                aria-label="price"
                name="price"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}
