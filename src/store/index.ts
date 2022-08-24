import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authManager from "./reducers/authManager";
import contactsListManager from "./reducers/contactsListManager";
import filterManager from "./reducers/filterManager";

const userReucer = combineReducers({
  authManager,
  contactsListManager,
  filterManager,
});

export const store = configureStore({
  reducer: userReucer,
});

export type UserManagerType = ReturnType<typeof userReucer>;
export type StoreType = typeof store;
export type AppDispatch = StoreType["dispatch"];
