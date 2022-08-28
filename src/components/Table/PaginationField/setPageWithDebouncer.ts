import { setNewPageDataAction } from "@/store/actions/setNewPageDataAction";
import { setCurrentPage, setIsLoading } from "@/store/reducers/eventLogStateManager";
import { SetPageWithDebouncerParamType } from "@/types/types";


export function setPageWithDebouncer({ debounceTimeOutID, dispatch, tableRows, setPageNumber, serverDataLength }: SetPageWithDebouncerParamType, newPagenumber: string) {
    let value = parseInt(newPagenumber, 10);
    if (value < 1 || !value) value = 1;
    setPageNumber(value);
    clearTimeout(debounceTimeOutID.current);
    debounceTimeOutID.current = setTimeout(() => {
        dispatch(setCurrentPage(value));
        dispatch(setIsLoading(true));
        dispatch(setNewPageDataAction(value, tableRows, serverDataLength));
        setTimeout(() => {
            dispatch(setIsLoading(false));
        }, 500);
    }, 1000);
}