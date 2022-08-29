import React from "react";
import {IconButton, Tooltip } from "@mui/material";

export const ButtonWithTooltip =({tooltipTitle,onClick,disabled,ArrowIcon}) =>  { 
  return(<Tooltip title={<p style={{ fontSize: "1rem" }}>{tooltipTitle}</p>}>
        <IconButton
          onClick={disabled? undefined : onClick}
          disabled={disabled}
          aria-label="toTheStart"
          size="large"
        >
          <ArrowIcon />
        </IconButton>
      </Tooltip> )}
