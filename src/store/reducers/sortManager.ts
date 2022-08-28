import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortParamType } from "../../types/types";

const initialState: SortParamType = {
  type: "down",
  curItem: "deviceId"
};

export const sortManager = createSlice({
  name: "sortManager",
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortParamType["type"]>) => {
      state.type = action.payload;
    },
    setCurItem: (state, action: PayloadAction<SortParamType["curItem"]>) => {
      state.curItem = action.payload;
    }
  },
});

export const {
  setSortType,
  setCurItem
} = sortManager.actions;

export default sortManager.reducer;
