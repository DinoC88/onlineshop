const styles = {
  productDetailsContainer: {
    maxHeight: "250px",
    display: "flex",
    flexDirection: "row",
    margin: "12px 0",
    boxShadow: "0 0 8px 0px #b7b2b3",
    backgroundColor: "white",
    padding: "8px"
  },
  productDetailsContainerHover: {
    maxHeight: "250px",
    display: "flex",
    flexDirection: "row",
    margin: "12px 0",
    boxShadow: "2px 2px 4px 2px #c0c2c4",
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
    textOverflow: "ellipsis",
    fontFamily: "Roboto"
  },
  contentRightPosition: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: "0 4px 3px 0"
  },
  priceStyle: {
    fontSize: "20px",
    color: "green"
  },
  buttonPosition: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  phoneDetails: {
    fontFamily: "Roboto",
    fontWeight: 590
  },
  nameStyle: {
    fontSize: 22,
    fontFamily: "Roboto"
  }
};

export { styles };
