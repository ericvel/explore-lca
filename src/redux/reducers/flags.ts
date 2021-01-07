import { ToggleCanSelectMultipleAction, ToggleCompareDialogOpenAction, TOGGLE_CAN_SELECT_MULTIPLE, TOGGLE_COMPARE_DIALOG_OPEN } from '../actions/types';

export const canSelectMultipleBuildings = (state = false, action: ToggleCanSelectMultipleAction) => {
    switch (action.type) {
        case TOGGLE_CAN_SELECT_MULTIPLE:
            return !state
        default:
            return state
    }
}

export const isCompareDialogOpen = (state = false, action: ToggleCompareDialogOpenAction) => {
    switch (action.type) {
        case TOGGLE_COMPARE_DIALOG_OPEN:
            return !state
        default:
            return state
    }
}
