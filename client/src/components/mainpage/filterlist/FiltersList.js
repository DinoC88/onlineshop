import React, { Component } from "react";
import CheckBox from "./CheckBox";
import CheckBoxPrice from "./CheckBoxPrice";
import {
  brand,
  ram,
  price,
  color,
  internalMemory,
  displaySize,
  displayResolution
} from "../../../utils/filters";
import { styles } from "./styles";
export default class FiltersList extends Component {
  render() {
    return (
      <div style={styles.filtersList}>
        <CheckBoxPrice
          title={<b style={styles.headerStyle}>Price</b>}
          list={price}
          handleFilters={filters => this.props.handleFilters(filters, "price")}
        />
        <CheckBox
          title={<b style={styles.headerStyle}>Brand</b>}
          list={brand}
          handleFilters={filters => this.props.handleFilters(filters, "brand")}
        />
        <CheckBox
          title={<b style={styles.headerStyle}>Color</b>}
          list={color}
          handleFilters={filters => this.props.handleFilters(filters, "color")}
        />
        <CheckBox
          title={<b style={styles.headerStyle}>Internal Memory</b>}
          list={internalMemory}
          handleFilters={filters => this.props.handleFilters(filters, "memory")}
        />
        <CheckBox
          title={<b style={styles.headerStyle}>RAM</b>}
          list={ram}
          handleFilters={filters => this.props.handleFilters(filters, "ram")}
        />
        <CheckBox
          title={<b style={styles.headerStyle}>Display size</b>}
          list={displaySize}
          handleFilters={filters =>
            this.props.handleFilters(filters, "displaySize")
          }
        />
        <CheckBox
          title={<b style={styles.headerStyle}>Display Resolution</b>}
          list={displayResolution}
          handleFilters={filters =>
            this.props.handleFilters(filters, "displayResolution")
          }
        />
      </div>
    );
  }
}
