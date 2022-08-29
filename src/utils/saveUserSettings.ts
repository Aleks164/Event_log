import { UserSettingsKeysType, LocalStorageItemsType } from "../types/types";

export function saveUserSettings(items: LocalStorageItemsType, key: UserSettingsKeysType) {
  const imputsPars = JSON.stringify(items);
  window.localStorage.setItem(key, imputsPars);
}