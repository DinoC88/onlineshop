import React, { Component } from "react";
import { styles } from "./styles";
import { getOrders } from "../../utils/requestManager";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TableHead,
  TableRow,
  Table
} from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore";

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }
  componentDidMount() {
    getOrders().then(res => {
      this.setState({
        orders: res.data.orders
      });
    });
  }

  render() {
    return (
      <div style={styles.pageContainer}>
        <h2 style={styles.headerStyle}>Orders</h2>
        <hr />
        {this.state.orders ? (
          <div>
            {this.state.orders.map((order, index) => {
              console.log(order);
              return (
                <div key={index}>
                  <ExpansionPanel style={{ width: 500 }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                      Order #{index + 1}
                    </ExpansionPanelSummary>
                    {order.products.map((product, index) => {
                      return (
                        <div key={index}>
                          <thead>
                            <tr>
                              <td style={styles.th}>Date Created</td>
                              <td style={styles.th}>Product Name</td>
                              <td style={styles.th}>Price</td>
                              <td style={styles.th}>Qty</td>
                              <td style={styles.th}>Total</td>
                            </tr>
                          </thead>
                          <div>
                            <ExpansionPanelDetails>
                              <p>{product.name}</p>
                              <p style={{ marginLeft: 20 }}>{product.price}</p>
                            </ExpansionPanelDetails>
                          </div>
                        </div>
                      );
                    })}
                  </ExpansionPanel>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}
