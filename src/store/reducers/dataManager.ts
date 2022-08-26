import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultData } from "../../utils/defaultData";
import {DataManagerStateType} from "../../types/types"

const tempData = defaultData.filter((_,index)=>index<15);

const initialState: DataManagerStateType = {
  data: tempData, 
  // temporary  change to []
};

export const dataManager = createSlice({
  name: "dataManager",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DataManagerStateType["data"]>) => {
      state.data=action.payload;
    }
  },
});

export const { setData } = dataManager.actions;

export default dataManager.reducer;
