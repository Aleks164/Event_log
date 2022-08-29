import React, { useRef, useState } from "react";
import { Grid, IconButton, TextField, Tooltip } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { setPageWithDebouncer } from "./setPageWithDebouncer";
import { ButtonWithTooltip } from "./ButtonWithTooltip";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { nextPageHandler } from "./nextPageHandler";
import { readUserSettings } from "@/utils/readUserSettings";
import { UserSettingsStateType } from "@/types/types";

export const PaginationField = () => {
  const dispatch = useTypedDispatch();
  const { currentPage, tableRows, isLoading } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
  const storagePage = readUserSettings("currentPage");
  const lastPage =
    (storagePage as UserSettingsStateType["currentPage"]) || currentPage;
  const { serverDataLength } = useTypedSelector((state) => state.dataManager);
  const [pageNumber, setPageNumber] = useState<number>(lastPage);
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
      <ButtonWithTooltip
        tooltipTitle={"Back to 100"}
        onClick={() => {
          nextPageHandler(nextPageHandlerParam, "-100");
        }}
        disabled={pageNumber === 1 || isLoading}
        ArrowIcon={KeyboardDoubleArrowLeftIcon}
      />

      <ButtonWithTooltip
        tooltipTitle={"Back"}
        onClick={() => {
          nextPageHandler(nextPageHandlerParam, "-1");
        }}
        disabled={pageNumber === 1 || isLoading}
        ArrowIcon={KeyboardArrowLeftIcon}
      />

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
          console.log("currentSettings.currentPage22", pageNumber);
          setPageWithDebouncer(setPageWithDebouncerParam, e.target.value);
        }}
      />

      <ButtonWithTooltip
        tooltipTitle={"Forward"}
        onClick={() => {
          nextPageHandler(nextPageHandlerParam, "1");
        }}
        disabled={isLoading}
        ArrowIcon={KeyboardArrowRightIcon}
      />

      <ButtonWithTooltip
        tooltipTitle={"Forward to 100"}
        onClick={() => {
          nextPageHandler(nextPageHandlerParam, "100");
        }}
        disabled={isLoading}
        ArrowIcon={KeyboardDoubleArrowRightIcon}
      />
    </Grid>
  );
};
