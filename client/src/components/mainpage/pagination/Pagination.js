import React from "react";
import { Button } from "@material-ui/core";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@material-ui/icons";
import paginator from "./paginator";
const Pagination = props => {
  const pageLinks = [];

  const paginationInfo = new paginator(props.limit, 3).build(
    props.totalProducts,
    props.currentPage
  );

  for (let i = paginationInfo.first_page; i <= paginationInfo.last_page; i++) {
    let active = props.currentPage === i ? "#1a3359" : "";
    console.log(props.pages);
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
      <div className="row">
        {props.currentPage > 1 ? (
          <Button
            style={{
              margin: 8,
              marginBottom: 0,
              padding: 8
            }}
            color="primary"
            variant="contained"
            onClick={() => props.nextPage(1)}
          >
            First
          </Button>
        ) : (
          ""
        )}
        {props.currentPage > 1 ? (
          <Button
            style={{
              margin: 8,
              marginBottom: 0,
              padding: 8
            }}
            color="primary"
            variant="contained"
            onClick={() => props.nextPage(props.currentPage - 1)}
          >
            <KeyboardArrowLeft />
          </Button>
        ) : (
          ""
        )}
        {pageLinks}
        {props.currentPage < props.pages ? (
          <Button
            style={{
              margin: 8,
              marginBottom: 0,
              padding: 8
            }}
            color="primary"
            variant="contained"
            onClick={() => props.nextPage(props.currentPage + 1)}
          >
            <KeyboardArrowRight />
          </Button>
        ) : (
          ""
        )}
        {props.currentPage < props.pages ? (
          <Button
            style={{
              margin: 8,
              marginBottom: 0,
              padding: 8
            }}
            color="primary"
            variant="contained"
            onClick={() => props.nextPage(props.pages)}
          >
            Last
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Pagination;
