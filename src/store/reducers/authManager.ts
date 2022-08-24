import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthManagerStateType } from "../../types/types";

const initialState: AuthManagerStateType = {
  isLoading: false,
  isAuth: false,
  error: "",
  currentUser: "",
};

export const authManager = createSlice({
  name: "authManager",
  initialState,
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    setIsLoaded: (state) => {
      state.isLoading = false;
    },
    authSucsess: (
      state,
      action: PayloadAction<AuthManagerStateType["currentUser"]>
    ) => {
      state.isAuth = true;
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    logInError: (
      state,
      action: PayloadAction<AuthManagerStateType["error"]>
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setError: (state, action: PayloadAction<AuthManagerStateType["error"]>) => {
      state.error = action.payload;
    },
    logOut: (state) => {
      state.isAuth = false;
    },
  },
});

export const {
  setIsLoading,
  setIsLoaded,
  authSucsess,
  logInError,
  logOut,
  setError,
} = authManager.actions;

export default authManager.reducer;
