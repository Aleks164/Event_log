import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {SortParamType} from "../../types/types";

const initialState:SortParamType = {
  type:"default"
};

export const sortManager = createSlice({
  name: "sortManager",
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortParamType["type"]>) => {
      state.type = action.payload;
    } 
  },
});

export const {
  setSortType
} = sortManager.actions;

export default sortManager.reducer;
