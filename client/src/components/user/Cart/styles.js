const styles = {
  cartContainer: {
    minHeight: "100vh",
    border: "1px solid #ffffff00"
  },
  cartTitle: {
    marginTop: "60px",
    marginBottom: "40px",
    textAlign: "center"
  },
  cart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cartOrder: {
    display: "flex",
    flexDirection: "column",
    width: "35%",
    height: "100%",
    minHeight: "auto"
  },
  orderHeader: {
    borderBottom: "2px solid black",
    textAlign: "center"
  },
  orderCard: {
    boxShadow: "0 0 8px #b7b2b3",
    backgroundColor: "white",
    padding: "8px",
    marginTop: 8,
    marginBottom: 16
  },
  orderInfo: {
    display: "flex",
    flexDirection: "column"
  },
  cartOrderInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "8px 32px 0 32px"
  },
  buttonStyle: {
    margin: 8,
    color: "white"
  },
  cartProductCard: {
    maxHeight: "180px",
    display: "flex",
    boxShadow: "0 0 8px #b7b2b3",
    backgroundColor: "white",
    padding: "8px",
    marginBottom: 16
  },
  cartProductImg: {
    width: "150px",
    objectFit: "contain"
  },
  cartProductRight: {
    width: "80%"
  },
  cartProductHeader: {
    fontSize: 30,
    textAlign: "center"
  },
  cartProductInfo: {
    marginTop: 16,
    display: "flex",
    justifyContent: "space-around"
  },
  productCardDetails: {
    display: "flex",
    justifyContent: "space-around",
    marginLeft: -20
  },
  productCardDelete: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  total: {
    fontSize: "16px"
  },
  cartInfoBtns: { textAlign: "center" },
  cartItems: {
    width: "60%"
  },
  cartHeader: {
    textAlign: "center",
    marginTop: "100px"
  }
};

export { styles };
