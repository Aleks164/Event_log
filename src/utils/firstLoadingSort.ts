import { setData } from "@/store/reducers/dataManager";
import { FirstLoadingSortParamType,DataKeysType } from "@/types/types";

export function firstLoadingSort({  curItem, type, data }: FirstLoadingSortParamType) {  
    let dataCopyFiltred =  data.slice();
    if (type === "up") {  
         console.log("down");     
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