import bg1 from "../../img/image6.jpg";
import bg from "../../img/image9.jpg";

const styles = {
  pageContainer: {
    width: "100%",
    maxWidth: "auto",
    maxHeight: "auto",
    minHeight: "94vh",
    backgroundColor: "#ffffff",
    overflow: "hidden",
    display: "flex"
  },
  inputStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  logginBackgroundStyle: {
    backgroundImage: `url(${bg1})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "40% 40%",
    height: "100vh",
    width: "100%"
  },
  registerBackgroundStyle: {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "18% 40%",
    height: "100vh",
    width: "100%",
    zIndex: -10
  },
  headerStyle: {
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: "Roboto"
  },
  fontStyle: {
    fontFamily: "Roboto"
  },
  warningStyle: {
    color: "red",
    fontSize: "12px",
    fontFamily: "Roboto"
  },
  buttonStyle: {
    paddingTop: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  formStyle: {
    marginTop: 25,
    width: 350,
    fontFamily: "Roboto"
  }
};

export { styles };
