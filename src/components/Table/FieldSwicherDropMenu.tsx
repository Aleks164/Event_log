import React, { useState } from "react";
import { Button, Grid, Menu, MenuItem, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { tableHeaders } from "../../utils/tableHeaders";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { setTableHeadersList } from "../../store/reducers/eventLogStateManager";

export const FieldSwicherDropMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useTypedDispatch();
  const { tableHeadersList } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
  const fullHederList = {
    "№ п.п.": { isVisible: true, filterType: "default" },
    "Id устройства": { isVisible: true, filterType: "default" },
    Состояние: { isVisible: true, filterType: "default" },
    Цена: { isVisible: true, filterType: "default" },
    Количество: { isVisible: true, filterType: "default" },
    "Тип устройства": { isVisible: true, filterType: "default" },
    Компания: { isVisible: true, filterType: "default" },
    "Дата установки": { isVisible: true, filterType: "default" },
  };
  const [columnFilter, setColumnFilter] = useState(null);
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
        sx={{
          position: "absolute",
          left: "calc(50% - 70px)",
          fontFamily: "inherit",
          fontWeight: 700,
        }}
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
        <FormGroup
          sx={{ p: "5px", pl: "20px", pr: "10px", userSelect: "none" }}
        >
          {tableHeaders.map((header, index) => (
            <FormControlLabel
              key={index}
              control={<Switch checked={tableHeadersList.includes(header)} />}
              label={header}
              value={header}
              onChange={(e) => {
                const headerCheck = tableHeadersList.includes(
                  e.target.defaultValue
                );
                if (headerCheck)
                  dispatch(
                    setTableHeadersList(
                      tableHeadersList.filter(
                        (el) => el !== e.target.defaultValue
                      )
                    )
                  );
                else {
                  const newHeaderList = tableHeadersList.concat(
                    e.target.defaultValue
                  );
                  dispatch(setTableHeadersList(newHeaderList));
                }
              }}
            />
          ))}
        </FormGroup>
      </Menu>
    </Grid>
  );
};
