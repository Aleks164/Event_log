import { setNewPageDataAction } from "@/store/actions/setNewPageDataAction";
import { setData } from "@/store/reducers/dataManager";
import { setIsLoading } from "@/store/reducers/eventLogStateManager";
import { setSortType, setCurItem } from "@/store/reducers/sortManager";
import { FilterIconType, DataKeysType, SortingFieldParam } from "@/types/types";
import { saveUserSettings } from "@/utils/saveUserSettings";



export function sortingField({ keyOfDataItem, fieldIndex, curItem, type, dispatch, data, currentPage, tableRows, serverDataLength }: SortingFieldParam) {

    let nextType: FilterIconType = "down";
    const sortField = keyOfDataItem[fieldIndex - 1] as DataKeysType;
    if (sortField !== curItem) {
        type = "down";
        dispatch(setSortType(nextType));
    }
    if (type === "down") {
        nextType = "up";
        let sortDataClone = data.slice();
        sortDataClone = sortDataClone.sort((a, b) => {
            if (a[sortField] < b[sortField]) return -1;
            if (a[sortField] > b[sortField]) return 1;
            return 0;
        });
        dispatch(setData(sortDataClone));
        dispatch(setSortType(nextType));
        dispatch(setCurItem(sortField));
    }
    if (type === "default") {
        dispatch(setIsLoading(true));
        dispatch(setNewPageDataAction(currentPage, tableRows, serverDataLength));
        dispatch(setSortType(nextType));
        dispatch(setCurItem(sortField));
        setTimeout(() => {
            dispatch(setIsLoading(false));
        }, 500);
    }

    if (type === "up") {
        nextType = "default";
        let sortDataClone = data.slice();
        sortDataClone = sortDataClone.reverse();
        dispatch(setData(sortDataClone));
        dispatch(setSortType(nextType));
        dispatch(setCurItem(sortField));
    }
    saveUserSettings({
        type: nextType,
        curItem: sortField
    }, "sortParam");
}