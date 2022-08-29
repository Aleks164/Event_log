import React from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { DispatchType } from "../hooks/redux";

export type FilterIconType = "down" | "up" | "default";

export type DataItemType = {
    deviceId: string;
    isActive: boolean;
    price: number;
    quantity: number;
    deviceType: "Type1" | "Type2" | "Type3" | "Type4";
    company: string;
    installationDate: string;
}

export type DataKeysType = keyof DataItemType;

export type SortParamType = {
    type: FilterIconType;
    curItem: DataKeysType;
}

export type DataManagerStateType = {
    data: DataItemType[];
    serverDataLength: number;
}

export type EventLogStateManagerType = {
    currentPage: number;
    tableRows: number;
    minColumnWidth: number;
    tableHeadersList: string[];
    isLoading: boolean;
    error: string;
}

export type SortArrowType = {
    fieldIndex: number;
}

export type SortingFieldParam = {
    keyOfDataItem: string[];
    fieldIndex: number;
    curItem: keyof DataItemType;
    type: FilterIconType;
    dispatch: DispatchType;
    data: DataItemType[];
    currentPage: number;
    tableRows: number;
    serverDataLength: number;
}

export interface MyEventTarget extends EventTarget {
    defaultValue: string;
}

export type VisionSwitcherParamType = {
    lastComposition: string[];
    dispatch: DispatchType;
}

export type SetPageWithDebouncerParamType = {
    debounceTimeOutID: React.MutableRefObject<NodeJS.Timeout | undefined>;
    dispatch: DispatchType;
    tableRows: number;
    serverDataLength: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

export type NextPageHandlerParamType = {
    pageNumber: number;
    tableRows: number;
    serverDataLength: number;
    dispatch: DispatchType;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

export type UserSettingsStateType = {
    currentPage: number;
    tableRowsStyle: string;
    type: FilterIconType;
    curItem: DataKeysType;
    tableHeadersList: string[];
}

export type TooltipButtonParamType = {
    tooltipTitle: string; onClick: () => void; disabled: boolean; ArrowIcon: typeof KeyboardDoubleArrowLeftIcon
}

export type UserSettingsKeysType = "currentPage" | "tableHeadersList" | "sortParam";

export type SortParamStorageType = {
    type: FilterIconType;
    curItem: DataKeysType;
} | null

export type LocalStorageItemsType = UserSettingsStateType["currentPage" | "tableHeadersList"] | SortParamStorageType