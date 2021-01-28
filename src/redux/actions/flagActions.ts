import {  TOGGLE_COMPARE_DIALOG_OPEN, ToggleCompareDialogOpenAction } from './types'

const toggleCompareDialogOpen = (): ToggleCompareDialogOpenAction => {
    return {
        type: TOGGLE_COMPARE_DIALOG_OPEN,
    }
}

export default {
    toggleCompareDialogOpen
}