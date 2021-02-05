import {
  SET_CONTENT_TYPE,
  ContentTypeActionTypes,
  SET_DISPLAY_MODE,
  DisplayModeActionTypes,
  TOGGLE_CAN_SELECT_MULTIPLE,
  CanSelectMultipleActionTypes,
  TOGGLE_SIMULATION_MODE,
  SimulationModeActionTypes
} from "./types";

const setContentType = (contentType: string): ContentTypeActionTypes => {
  return {
    type: SET_CONTENT_TYPE,
    payload: contentType,
  };
};

const setDisplayMode = (displayMode: string): DisplayModeActionTypes => {
  return {
    type: SET_DISPLAY_MODE,
    payload: displayMode,
  };
};

const toggleCanSelectMultiple = (): CanSelectMultipleActionTypes => {
  return {
    type: TOGGLE_CAN_SELECT_MULTIPLE,
  };
};

const toggleSimulationMode = (): SimulationModeActionTypes => {
  return {
    type: TOGGLE_SIMULATION_MODE,
  };
};

export default {
  setContentType,
  setDisplayMode,
  toggleCanSelectMultiple,
  toggleSimulationMode
};
