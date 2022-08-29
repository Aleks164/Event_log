import { setNewPageDataAction } from "@/store/actions/setNewPageDataAction";
import { setCurrentPage, setIsLoading } from "@/store/reducers/eventLogStateManager";
import { saveUserSettings } from "@/utils/saveUserSettings";
import { NextPageHandlerParamType,UserSettingsStateType } from "@/types/types";

export function nextPageHandler({ pageNumber, tableRows, dispatch, setPageNumber, serverDataLength }: NextPageHandlerParamType, nextPage: string,currentSettings:UserSettingsStateType) {
    let newNumber = parseInt(nextPage, 10) + pageNumber;
    if (newNumber < 1) newNumber = 1;
    setPageNumber(newNumber);
    dispatch(setCurrentPage(newNumber));
    dispatch(setIsLoading(true));
    dispatch(setNewPageDataAction(newNumber, tableRows, serverDataLength));
    
    saveUserSettings({...currentSettings, currentPage:newNumber})
    
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 500);   
}