import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactType, FilterType } from "../../types/types";

const initialState: FilterType = {
  field: "name",
  filtredContacts: [],
  filterValue: "",
};

export const filterManager = createSlice({
  name: "filterManager",
  initialState,
  reducers: {
    setChangeField: (state, action: PayloadAction<FilterType["field"]>) => {
      state.field = action.payload;
    },
    setFiltredList: (
      state,
      action: PayloadAction<FilterType["filtredContacts"]>
    ) => {
      state.filtredContacts = action.payload;
    },
    deleteContactInFiltredList: (
      state,
      action: PayloadAction<ContactType["id"]>
    ) => {
      state.filtredContacts = state.filtredContacts.filter(
        (filtredContact) => filtredContact.id !== action.payload
      );
    },
    setFilterValue: (
      state,
      action: PayloadAction<FilterType["filterValue"]>
    ) => {
      state.filterValue = action.payload;
    },
  },
});

export const {
  setChangeField,
  setFiltredList,
  deleteContactInFiltredList,
  setFilterValue,
} = filterManager.actions;

export default filterManager.reducer;
