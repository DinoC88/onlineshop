const styles = {
  cartContainer: {
    width: "100%",
    maxWidth: "auto",
    maxHeight: "auto",
    minHeight: "94vh",
    backgroundImage: "linear-gradient(#304361, #284d8a, #304361)"
  },
  infoCardStyle: {
    margin: "auto",
    width: "1000px",
    minHeight: "64vh",
    marginTop: "10vh",
    marginBottom: "10vh",
    borderRadius: 8,
    fontFamily: "Roboto",
    padding: 16
  },
  cartStyle: {
    alignItems: "center",
    textAlign: "center",
    padding: 16
  },
  dividerPosition: {
    marginTop: 50
  },
  cartCard: {
    padding: 16,
    margin: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    minHeight: "38vh"
  },
  cartHeader: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "Roboto",
    color: "rgba(0,0,0,0.87)",
    fontSize: 38,
    fontWeight: "normal"
  },
  headerStyle: {
    textAlign: "center",
    width: "100%"
  },
  imgStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -50,
    backgroundColor: "#1f3b69",
    color: "white"
  },
  productInfoStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 8
  },
  cartProductCard: {
    maxHeight: "200px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    boxShadow: "0 0 8px #ededed",
    padding: "12px 0px 12px 12px",
    marginBottom: 16
  },
  cartProductImg: {
    width: "20%",
    minHeight: "190px",
    maxHeight: "190px",
    objectFit: "contain"
  },
  priceNButtonStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  deleteButtonStyle: {
    color: "#2b9e82",
    display: "flex"
  },
  checkoutButtonStyle: {
    margin: "-8px 0 32px 0",
    padding: 4,
    color: "white",
    height: 48,
    width: 180,
    backgroundColor: "#2b9e82"
  },
  onHoverCheckoutButtonStyle: {
    margin: "-8px 0 32px 0",
    padding: 4,
    color: "white",
    height: 48,
    width: 180,
    backgroundColor: "#1e705c"
  },
  orderTotalPosition: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 12
  },
  orderHeader: {
    margin: "0 0 32px 0",
    padding: 8
  },
  total: {
    fontSize: "16px",
    marginLeft: 16,
    fontWeight: 500
  },
  noItemMessageHeader: {
    fontFamily: "Roboto",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    color: "rgb(145, 145, 145)",
    fontSize: 13,
    fontWeight: "normal"
  },
  cartProductCardGridStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  cartProductCardStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
};
export { styles };
