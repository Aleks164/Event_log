import { setTableHeadersList } from "@/store/reducers/eventLogStateManager";
import { MyEventTarget, VisionSwitcherParamType,UserSettingsStateType } from "@/types/types";
import { saveUserSettings } from "@/utils/saveUserSettings";

export function visionSwitcher(e: React.SyntheticEvent<Element, Event>, { tableHeadersList, dispatch }: VisionSwitcherParamType,currentSettings:UserSettingsStateType) {
    const headerCheck = tableHeadersList.includes(
        (e.target as MyEventTarget).defaultValue
    );
    if (headerCheck){
        const filtredTableHeadersList = tableHeadersList.filter(
                    (el) => el !== (e.target as MyEventTarget).defaultValue
                );
        dispatch(setTableHeadersList(filtredTableHeadersList));
        saveUserSettings(...currentSettings,tableHeadersList=filtredTableHeadersList);
        }
    else {
        const newHeaderList = tableHeadersList.concat(
            (e.target as MyEventTarget).defaultValue
        );
        dispatch(setTableHeadersList(newHeaderList));
        saveUserSettings(...currentSettings,tableHeadersList=newHeaderList);
    }
}