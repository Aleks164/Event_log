import { UserSettingsKeysType, LocalStorageItemsType } from "../types/types";

export function readUserSettings(key: UserSettingsKeysType): LocalStorageItemsType | null {
  const item = window.localStorage.getItem(key);
  return item === null ? null : JSON.parse(item);
}