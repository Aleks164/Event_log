import { setTableHeadersList } from "../../../store/reducers/eventLogStateManager";
import { MyEventTarget, VisionSwitcherParamType } from "../../../types/types";

export function visionSwitcher(e: React.SyntheticEvent<Element, Event>, { tableHeadersList, dispatch }: VisionSwitcherParamType) {
    const headerCheck = tableHeadersList.includes(
        (e.target as MyEventTarget).defaultValue
    );
    if (headerCheck)
        dispatch(
            setTableHeadersList(
                tableHeadersList.filter(
                    (el) => el !== (e.target as MyEventTarget).defaultValue
                )
            )
        );
    else {
        const newHeaderList = tableHeadersList.concat(
            (e.target as MyEventTarget).defaultValue
        );
        dispatch(setTableHeadersList(newHeaderList));
    }
}