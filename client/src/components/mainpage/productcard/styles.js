const styles = {
  productDetailsContainer: {
    maxHeight: "250px",
    display: "flex",
    margin: "10px 0",
    boxShadow: "0 0 8px #b7b2b3",
    backgroundColor: "white",
    padding: "8px"
  },
  productDetailsContainerHover: {
    maxHeight: "250px",
    display: "flex",
    margin: "10px 0",
    boxShadow: "0 0 32px #d1d3d6",
    backgroundColor: "#f2f5fc",
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
    fontSize: "20px",
    color: "green"
  },
  phoneName: {
    fontSize: 20
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
