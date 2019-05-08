import React, { Component } from "react";
import * as numeral from "numeral";
import Button from "@material-ui/core/Button";

const styles = {
  productDetails: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "auto",
    margin: "10px 0",
    boxShadow: "0 0 7px #d6d6d6",
    transition: "0.3s",
    ":hover": {
      boxShadow: "0 0 7px #b3b3b3"
    }
  },
  productImage: {
    width: "30%",
    margin: "15px"
  },
  imgWidth: {
    width: "100%"
  },
  contentLeft: {
    width: "80%"
  },
  contentHeader: {
    margin: "10px 0 25px 0"
  },
  contentLeftDiv: {
    margin: "1.5px 0"
  },
  contentRight: {
    width: "20%"
  },
  contentRightPar: {
    margin: "50px 0 0 0"
  },
  contentRightHeader: {
    margin: "0 0 40px 0",
    fontSize: "30px",
    color: "#64dd17"
  },
  contentInfo: {
    width: "100% !important",
    textAlign: "left !important"
  },
  seeMoreButton: {
    backgroundColor: "#495acc"
  }
};

export default class Productitem extends Component {
  render() {
    const { product } = this.props;

    return (
      <div>
        <div style={styles.productDetails}>
          <div style={styles.productImage}>
            <img
              style={styles.imgWidth}
              src={product.image}
              alt={product.name}
            />
          </div>
          <div style={styles.contentLeft}>
            <h3 style={styles.contentHeader}>{product.name}</h3>
            <div style={styles.contentInfo}>
              <div style={styles.contentLeftDiv}>
                <b>Display size: </b>
                <span>{product.displaySize}</span>
              </div>
              <div style={styles.contentLeftDiv}>
                <b>Display resolution: </b>
                <span>{product.displayResolution} pixels</span>
              </div>
              <div style={styles.contentLeftDiv}>
                <b>CPU: </b>
                <span>{product.cpu}</span>
              </div>
              <div style={styles.contentLeftDiv}>
                <b>Internal memory: </b>
                <span>{product.memory}</span>
              </div>
              <div style={styles.contentLeftDiv}>
                <b>RAM: </b>
                <span>{product.ram}</span>
              </div>
              <div style={styles.contentLeftDiv}>
                <b>Camera: </b>
                <span>{product.camera}</span>
              </div>
            </div>
          </div>
          <div style={styles.contentRight}>
            <div style={styles.contentInfo}>
              <p style={styles.contentRightPar}>
                <b>Price:</b>
              </p>
              <h2 style={styles.contentRightHeader}>
                {numeral(product.price).format("$0,0.00")}
              </h2>
              <Button
                style={styles.seeMoreButton}
                variant="contained"
                href={`/product/${product._id}`}
              >
                See more
              </Button>
              <div />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
