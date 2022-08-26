import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dataManager from "./reducers/dataManager";
import eventLogStateManager from "./reducers/eventLogStateManager";
import sortManager from "./reducers/sortManager";

const userReucer = combineReducers({
  dataManager,
  eventLogStateManager,
  sortManager,
});

export const store = configureStore({
  reducer: userReucer,
});

export type UserManagerType = ReturnType<typeof userReucer>;
export type StoreType = typeof store;
export type AppDispatch = StoreType["dispatch"];
