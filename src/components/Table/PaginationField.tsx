import React, { useState } from "react";
import { Paper, Grid, IconButton, Typography, TextField } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export const PaginationField = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  function setPageWithBebouncer(newPagenumber: number) {
    const timeOutId = setTimeout(() => {
      setPageNumber(newPagenumber);
    }, 300);
    return () => {
      clearTimeout(timeOutId);
    };
  }

  function nextPageHandler(nextPage: string) {
    let newNumber = parseInt(nextPage, 10) + pageNumber;
    if (newNumber > 100) newNumber = 100;
    if (newNumber < 1) newNumber = 1;
    setPageNumber(newNumber);
  }
  return (
    <Grid
      item
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        pr: "30px",
        pt: "5px",
        pb: "5px",
      }}
    >
      <IconButton
        onClick={() => {
          setPageWithBebouncer(1);
        }}
        disabled={pageNumber === 1}
        aria-label="toTheStart"
        size="large"
      >
        <KeyboardDoubleArrowLeftIcon />
      </IconButton>

      <IconButton
        disabled={pageNumber === 1}
        onClick={() => {
          nextPageHandler("-1");
        }}
        aria-label="prev"
        size="large"
      >
        <KeyboardArrowLeftIcon />
      </IconButton>

      <TextField
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]{1}",
          min: 1,
          max: 100,
        }}
        value={pageNumber}
        className="pageNumberInput"
        sx={{ width: "70px", p: 1 }}
        onChange={(e) => {
          let value = parseInt(e.target.value, 10);
          if (value > 100) value = 100;
          if (value < 1) value = 1;
          setPageNumber(value);
        }}
      />

      <IconButton
        onClick={() => {
          nextPageHandler("1");
        }}
        disabled={pageNumber === 100}
        aria-label="next"
        size="large"
      >
        <KeyboardArrowRightIcon />
      </IconButton>

      <IconButton
        disabled={pageNumber === 100}
        onClick={() => {
          setPageWithBebouncer(100);
        }}
        aria-label="toTheFinish"
        size="large"
      >
        <KeyboardDoubleArrowRightIcon />
      </IconButton>
    </Grid>
  );
};
