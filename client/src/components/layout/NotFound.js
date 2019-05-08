import * as React from "react";

const styles = {
  notFoundContainer: {
    minHeight: "100vh",
    marginTop: "-72px",
    border: "1px solid #ffffff00"
  },
  notFound: {
    width: "50%",
    minWidth: "330px",
    margin: "auto",
    marginTop: "200px"
  },
  notFound404: {
    fontSize: "60px",
    color: "#00bcd4"
  },
  notFoundPage: {
    fontSize: "45px"
  }
};
const NotFound = () => (
  <div style={styles.notFoundContainer}>
    <div style={styles.notFound404}>
      <h1 style={styles.notFoundHeader}>404</h1>
      <h3 style={styles.notFoundHeader}>Page Not Found</h3>
    </div>
  </div>
);

export default NotFound;
