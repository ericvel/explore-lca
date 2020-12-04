import { TOGGLE_SELECT_MULTIPLE_SWITCH, ToggleSelectMultipleSwitchAction } from './types'

const toggleSelectMultipleSwitch = (): ToggleSelectMultipleSwitchAction => {
    return {
        type: TOGGLE_SELECT_MULTIPLE_SWITCH,
    }
}

export default {
    toggleSelectMultipleSwitch
}