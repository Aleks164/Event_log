import { AppDispatch } from "..";
import { DataItemType } from "../../types/types";
import { defaultData } from "../../utils/defaultData";
import { setCurrentPage,
  setIsLoading,
  setError, } from "../reducers/eventLogStateManager";
import { setData } from "../reducers/dataManager";



export const setNewPageDataAction =
  (pageNumber: number,rowsNumber:number) =>
  async (dispatch: AppDispatch) => {
    try {     
      dispatch(setIsLoading(true));
      // const response = await fetch(`http://localhost:3000/data?_page=${pageNumber}&_limit=15`);
      // const result = (await response.json()) as DataItemType[];       
      const result = defaultData.filter((_,index)=>((index>=(pageNumber-1)*rowsNumber)&&(index<=(pageNumber-1)*rowsNumber+rowsNumber)));
          dispatch(setData(result));
          dispatch(setCurrentPage(pageNumber));
          dispatch(setIsLoading(false));
    } catch {
      dispatch(
        setError(
          "Oops... some kind of server problem, please try again later"
        )
      );
    }
  };
