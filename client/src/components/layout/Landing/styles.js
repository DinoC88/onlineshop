import bg from "../../../img/bg1.jpg";
const styles = {
  pageContainer: {
    width: "100%",
    maxWidth: "auto",
    maxHeight: "auto",
    minHeight: "100vh",
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden"
  },
  landingStyle: {
    height: "92vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  headerStyle: {
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontSize: "3rem",
    fontWeight: 300,
    textAlign: "center",
    padding: 16
  },
  buttonStyle: {
    paddingTop: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  button: {
    color: "white",
    backgroundColor: "#284d8a",
    margin: 16,
    width: 120,
    height: 50
  },
  buttonHover: {
    color: "white",
    backgroundColor: "#1a325b",
    margin: 16,
    width: 120,
    height: 50
  }
};

export { styles };
