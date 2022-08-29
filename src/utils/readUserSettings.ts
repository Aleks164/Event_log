import {UserSettingsStateType} from "../types/types";

export function readUserSettings():UserSettingsStateType|{} {
  const item = window.localStorage.getItem("userSettings") as UserSettingsStateType;
  return item === null ? {} : JSON.parse(item);
}