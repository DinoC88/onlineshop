const styles = {
  pageContainer: {
    width: "100%",
    maxWidth: "auto",
    maxHeight: "auto",
    backgroundColor: "#ffffff",
    overflow: "hidden"
  },
  navbarStyle: {
    position: "fixed",
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    height: "8vh",
    backgroundColor: "#e3e3e3",
    zIndex: 10,
    opacity: 0.8
  },
  navbarButtonPosition: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  navbarButtonStyle: {
    color: "#284d8a",
    margin: 16,
    width: 118,
    height: 45,
    borderRadius: 12
  },
  landingPage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: "95vh",
    maxHeight: "auto",
    marginBottom: 5,
    borderBottom: "5px solid #e3e3e3"
  },
  leftLandingStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
    marginBottom: "10px solid red"
  },
  rightLandingStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    minHeight: "100vh",
    borderRadius: "100% 0% 0% 0%",
    borderLeft: "10px solid #e3e3e3",
    backgroundColor: "#ebebeb"
  },
  landingImgSize: {
    width: 628,
    height: 396
  },
  landingHeaderStyle: {
    color: "#284d8a",
    fontFamily: "Roboto",
    fontSize: "3rem",
    fontWeight: 500,
    textAlign: "right",
    padding: 16
  },
  textStyle: {
    padding: 8,
    fontWeight: 200,
    fontFamily: "Roboto",
    textAlign: "center"
  },
  aboutPage: {
    display: "flex",
    flexDirection: "column",
    minHeight: "95vh",
    maxHeight: "auto"
  },
  aboutStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "3px solid #e3e3e3"
  },
  leftAboutStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100vh",
    borderRadius: "0% 100% 0% 0%",
    borderRight: "10px solid #e3e3e3",
    borderBottom: "10px solid #ededed",
    backgroundImage: "linear-gradient(#ffffff, #ededed, #ebebeb)"
  },
  rightAboutStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 32,
    fontFamily: "Roboto"
  },
  aboutHeader: {
    color: "#284d8a",
    fontFamily: "Roboto",
    fontSize: "3rem",
    fontWeight: 500,
    textAlign: "center"
  },
  aboutText: {
    padding: 8,
    fontWeight: 200,
    fontFamily: "Roboto",
    textAlign: "justify"
  },
  authorPage: {
    display: "flex",
    flexDirection: "column",
    minHeight: "95vh",
    maxHeight: "auto",
    marginBottom: 1,
    borderBottom: "5px solid #e3e3e3"
  },
  authorStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Roboto"
  },
  authorLeftStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 32,
    fontFamily: "Roboto"
  },
  authorRightStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    minHeight: "100vh",
    borderRadius: "100% 0% 0% 0%",
    borderLeft: "10px solid #e3e3e3",
    borderBottom: "10px solid #ededed",
    backgroundImage: "linear-gradient(#ffffff, #ededed, #ebebeb)"
  },
  authorHeader: {
    color: "#2b9e82",
    fontFamily: "Roboto",
    fontSize: "3rem",
    fontWeight: 500
  },
  authorText: {
    padding: 8,
    fontWeight: 200,
    fontFamily: "Roboto",
    textAlign: "justify"
  },
  button: {
    color: "#ffffff",
    margin: 16,
    width: 118,
    height: 45,
    borderRadius: 12
  }
};

export { styles };
