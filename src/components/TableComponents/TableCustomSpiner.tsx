import React, { useEffect } from "react";
import { CircularProgress, Grid, Paper } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTypedSelector, useTypedDispatch } from "@/hooks/redux";
import { SortArrow } from "./SortArrow/SortArrow";
import { defaultData } from "@/utils/defaultData";
import { tableHeaders } from "@/utils/tableHeaders";
import { readUserSettings } from "@/utils/readUserSettings";
import { UserSettingsStateType } from "@/types/types";
import "./tableStyle.css";

export const TableCustomSpiner = () => {
  const { currentPage, tableRows, tableHeadersList } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
  const storageTableHeaders = readUserSettings("tableHeadersList");
  
  const lastComposition =
    (storageTableHeaders as UserSettingsStateType["tableHeadersList"]) ||
    tableHeadersList;

  const rowNumberCalc = (index: number) =>
    String((currentPage - 1) * tableRows + index + 1);

  return (
    <Paper elevation={3} className="table-wrapper">
      <table
        className="resizeable-table"
        style={{
          gridTemplateColumns: `repeat(${lastComposition.length}, minmax(150px, 1fr))`,
        }}
      >
        <thead>
          <tr>
            {tableHeaders.map((text, i) => (
              <th key={text}  className={lastComposition.includes(text) ? "" : "hideColumn"} style={{ paddingTop: `${i === 0 ? "27px" : ""}` }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ minWidth: "max-content" }}
                >
                  <span>{text}</span>
                  {i !== 0 && <ArrowDropDownIcon sx={{ color: "blue" }} fontSize="large" />}
                </Grid>
                <div style={{ height: "100%" }} className="resize-handle" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          style={{
            position: "relative",
            overflow: "visible",
          }}
        >
          {Array(tableRows - 1)
            .fill("")
            .map((empty, index) => (
              <tr key={index}>
                {defaultData.slice(0, lastComposition.length).map((text, i) => {
                  if (i === 0) return <td key={i}>{rowNumberCalc(index)}</td>;
                  if (index === 1)
                    return (
                      <td style={{ color: "white" }} key={i}>
                        {text.deviceId}
                      </td>
                    );
                  return (
                    <td style={{ color: "white" }} key={i}>
                      {empty}
                    </td>
                  );
                })}
              </tr>
            ))
            .concat([
              <tr key={"CircularProgress"}>
                <td>
                  {rowNumberCalc(tableRows - 1)}
                  <CircularProgress
                    size={150}
                    sx={{
                      position: "absolute",
                      left: "47%",
                      top: "37%",
                    }}
                  />
                </td>
              </tr>,
            ])}
        </tbody>
      </table>
    </Paper>
  );
};
