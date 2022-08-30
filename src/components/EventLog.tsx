import React, { useLayoutEffect, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { PaginationField } from "./TableComponents/PaginationField/PaginationField";
import { LogTable } from "./TableComponents/LogTable";
import { FieldSwicherDropMenu } from "./TableComponents/FieldSwicherDropMenu/FieldSwicherDropMenu";
import { useTypedDispatch, useTypedSelector } from "../hooks/redux";
import { readUserSettings } from "../utils/readUserSettings";
import { TableCustomSpiner } from "./TableComponents/TableCustomSpiner";
import { setNewPageDataAction } from "../store/actions/setNewPageDataAction";
import {
  setIsLoading,
  setRowsStyleComposition,
} from "../store/reducers/eventLogStateManager";
import { setFullDataLength } from "../store/actions/setFullDataLength";
import { UserSettingsStateType } from "@/types/types";

export const EventLog = () => {
  const { tableRows, isLoading } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
  const { serverDataLength } = useTypedSelector((state) => state.dataManager);
  const dispatch = useTypedDispatch();

  useLayoutEffect(() => {
    const storagePage = readUserSettings("currentPage");
    const lastPage = (storagePage as UserSettingsStateType["currentPage"]) || 1;

    const storageRowsStyle = readUserSettings("rowsStyleComposition");
    storageRowsStyle &&
      dispatch(
        setRowsStyleComposition(
          storageRowsStyle as UserSettingsStateType["rowsStyleComposition"]
        )
      );
    dispatch(setFullDataLength());
    dispatch(setNewPageDataAction(lastPage, tableRows, serverDataLength));
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
