import { setTableHeadersList } from "@/store/reducers/eventLogStateManager";
import { MyEventTarget, VisionSwitcherParamType } from "@/types/types";
import { saveUserSettings } from "@/utils/saveUserSettings";

export function visionSwitcher(e: React.SyntheticEvent<Element, Event>, { lastComposition, dispatch }: VisionSwitcherParamType) {
    const headerCheck = lastComposition.includes(
        (e.target as MyEventTarget).defaultValue
    );
    if (headerCheck) {
        const filtredTableHeadersList = lastComposition.filter(
            (el) => el !== (e.target as MyEventTarget).defaultValue
        );
        dispatch(setTableHeadersList(filtredTableHeadersList));
        saveUserSettings(filtredTableHeadersList, "tableHeadersList");
    }
    else {
        const newHeaderList = lastComposition.concat(
            (e.target as MyEventTarget).defaultValue
        );
        dispatch(setTableHeadersList(newHeaderList));
        saveUserSettings(newHeaderList, "tableHeadersList");
    }
}