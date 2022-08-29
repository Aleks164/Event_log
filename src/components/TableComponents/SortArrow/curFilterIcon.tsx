import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { FilterIconType } from "@/types/types";

export function curFilterIcon(
  iconType: FilterIconType,
  isNextClckOnFilter: boolean
) {
  if (isNextClckOnFilter) {
    if (iconType === "default") return <MenuOpenIcon fontSize="large" />;
    if (iconType === "up")
      return <ArrowDropUpIcon sx={{ color: "red" }} fontSize="large" />;
  }
  return <ArrowDropDownIcon sx={{ color: "blue" }} fontSize="large" />;
}
