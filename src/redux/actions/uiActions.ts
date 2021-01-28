import { SET_CONTENT_TYPE, ContentTypeActionTypes, SET_DISPLAY_MODE, DisplayModeActionTypes, TOGGLE_CAN_SELECT_MULTIPLE, CanSelectMultipleActionTypes } from './types';

const setContentType = (contentType: string): ContentTypeActionTypes => {
    return {
        type: SET_CONTENT_TYPE,
        payload: contentType
    }
}

const setDisplayMode = (displayMode: string): DisplayModeActionTypes => {
    return {
        type: SET_DISPLAY_MODE,
        payload: displayMode
    }
}

const toggleCanSelectMultiple = (): CanSelectMultipleActionTypes => {
    return {
        type: TOGGLE_CAN_SELECT_MULTIPLE,
    }
}

export default {
    setContentType,
    setDisplayMode,
    toggleCanSelectMultiple
}