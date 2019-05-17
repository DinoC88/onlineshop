import React, { Component } from "react";
import * as numeral from "numeral";
import Button from "@material-ui/core/Button";

const styles = {
  productDetailsContainer: {
    maxHeight: "250px",
    display: "flex",
    margin: "10px 0",
    boxShadow: "0 0 7px #b7b2b3",
    padding: "8px"
  },
  productDetailsContainerHover: {
    maxHeight: "250px",
    display: "flex",
    margin: "10px 0",
    boxShadow: "0 0 14px #d1d3d6",
    padding: "8px",
    cursor: "pointer"
  },
  productImage: {
    width: "200px",
    margin: "15px",
    objectFit: "contain"
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
    fontSize: "30px"
  },
  seeMoreButton: {
    color: "white"
  },
  linkStyle: {
    textDecoration: "none",
    color: "#474a4f"
  }
};

export default class Productitem extends Component {
  constructor() {
    super();
    this.state = {
      hover: false
    };
  }
  onMouseEnter = () => {
    this.setState({
      hover: true
    });
  };
  onMouseLeave = () => {
    this.setState({
      hover: false
    });
  };
  render() {
    const { product } = this.props;
    return (
      <div>
        <a style={styles.linkStyle} href={`/product/${product._id}`}>
          <div
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            style={
              this.state.hover
                ? styles.productDetailsContainerHover
                : styles.productDetailsContainer
            }
          >
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
        </a>
      </div>
    );
  }
}
