import { SET_CONTENT_TYPE, ContentTypeActionTypes, SET_DISPLAY_MODE, DisplayModeActionTypes, TOGGLE_CAN_SELECT_MULTIPLE, CanSelectMultipleActionTypes } from '../actions/types';

export const contentType = (state = 'buildingElements', action: ContentTypeActionTypes) => {
    switch (action.type) {
        case SET_CONTENT_TYPE:
            return action.payload
        default:
            return state
    }
}

export const displayMode = (state = 'table', action: DisplayModeActionTypes) => {
    switch (action.type) {
        case SET_DISPLAY_MODE:
            return action.payload
        default:
            return state
    }
}

export const canSelectMultipleBuildings = (state = false, action: CanSelectMultipleActionTypes) => {
    switch (action.type) {
        case TOGGLE_CAN_SELECT_MULTIPLE:
            return !state
        default:
            return state
    }
}
