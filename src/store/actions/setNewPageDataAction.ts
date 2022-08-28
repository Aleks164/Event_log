import { AppDispatch } from "..";
import { DataItemType } from "../../types/types";
import { defaultData } from "../../utils/defaultData";
import {
  setCurrentPage,
  setError,
} from "../reducers/eventLogStateManager";
import { setData } from "../reducers/dataManager";
import { calcPageNumber } from "@/utils/calcPageNumber";



export const setNewPageDataAction =
  (pageNumber: number, rowsNumber: number, serverDataLength: number) =>
    async (dispatch: AppDispatch) => {
      try {
        const nextPageNumber = calcPageNumber(pageNumber, rowsNumber, serverDataLength); // добавлено только для того чтобы не генерировать json на 1млн+ строк, при получении данных с реального сервера этой строки не будет
        const response = await fetch(`http://localhost:3000/data?_page=${nextPageNumber}&_limit=${rowsNumber}`);
        const result = (await response.json()) as DataItemType[];
        // const result = defaultData.filter((_,index)=>((index>=(pageNumber-1)*rowsNumber)&&(index<=(pageNumber-1)*rowsNumber+rowsNumber)));
        dispatch(setData(result));
        dispatch(setCurrentPage(pageNumber));
      } catch {
        dispatch(
          setError(
            "Oops... some kind of server problem, please try again later"
          )
        );
      }
    };
