import React from "react";
import { Button } from "@material-ui/core";

const Pagination = props => {
  const pageLinks = [];

  for (let i = 1; i <= props.pages + 1; i++) {
    let active = props.currentPage === i ? "#1a3359" : "";

    pageLinks.push(
      <Button
        style={{
          backgroundColor: `${active}`,
          margin: 8,
          marginBottom: 0,
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
    <div className="container">
      <div className="row">{pageLinks}</div>
    </div>
  );
};
export default Pagination;
