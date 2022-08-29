import { AppDispatch } from "..";
import { DataItemType } from "../../types/types";
import { defaultData } from "../../utils/defaultData";
import {
  setError
} from "../reducers/eventLogStateManager";
import { setServerDataLength } from "../reducers/dataManager";

export const setFullDataLength = () =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/data/`);
      // const response = await fetch(`https://k3vjv5-3001.preview.csb.app/data/`);
      const result = (await response.json()) as DataItemType[];
      const dataLength = result.length;
      dispatch(setServerDataLength(dataLength));
    } catch {
      dispatch(
        setError(
          "Oops... some kind of server problem, please try again later"
        )
      );
    }
  };


