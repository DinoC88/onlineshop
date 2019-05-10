import React, { Component } from "react";
import * as numeral from "numeral";
import Button from "@material-ui/core/Button";

const styles = {
  productDetails: {
    display: "flex",
    margin: "10px 0",
    boxShadow: "0 0 7px #b7b2b3"
  },
  productImage: {
    width: "30%",
    margin: "15px"
  },
  contentLeft: {
    width: "80%",
    justifyContent: "flex-start",
    alignSelf: "center"
  },
  contentRightPosition: {
    justifyContent: "flex-end",
    alignSelf: "center"
  },
  priceStyle: {
    fontSize: "30px",
    color: "#64dd17"
  },
  seeMoreButton: {
    color: "white"
  }
};

export default class Productitem extends Component {
  render() {
    const { product } = this.props;

    return (
      <div>
        <div style={styles.productDetails}>
          <img
            style={styles.productImage}
            src={product.image}
            alt={product.name}
          />
          <div style={styles.contentLeft}>
            <h3>{product.name}</h3>
            <div>
              <div>
                <b>Display size: </b>
                <span>{product.displaySize}</span>
              </div>
              <div>
                <b>Display resolution: </b>
                <span>{product.displayResolution} pixels</span>
              </div>
              <div>
                <b>CPU: </b>
                <span>{product.cpu}</span>
              </div>
              <div>
                <b>Internal memory: </b>
                <span>{product.memory}</span>
              </div>
              <div>
                <b>RAM: </b>
                <span>{product.ram}</span>
              </div>
              <div>
                <b>Camera: </b>
                <span>{product.camera}</span>
              </div>
            </div>
          </div>
          <div style={styles.contentRightPosition}>
            <b>Price:</b>
            <h2 style={styles.priceStyle}>
              {numeral(product.price).format("$0,0.00")}
            </h2>
            <Button
              style={styles.seeMoreButton}
              color="primary"
              variant="contained"
              href={`/product/${product._id}`}
            >
              See more
            </Button>
            <div />
          </div>
        </div>
      </div>
    );
  }
}
