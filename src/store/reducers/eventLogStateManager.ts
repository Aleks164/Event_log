import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventLogStateManagerType } from "../../types/types";

const initialState: EventLogStateManagerType = {
   rowsNumber:15,
    currentPage:1,
  isLoading: false,  
  error: "", 
};

export const eventLogStateManager = createSlice({
  name: "eventLogStateManager",
  initialState,
  reducers: {
    setCurrentPage: (state, action:PayloadAction<EventLogStateManagerType["currentPage"]>) => {
      state.currentPage = action.payload;
    },
    setIsLoading: (state, action:PayloadAction<EventLogStateManagerType["isLoading"]>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<EventLogStateManagerType["error"]>) => {
      state.error = action.payload;
    },
  },
});

export const {
    setCurrentPage,
  setIsLoading,
  setError,
} = eventLogStateManager.actions;

export default eventLogStateManager.reducer;
