import { setTableHeadersList } from "@/store/reducers/eventLogStateManager";
import { VisionSwitcherParamType } from "@/types/types";
import { saveUserSettings } from "@/utils/saveUserSettings";
import { tableHeaders } from "@/utils/tableHeaders";

export function visionSwitcher({ lastComposition, dispatch }: VisionSwitcherParamType, header: string) {
    const headerCheck = lastComposition.includes(header
    );
    if (headerCheck) {
        const filtredTableHeadersList = lastComposition.map(
            (el) => el === header ? "" : el);
        dispatch(setTableHeadersList(filtredTableHeadersList));
        saveUserSettings(filtredTableHeadersList, "tableHeadersList");
    }
    else {
        const indexOfItem = tableHeaders.indexOf(header);
        lastComposition.splice(indexOfItem, 1, header);
        dispatch(setTableHeadersList(lastComposition));
        saveUserSettings(lastComposition, "tableHeadersList");
    }
}