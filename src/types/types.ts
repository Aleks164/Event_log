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
    type: FilterIconType,
    curItem: DataKeysType
}

export type DataManagerStateType = {
    data: DataItemType[]
}

export type EventLogStateManagerType = {
    currentPage: number,
    tableRows: number,
    tableHeadersList: string[],
    isLoading: boolean,
    error: string,
}

export type SortArrowType = {
    fieldIndex: number
}
