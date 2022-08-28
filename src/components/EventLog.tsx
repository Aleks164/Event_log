import React, { useLayoutEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { PaginationField } from "./Table/PaginationField/PaginationField";
import { LogTable } from "./Table/LogTable";
import { FieldSwicherDropMenu } from "./Table/FieldSwicherDropMenu/FieldSwicherDropMenu";
import { useTypedDispatch, useTypedSelector } from "../hooks/redux";
import { TableCustomSpiner } from "./Table/TableCustomSpiner";
import { setNewPageDataAction } from "../store/actions/setNewPageDataAction";
import { setIsLoading } from "../store/reducers/eventLogStateManager";
import { setFullDataLength } from "../store/actions/setFullDataLength";

export const EventLog = () => {
  const { currentPage, tableRows, isLoading } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
  const { serverDataLength } = useTypedSelector((state) => state.dataManager);
  const dispatch = useTypedDispatch();

  useLayoutEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(setFullDataLength());
    dispatch(setNewPageDataAction(currentPage, tableRows, serverDataLength));
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 500);
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
