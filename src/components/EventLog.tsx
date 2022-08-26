import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { PaginationField } from "./Table/PaginationField";
import { LogTable } from "./Table/LogTable";
import { FieldSwicherDropMenu } from "./Table/FieldSwicherDropMenu";

export const EventLog = () => (
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
      <LogTable />
      <PaginationField />
    </Grid>
  </Paper>
);
