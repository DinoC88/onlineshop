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
import { FormattedMessage } from "react-intl";
import { styles } from "./styles";
export default class FiltersList extends Component {
  render() {
    return (
      <div style={styles.filtersList}>
        <CheckBoxPrice
          title={
            <b style={styles.headerStyle}>
              <FormattedMessage id="price" defaultMessage="Price" />
            </b>
          }
          list={price}
          handleFilters={filters => this.props.handleFilters(filters, "price")}
        />
        <CheckBox
          title={
            <b style={styles.headerStyle}>
              <FormattedMessage id="brand" defaultMessage="Brand" />
            </b>
          }
          list={brand}
          handleFilters={filters => this.props.handleFilters(filters, "brand")}
        />
        <CheckBox
          title={
            <b style={styles.headerStyle}>
              <FormattedMessage id="color" defaultMessage="Color" />
            </b>
          }
          list={color}
          handleFilters={filters => this.props.handleFilters(filters, "color")}
        />
        <CheckBox
          title={
            <b style={styles.headerStyle}>
              <FormattedMessage
                id="internalMemory"
                defaultMessage="Internal Memory"
              />
            </b>
          }
          list={internalMemory}
          handleFilters={filters => this.props.handleFilters(filters, "memory")}
        />
        <CheckBox
          title={<b style={styles.headerStyle}>RAM</b>}
          list={ram}
          handleFilters={filters => this.props.handleFilters(filters, "ram")}
        />
        <CheckBox
          title={
            <b style={styles.headerStyle}>
              <FormattedMessage
                id="displaySize"
                defaultMessage="Display Size"
              />
            </b>
          }
          list={displaySize}
          handleFilters={filters =>
            this.props.handleFilters(filters, "displaySize")
          }
        />
        <CheckBox
          title={
            <b style={styles.headerStyle}>
              <FormattedMessage
                id="displayResolution"
                defaultMessage="Display Resolution"
              />
            </b>
          }
          list={displayResolution}
          handleFilters={filters =>
            this.props.handleFilters(filters, "displayResolution")
          }
        />
      </div>
    );
  }
}
