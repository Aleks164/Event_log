import React, { useState } from "react";
import { IconButton, Grid } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
  DataItemType,
  DataKeysType,
  FilterIconType,
  SortArrowType,
} from "../../types/types";
import { useTypedSelector, useTypedDispatch } from "../../hooks/redux";
import { setCurItem, setSortType } from "../../store/reducers/sortManager";
import { setData } from "../../store/reducers/dataManager";
import { setNewPageDataAction } from "../../store/actions/setNewPageDataAction";
import { defaultData } from "../../utils/defaultData";

export const SortArrow = ({ fieldIndex }: SortArrowType) => {
  // const [sortDirection, setSortDirection] = useState<FilterIconType>("down");
  const { data } = useTypedSelector((state) => state.dataManager);
  // eslint-disable-next-line prefer-const
  let { type, curItem } = useTypedSelector((state) => state.sortManager);
  const { currentPage, tableRows } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
  const dispatch = useTypedDispatch();
  const keyOfDataItem = Object.keys(defaultData[0]);

  function curFilterIcon(iconType: FilterIconType, choosedField: DataKeysType) {
    if (choosedField === curItem) {
      if (iconType === "default") return <MenuOpenIcon fontSize="large" />;
      if (iconType === "up")
        return <ArrowDropUpIcon sx={{ color: "red" }} fontSize="large" />;
    }
    return <ArrowDropDownIcon sx={{ color: "blue" }} fontSize="large" />;
  }

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
        onClick={() => {
          let nextType: FilterIconType = "down";
          const sortField = keyOfDataItem[fieldIndex - 1] as DataKeysType;
          if (sortField !== curItem) {
            type = "down";
            dispatch(setSortType(nextType));
          }
          if (type === "down") {
            nextType = "up";
            let sortDataClone = data.slice();
            sortDataClone = sortDataClone.sort((a, b) => {
              if (a[sortField] < b[sortField]) return -1;
              if (a[sortField] > b[sortField]) return 1;
              return 0;
            });
            dispatch(setData(sortDataClone));
            dispatch(setSortType(nextType));
            dispatch(setCurItem(sortField));
          }
          if (type === "default") {
            console.log("sort", type, sortField);
            dispatch(setNewPageDataAction(currentPage, tableRows));
            dispatch(setSortType(nextType));
            dispatch(setCurItem(sortField));
          }

          if (type === "up") {
            nextType = "default";
            let sortDataClone = data.slice();
            console.log("sort", type, sortField);
            sortDataClone = sortDataClone.reverse();
            dispatch(setData(sortDataClone));
            dispatch(setSortType(nextType));
            dispatch(setCurItem(sortField));
          }
        }}
        aria-label="Sort"
        size="small"
      >
        {curFilterIcon(type, keyOfDataItem[fieldIndex - 1] as DataKeysType)}
      </IconButton>
    </Grid>
  );
};
