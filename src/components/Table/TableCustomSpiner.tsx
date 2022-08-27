import React from "react";
import { CircularProgress, Grid, Paper } from "@mui/material";
import { useTypedSelector } from "../../hooks/redux";
import { SortArrow } from "./SortArrow";
import { tableHeaders } from "../../utils/tableHeaders";
import "./tableStyle.css";

export const TableCustomSpiner = () => {
  const { currentPage, tableRows } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
  const rowNumberCalc = (index: number) =>
    String((currentPage - 1) * tableRows + index + 1);
  return (
    <Paper elevation={3} className="table-wrapper">
      <table className="resizeable-table">
        <thead>
          <tr>
            {tableHeaders.map((text) => (
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
            .map((item, index) => (
              <tr key={index}>
                {tableHeaders.map((_, i) => {
                  if (i === 0)
                    return (
                      <td key={tableRows + 1 + i}>{rowNumberCalc(index)}</td>
                    );
                  return <td key={tableRows + 1 + i}>{item}</td>;
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
