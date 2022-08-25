import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { PaginationField } from "./Table/PaginationField";
import { LogTable } from "./Table/LogTable";
import { FieldManager } from "./Table/FieldManager";

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
      <FieldManager />
      <LogTable />
      <PaginationField />
    </Grid>
  </Paper>
);
