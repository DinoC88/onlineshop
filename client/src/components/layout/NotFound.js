import * as React from "react";

const styles = {
  notFoundContainer: {
    minHeight: "85vh"
  },
  notFoundHeader: {
    textAlign: "center",
    fontSize: "60px"
  }
};
const NotFound = () => (
  <div style={styles.notFoundContainer}>
    <h1 style={styles.notFoundHeader}>404</h1>
    <h1 style={styles.notFoundHeader}>Page Not Found</h1>
  </div>
);

export default NotFound;
