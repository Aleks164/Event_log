import React, { useLayoutEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { PaginationField } from "./TableComponents/PaginationField/PaginationField";
import { LogTable } from "./TableComponents/LogTable";
import { FieldSwicherDropMenu } from "./TableComponents/FieldSwicherDropMenu/FieldSwicherDropMenu";
import { useTypedDispatch, useTypedSelector } from "../hooks/redux";
import { readUserSettings } from "../utils/readUserSettings";
import { saveUserSettings } from "../utils/saveUserSettings";
import { TableCustomSpiner } from "./TableComponents/TableCustomSpiner";
import { setNewPageDataAction } from "../store/actions/setNewPageDataAction";
import { setSortType, setCurItem } from "@/store/reducers/sortManager";
import {
  setIsLoading,
  setCurrentPage,
  setTableRowsStyle,
  setTableHeadersList,
} from "../store/reducers/eventLogStateManager";
import { setFullDataLength } from "../store/actions/setFullDataLength";
import { UserSettingsStateType } from "@/types/types";

export const EventLog = () => {
  const { tableRows, isLoading } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
   const { curItem, type } = useTypedSelector((state) => state.sortManager);
  const { serverDataLength } = useTypedSelector((state) => state.dataManager);
  const dispatch = useTypedDispatch();

  useLayoutEffect(() => {       
    const storagePage = readUserSettings("currentPage");
    const lastPage = (storagePage as UserSettingsStateType["currentPage"]) || 1;
    
    
    
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
