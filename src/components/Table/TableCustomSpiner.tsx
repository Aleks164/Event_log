import React from "react";
import { CircularProgress, Grid, Paper } from "@mui/material";
import { useTypedSelector } from "../../hooks/redux";
import { SortArrow } from "./SortArrow/SortArrow";
import { defaultData } from "../../utils/defaultData";
import "./tableStyle.css";

export const TableCustomSpiner = () => {
  const { currentPage, tableRows, tableHeadersList } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
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
            {tableHeadersList.map((text, i) => (
              <th key={text} style={{ paddingTop: `${i === 0 ? "27px" : ""}` }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ minWidth: "max-content" }}
                >
                  <span>{text}</span>
                  {i !== 0 && <SortArrow fieldIndex={i} />}
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
                {defaultData
                  .slice(0, tableHeadersList.length)
                  .map((text, i) => {
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
