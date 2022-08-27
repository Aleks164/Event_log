import React, { useLayoutEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { PaginationField } from "./Table/PaginationField";
import { LogTable } from "./Table/LogTable";
import { FieldSwicherDropMenu } from "./Table/FieldSwicherDropMenu";
import { useTypedDispatch, useTypedSelector } from "../hooks/redux";
import { TableCustomSpiner } from "./Table/TableCustomSpiner";
import { setNewPageDataAction } from "../store/actions/setNewPageDataAction";

export const EventLog = () => {
  const { currentPage, tableRows, isLoading } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
  const dispatch = useTypedDispatch();
  console.log(isLoading);

  useLayoutEffect(() => {
    dispatch(setNewPageDataAction(currentPage, tableRows));
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{ width: "max-content", p: "15px", pb: 0, ml: "auto", mr: "auto" }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <FieldSwicherDropMenu />
        {!isLoading ? <LogTable /> : <TableCustomSpiner />}
        <PaginationField />
      </Grid>
    </Paper>
  );
};
