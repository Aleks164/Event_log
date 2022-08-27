import React, { useState } from "react";
import { Paper, Grid, IconButton, Typography, TextField } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { setCurrentPage } from "../../store/reducers/eventLogStateManager";
import { setNewPageDataAction } from "../../store/actions/setNewPageDataAction";

export const PaginationField = () => {
  const dispatch = useTypedDispatch();
  const { currentPage, tableRows, isLoading } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
  const [pageNumber, setPageNumber] = useState<number>(currentPage);

  function setPageWithDebouncer(newPagenumber: number) {
    const timeOutId = setTimeout(() => {
      setPageNumber(newPagenumber);
      dispatch(setCurrentPage(newPagenumber));
      dispatch(setNewPageDataAction(newPagenumber, 15));
    }, 300);
    return () => {
      clearTimeout(timeOutId);
    };
  }

  function nextPageHandler(nextPage: string) {
    let newNumber = parseInt(nextPage, 10) + pageNumber;
    if (newNumber > 100) newNumber = 100;
    if (newNumber < 1) newNumber = 1;
    console.log("tableRows", tableRows);
    setPageNumber(newNumber);
    dispatch(setCurrentPage(newNumber));
    dispatch(setNewPageDataAction(newNumber, 15));
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
          setPageWithDebouncer(1);
        }}
        disabled={pageNumber === 1 || isLoading}
        aria-label="toTheStart"
        size="large"
      >
        <KeyboardDoubleArrowLeftIcon />
      </IconButton>

      <IconButton
        disabled={pageNumber === 1 || isLoading}
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
          min: 1,
          max: 100,
        }}
        disabled={isLoading}
        value={pageNumber}
        className="pageNumberInput"
        sx={{ width: "70px", p: 1 }}
        onChange={(e) => {
          let value = parseInt(e.target.value, 10);
          if (value > 100) value = 100;
          if (value < 1) value = 1;
          setPageWithDebouncer(value);
        }}
      />

      <IconButton
        onClick={() => {
          nextPageHandler("1");
        }}
        disabled={pageNumber === 100 || isLoading}
        aria-label="next"
        size="large"
      >
        <KeyboardArrowRightIcon />
      </IconButton>

      <IconButton
        disabled={pageNumber === 100 || isLoading}
        onClick={() => {
          setPageWithDebouncer(100);
        }}
        aria-label="toTheFinish"
        size="large"
      >
        <KeyboardDoubleArrowRightIcon />
      </IconButton>
    </Grid>
  );
};
