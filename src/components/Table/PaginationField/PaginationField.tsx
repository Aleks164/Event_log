import React, { useRef, useState } from "react";
import { Grid, IconButton, TextField, Tooltip } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { setPageWithDebouncer } from "./setPageWithDebouncer";
// import { ButtonWithTooltip } from "./ButtonWithTooltip";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { nextPageHandler } from "./nextPageHandler";

export const PaginationField = () => {
  const dispatch = useTypedDispatch();
  const { currentPage, tableRows, isLoading } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
  const { serverDataLength } = useTypedSelector((state) => state.dataManager);
  const [pageNumber, setPageNumber] = useState<number>(currentPage);
  const debounceTimeOutID = useRef<NodeJS.Timeout>();
  const setPageWithDebouncerParam = {
    debounceTimeOutID,
    dispatch,
    tableRows,
    setPageNumber,
    serverDataLength,
  };
  const nextPageHandlerParam = {
    pageNumber,
    tableRows,
    dispatch,
    setPageNumber,
    serverDataLength,
  };

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
        {/* <ButtonWithTooltip tooltipTitle={"Back to 100"} onClick={() => {
            nextPageHandler(nextPageHandlerParam, "-100");
          }} disabled={pageNumber === 1 || isLoading} ArrowIcon={KeyboardDoubleArrowLeftIcon}/> */}
      <Tooltip aria-disabled={pageNumber === 1 || isLoading} title={<p style={{ fontSize: "1rem" }}>Back to 100</p>}>
        <IconButton
          onClick={() => {
            nextPageHandler(nextPageHandlerParam, "-100");
          }}
          disabled={pageNumber === 1 || isLoading}
          aria-label="toTheStart"
          size="large"
        >
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
      </Tooltip>

      <Tooltip aria-disabled={pageNumber === 1 || isLoading} title={<p style={{ fontSize: "1rem" }}>Back</p>}>
        <IconButton
          disabled={pageNumber === 1 || isLoading}
          onClick={() => {
            nextPageHandler(nextPageHandlerParam, "-1");
          }}
          aria-label="prev"
          size="large"
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
      </Tooltip>

      <TextField
        inputProps={{
          inputMode: "numeric",
          min: 1,
          max: 100000,
        }}
        value={pageNumber}
        className="pageNumberInput"
        sx={{ width: "70px", p: 1 }}
        onChange={(e) => {
          setPageWithDebouncer(setPageWithDebouncerParam, e.target.value);
        }}
      />
      <Tooltip aria-disabled={isLoading} title={<p style={{ fontSize: "1rem" }}>Forward</p>}>
        <IconButton
          onClick={() => {
            nextPageHandler(nextPageHandlerParam, "1");
          }}
          disabled={isLoading}
          aria-label="next"
          size="large"
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Tooltip>

      <Tooltip aria-disabled={isLoading} title={<p style={{ fontSize: "1rem" }}>Forward to 100</p>}>
        <IconButton
          disabled={isLoading}
          onClick={() => {
            nextPageHandler(nextPageHandlerParam, "100");
          }}
          aria-label="toTheFinish"
          size="large"
        >
          <KeyboardDoubleArrowRightIcon />
        </IconButton>
      </Tooltip>
    </Grid>
  );
};
