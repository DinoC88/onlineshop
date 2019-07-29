import * as React from "react";
import { styles } from "./styles";
import { FormattedMessage } from "react-intl";

const NotFound = () => (
  <div style={styles.notFoundContainer}>
    <h1 style={styles.notFoundHeader}>404</h1>
    <h1 style={styles.notFoundHeader}>
      {" "}
      <FormattedMessage id="pageNotFound" defaultMessage="Page Not Found" />
    </h1>
  </div>
);

export default NotFound;
