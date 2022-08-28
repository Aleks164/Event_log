import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultData } from "../../utils/defaultData";
import { DataManagerStateType } from "../../types/types"

// const tempData = defaultData.filter((_,index)=>index<15);

const initialState: DataManagerStateType = {
  // data: tempData, 
  data: [],
  serverDataLength: 1000
};

export const dataManager = createSlice({
  name: "dataManager",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DataManagerStateType["data"]>) => {
      state.data = action.payload;
    },
    setServerDataLength: (state, action: PayloadAction<DataManagerStateType["serverDataLength"]>) => {
      state.serverDataLength = action.payload;
    },
  },
});

export const { setData, setServerDataLength } = dataManager.actions;

export default dataManager.reducer;
