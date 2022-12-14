import React from "react";
import { IconButton, Grid } from "@mui/material";
import { DataKeysType, SortArrowType } from "@/types/types";
import { useTypedDispatch } from "@/hooks/redux";
import { curFilterIcon } from "./curFilterIcon";
import { sortingField } from "./sortingField";
import { keyOfDataItem } from "@/utils/keyOfDataItem";

export const SortArrow = ({ sortArrowParam }: SortArrowType) => {
  const dispatch = useTypedDispatch();

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
        onClick={() =>
          sortingField({ ...sortArrowParam, keyOfDataItem, dispatch })
        }
        aria-label="Sort"
        size="small"
      >
        {curFilterIcon(
          sortArrowParam.type,
          sortArrowParam.curItem ===
            (keyOfDataItem[sortArrowParam.fieldIndex - 1] as DataKeysType)
        )}
      </IconButton>
    </Grid>
  );
};
