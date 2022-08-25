import React, { useState } from "react";
import { Button, Grid, Menu, MenuItem, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";

export const FieldManager = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid
      item
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      sx={{
        m: 0,
        p: 0,
        position: "relative",
      }}
    >
      <Typography
        sx={{ position: "absolute", left: "calc(50% - 70px)" }}
        variant="h4"
      >
        Event log
      </Typography>
      <Button
        id="fieldManager"
        aria-controls={open ? "fieldList" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        sx={{ backgroundColor: "#89beff" }}
      >
        <ListIcon />
      </Button>
      <Menu
        id="fieldList"
        aria-labelledby="fieldManager"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Grid>
  );
};
