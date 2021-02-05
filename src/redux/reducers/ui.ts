import {
  SET_CONTENT_TYPE,
  ContentTypeActionTypes,
  SET_DISPLAY_MODE,
  DisplayModeActionTypes,
  TOGGLE_CAN_SELECT_MULTIPLE,
  CanSelectMultipleActionTypes,
  TOGGLE_SIMULATION_MODE,
  SimulationModeActionTypes
} from "../actions/types";

export const contentType = (
  state = "hierarchy",
  action: ContentTypeActionTypes
) => {
  switch (action.type) {
    case SET_CONTENT_TYPE:
      return action.payload;
    default:
      return state;
  }
};

export const displayMode = (
  state = "table",
  action: DisplayModeActionTypes
) => {
  switch (action.type) {
    case SET_DISPLAY_MODE:
      return action.payload;
    default:
      return state;
  }
};

export const canSelectMultipleBuildings = (
  state = false,
  action: CanSelectMultipleActionTypes
) => {
  switch (action.type) {
    case TOGGLE_CAN_SELECT_MULTIPLE:
      return !state;
    default:
      return state;
  }
};

export const isSimulationModeActive = (
  state = false,
  action: SimulationModeActionTypes
) => {
  switch (action.type) {
    case TOGGLE_SIMULATION_MODE:
      return !state;
    default:
      return state;
  }
};
