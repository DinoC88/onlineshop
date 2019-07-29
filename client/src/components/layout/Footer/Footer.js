import React from "react";
import { Link } from "react-router-dom";
import { styles } from "./styles";
import { FormattedMessage } from "react-intl";

export default function Footer() {
  return (
    <div style={styles.footer}>
      <Link style={styles.footerLogo} to="/">
        <FormattedMessage id="mobileShop" defaultMessage="Mobile shop" />
      </Link>
      <span style={styles.footerText}> by Dino Coric &copy; 2019</span>
    </div>
  );
}
