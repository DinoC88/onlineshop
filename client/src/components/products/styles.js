const styles = {
  homepageContainer: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: "100vh",
    border: "1px solid #ffffff00",
    marginTop: "-50px"
  },
  filtersList: {
    width: "25%",
    maxHeight: "100%",
    boxShadow: "0 0 7px #b7b2b3",
    margin: "70px 20px 40px 0px",
    backgroundColor: "#f5f5f5"
  },
  filtersListHeader: {
    marginTop: 20,
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center"
  },
  productList: {
    width: "100%",
    marginTop: "90px",
    marginBottom: "10px"
  },
  productsHandle: {
    borderBottom: "1px solid #325999",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  productFound: {
    fontSize: 20,
    marginTop: 7
  },
  search: {
    marginTop: -23,
    marginRight: -35,
    display: "flex",
    justifyContent: "flex-end"
  },
  clearButton: {
    color: "white",
    marginBottom: 17
  },
  iconStyle: {
    width: 40,
    height: 40,
    backgroundColor: "#325999",
    color: "white",
    borderRadius: "5px"
  },
  noProductFound: {
    fontSize: "50px",
    fontWeight: "bold",
    marginTop: 50,
    display: "flex",
    justifyContent: "center"
  }
};

export { styles };
