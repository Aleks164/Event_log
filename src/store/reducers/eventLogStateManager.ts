import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventLogStateManagerType } from "@/types/types";
import { tableHeaders } from "@/utils/tableHeaders";

const initialState: EventLogStateManagerType = {
  tableRows: 15,
  minColumnWidth: 150,
  tableHeadersList: tableHeaders,
  currentPage: 1,
  isLoading: false,
  error: "",
};

export const eventLogStateManager = createSlice({
  name: "eventLogStateManager",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<EventLogStateManagerType["currentPage"]>) => {
      state.currentPage = action.payload;
    },
    setTableHeadersList: (state, action: PayloadAction<EventLogStateManagerType["tableHeadersList"]>) => {
      state.tableHeadersList = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<EventLogStateManagerType["isLoading"]>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<EventLogStateManagerType["error"]>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentPage,
  setTableHeadersList,
  setIsLoading,
  setError,
} = eventLogStateManager.actions;

export default eventLogStateManager.reducer;
