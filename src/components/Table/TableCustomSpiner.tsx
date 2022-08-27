import React from "react";
import { CircularProgress, Grid, Paper } from "@mui/material";
import { useTypedSelector } from "../../hooks/redux";
import { SortArrow } from "./SortArrow";
import { defaultData } from "../../utils/defaultData";
import "./tableStyle.css";

export const TableCustomSpiner = () => {
  const { currentPage, tableRows, tableHeadersList } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
  // console.log("length", tableHeadersList.length);

  const rowNumberCalc = (index: number) =>
    String((currentPage - 1) * tableRows + index + 1);
  return (
    <Paper elevation={3} className="table-wrapper">
      <table
        className="resizeable-table"
        style={{
          gridTemplateColumns: `repeat(${tableHeadersList.length}, minmax(150px, 1fr))`,
        }}
      >
        <thead>
          <tr>
            {tableHeadersList.map((text) => (
              <th key={text}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ minWidth: "max-content" }}
                >
                  <span>{text}</span>
                  <SortArrow />
                </Grid>
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
          {Array(tableRows)
            .fill("")
            .map((empty, index) => (
              <tr key={index}>
                {defaultData
                  .slice(0, tableHeadersList.length)
                  .map((text, i, arr) => {
                    if (i === 0)
                      return (
                        <td key={tableRows + 1 + i}>{rowNumberCalc(index)}</td>
                      );
                    if (index === 1)
                      return (
                        <td style={{ color: "white" }} key={tableRows + 1 + i}>
                          {text.deviceId}
                        </td>
                      );
                    return (
                      <td style={{ color: "white" }} key={tableRows + 1 + i}>
                        {empty}
                      </td>
                    );
                  })}
              </tr>
            ))
            .concat([
              <tr key={tableRows}>
                <td>
                  <CircularProgress
                    size={150}
                    sx={{
                      position: "absolute",
                      left: "50%",
                      top: "45%",
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
