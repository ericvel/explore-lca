import {
  BuildingActionTypes,
  SET_BUILDINGS,
  SelectedBuildingActionTypes,
  SELECT_BUILDINGS,
  DESELECT_ALL_BUILDINGS,
} from "../actions/types";

export const buildings = (
  state: IBuilding[] = [],
  action: BuildingActionTypes
) => {
  switch (action.type) {
    case SET_BUILDINGS:
      return action.payload;
    default:
      return state;
  }
};

export const selectedBuildings = (
  state: IBuilding[] = [],
  action: SelectedBuildingActionTypes
) => {
  switch (action.type) {
    case SELECT_BUILDINGS:
      return action.payload;
    case DESELECT_ALL_BUILDINGS:
      return [];
    default:
      return state;
  }
};
