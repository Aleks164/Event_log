import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataManagerStateType } from "@/types/types"

const initialState: DataManagerStateType = {
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
