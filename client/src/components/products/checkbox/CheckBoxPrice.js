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
import { styles } from "./styles";

export default class CheckBoxPrice extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      value: "0"
    };
  }

  // handleCheckboxClick function
  handleCheckboxClick = () => {
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
      <List style={styles.listItem}>
        <ListItem onClick={this.handleCheckboxClick} style={{ width: "100%" }}>
          <ListItemText
            style={{
              width: "100%",
              padding: 0
            }}
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
    );
  }
}
