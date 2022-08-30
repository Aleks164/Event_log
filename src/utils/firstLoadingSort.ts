import { FirstLoadingSortParamType } from "@/types/types";

export function firstLoadingSort({ curItem, type, data }: FirstLoadingSortParamType) {
    let dataCopyFiltred = data.slice();
    if (type === "up") {
        dataCopyFiltred = dataCopyFiltred.sort((a, b) => {
            if (a[curItem] < b[curItem]) return -1;
            if (a[curItem] > b[curItem]) return 1;
            return 0;
        });
    }
    if (type === "default") {
        dataCopyFiltred = dataCopyFiltred.sort((a, b) => {
            if (a[curItem] > b[curItem]) return -1;
            if (a[curItem] < b[curItem]) return 1;
            return 0;
        });
    }
    return dataCopyFiltred;
}