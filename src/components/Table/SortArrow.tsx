import React, {useState} from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {  IconButton, Grid } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const SortArrow = ()=>{
    const [sortDirection, setSortDirection] = useState<"down"|"up">("down");
    return(<Grid item
  container
  direction="column"
  justifyContent="center"
  alignItems="center"
  sx={{width: "min-content"}}
>
    <IconButton
         onClick={()=>{
             console.log(sortDirection);
             setSortDirection(prev=>prev==="down"?"up":"down");
             }}
         aria-label="upSort"
         size="small">
         {sortDirection==="up"?<ArrowDropUpIcon sx={{color:"red"}} fontSize="large"/>  
         :<ArrowDropDownIcon fontSize="large" />}
         </IconButton> 
         </Grid>
    )
}