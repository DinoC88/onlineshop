const styles = {
  productDetailsContainer: {
    maxHeight: "250px",
    display: "flex",
    flexDirection: "row",
    margin: "12px 0",
    boxShadow: "0 0 8px #b7b2b3",
    backgroundColor: "white",
    padding: "8px"
  },
  productDetailsContainerHover: {
    maxHeight: "250px",
    display: "flex",
    flexDirection: "row",
    margin: "12px 0",
    boxShadow: "0 0 32px #d1d3d6",
    backgroundColor: "#f2f5fc",
    padding: "8px",
    cursor: "pointer"
  },
  productImage: {
    width: 200,
    margin: "15px",
    objectFit: "contain"
  },
  contentLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignSelf: "center",
    padding: 8
  },
  textOverflow: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: 500,
    textOverflow: "ellipsis"
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
  buttonPosition: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row"
  }
};

export { styles };
