import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactsListManagerStateType, ContactType } from "../../types/types";
import { defaultContactList } from "../../utils/defaultData";

const initialState: ContactsListManagerStateType = {
  contacts: defaultContactList,
};

export const contactsListManager = createSlice({
  name: "contactsListManager",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactType>) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<ContactType["id"]>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

export const { addContact, deleteContact } = contactsListManager.actions;

export default contactsListManager.reducer;
