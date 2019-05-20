import React from "react";
import { Link } from "react-router-dom";
import { styles } from "./styles";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <Link style={styles.footerLogo} to="/">
        Mobile Shop App
      </Link>
    </footer>
  );
}
