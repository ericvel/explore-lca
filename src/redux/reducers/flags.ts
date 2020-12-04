import { ToggleSelectMultipleSwitchAction, TOGGLE_SELECT_MULTIPLE_SWITCH } from '../actions/types';

const selectMultipleBuildingsFlag = (state = false, action: ToggleSelectMultipleSwitchAction) => {
    switch (action.type) {
        case TOGGLE_SELECT_MULTIPLE_SWITCH:
            return !state
        default:
            return state
    }
}

export default selectMultipleBuildingsFlag;