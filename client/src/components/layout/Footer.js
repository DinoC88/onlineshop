import React from "react";
import { Link } from "react-router-dom";

const styles = {
  footer: {
    borderRadius: "20px",
    backgroundColor: "#333333"
  },
  logo: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    fontSize: "20px"
  }
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <Link style={styles.logo} to="/">
        Mobile Shop App
      </Link>
    </footer>
  );
}
