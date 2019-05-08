import React from "react";
import { Link } from "react-router-dom";

const styles = {
  footer: {
    borderRadius: "20px",
    position: "relative",
    bottom: -70,
    backgroundColor: "#333333"
  },
  logo: {
    color: "white",
    display: "inline-block",
    fontSize: "20px",
    marginLeft: 550
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
