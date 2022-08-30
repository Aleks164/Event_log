import React from "react";
import { CircularProgress, Grid, Paper } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTypedSelector } from "@/hooks/redux";
import { tableHeaders } from "@/utils/tableHeaders";
import { readUserSettings } from "@/utils/readUserSettings";
import { UserSettingsStateType } from "@/types/types";
import "./tableStyle.css";

export const TableCustomSpiner = () => {
  const { tableRows, tableHeadersList } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
  const storageTableHeaders = readUserSettings(
    "tableHeadersList"
  ) as UserSettingsStateType["tableHeadersList"];

  const lastComposition = storageTableHeaders || tableHeadersList;

  const storageRowsStyle = readUserSettings(
    "rowsStyleComposition"
  ) as UserSettingsStateType["rowsStyleComposition"];

  const { rowsStyleComposition } = useTypedSelector(
    (state) => state.eventLogStateManager
  );

  const lastRowsStyle = storageRowsStyle || rowsStyleComposition;

  return (
    <Paper elevation={3} className="table-wrapper">
      <table
        className="resizeable-table"
        style={{
          gridTemplateColumns: lastRowsStyle,
        }}
      >
        <thead>
          <tr>
            {tableHeaders.map((text, i) => (
              <th
                key={text}
                className={lastComposition.includes(text) ? "" : "hideColumn"}
                style={{
                  paddingTop: `${i === 0 ? "27px" : "20px"}`,
                  height: `${i === 0 ? "28px" : "35px"}`,
                }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ minWidth: "max-content" }}
                >
                  <span>{text}</span>
                  {i !== 0 && (
                    <ArrowDropDownIcon
                      sx={{ color: "blue", ml: "4px" }}
                      fontSize="large"
                    />
                  )}
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
          {Array(tableRows)
            .fill("table text")
            .map((text, index) => (
              <tr key={index}>
                {Array(lastComposition.length)
                  .fill("")
                  .map((_, i) => {
                    if (index === tableRows - 1 && i === 0)
                      return (
                        <td style={{ color: "white" }} key={i}>
                          {text}
                          <CircularProgress
                            size={150}
                            sx={{
                              position: "absolute",
                              left: "47%",
                              top: "37%",
                            }}
                          />
                        </td>
                      );
                    return (
                      <td
                        style={{ color: "white" }}
                        key={i}
                        className={
                          !lastComposition.includes(tableHeaders[i])
                            ? "hideColumn"
                            : ""
                        }
                      >
                        {text}
                      </td>
                    );
                  })}
              </tr>
            ))}
        </tbody>
      </table>
    </Paper>
  );
};
