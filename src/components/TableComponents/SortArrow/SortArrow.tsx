import React, { useEffect } from "react";
import { IconButton, Grid } from "@mui/material";
import {
  DataKeysType,
  SortArrowType,
  SortParamStorageType,
} from "@/types/types";
import { useTypedSelector, useTypedDispatch } from "@/hooks/redux";
import { defaultData } from "@/utils/defaultData";
import { curFilterIcon } from "./curFilterIcon";
import { sortingField } from "./sortingField";
import { readUserSettings } from "@/utils/readUserSettings";

export const SortArrow = ({ fieldIndex }: SortArrowType) => {
  const { data, serverDataLength } = useTypedSelector(
    (state) => state.dataManager
  );
  const { curItem, type } = useTypedSelector((state) => state.sortManager);
  const { currentPage, tableRows } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
  const storageSortParam = readUserSettings("sortParam");
  const lastSortParam = (storageSortParam as SortParamStorageType) || {
    curItem,
    type,
  };

  const dispatch = useTypedDispatch();
  const keyOfDataItem = Object.keys(defaultData[0]);
  const filterParams = {
    keyOfDataItem,
    fieldIndex,
    curItem: lastSortParam.curItem,
    type: lastSortParam.type,
    dispatch,
    data,
    currentPage,
    tableRows,
    serverDataLength,
  };

  // useEffect(() => {
  //   if (lastSortParam.type !== "default") sortingField(filterParams);
  // }, []);

  return (
    <Grid
      item
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "min-content" }}
    >
      <IconButton
        onClick={() => sortingField(filterParams)}
        aria-label="Sort"
        size="small"
      >
        {curFilterIcon(
          lastSortParam.type,
          lastSortParam.curItem ===
            (keyOfDataItem[fieldIndex - 1] as DataKeysType)
        )}
      </IconButton>
    </Grid>
  );
};
