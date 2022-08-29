import {UserSettingsStateType} from "../types/types";

export function saveUserSettings(items: UserSettingsStateType) {
  const imputsPars = JSON.stringify(items);
  window.localStorage.setItem("userSettings", imputsPars);
}