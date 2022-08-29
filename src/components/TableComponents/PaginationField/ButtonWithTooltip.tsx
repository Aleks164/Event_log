import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { TooltipButtonParamType } from "@/types/types";

export const ButtonWithTooltip = ({
  tooltipTitle,
  onClick,
  disabled,
  ArrowIcon,
}: TooltipButtonParamType) => (
  <IconButton
    onClick={onClick}
    disabled={disabled}
    aria-label={tooltipTitle}
    size="large"
  >
    <Tooltip title={<p style={{ fontSize: "1rem" }}>{tooltipTitle}</p>}>
      <ArrowIcon />
    </Tooltip>
  </IconButton>
);
