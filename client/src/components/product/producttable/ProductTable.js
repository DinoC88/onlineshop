import React, { Component } from "react";
import { styles } from "./styles";
export default class ProductTable extends Component {
  render() {
    return (
      <div>
        <div style={styles.productInfoPosition}>
          <table style={styles.tableWidth}>
            <tbody>
              <tr>
                <td style={styles.productInfoTh}>Model</td>
                <td style={styles.productInfoTd}>{this.props.product.name}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td style={styles.productInfoTh}>Display Size</td>
                <td style={styles.productInfoTd}>
                  {this.props.product.displaySize}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td style={styles.productInfoTh}>Display Resolution</td>
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
                <td style={styles.productInfoTh}>Internal Memory</td>
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
                <td style={styles.productInfoTh}>Camera</td>
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
