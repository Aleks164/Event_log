import React from "react";
import { IconButton, Grid } from "@mui/material";

import { DataKeysType, SortArrowType } from "../../../types/types";
import { useTypedSelector, useTypedDispatch } from "../../../hooks/redux";
import { defaultData } from "../../../utils/defaultData";
import { curFilterIcon } from "./curFilterIcon";
import { sortingField } from "./sortingField";

export const SortArrow = ({ fieldIndex }: SortArrowType) => {
  const { data, serverDataLength } = useTypedSelector(
    (state) => state.dataManager
  );
  const { curItem, type } = useTypedSelector((state) => state.sortManager);
  const { currentPage, tableRows } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
  const dispatch = useTypedDispatch();
  const keyOfDataItem = Object.keys(defaultData[0]);
  const filterParams = {
    keyOfDataItem,
    fieldIndex,
    curItem,
    type,
    dispatch,
    data,
    currentPage,
    tableRows,
    serverDataLength,
  };

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
          type,
          curItem === (keyOfDataItem[fieldIndex - 1] as DataKeysType)
        )}
      </IconButton>
    </Grid>
  );
};
