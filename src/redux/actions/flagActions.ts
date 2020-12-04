import { TOGGLE_CAN_SELECT_MULTIPLE, TOGGLE_COMPARE_DIALOG_OPEN, ToggleCanSelectMultipleAction, ToggleCompareDialogOpen } from './types'

const toggleCanSelectMultiple = (): ToggleCanSelectMultipleAction => {
    return {
        type: TOGGLE_CAN_SELECT_MULTIPLE,
    }
}

const toggleCompareDialogOpen = (): ToggleCompareDialogOpen => {
    return {
        type: TOGGLE_COMPARE_DIALOG_OPEN,
    }
}

export default {
    toggleCanSelectMultiple,
    toggleCompareDialogOpen
}