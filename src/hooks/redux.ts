import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, UserManagerType } from "../store";

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<UserManagerType> =
  useSelector;
