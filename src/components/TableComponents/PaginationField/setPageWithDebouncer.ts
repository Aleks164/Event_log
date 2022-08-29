import { setNewPageDataAction } from "@/store/actions/setNewPageDataAction";
import { setCurrentPage, setIsLoading } from "@/store/reducers/eventLogStateManager";
import { SetPageWithDebouncerParamType,UserSettingsStateType } from "@/types/types";
import { saveUserSettings } from "@/utils/saveUserSettings";


export function setPageWithDebouncer({ debounceTimeOutID, dispatch, tableRows, setPageNumber, serverDataLength }: SetPageWithDebouncerParamType, newPagenumber: string,currentSettings:UserSettingsStateType) {
    let value = parseInt(newPagenumber, 10);
    if (value < 1 || !value) value = 1;
    setPageNumber(value);
    clearTimeout(debounceTimeOutID.current);
    debounceTimeOutID.current = setTimeout(() => {
        dispatch(setCurrentPage(value));
        dispatch(setIsLoading(true));
        dispatch(setNewPageDataAction(value, tableRows, serverDataLength)); 
        
         saveUserSettings({...currentSettings, currentPage:value})
         
        setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 500);      
    }, 1000);
}