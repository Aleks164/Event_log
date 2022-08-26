import React, {useState} from "react";
import {  IconButton, Grid } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {FilterIconType} from "../../types/types";

export const SortArrow = ()=>{
    const [sortDirection, setSortDirection] = useState<FilterIconType>("down");
    
    function curFilterIcon(type:FilterIconType){
        if(type==="down") return <ArrowDropDownIcon sx={{color:"blue"}} fontSize="large" />
        if(type==="up") return <ArrowDropUpIcon sx={{color:"red"}} fontSize="large"/>
        return <MenuOpenIcon fontSize="large"/>
    }
    
    return(<Grid item
  container
  direction="column"
  justifyContent="center"
  alignItems="center"
  sx={{width: "min-content"}}
>
    <IconButton
         onClick={()=>{             
             setSortDirection(prev=>{
                 if(prev==="down") return "up";
                 if(prev==="up") return "default";
                return "down";})
                }}
         aria-label="upSort"
         size="small">
         {curFilterIcon(sortDirection)}
         </IconButton> 
         </Grid>
    )
}