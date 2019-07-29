import React from "react";
import { Button, Tooltip } from "@material-ui/core";
import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  LastPage,
  FirstPage
} from "@material-ui/icons";
import paginator from "../../../utils/paginator";
import { styles } from "./styles";
import { FormattedMessage } from "react-intl";

const Pagination = props => {
  const pageLinks = [];

  const paginationInfo = new paginator(props.limit, 3).build(
    props.totalProducts,
    props.currentPage
  );

  for (let i = paginationInfo.first_page; i <= paginationInfo.last_page; i++) {
    let active = props.currentPage === i ? "#1a3359" : "";
    pageLinks.push(
      <Button
        style={{
          backgroundColor: `${active}`,
          maxWidth: "38px",
          maxHeight: "38px",
          minWidth: "38px",
          minHeight: "38px",
          margin: "8px 8px 16px 8px",
          padding: 8
        }}
        color="primary"
        key={i}
        variant="contained"
        onClick={() => props.nextPage(i)}
      >
        {i}
      </Button>
    );
  }

  return (
    <div style={styles.buttonPosition}>
      <Tooltip
        disableFocusListener
        title={<FormattedMessage id="firstPage" defaultMessage="First page" />}
      >
        <div>
          <Button
            disabled={props.currentPage > 1 ? false : true}
            style={styles.buttonStyle}
            color="primary"
            variant="contained"
            onClick={() => props.nextPage(1)}
          >
            <FirstPage />
          </Button>
        </div>
      </Tooltip>
      <Tooltip
        disableFocusListener
        title={<FormattedMessage id="backPage" defaultMessage="Back page" />}
      >
        <div>
          <Button
            disabled={props.currentPage > 1 ? false : true}
            style={styles.buttonStyle}
            color="primary"
            variant="contained"
            onClick={() => props.nextPage(props.currentPage - 1)}
          >
            <KeyboardArrowLeft />
          </Button>
        </div>
      </Tooltip>
      <div>{pageLinks}</div>
      <Tooltip
        disableFocusListener
        title={<FormattedMessage id="nextPage" defaultMessage="Next page" />}
      >
        <div>
          <Button
            disabled={props.currentPage < props.pages ? false : true}
            style={styles.buttonStyle}
            color="primary"
            variant="contained"
            onClick={() => props.nextPage(props.currentPage + 1)}
          >
            <KeyboardArrowRight />
          </Button>
        </div>
      </Tooltip>
      <Tooltip
        disableFocusListener
        title={<FormattedMessage id="lastPage" defaultMessage="Last page" />}
      >
        <div>
          <Button
            disabled={props.currentPage < props.pages ? false : true}
            style={styles.buttonStyle}
            color="primary"
            variant="contained"
            onClick={() => props.nextPage(props.pages)}
          >
            <LastPage />
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};
export default Pagination;
