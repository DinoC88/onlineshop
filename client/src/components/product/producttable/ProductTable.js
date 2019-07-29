import React, { Component } from "react";
import { styles } from "./styles";
import { FormattedMessage } from "react-intl";

export default class ProductTable extends Component {
  render() {
    return (
      <div>
        <div style={styles.productInfoPosition}>
          <table style={styles.tableWidth}>
            <tbody>
              <tr>
                <td style={styles.productInfoTh}>
                  <FormattedMessage id="model" defaultMessage="Model" />
                </td>
                <td style={styles.productInfoTd}>{this.props.product.name}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td style={styles.productInfoTh}>
                  <FormattedMessage
                    id="displaySize"
                    defaultMessage="Display Size"
                  />
                </td>
                <td style={styles.productInfoTd}>
                  {this.props.product.displaySize}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td style={styles.productInfoTh}>
                  <FormattedMessage
                    id="displayResolution"
                    defaultMessage="Display Resolution"
                  />
                </td>
                <td style={styles.productInfoTd}>
                  {this.props.product.displayResolution}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td style={styles.productInfoTh}>CPU</td>
                <td style={styles.productInfoTd}>{this.props.product.cpu}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td style={styles.productInfoTh}>
                  <FormattedMessage
                    id="internalMemory"
                    defaultMessage="Internal Memory"
                  />
                </td>
                <td style={styles.productInfoTd}>
                  {this.props.product.memory}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td style={styles.productInfoTh}>RAM</td>
                <td style={styles.productInfoTd}>{this.props.product.ram}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td style={styles.productInfoTh}>
                  <FormattedMessage id="camera" defaultMessage="Camera" />
                </td>
                <td style={styles.productInfoTd}>
                  {this.props.product.camera}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
