import React, { Component } from "../../../node_modules/react";
import List from "../../../node_modules/@material-ui/core/List/List";
import ListItem from "../../../node_modules/@material-ui/core/ListItem/ListItem";
import ListItemText from "../../../node_modules/@material-ui/core/ListItemText/ListItemText";
import Collapse from "../../../node_modules/@material-ui/core/Collapse/Collapse";
import ExpandLess from "../../../node_modules/@material-ui/icons/ExpandLess";
import ExpandMore from "../../../node_modules/@material-ui/icons/ExpandMore";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "../../../node_modules/@material-ui/core/Checkbox/Checkbox";

const styles = {
  listItem: {
    borderTop: "1px solid #dcdcdc",
    padding: "15px 25px 10px 0"
  },
  filterText: {
    marginLeft: 30
  },
  checkbox: {
    marginRight: "10px"
  }
};

export default class CheckBox extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      checked: []
    };
  }

  // handleClick function
  handleClick = () => {
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
            <ListItemText
              style={styles.filterText}
              primary={<i>{value.name}</i>}
            />
            <ListItemSecondaryAction>
              <Checkbox
                style={styles.checkbox}
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
      <div className="filtersList">
        <List>
          <ListItem style={styles.listItem} onClick={this.handleClick}>
            <ListItemText inset primary={this.props.title} />
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
