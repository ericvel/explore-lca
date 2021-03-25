import {
  SET_MATERIALS_GROUP_BY,
  MaterialsGroupByActionTypes,
  SET_DISPLAY_MODE,
  DisplayModeActionTypes,
  TOGGLE_CAN_SELECT_MULTIPLE,
  CanSelectMultipleActionTypes,
  TOGGLE_SIMULATION_MODE,
  SimulationModeActionTypes
} from "./types";

const setMaterialsGroupBy = (groupBy: string): MaterialsGroupByActionTypes => {
  return {
    type: SET_MATERIALS_GROUP_BY,
    payload: groupBy,
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
  setMaterialsGroupBy,
  setDisplayMode,
  toggleCanSelectMultiple,
  toggleSimulationMode
};
