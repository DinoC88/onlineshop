import React, { Component } from "react";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import {
  ListItemSecondaryAction,
  Checkbox,
  Collapse,
  ListItemText,
  ListItem,
  List
} from "@material-ui/core";
import { styles } from "./styles";

export default class CheckBox extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      checked: []
    };
  }

  // handleClick function
  handleCheckboxClick = () => {
    this.setState({ open: !this.state.open });
  };

  // handleToggle function for renderList
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState(
      {
        checked: newChecked
      },
      () => {
        this.props.handleFilters(newChecked);
      }
    );
  };

  renderList = () =>
    this.props.list
      ? this.props.list.map(value => (
          <ListItem key={value._id}>
            <ListItemText primary={<i>{value.name}</i>} />
            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                onChange={this.handleToggle(value.name)}
                checked={this.state.checked.indexOf(value.name) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  render() {
    return (
      <div>
        <List style={styles.listItem}>
          <ListItem
            style={{ width: "100%" }}
            onClick={this.handleCheckboxClick}
          >
            <ListItemText
              style={{
                width: "100%",
                padding: 0
              }}
              inset
              primary={this.props.title}
            />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List disablePadding>{this.renderList()}</List>
          </Collapse>
        </List>
      </div>
    );
  }
}
