import { setNewPageDataAction } from "../../../store/actions/setNewPageDataAction";
import { setData } from "../../../store/reducers/dataManager";
import { setSortType, setCurItem } from "../../../store/reducers/sortManager";
import { FilterIconType, DataKeysType, SortingFieldParam } from "../../../types/types";



export function sortingField({ keyOfDataItem, fieldIndex, curItem, type, dispatch, data, currentPage, tableRows }: SortingFieldParam) {

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
        dispatch(setNewPageDataAction(currentPage, tableRows));
        dispatch(setSortType(nextType));
        dispatch(setCurItem(sortField));
    }

    if (type === "up") {
        nextType = "default";
        let sortDataClone = data.slice();
        sortDataClone = sortDataClone.reverse();
        dispatch(setData(sortDataClone));
        dispatch(setSortType(nextType));
        dispatch(setCurItem(sortField));
    }
}