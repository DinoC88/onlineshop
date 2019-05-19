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
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  priceStyle: {
    fontSize: "30px"
  },
  hoverButtons: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  linkStyle: {
    textDecoration: "none",
    color: "#474a4f"
  }
};

export { styles };
